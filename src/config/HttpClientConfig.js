/*
Path: src/config/HttpClientConfig.js
Este archivo define la configuración global de Axios.
*/

import AppConfig from '../config';
import LogService from '../JS/LogService.js';
import axios from 'axios';

const getApiEndpoint = async () => {
  try {
    // Intenta primero usar el API_ENDPOINT de config.json
    LogService.info('[HttpClientConfig] Intentando usar API_ENDPOINT de config.json');
    
    // Verifica si podemos conectar al endpoint configurado
    await axios.get(`${AppConfig.API_ENDPOINT}/health-check`);
    LogService.info('[HttpClientConfig] API_ENDPOINT de config.json funcionando.');
    return AppConfig.API_ENDPOINT;

  } catch (error) {
    LogService.warn('[HttpClientConfig] Fallback: Obteniendo API_ENDPOINT desde PHP...');
    try {
      const response = await axios.get('http://localhost/MadyBot_Vue/public/get_data.php');

      // Validar si el endpoint está definido
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
