/*
Path: src/JS/NetworkCheck/index.js

*/

import { getGlobalEndpoint, setGlobalEndpoint } from '../../config/HttpClientConfig.js';
import MessageService from '../ChatBot/MessageService';
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
   * Verifica la conexión con el backend realizando una solicitud POST.
   * @returns {Promise<boolean|Object>} Retorna true en caso de éxito, false en caso de fallo, o un objeto de error.
   */
  async checkBackendConnection() {
    logger.info('[NetworkService] Iniciando verificación de conexión con el backend');

    try {
      const url = `${this.baseUrl}${this.endpoint}`;
      logger.debug('[NetworkService] URL completa para la verificación:', url);

      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this._getRequestPayload()),
      });

      if (response.ok) {
        // Ajuste tras la validación exitosa
        setGlobalEndpoint(this.baseUrl);
        logger.info('[NetworkService] Conexión exitosa con el backend');

        await MessageService.sendBotMessage('Hola!');
        return true;
      } else {
        logger.warn('[NetworkService] Conexión fallida con el backend. Código de estado:', response.status);
        return false;
      }
    } catch (error) {
      logger.error('[NetworkService] Error durante la verificación de conexión:', error.message);
      return { error: true, message: error.message };
    }
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
}
