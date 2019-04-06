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
  SET_POMODOROS,
  SET_NOTES,
  SET_AUTO_START,
  SET_PLAY_SOUND,
  CLEAR_INTERVAL,
  MUTE_AUDIO,
  MANAGE_AUDIO,
  DEFAULT_SETTINGS,
  UPDATE_DURATION,
  ACTIVATE_AUDIO,
} from '../vuex-constants';

import * as ls from '../localstorage';

import { defaultPomodoBeforeLongBreak, defaultPomodoroSeconds, defaultShortBreakSeconds } from './state';

let audioHasStarted = false;

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

export default {
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
    if (state.audio === null) {
      return;
    }

    if (!audioHasStarted) {
      audioHasStarted = true;
      commit(ACTIVATE_AUDIO);
    }

    if (!state.playSound) {
      commit(MUTE_AUDIO);
    } else if (state.type === POMODORO && state.interval !== null) {
      commit(PLAY_AUDIO);
    }
  },

  [DEFAULT_SETTINGS]({ commit, dispatch }) {
    commit(SET_POMODORO, defaultPomodoroSeconds);
    commit(SET_SHORT_BREAK, defaultShortBreakSeconds);
    commit(SET_LONG_BREAK, defaultPomodoroSeconds);
    commit(SET_POMODOROS, defaultPomodoBeforeLongBreak);
    commit(SET_PLAY_SOUND, true);
    commit(SET_AUTO_START, true);

    dispatch(MANAGE_AUDIO);
    dispatch(UPDATE_DURATION);

    ls.clear();
  },

  [UPDATE_DURATION]({ commit, state }) {
    if (!state.hasStarted) {
      commit(SET_DURATION, state.pomodoroSeconds);
    }
  },
};
