// vue.config.js
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // Estas dependencias ya las tenías
  transpileDependencies: [
    'mermaid', 
    'marked'
  ],

  // Agregamos o extendemos la configuración de Webpack
  chainWebpack: (config) => {
    config.module
      .rule('js') // regla para archivos JS
      .include
        // Forzamos a que Babel mire los archivos dentro de mermaid y marked
        .add(/node_modules\/mermaid/)
        .add(/node_modules\/marked/)
        .end()
      .use('babel-loader')
      .loader('babel-loader')
      .tap((options) => {
        // Asegúrate de incluir aquí los plugins que requieres
        options.plugins = [
          '@babel/plugin-transform-private-methods',
          '@babel/plugin-transform-class-static-block'
        ];
        return options;
      });
  },

  publicPath: process.env.VUE_APP_BASE_URL || '/',
  devServer: {
    host: process.env.VUE_APP_IP || '0.0.0.0',
    port: process.env.VUE_APP_PORT || 8080,
    hot: true,
    liveReload: true,
    client: {
      webSocketURL: `ws://${process.env.VUE_APP_IP || 'localhost'}:${process.env.VUE_APP_PORT || 8080}/ws`,
    },
    proxy: {
      '/api': {
        target: process.env.VUE_APP_URL_BACK || 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
