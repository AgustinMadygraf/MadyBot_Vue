/*
Path: babel.config.js
Este script es un archivo de configuración de Babel.
*/

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    '@babel/plugin-transform-private-methods',
    '@babel/plugin-transform-class-static-block'
  ]
};
