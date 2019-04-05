import * as ls from '../localstorage';
import { POMODORO } from '../vuex-constants';

const tickingSound = new Audio('/ticking.wav');
tickingSound.loop = true;

export const defaultPomodoroSeconds = 1500;
export const defaultShortBreakSeconds = 300;
export const defaultPomodoBeforeLongBreak = 4;

export default {
  hasStarted: false,
  type: POMODORO,
  duration: ls.get(ls.POMODORO_SECONDS, defaultPomodoroSeconds),
  pomodoroSeconds: ls.get(ls.POMODORO_SECONDS, defaultPomodoroSeconds),
  pomodoBeforeLongBreak: ls.get(ls.POMODORO_BEFORE_LONG_BREAK, defaultPomodoBeforeLongBreak),
  shortBreakSeconds: ls.get(ls.SHORT_BREAK, defaultShortBreakSeconds),
  longBreakSeconds: ls.get(ls.LONG_BREAK, defaultPomodoroSeconds),
  history: [],
  interval: null,
  tickingSound,
  showSettings: false,
  notes: null,
  autoStart: ls.get(ls.AUTO_START, true),
  playSound: ls.get(ls.PLAY_SOUND, true),
};
