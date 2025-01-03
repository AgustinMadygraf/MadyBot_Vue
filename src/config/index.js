import config from './config.json';

const isProd = process.env.NODE_ENV === 'production';

const finalConfig = {
  ...config,
  API_ENDPOINT: isProd ? config.API_ENDPOINT_PROD : config.API_ENDPOINT_DEV,
  BASE_URL: isProd ? config.BASE_URL_PROD : config.BASE_URL_DEV,
};

export default finalConfig;