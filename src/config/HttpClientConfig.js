/*
Path: src/config/HttpClientConfig.js (creado)
Este archivo define la configuración global de Axios.
*/

import AppConfig from '../config';

const HttpClientConfig = {
    baseURL: AppConfig.API_ENDPOINT,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000, // Tiempo de espera en milisegundos
  };
  
  export default HttpClientConfig;
  