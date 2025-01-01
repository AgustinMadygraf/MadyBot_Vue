/*
Path: src/JS/ChatBot/MessageService.js
El servicio MessageService se encarga de enviar mensajes al servicio ApiService.
*/

import ApiService from '../NetworkCheck/ApiService';
import IdGenerationService from '../NetworkCheck/IdGenerationService';
import AppConfig from '../../config';
import logger from '../LogService';

class MessageService {
  constructor(apiService, idService, options = {}) {
    this.apiService = apiService || ApiService;
    this.idService = idService || IdGenerationService;
    this.userId = this.idService.generateUserId();
    this.defaultOptions = {
      stream: AppConfig.STREAM_ENABLED,
      ...options,
    };

    logger.debug('[MessageService] Instancia creada con configuración:', {
      apiEndpoint: AppConfig.API_ENDPOINT,
      defaultOptions: this.defaultOptions,
    });
  }

  async sendBotMessage(userMessage, options = {}) {
    logger.info('[MessageService] Iniciando envío de mensaje:', userMessage);

    try {
      const datetime = this._getCurrentTimestamp();
      logger.debug('[MessageService] Timestamp actual:', datetime);

      const mergedOptions = {
        ...this.defaultOptions,
        ...options,
      };

      logger.debug('[MessageService] Opciones utilizadas para la solicitud:', mergedOptions);

      const responseDict = await this.apiService.sendApiMessage(
        userMessage,
        this.userId,
        mergedOptions.stream,
        datetime
      );

      const response = responseDict['normal'];
      logger.info('[MessageService] Mensaje enviado exitosamente. Respuesta:', response);
      return response;
    } catch (error) {
      logger.error('[MessageService] Error al enviar el mensaje:', error.message);
      throw new Error('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      logger.info('[MessageService] Operación de envío de mensaje finalizada.');
    }
  }

  _getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
  }
}

export default new MessageService(ApiService, IdGenerationService);
