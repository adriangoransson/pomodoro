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
      <footer>Made by <a href="https://adriang.se">Adrian Göransson</a>. Source on <a href="https://github.com/adriangoransson/pomodoro">GitHub</a>.</footer>
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

<style>
  :root {
    --pomodoro-color: hsl(5, 80%, 50%);
    --short-break-color: hsl(110, 60%, 50%);
    --long-break-color: hsl(220, 60%, 50%);
    --border-radius: 3px;
    --border-color: #e0e0e0;
  }

  * {
    font-family:  -apple-system,
                  BlinkMacSystemFont,
                  'Segoe UI',
                  Roboto,
                  Oxygen,
                  Ubuntu,
                  Cantarell,
                  'Open Sans',
                  'Helvetica Neue',
                  sans-serif;
    box-sizing: border-box;
  }

  body {
    width: 100;
    margin: 0;
    background: hsl(0, 0%, 98%);
  }

  html, body, #app {
    height: 100%;
  }

  #app {
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

  @media (max-width: 720px) {
    .container {
        margin-left: 10px;
        margin-right: 10px;
      }
  }

  a {
    text-decoration: none;
    color: var(--pomodoro-color);
  }

  a:hover {
    text-decoration: underline;
  }

  header {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
  }

  header h1 {
    display: inline;
    margin: 0;
  }

  header .button {
    font-size: 0.9rem;
  }

  .button {
    background: white;
    font-size: 0.8rem;
    border: 1px solid #E0E0E0;
    padding: 10px 15px;
    border-radius: 3px;
  }

  .button:hover {
    background: hsl(0, 0%, 98%);
  }

  .button:active, .button.active {
    background: hsl(0, 0%, 95%);
  }

  footer {
    text-align: center;
    padding: 1rem;
    font-size: 0.8rem;
  }
</style>
