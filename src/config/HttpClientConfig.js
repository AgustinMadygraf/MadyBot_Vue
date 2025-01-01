/*
Path: src/config/HttpClientConfig.js
Este archivo define la configuración global de Axios.
*/

import AppConfig from '../config';
import { WebSocketService } from './socketConfig';
import LogService from '../JS/LogService.js'; // Importamos LogService

const wsService = new WebSocketService(AppConfig);

const initHttpClientConfig = async () => {
  try {
    LogService.info('[HttpClientConfig] Iniciando configuración de HttpClient...');
    
    const baseURL = await wsService.getApiEndpoint();
    LogService.info('[HttpClientConfig] BaseURL obtenido:', baseURL);

    const config = {
      baseURL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    };

    LogService.info('[HttpClientConfig] Configuración de HttpClient completada.');
    return config;
  } catch (error) {
    LogService.error('[HttpClientConfig] Error al inicializar HttpClientConfig:', error.message);
    LogService.debug('Detalles del error:', error);
    throw new Error('Error al inicializar la configuración de HttpClient.');
  }
};

export default initHttpClientConfig;
