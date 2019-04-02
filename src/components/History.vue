<template>
  <div class="history">
    <div
      v-for="(history, index) in $store.state.history"
      :key="index"
      :class="history.type | slugType"
      class="entry"
    >
      <h3 class="has-border-bottom">
        {{ history.type | formattedType }}
      </h3>
      <pre v-if="history.text" class="has-border-bottom">{{ history.text }}</pre>
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
    border-radius: var(--border-radius);
    border-top: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    margin: 10px 0;
    background: #fff;
    text-align: center;
  }

  .history h3 {
    padding: 5px 20px;
    margin: 0;
    font-size: 1rem;
    background: hsl(0, 0%, 99%);
  }

  .history pre {
    padding: 5px;
    margin: 0;
    border-radius: var(--border-radius);
  }

  .has-border-bottom {
    border-bottom: 1px solid var(--border-color);
  }

  .history .pomodoro h3 {
    color: var(--pomodoro-color)
  }

  .history .short-break h3 {
    color: var(--short-break-color)
  }

  .history .long-break h3 {
    color: var(--long-break-color)
  }
</style>
