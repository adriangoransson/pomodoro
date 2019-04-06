const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    pwa: {
      name: 'Pomodoro',
      themeColor: '#fafafa',
      msTileColor: '#fafafa',
      appleMobileWebAppCapable: 'yes',
    },
    configureWebpack: {
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/'],
        }),
      ],
    },
  };
}
