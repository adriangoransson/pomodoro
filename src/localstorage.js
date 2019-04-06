const KEY = 'pomodoro-timer';

export const POMODORO_SECONDS = 'POMODORO_SECONDS';
export const POMODORO_BEFORE_LONG_BREAK = 'POMODORO_BEFORE_LONG_BREAK';
export const SHORT_BREAK = 'SHORT_BREAK';
export const LONG_BREAK = 'LONG_BREAK';
export const AUTO_START = 'AUTO_START';
export const PLAY_SOUND = 'PLAY_SOUND';
export const VOLUME = 'VOLUME';

function getSettings() {
  return JSON.parse(localStorage.getItem(KEY)) || {};
}

export function get(key, def) {
  const ls = getSettings();

  if (key in ls) {
    return ls[key];
  }

  return def;
}

export function set(key, value) {
  const ls = getSettings();
  ls[key] = value;
  localStorage.setItem(KEY, JSON.stringify(ls));
}

export function clear() {
  localStorage.removeItem(KEY);
}
