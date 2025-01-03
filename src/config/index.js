// Path: src/config/index.js

/* eslint-disable */

import config from './config.json';
import IAppConfig from './interfaces/IAppConfig';

const isProd = process.env.NODE_ENV === 'production';

const finalConfig = {
  ...config,
  API_ENDPOINT: isProd ? config.API_ENDPOINT_PROD : config.API_ENDPOINT_DEV,
  BASE_URL: isProd ? config.BASE_URL_PROD : config.BASE_URL_DEV,
  PHP_ENDPOINT: isProd ? config.PHP_ENDPOINT_PROD : config.PHP_ENDPOINT_DEV,
};

// Validar que finalConfig implementa todas las propiedades de IAppConfig
const validateConfig = (config) => {
  const requiredProperties = [
    'API_ENDPOINT_DEV',
    'API_ENDPOINT_PROD',
    'PHP_ENDPOINT_DEV',
    'PHP_ENDPOINT_PROD',
    'STREAM_ENABLED',
    'BASE_URL_DEV',
    'BASE_URL_PROD',
  ];

  requiredProperties.forEach((property) => {
    if (!(property in config)) {
      throw new Error(`La propiedad ${property} es requerida en la configuración.`);
    }
  });
};

validateConfig(finalConfig);

export default finalConfig;