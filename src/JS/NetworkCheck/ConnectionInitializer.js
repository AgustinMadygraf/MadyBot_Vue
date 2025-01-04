/*
Path: src/JS/NetworkCheck/ConnectionInitializer.js
*/

import { getApiEndpoint } from './ApiEndpointProvider.js';
import { checkPhpEndpointHealth } from './PhpHealthChecker.js';
import { checkBackendConnection } from './ConnectionChecker.js';
import logger from '../LogService';

/**
 * Método coordinador que gestiona la secuencia de inicialización de la conexión.
 * @param {Function} getRequestPayload - Función para obtener el payload de la solicitud.
 * @returns {Promise<boolean>} Retorna true si la inicialización es exitosa, de lo contrario, false.
 */
export async function initializeConnection(getRequestPayload) {
  try {
    logger.info('[ConnectionInitializer] Iniciando proceso de inicialización de conexión...');
    const baseURL = await getApiEndpoint();
    logger.debug('[ConnectionInitializer] API_ENDPOINT establecido a:', baseURL);

    const phpHealthy = await checkPhpEndpointHealth();
    if (!phpHealthy) {
      logger.warn('[ConnectionInitializer] PHP_ENDPOINT no está saludable durante la inicialización.');
    }

    const backendConnected = await checkBackendConnection(baseURL, '/receive-data', getRequestPayload);
    if (backendConnected === true) {
      logger.info('[ConnectionInitializer] Inicialización de conexión completada con éxito.');
      return true;
    } else if (backendConnected === false) {
      logger.warn('[ConnectionInitializer] Inicialización de conexión completada con fallos.');
      return false;
    } else {
      logger.error('[ConnectionInitializer] Error durante la inicialización de conexión:', backendConnected.message);
      return false;
    }
  } catch (error) {
    logger.error('[ConnectionInitializer] Error durante la inicialización de conexión:', error.message);
    return false;
  }
}