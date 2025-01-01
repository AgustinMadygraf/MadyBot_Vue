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
    logger.debug('[ApiService] Initializing with baseUrl:', baseUrl);
    this.baseUrl = baseUrl;
    this.endpoint = '/receive-data';

    // Configuración global de Axios
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000, // Tiempo de espera en milisegundos
    });

    // Interceptor para manejo de errores de red
    this.httpClient.interceptors.response.use(
      response => response,
      error => this._handleNetworkError(error)
    );
  }

  async sendApiMessage(prompt_user, user_data, stream = false, datetime = null) {
    logger.debug('[ApiService] Sending API message', { prompt_user, user_data, stream, datetime });
    try {
      const response = await this.httpClient.post(this.endpoint, {
        prompt_user,
        stream,
        datetime: datetime || this._getCurrentTimestamp(),
        user_data,
      });
      logger.info('[ApiService] Message sent successfully');
      return this._processApiResponse(response.data);
    } catch (error) {
      logger.error('[ApiService] Failed to send message:', error.message);
      throw new Error(`Error al enviar mensaje a la API: ${error.message}`);
    }
  }

  async checkServerHealth() {
    logger.debug('[ApiService] Checking server health');
    try {
      const response = await this.httpClient.get('/health-check');
      logger.info('[ApiService] Server health:', response.status);
      return response.status === 200;
    } catch (error) {
      logger.warn('[ApiService] Server health check failed:', error.message);
      return false;
    }
  }

  _processApiResponse(data) {
    try {
      return {
        normal: this._convertToHtml(data.response_MadyBot),
        stream: this._convertToHtml(data.response_MadyBot_stream),
      };
    } catch (conversionError) {
      logger.error('[ApiService] Error converting response to HTML:', conversionError.message);
      throw new Error('Error al procesar la respuesta de la API.');
    }
  }

  _convertToHtml(markdown) {
    if (!markdown) {
      logger.warn('[ApiService] Markdown data is empty or invalid');
      return null;
    }
    return MarkdownService.convertToHtml(markdown);
  }

  _handleNetworkError(error) {
    if (error.code === 'ECONNABORTED') {
      logger.error('[ApiService] Request timeout:', error.message);
      return Promise.reject(new Error('La solicitud tardó demasiado en responder.'));
    }
    if (error.message === 'Network Error') {
      logger.error('[ApiService] Network Error: Backend unavailable');
      return Promise.reject(
        new Error('El servidor no está disponible. Por favor, intente más tarde.')
      );
    }
    logger.error('[ApiService] HTTP error:', error.response?.status, error.message);
    return Promise.reject(error);
  }

  _getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
  }
}

// Exporta una instancia preconfigurada de ApiService
logger.debug('[ApiService] AppConfig values:', AppConfig);
const apiServiceInstance = new ApiService(AppConfig.API_ENDPOINT);
export default apiServiceInstance;
