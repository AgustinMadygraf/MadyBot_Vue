/*
Path: src/config/index.js
Este script es el encargado de exportar la configuración de la aplicación.
*/

import config from './config.json';

const isProd = process.env.NODE_ENV === 'production';

const finalConfig = {
  ...config,
  BASE_URL: isProd ? config.BASE_URL_PROD : config.BASE_URL_DEV,
};

export default finalConfig;