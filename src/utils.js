import { POMODORO, SHORT_BREAK, LONG_BREAK } from './store/constants';

function zeropad(input, n = 2) {
  const l = `${input}`.length;

  if (l >= n) {
    return input;
  }

  const zeroes = '0'.repeat(n - l);

  return `${zeroes}${input}`;
}

export function formatMinutes(seconds) {
  const minutes = zeropad(Math.floor(seconds / 60));
  const rest = zeropad(seconds % 60);
  return `${minutes}:${rest}`;
}

export function formattedType(type) {
  const types = {
    [POMODORO]: 'Pomodoro',
    [SHORT_BREAK]: 'Short break',
    [LONG_BREAK]: 'Long break',
  };

  return types[type] || '';
}

export function slugType(type) {
  const types = {
    [POMODORO]: 'pomodoro',
    [SHORT_BREAK]: 'short-break',
    [LONG_BREAK]: 'long-break',
  };

  return types[type];
}
