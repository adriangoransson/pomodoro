/* eslint-disable no-param-reassign */

import * as ls from '../localstorage';
import { formattedType, formatMinutes } from '../utils';

import {
  SET_DURATION,
  SET_TYPE,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  DECREMENT_DURATION,
  ADD_TO_HISTORY,
  SET_POMODORO,
  SET_INTERVAL,
  PLAY_AUDIO,
  SET_STARTED,
  SHOW_SETTINGS,
  SET_POMODOROS,
  SET_NOTES,
  SET_AUTO_START,
  SET_PLAY_SOUND,
  CLEAR_INTERVAL,
  MUTE_AUDIO,
} from '../vuex-constants';

export default {
  [SET_DURATION](state, duration) {
    state.duration = duration;
  },

  [SET_TYPE](state, type) {
    state.type = type;
  },

  [SET_SHORT_BREAK](state, seconds) {
    state.shortBreakSeconds = seconds;
    ls.set(ls.SHORT_BREAK, seconds);
  },

  [SET_LONG_BREAK](state, seconds) {
    state.longBreakSeconds = seconds;
    ls.set(ls.LONG_BREAK, seconds);
  },

  [SET_POMODORO](state, seconds) {
    state.pomodoroSeconds = seconds;
    ls.set(ls.POMODORO_SECONDS, seconds);
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
    ls.set(ls.POMODORO_BEFORE_LONG_BREAK, value);
  },

  [SET_NOTES](state, value) {
    state.notes = value;
  },

  [SET_AUTO_START](state, value) {
    const v = !!value;
    state.autoStart = v;
    ls.set(ls.AUTO_START, v);
  },

  [SET_PLAY_SOUND](state, value) {
    const v = !!value;
    state.playSound = v;
    ls.set(ls.PLAY_SOUND, v);
  },
};
