<template>
  <div class="history">
    <HistoryEntry
      v-for="(entry, index) in $store.state.history"
      :key="index"
      :entry="entry"
    />
  </div>
</template>

<script>
import HistoryEntry from './HistoryEntry.vue';

export default {
  name: 'history',

  components: {
    HistoryEntry,
  },
};
</script>
