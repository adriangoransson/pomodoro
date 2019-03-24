<template>
  <div class="history">
    <div
      v-for="(history, index) in $store.state.history"
      :key="index"
      :class="history | slugType"
      class="entry"
    >
      {{ history | formattedType }}
    </div>
  </div>
</template>

<script>
import { formattedType, slugType } from '@/utils';

export default {
  name: 'history',

  filters: {
    formattedType,
    slugType,
  },
};
</script>

<style>
  .entry {
    padding: 5px;
    text-align: center;
    border: 1px solid #e0e0e0;
    margin: 10px;
    background: #fff;
  }

  .history .pomodoro {
    color: var(--pomodoro-color)
  }

  .history .short-break {
    color: var(--short-break-color)
  }

  .history .long-break {
    color: var(--long-break-color)
  }
</style>
