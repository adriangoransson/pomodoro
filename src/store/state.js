import * as ls from '../localstorage';
import { POMODORO } from '../vuex-constants';

import audio from './audio';

export const defaultPomodoroSeconds = 1500;
export const defaultShortBreakSeconds = 300;
export const defaultPomodoBeforeLongBreak = 4;

export default {
  hasStarted: false,
  type: POMODORO,
  endDate: null,
  duration: ls.get(ls.POMODORO_SECONDS, defaultPomodoroSeconds),
  pomodoroSeconds: ls.get(ls.POMODORO_SECONDS, defaultPomodoroSeconds),
  pomodoBeforeLongBreak: ls.get(ls.POMODORO_BEFORE_LONG_BREAK, defaultPomodoBeforeLongBreak),
  shortBreakSeconds: ls.get(ls.SHORT_BREAK, defaultShortBreakSeconds),
  longBreakSeconds: ls.get(ls.LONG_BREAK, defaultPomodoroSeconds),
  history: [],
  audio,
  showSettings: false,
  notes: null,
  autoStart: ls.get(ls.AUTO_START, true),
  playSound: ls.get(ls.PLAY_SOUND, true),
  volume: ls.get(ls.VOLUME, 1),
  notifications: ls.get(ls.NOTIFICATIONS, false) && 'Notification' in window && Notification.permission === 'granted',
};
