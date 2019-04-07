<template>
  <div class="timer">
    <div class="duration" :class="$store.state.type | slugType">{{ duration | formatMinutes }}</div>

    <div class="button-bar">
      <button @click="toggle" class="button">{{ toggleText }}</button>
      <button v-if="active" @click="skip" class="button">Skip</button>
    </div>
  </div>
</template>

<script>
import {
  START_TIMER,
  PAUSE,
  NEXT,
} from '@/vuex-constants';

import { formatMinutes, formattedType, slugType } from '@/utils';

export default {
  name: 'timer',

  created() {
    document.addEventListener('keyup', this.handleKeyup);
  },

  beforeDestroy() {
    document.removeEventListener('keyup', this.handleKeyup);
  },

  computed: {
    toggleText() {
      if (this.active) {
        return 'Pause';
      }

      if (this.$store.state.hasStarted) {
        return 'Resume';
      }

      return 'Start';
    },

    duration() {
      return this.$store.state.duration;
    },

    active() {
      return this.$store.getters.active;
    },
  },

  methods: {
    handleKeyup(e) {
      if (e.target === document.body && e.key === ' ') {
        this.toggle();
      }
    },

    toggle() {
      if (this.active) {
        this.$store.dispatch(PAUSE);
      } else {
        this.$store.dispatch(START_TIMER);
      }
    },

    skip() {
      this.$store.dispatch(NEXT);
    },
  },

  filters: {
    formatMinutes,
    formattedType,
    slugType,
  },
};
</script>

<style scoped>
  .timer .duration {
    font-size: 5rem;
    font-family: monospace;
    text-align: center;
    margin: 1rem auto;
    padding: 4rem;
    text-shadow: 0 1px 3px hsla(0, 0%, 30%, 0.5);
    color: white;
  }

  .timer .duration.pomodoro {
    background: var(--pomodoro-color);
  }

  .timer .duration.short-break {
    background: var(--short-break-color);
  }

  .timer .duration.long-break {
    background: var(--long-break-color);
  }

  .timer .current-type {
    text-align: center;
  }

  .timer .button-bar {
    text-align: center;
  }

  .timer .button-bar .button:not(:last-child) {
    margin-right: 15px;
  }
</style>
