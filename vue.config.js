/*
Path: vue.config.js
Este script de configuración de Vue CLI se utiliza para configurar el servidor de desarrollo 
y la URL base de la aplicación.
*/

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
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