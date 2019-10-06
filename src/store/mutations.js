/* eslint-disable no-param-reassign */

import * as ls from '../localstorage';
import { formattedType, formatMinutes } from '../utils';

import {
  SET_DURATION,
  SET_TYPE,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  ADD_TO_HISTORY,
  SET_POMODORO,
  PLAY_AUDIO,
  SET_STARTED,
  SHOW_SETTINGS,
  SET_POMODOROS,
  SET_NOTES,
  SET_AUTO_START,
  SET_PLAY_SOUND,
  MUTE_AUDIO,
  ACTIVATE_AUDIO,
  SET_VOLUME,
  SET_ENDDATE,
  SET_DOCUMENT_TITLE,
  SET_NOTIFICATIONS,
  SET_THEME,
} from './constants';

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

  [SET_DOCUMENT_TITLE](state) {
    document.title = `${formattedType(state.type)} - ${formatMinutes(state.duration)}`;
  },

  [ACTIVATE_AUDIO](state) {
    state.audio.start(0);
  },

  [MUTE_AUDIO](state) {
    state.audio.context.suspend();
  },

  [PLAY_AUDIO](state) {
    state.audio.context.resume();
  },

  [SET_VOLUME](state, value) {
    state.audio.setVolume(value);
    state.volume = value;
    ls.set(ls.VOLUME, value);
  },

  [SET_STARTED](state) {
    state.hasStarted = true;
  },

  [SHOW_SETTINGS](state, value) {
    state.showSettingsTip = false;
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

  [SET_ENDDATE](state, value) {
    state.endDate = value;
  },

  [SET_NOTIFICATIONS](state, value) {
    const v = !!value;
    state.notifications = v;
    ls.set(ls.NOTIFICATIONS, v);
  },

  [SET_THEME](state, value) {
    state.theme = value;
    ls.set(ls.THEME, value);

    document.body.classList.remove('light-theme', 'dark-theme');
    if (value) {
      document.body.classList.add('animate');
      if (value === 'dark') {
        document.body.classList.add('dark-theme');
      } else if (value === 'light') {
        document.body.classList.add('light-theme');
      }
    }
  },
};
