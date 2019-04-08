<template>
  <div :class="entry.type | slugType" class="entry">
    <h2 class="has-border-bottom">{{ entry.type | formattedType }}</h2>
    <pre v-if="entry.text" class="has-border-bottom">{{ entry.text }}</pre>
  </div>
</template>

<script>
import { formattedType, slugType } from '../utils';

export default {
  name: 'HistoryEntry',
  props: ['entry'],

  filters: {
    formattedType,
    slugType,
  },
};
</script>

<style scoped>
  .entry {
    border-radius: var(--border-radius);
    border-top: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
    margin: 10px 0;
    text-align: center;
    background: var(--accent-color);
  }

  .entry h2 {
    padding: 5px 20px;
    margin: 0;
    font-size: 1rem;
    background: var(--body-background-color);
  }

  .entry.pomodoro h2 {
    color: var(--pomodoro-color)
  }

  .entry.short-break h2 {
    color: var(--short-break-color)
  }

  .entry.long-break h2 {
    color: var(--long-break-color)
  }

  .entry pre {
    padding: 5px;
    margin: 0;
    border-radius: var(--border-radius);
  }

  .entry .has-border-bottom {
    border-bottom: 1px solid var(--border-color);
  }
</style>
