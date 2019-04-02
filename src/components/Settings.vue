<template>
  <form @submit.prevent="hide">

    <div class="form-field">
      <label for="pomodoro-length">Pomodoro length</label>
      <input v-model="pomodoro" id="pomodoro-length" type="number" min="1" placeholder="minutes">
    </div>

    <div class="form-field">
      <label for="short-break">Short break length</label>
      <input v-model="shortBreak" id="short-break" type="number" min="1" placeholder="minutes">
    </div>

    <div class="form-field">
      <label for="long-break">Long break length</label>
      <input v-model="longBreak" id="long-break" type="number" min="1" placeholder="minutes">
    </div>

    <div class="form-field">
      <label for="pomodoro-before-break">Pomodoros before long break</label>
      <input v-model="pomodorosBeforeBreak" id="pomodoro-before-break" type="number" min="1">
    </div>

  </form>
</template>

<script>
import {
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_POMODORO,
  SET_DURATION,
  SHOW_SETTINGS,
  SET_POMODOROS,
} from '@/vuex-constants';

const validMinutes = minutes => minutes < 1;
const toSeconds = minutes => minutes * 60;
const toMinutes = seconds => seconds / 60;

export default {
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

        if (!this.$store.state.hasStarted) {
          this.$store.commit(SET_DURATION, seconds);
        }
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
  },

  methods: {
    hide() {
      this.$store.commit(SHOW_SETTINGS, false);
    },
  },
};
</script>

<style scoped>
  .form-field {
    margin-top: 5px;
    display: flex;
    align-items: flex-start;
  }

  .form-field label {
    flex: 1 0 150px;
    max-width: 250px;
    text-align: right;
    margin-right: 10px;
  }

  .form-field input {
    flex: 1 0 100px;
  }
</style>
