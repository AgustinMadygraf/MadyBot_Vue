/*
Path: src/JS/NetworkCheck/index.js
*/

import { getGlobalEndpoint } from './UrlConfig.js';
import { checkBackendConnection } from './ConnectionChecker.js';
import { checkPhpEndpointHealth } from './PhpHealthChecker.js';
import { getApiEndpoint } from './ApiEndpointProvider.js';
import { initializeHttpClientConfig } from './HttpClientInitializer.js';
import AppConfig from '../../config';
import logger from '../LogService';

/**
 * Servicio encargado de verificar la conexión con el backend y gestionar la URL global.
 */
export class NetworkService {
  /**
   * @param {string} [baseUrl] - URL base del servidor a verificar.
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl || getGlobalEndpoint() || AppConfig.API_ENDPOINT;
    this.endpoint = '/receive-data';
    logger.debug('[NetworkService] Servicio iniciado con configuración:', {
      baseUrl: this.baseUrl,
      endpoint: this.endpoint,
    });
  }

  /**
   * Genera el payload de la solicitud para la verificación de conexión.
   * @private
   * @returns {Object} - Objeto con los datos a enviar en la solicitud.
   */
  _getRequestPayload() {
    const payload = {
      prompt_user: 'Probando conexión con el backend',
      user_data: {
        id: '12345',
        browserData: {
          userAgent: navigator.userAgent,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          platform: navigator.platform,
        },
      },
      stream: false,
    };

    logger.debug('[NetworkService] Payload generado para la solicitud:', payload);
    return payload;
  }

  /**
   * Método coordinador que gestiona la secuencia de inicialización de la conexión.
   * @returns {Promise<boolean>} Retorna true si la inicialización es exitosa, de lo contrario, false.
   */
  async initializeConnection() {
    try {
      logger.info('[NetworkService] Iniciando proceso de inicialización de conexión...');
      const baseURL = await getApiEndpoint();
      this.baseUrl = baseURL;
      logger.debug('[NetworkService] API_ENDPOINT establecido a:', this.baseUrl);

      const phpHealthy = await checkPhpEndpointHealth();
      if (!phpHealthy) {
        logger.warn('[NetworkService] PHP_ENDPOINT no está saludable durante la inicialización.');
      }

      const backendConnected = await checkBackendConnection(this.baseUrl, this.endpoint, this._getRequestPayload.bind(this));
      if (backendConnected === true) {
        logger.info('[NetworkService] Inicialización de conexión completada con éxito.');
        return true;
      } else if (backendConnected === false) {
        logger.warn('[NetworkService] Inicialización de conexión completada con fallos.');
        return false;
      } else {
        logger.error('[NetworkService] Error durante la inicialización de conexión:', backendConnected.message);
        return false;
      }
    } catch (error) {
      logger.error('[NetworkService] Error durante la inicialización de conexión:', error.message);
      return false;
    }
  }

  /**
   * Inicializa la configuración del cliente HTTP.
   * @returns {Promise<Object>} Configuración para el cliente HTTP.
   */
  async initializeHttpClientConfig() {
    return await initializeHttpClientConfig();
  }
}

/**
 * Inicializa la configuración del cliente HTTP.
 * @returns {Promise<Object>} Configuración para el cliente HTTP.
 */
const initHttpClientConfig = async () => {
  const networkService = new NetworkService();
  return await networkService.initializeHttpClientConfig();
};

export default initHttpClientConfig;