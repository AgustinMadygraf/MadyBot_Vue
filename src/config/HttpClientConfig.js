/*
Path: src/config/HttpClientConfig.js

*/

import AppConfig from '../config';
import LogService from '../JS/LogService.js';
import axios from 'axios';

let globalEndpoint = null;

const checkPhpEndpointHealth = async () => {
  try {
    LogService.info('[HttpClientConfig] Verificando salud de PHP_ENDPOINT...');
    await axios.get(`${AppConfig.PHP_ENDPOINT}/health-check`);
    LogService.info('[HttpClientConfig] PHP_ENDPOINT está saludable.');
    return true;
  } catch (error) {
    LogService.warn('[HttpClientConfig] PHP_ENDPOINT no está saludable:', error.message);
    return false;
  }
};

const getApiEndpoint = async () => {
  try {
    LogService.info('[HttpClientConfig] Intentando usar API_ENDPOINT de config.json');
    await axios.get(`${AppConfig.API_ENDPOINT}/health-check`);
    LogService.info('[HttpClientConfig] API_ENDPOINT de config.json funcionando.');
    return AppConfig.API_ENDPOINT;
  } catch (error) {
    LogService.warn('[HttpClientConfig] Fallback: Obteniendo API_ENDPOINT desde PHP...');
    try {
      const isPhpHealthy = await checkPhpEndpointHealth();
      if (!isPhpHealthy) {
        throw new Error('PHP_ENDPOINT no está saludable');
      }
      const response = await axios.get(AppConfig.PHP_ENDPOINT);
      if (!response.data.endpoint) {
        LogService.warn('[HttpClientConfig] El campo "endpoint" está undefined en la respuesta de PHP. Usando valor por defecto.');
        throw new Error('El endpoint devuelto por PHP es undefined');
      }
      LogService.info('[HttpClientConfig] API_ENDPOINT obtenido desde PHP:', response.data.endpoint);
      return response.data.endpoint;
    } catch (phpError) {
      LogService.error('[HttpClientConfig] Error al obtener API_ENDPOINT desde PHP:', phpError.message);
      throw new Error('No se pudo obtener un API_ENDPOINT válido');
    }
  }
};

const initHttpClientConfig = async () => {
  const baseURL = await getApiEndpoint();
  return {
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
  };
};

export default initHttpClientConfig;

export function setGlobalEndpoint(newEndpoint) {
  globalEndpoint = newEndpoint;
  LogService.info('[HttpClientConfig] globalEndpoint actualizado a:', newEndpoint);
}

export function getGlobalEndpoint() {
  return globalEndpoint;
}