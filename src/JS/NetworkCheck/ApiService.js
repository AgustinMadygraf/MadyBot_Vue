/*
Path: src/JS/NetworkCheck/ApiService.js
El servicio ApiService se encarga de enviar mensajes a la API de MadyBot.
*/

import axios from 'axios';
import MarkdownService from './MarkdownService';
import AppConfig from '../../config/index.js';
import logger from '../LogService';

class ApiService {
  constructor(baseUrl) {
    logger.debug('Initializing ApiService with baseUrl:', baseUrl);
    this.baseUrl = baseUrl;
    this.endpoint = '/receive-data';

    // Configuración global de Axios
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Content-Type': 'application/json' },
    });

    // Interceptor para manejo de errores de red
    this.httpClient.interceptors.response.use(
      response => response,
      error => this._handleNetworkError(error)
    );
  }

  async sendApiMessage(prompt_user, user_data, stream = false, datetime = null) {
    logger.debug('Sending API message:', { prompt_user, user_data, stream, datetime });
    try {
      const url = this.endpoint;
      const response = await this.httpClient.post(url, {
        prompt_user,
        stream,
        datetime: datetime || this._getCurrentTimestamp(),
        user_data,
      });
      logger.info('Message sent successfully');
      return this._processApiResponse(response.data);
    } catch (error) {
      logger.error('Failed to send message:', error);
      throw error;
    }
  }

  _processApiResponse(data) {
    try {
      const htmlResponse = data.response_MadyBot
        ? MarkdownService.convertToHtml(data.response_MadyBot)
        : null;
      const htmlResponseStream = data.response_MadyBot_stream
        ? MarkdownService.convertToHtml(data.response_MadyBot_stream)
        : null;

      console.log('[INFO] Respuesta convertida a HTML:', { htmlResponse, htmlResponseStream });
      return { normal: htmlResponse, stream: htmlResponseStream };
    } catch (conversionError) {
      console.error('[ERROR API] Error al convertir la respuesta a HTML:', conversionError);
      throw new Error('Error en la conversión a HTML en ApiService: ' + conversionError.message);
    }
  }

  _handleNetworkError(error) {
    if (error.message === 'Network Error') {
      console.error('[ERROR API] Network Error: El backend no está disponible.');
      return Promise.reject(
        new Error('El servidor no está disponible. Por favor, intente más tarde.')
      );
    }
    return Promise.reject(error);
  }

  _getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
  }
}

// Exporta una instancia preconfigurada de ApiService
console.log('[INFO] Valor de AppConfig:', AppConfig);
console.log('[INFO] Valor de AppConfig.BASE_URL:', AppConfig.API_ENDPOINT);
const apiServiceInstance = new ApiService(AppConfig.API_ENDPOINT);
export default apiServiceInstance;
