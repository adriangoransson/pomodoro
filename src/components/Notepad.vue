<template>
  <div>
    <textarea v-model="text" rows="3" placeholder="Write notes"></textarea>
  </div>
</template>

<script>
import { SET_NOTES } from '@/vuex-constants';

export default {
  computed: {
    text: {
      get() {
        return this.$store.state.notes;
      },
      set(val) {
        this.$store.commit(SET_NOTES, val);
      },
    },
  },
};
</script>

<style scoped>
  textarea {
    text-align: center;
    margin-top: 10px;
    padding: 5px;
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: initial;
  }
</style>
