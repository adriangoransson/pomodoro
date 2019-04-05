/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import {
  PAUSE,
  SET_DURATION,
  SET_TYPE,
  START_TIMER,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  DECREMENT_DURATION,
  ADD_TO_HISTORY,
  SET_POMODORO,
  SET_INTERVAL,
  PLAY_AUDIO,
  NEXT,
  POMODORO,
  SHORT_BREAK,
  LONG_BREAK,
  SET_STARTED,
  SHOW_SETTINGS,
  SET_POMODOROS,
  SET_NOTES,
  SET_AUTO_START,
  SET_PLAY_SOUND,
  CLEAR_INTERVAL,
  MUTE_AUDIO,
  MANAGE_AUDIO,
  DEFAULT_SETTINGS,
  UPDATE_DURATION,
} from './vuex-constants';

import { formattedType, formatMinutes } from './utils';

const tickingSound = new Audio('/ticking.wav');
tickingSound.loop = true;

Vue.use(Vuex);

function getNextType({
  history,
  pomodoBeforeLongBreak,
  longBreakSeconds,
  shortBreakSeconds,
  pomodoroSeconds,
  type,
}) {
  if (type === POMODORO) {
    // (POMODORO + SHORT_PAUSE) * pomodoro before long break
    // disregard the last entry as it's not in history yet
    const pomodoroInHistory = 2 * (pomodoBeforeLongBreak - 1);
    if (
      history.length >= pomodoroInHistory
      && history
        .slice(0, pomodoroInHistory)
        .every(entry => entry.type !== LONG_BREAK)
    ) {
      return {
        duration: longBreakSeconds,
        type: LONG_BREAK,
      };
    }

    return {
      duration: shortBreakSeconds,
      type: SHORT_BREAK,
    };
  }

  return {
    duration: pomodoroSeconds,
    type: POMODORO,
  };
}

const pomodoroSeconds = 1500;
const shortBreakSeconds = 300;
const pomodoBeforeLongBreak = 4;

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    hasStarted: false,
    type: POMODORO,
    duration: pomodoroSeconds,
    pomodoBeforeLongBreak,
    shortBreakSeconds,
    pomodoroSeconds,
    longBreakSeconds: pomodoroSeconds,
    history: [],
    interval: null,
    tickingSound,
    showSettings: false,
    notes: null,
    autoStart: true,
    playSound: true,
  },

  getters: {
    active: state => state.interval !== null,
  },

  mutations: {
    [SET_DURATION](state, duration) {
      state.duration = duration;
    },

    [SET_TYPE](state, type) {
      state.type = type;
    },

    [SET_SHORT_BREAK](state, seconds) {
      state.shortBreakSeconds = seconds;
    },

    [SET_LONG_BREAK](state, seconds) {
      state.longBreakSeconds = seconds;
    },

    [SET_POMODORO](state, seconds) {
      state.pomodoroSeconds = seconds;
    },

    [ADD_TO_HISTORY](state) {
      state.history.unshift({ text: state.notes, type: state.type });
    },

    [DECREMENT_DURATION](state) {
      state.duration -= 1;
      document.title = `${formattedType(state.type)} - ${formatMinutes(state.duration)}`;
    },

    [SET_INTERVAL](state, interval) {
      state.interval = interval;
    },

    [CLEAR_INTERVAL](state) {
      clearInterval(state.interval);
      state.interval = null;
    },

    [MUTE_AUDIO](state) {
      state.tickingSound.pause();
    },

    [PLAY_AUDIO](state) {
      state.tickingSound.play();
    },

    [SET_STARTED](state) {
      state.hasStarted = true;
    },

    [SHOW_SETTINGS](state, value) {
      state.showSettings = value;
    },

    [SET_POMODOROS](state, value) {
      state.pomodoBeforeLongBreak = value;
    },

    [SET_NOTES](state, value) {
      state.notes = value;
    },

    [SET_AUTO_START](state, value) {
      state.autoStart = !!value;
    },

    [SET_PLAY_SOUND](state, value) {
      state.playSound = !!value;
    },
  },

  actions: {
    [START_TIMER]({ commit, dispatch, state }) {
      if (!state.hasStarted) {
        commit(SET_STARTED);
      }

      const shouldPlay = () => state.duration > 0;

      if (!shouldPlay()) { return; }

      commit(DECREMENT_DURATION);

      const interval = setInterval(() => {
        if (shouldPlay()) {
          commit(DECREMENT_DURATION);
        } else {
          dispatch(NEXT);
        }
      }, 1000);

      commit(SET_INTERVAL, interval);
      dispatch(MANAGE_AUDIO);
    },

    [NEXT]({ commit, state, dispatch }) {
      dispatch(PAUSE);

      const { duration, type } = getNextType(state);

      commit(ADD_TO_HISTORY);
      commit(SET_NOTES, null);
      commit(SET_DURATION, duration);
      commit(SET_TYPE, type);

      if (state.autoStart) {
        dispatch(START_TIMER);
      }
    },

    [PAUSE]({ commit }) {
      commit(CLEAR_INTERVAL);
      commit(MUTE_AUDIO);
    },

    [MANAGE_AUDIO]({ commit, state }) {
      if (!state.playSound) {
        commit(MUTE_AUDIO);
      } else if (state.type === POMODORO && state.interval !== null) {
        commit(PLAY_AUDIO);
      }
    },

    [DEFAULT_SETTINGS]({ commit, dispatch }) {
      commit(SET_POMODORO, pomodoroSeconds);
      commit(SET_SHORT_BREAK, shortBreakSeconds);
      commit(SET_LONG_BREAK, pomodoroSeconds);
      commit(SET_POMODOROS, pomodoBeforeLongBreak);
      commit(SET_PLAY_SOUND, true);
      commit(SET_AUTO_START, true);

      dispatch(MANAGE_AUDIO);
      dispatch(UPDATE_DURATION);
    },

    [UPDATE_DURATION]({ commit, state }) {
      if (!state.hasStarted) {
        commit(SET_DURATION, state.pomodoroSeconds);
      }
    },
  },
});
