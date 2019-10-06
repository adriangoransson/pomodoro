const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

const webPackPlugins = [];

if (process.env.NODE_ENV === 'production') {
  webPackPlugins.push(new PrerenderSPAPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: ['/'],
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      keepClosingSlash: true,
      sortAttributes: true,
    },
  }));
}

module.exports = {
  pwa: {
    name: 'Pomodoro',
    themeColor: '#fafafa',
    msTileColor: '#fafafa',
    appleMobileWebAppCapable: 'yes',
    iconPaths: {
      favicon32: 'favicon-32x32.png',
      favicon16: 'favicon-16x16.png',
      appleTouchIcon: 'apple-touch-icon-152x152.png',
      maskIcon: 'safari-pinned-tab.svg',
      msTileImage: 'msapplication-icon-144x144.png',
    },
    workboxOptions: {
      skipWaiting: true,
    },
  },

  configureWebpack: {
    plugins: webPackPlugins,
  },
};
