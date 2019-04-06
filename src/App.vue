<template>
  <div id="app">
    <div>
      <header class="container">
        <h1>{{ $store.state.type | formattedType }}</h1>
        <button @click="settings = !settings" :class="{ active: settings }" class="button">
          🛠 Settings
        </button>
      </header>
      <Settings v-if="settings" class="container" />
      <Timer />
      <Notepad v-if="$store.state.hasStarted" class="container" />
      <History class="container" />
    </div>
    <div>
      <footer>
        Made by <a href="https://adriang.se">Adrian Göransson</a>.
        More info on <a href="https://github.com/adriangoransson/pomodoro">GitHub</a>.
      </footer>
    </div>
  </div>
</template>

<script>
import Settings from './components/Settings.vue';
import Timer from './components/Timer.vue';
import History from './components/History.vue';
import Notepad from './components/Notepad.vue';

import { SHOW_SETTINGS } from './vuex-constants';
import { formattedType } from './utils';

export default {
  name: 'app',

  computed: {
    settings: {
      get() {
        return this.$store.state.showSettings;
      },
      set(val) {
        this.$store.commit(SHOW_SETTINGS, val);
      },
    },
  },

  filters: {
    formattedType,
  },

  components: {
    Settings,
    History,
    Timer,
    Notepad,
  },
};
</script>

<style src="./assets/app.css">
