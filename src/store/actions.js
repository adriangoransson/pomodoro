import {
  PAUSE,
  SET_DURATION,
  SET_TYPE,
  START_TIMER,
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  ADD_TO_HISTORY,
  SET_POMODORO,
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
  MUTE_AUDIO,
  MANAGE_AUDIO,
  DEFAULT_SETTINGS,
  UPDATE_DURATION,
  ACTIVATE_AUDIO,
  SET_VOLUME,
  SYNC_DURATION,
  SET_ENDDATE,
  SET_DOCUMENT_TITLE,
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

    if (state.duration <= 0) {
      dispatch(NEXT);
      return;
    }

    // Deduct the first second immediately because we're counting duration down to (including) 0
    const endDate = Date.now() + (state.duration - 1) * 1000;

    commit(SET_ENDDATE, endDate);

    dispatch(SYNC_DURATION);
    dispatch(MANAGE_AUDIO);
  },

  [SYNC_DURATION]({
    commit,
    dispatch,
    getters,
    state,
  }) {
    if (!getters.active) {
      return;
    }

    const duration = Math.round((state.endDate - Date.now()) / 1000);

    if (duration < 0) {
      dispatch(NEXT);
      return;
    }

    commit(SET_DURATION, duration);
    commit(SET_DOCUMENT_TITLE);

    setTimeout(() => {
      dispatch(SYNC_DURATION);
    }, 1000);
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
    commit(MUTE_AUDIO);
    commit(SET_ENDDATE, null);
  },

  [MANAGE_AUDIO]({
    commit,
    getters,
    state,
  }) {
    if (state.audio === null) {
      return;
    }

    if (!state.playSound) {
      commit(MUTE_AUDIO);
    } else if (state.type === POMODORO && getters.active) {
      if (!audioHasStarted) {
        audioHasStarted = true;
        commit(ACTIVATE_AUDIO);
      }

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
    commit(SET_VOLUME, 1);

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
