/*
Path: vue.config.js
Este script se encarga de cargar la configuración de la aplicación desde el archivo config.json
*/

const { defineConfig } = require('@vue/cli-service');
const finalConfig = require('./src/config/configWrapperNode'); 

module.exports = defineConfig({
  publicPath: finalConfig.BASE_URL,
  transpileDependencies: ['mermaid', 'marked'],

  // Configurar <mermaid> como un elemento HTML válido
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .include.add(/node_modules\/mermaid/).end()
      .use('babel-loader')
      .loader('babel-loader')
      .tap((options) => {
        options.plugins = [
          '@babel/plugin-transform-private-methods',
          '@babel/plugin-transform-class-static-block',
        ];
        return options;
      });
  },

  // Resolver el warning de `compilerOptions` y feature flags
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm-bundler.js',
      },
    },
  }
});
