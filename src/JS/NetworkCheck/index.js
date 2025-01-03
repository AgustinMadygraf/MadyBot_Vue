/*
Path: src/JS/NetworkCheck/index.js

*/

import { getGlobalEndpoint } from '../../config/HttpClientConfig.js';
import MessageService from '../ChatBot/MessageService';
import AppConfig from '../../config';
import logger from '../LogService';

export class NetworkService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || getGlobalEndpoint() || AppConfig.API_ENDPOINT;
    this.endpoint = '/receive-data';

    logger.debug('[NetworkService] Servicio iniciado con configuración:', {
      baseUrl: this.baseUrl,
      endpoint: this.endpoint,
    });
  }

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
