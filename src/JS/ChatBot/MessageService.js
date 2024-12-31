/*
Path: src/JS/ChatBot/MessageService.js
El servicio MessageService se encarga de enviar mensajes al servicio ApiService.
*/

import ApiService from '../NetworkCheck/ApiService';
import IdGenerationService from '../NetworkCheck/IdGenerationService';
import AppConfig from '../../config';

class MessageService {
  constructor(apiService, idService, options = {}) {
    this.apiService = apiService || ApiService;
    this.idService = idService || IdGenerationService;
    this.userId = this.idService.generateUserId();
    this.defaultOptions = {
      stream: AppConfig.STREAM_ENABLED,
      ...options,
    };
  console.log('[DEBUG] Valor API_ENDPOINT desde config.json:', AppConfig.API_ENDPOINT);
  }

  async sendBotMessage(userMessage, options = {}) {
    console.log('[INFO] Iniciando el envío del mensaje:', userMessage);

    try {
      const datetime = this._getCurrentTimestamp();
      console.log('[INFO] Fecha y hora actual:', datetime);

      const mergedOptions = {
        ...this.defaultOptions,
        ...options,
      };

      console.log('[INFO] Opciones utilizadas:', mergedOptions);

      const responseDict = await this.apiService.sendApiMessage(
        userMessage,
        this.userId,
        mergedOptions.stream,
        datetime
      );

      const response = responseDict['normal'];
      console.log('[INFO] Mensaje enviado exitosamente:', response);
      return response;
    } catch (error) {
      console.error('[ERROR MessageService] Error al enviar el mensaje:', error.message);
      throw new Error('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      console.log('[INFO] Operación de envío de mensaje finalizada.');
    }
  }

  _getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
  }
}

export default new MessageService(ApiService, IdGenerationService);
