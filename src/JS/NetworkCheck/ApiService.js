/*
Path: src/JS/NetworkCheck/ApiService.js

*/

import MarkdownConverter from '../Utils/MarkdownConverter';
import logger from '../LogService';
import AppConfig from '../../config';
import createHttpClient from './HttpClientFactory';
import IHttpClient from './interfaces/IHttpClient';

class ApiService {
  /**
   * Constructor de ApiService.
   * @param {IHttpClient} httpClient - Una instancia que implementa IHttpClient.
   */
  constructor(httpClient) {
    if (!(httpClient instanceof IHttpClient)) {
      throw new Error('El cliente HTTP debe implementar IHttpClient');
    }
    this.httpClient = httpClient;
    this.endpoint = `${AppConfig.API_ENDPOINT}/receive-data`;
    logger.debug('[ApiService] Instancia creada');
    logger.debug('[ApiService] Endpoint de la API:', this.endpoint);
  }

  async sendApiMessage(prompt_user, user_data, stream = false, datetime = null) {
    logger.debug('[ApiService] Enviando mensaje a API:', { prompt_user, user_data, stream, datetime });
    try {
      const response = await this.httpClient.post(this.endpoint, {
        prompt_user,
        stream,
        datetime: datetime || this._getCurrentTimestamp(),
        user_data,
      });
      logger.info('[ApiService] Mensaje enviado correctamente');
      return this._processApiResponse(response.data);
    } catch (error) {
      logger.error('[ApiService] Error al enviar el mensaje:', error.message);
      throw new Error(`Error al enviar mensaje a la API: ${error.message}`);
    }
  }

  async checkServerHealth() {
    logger.debug('[ApiService] Comprobando estado del servidor');
    try {
      const response = await this.httpClient.get('/health-check');
      logger.info('[ApiService] Estado del servidor (HTTP):', response.status);
      return response.status === 200;
    } catch (error) {
      logger.warn('[ApiService] Falló la verificación de salud del servidor:', error.message);
      return false;
    }
  }

  _processApiResponse(data) {
    try {
      const normal = data.response_MadyBot
        ? MarkdownConverter.convertToHtml(data.response_MadyBot)
        : null;
      const stream = data.response_MadyBot_stream
        ? MarkdownConverter.convertToHtml(data.response_MadyBot_stream)
        : null;
  
      return { normal, stream };
    } catch (conversionError) {
      logger.error('[ApiService] Error al convertir la respuesta a HTML:', conversionError.message);
      throw new Error('Error al procesar la respuesta de la API.');
    }
  }

  _getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
  }
}

// Exportamos una instancia de ApiService
const apiServiceInstance = new ApiService(createHttpClient());
export default apiServiceInstance;