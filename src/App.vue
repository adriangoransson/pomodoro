<template>
  <div id="app">
    <div class="container">
      <h1>{{ $store.state.type | formattedType }}</h1>
    </div>
    <Timer />
    <div class="container">
      <!-- <Settings /> -->
      <History />
    </div>
  </div>
</template>

<script>
// import Settings from './components/Settings.vue';
import Timer from './components/Timer.vue';
import History from './components/History.vue';

import { formattedType } from './utils';

export default {
  name: 'app',

  filters: {
    formattedType,
  },

  components: {
    // Settings,
    History,
    Timer,
  },
};
</script>

<style>
  :root {
    --pomodoro-color: hsl(5, 80%, 50%);
    --short-break-color: hsl(110, 60%, 50%);
    --long-break-color: hsl(220, 60%, 50%);
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
  }

  body {
    width: 100;
    margin: 0;
    background: hsl(0, 0%, 98%);
  }

  #app {
    max-width: 700px;
    margin: auto;
  }

  .container {
    margin-left: 10px;
    margin-right: 10px;
  }

  .button {
    background: white;
    font-size: 0.8rem;
    border: 1px solid #E0E0E0;
    padding: 10px 15px;
    border-radius: 3px;
  }

  .button:active {
    background: hsl(0, 0%, 95%);
  }
</style>
