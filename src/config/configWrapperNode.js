/* 
Path: src/config/configWrapperNode.js
Este script se encarga de cargar la configuración de la aplicación desde el archivo config.json
*/

const config = require('./config.json');

const isProd = process.env.NODE_ENV === 'production';

const finalConfig = {
  ...config,
  BASE_URL: isProd ? config.BASE_URL_PROD : config.BASE_URL_DEV,
};

module.exports = finalConfig;