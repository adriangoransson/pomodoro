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

      <p v-if="$store.state.showSettingsTip" class="help-text container">
        Tip:
        Check the <a @click.prevent="settings = true" href="#">settings</a> to enable audio,
        notifications and dark theme!
      </p>

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

import { SHOW_SETTINGS } from './store/constants';
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

  created() {
    if (this.$store.state.darkTheme) {
      document.body.classList.add('dark-theme');
    }
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

<style scoped>
  #app {
    height: 100%;
    max-width: 700px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  #app div:first-child {
    flex: 1 0 auto;
  }

  #app div:last-child {
    flex-shrink: 0;
  }

  .help-text {
    text-align: center;
    font-size: 0.8rem;
    color: hsl(0, 0%, 25%);
    animation: fadein 2s;
  }

  @keyframes fadein {
    0%    { opacity: 0; }
    20%   { opacity: 0; }
    100%  { opacity: 1; }
  }
</style>

<style src="./assets/app.css">
