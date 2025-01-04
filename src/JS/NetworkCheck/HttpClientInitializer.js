/*
Path: src/JS/NetworkCheck/HttpClientInitializer.js
*/

import { getApiEndpoint } from './ApiEndpointProvider.js';
import logger from '../LogService';

/**
 * Inicializa la configuración del cliente HTTP utilizando el API_ENDPOINT obtenido.
 * @returns {Promise<Object>} Configuración para el cliente HTTP.
 */
export async function initializeHttpClientConfig() {
  try {
    const baseURL = await getApiEndpoint();
    return {
      baseURL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 50,
    };
  } catch (error) {
    logger.error('[HttpClientInitializer] Error al inicializar la configuración del cliente HTTP:', error.message);
    throw error;
  }
}