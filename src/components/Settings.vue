<template>
  <div>
    <input v-model="pomodoro" type="number" min="1" placeholder="Pomodoro (minutes)">
    <input v-model="shortBreak" type="number" min="1" placeholder="Short break (minutes)">
    <input v-model="longBreak" type="number" min="1" placeholder="Long break (minutes)">
  </div>
</template>

<script>
import {
  SET_SHORT_BREAK,
  SET_LONG_BREAK,
  SET_POMODORO,
  SET_DURATION,
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
  },
};
</script>
