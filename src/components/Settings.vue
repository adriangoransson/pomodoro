<template>
  <div>

    <div class="form-field">
      <label for="pomodoro-length">Pomodoro length</label>
      <input
        v-model="pomodoro"
        id="pomodoro-length"
        type="number"
        min="1"
        placeholder="minutes"
        pattern="[0-9]*"
      >
    </div>

    <div class="form-field">
      <label for="short-break">Short break length</label>
      <input
        v-model="shortBreak"
        id="short-break"
        type="number"
        min="1"
        placeholder="minutes"
        pattern="[0-9]*"
      >
    </div>

    <div class="form-field">
      <label for="long-break">Long break length</label>
      <input
        v-model="longBreak"
        id="long-break"
        type="number"
        min="1"
        placeholder="minutes"
        pattern="[0-9]*"
      >
    </div>

    <div class="form-field">
      <label for="pomodoro-before-break">Pomodoros before long break</label>
      <input
        v-model="pomodorosBeforeBreak"
        id="pomodoro-before-break"
        type="number"
        min="1"
        pattern="[0-9]*"
      >
    </div>

    <div class="form-field">
      <label for="auto-start">Automatically start next timer</label>
      <input v-model="autoStart" type="checkbox" id="auto-start">
    </div>

    <div class="form-field">
      <label for="play-sound">Play ticking sound for Pomodoro</label>
      <input v-model="playSound" type="checkbox" id="play-sound">
    </div>

    <div class="form-field">
      <label for="volume">Volume</label>
      <input
        v-model="volume"
        type="range"
        id="volume"
        min="0"
        max="1"
        step="0.05"
        list="volume-ticks"
      >

      <datalist id="volume-ticks">
        <option value="0" label="0%" />
        <option value="0.1" />
        <option value="0.2" />
        <option value="0.3" />
        <option value="0.4" />
        <option value="0.5" label="50%" />
        <option value="0.6" />
        <option value="0.7" />
        <option value="0.8" />
        <option value="0.9" />
        <option value="1" label="100%" />
      </datalist>
    </div>

    <div v-if="notificationSupport" class="form-field">
      <label for="notifications">Notifications on new round</label>
      <input
        v-if="notificationPermission === 'granted'"
        v-model="notifications"
        type="checkbox"
        id="notifications"
      >
      <button
        v-else
        @click="notificationRequest"
        :disabled="notificationsDenied"
        type="button"
        class="button"
      >
        {{ notificationText }}
      </button>
    </div>

    <br>

    <div class="form-field default">
      <label for="default">Default settings</label>
      <button @click="defaultSettings" type="button" class="button">
        Restore
      </button>
    </div>

  </div>
</template>

<script>
import {
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_POMODORO,
  SET_POMODOROS,
  SET_AUTO_START,
  SET_PLAY_SOUND,
  MANAGE_AUDIO,
  DEFAULT_SETTINGS,
  UPDATE_DURATION,
  SET_VOLUME,
  SET_NOTIFICATIONS,
} from '@/vuex-constants';

const validMinutes = minutes => minutes < 1;
const toSeconds = minutes => minutes * 60;
const toMinutes = seconds => seconds / 60;

export default {
  data() {
    return {
      notificationSupport: 'Notification' in window,
      notificationPermission: Notification.permission,
    };
  },

  computed: {
    pomodoro: {
      get() {
        return toMinutes(this.$store.state.pomodoroSeconds);
      },
      set(minutes) {
        if (validMinutes(minutes)) {
          return;
        }

        const seconds = toSeconds(minutes);
        this.$store.commit(SET_POMODORO, seconds);

        this.$store.dispatch(UPDATE_DURATION);
      },
    },

    shortBreak: {
      get() {
        return toMinutes(this.$store.state.shortBreakSeconds);
      },
      set(minutes) {
        if (validMinutes(minutes)) {
          return;
        }

        const seconds = toSeconds(minutes);

        this.$store.commit(SET_SHORT_BREAK, seconds);
      },
    },

    longBreak: {
      get() {
        return toMinutes(this.$store.state.longBreakSeconds);
      },
      set(minutes) {
        if (validMinutes(minutes)) {
          return;
        }

        const seconds = toSeconds(minutes);

        this.$store.commit(SET_LONG_BREAK, seconds);
      },
    },

    pomodorosBeforeBreak: {
      get() {
        return this.$store.state.pomodoBeforeLongBreak;
      },
      set(val) {
        this.$store.commit(SET_POMODOROS, val);
      },
    },

    autoStart: {
      get() {
        return this.$store.state.autoStart;
      },
      set(val) {
        this.$store.commit(SET_AUTO_START, val);
      },
    },

    playSound: {
      get() {
        return this.$store.state.playSound;
      },
      set(val) {
        this.$store.commit(SET_PLAY_SOUND, val);
        this.$store.dispatch(MANAGE_AUDIO);
      },
    },

    volume: {
      get() {
        return this.$store.state.volume;
      },
      set(val) {
        this.$store.commit(SET_VOLUME, parseFloat(val));
      },
    },

    notifications: {
      get() {
        return this.$store.state.notifications;
      },
      set(val) {
        this.$store.commit(SET_NOTIFICATIONS, val);
      },
    },

    notificationsDenied() {
      return this.notificationPermission === 'denied';
    },

    notificationText() {
      if (this.notificationsDenied) {
        return 'Permission denied by browser';
      }

      return 'Request permission';
    },
  },

  methods: {
    defaultSettings() {
      this.$store.dispatch(DEFAULT_SETTINGS);
    },

    notificationRequest() {
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          this.notificationPermission = result;
          this.$store.commit(SET_NOTIFICATIONS, true);
        } else {
          this.notificationPermission = 'denied';
        }
      });
    },
  },
};
</script>

<style scoped>
  .form-field {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  .form-field label {
    flex: 1 0 150px;
    max-width: 40%;
    text-align: right;
    margin-right: 10px;
  }

  .form-field input {
    flex: 1 1 100px;
    max-width: 60%;
    padding: 5px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: initial;
  }

  .form-field input[type=checkbox] {
    flex: 0;
  }

  .default button {
    font-weight: bold;
    color: red;
  }
</style>
