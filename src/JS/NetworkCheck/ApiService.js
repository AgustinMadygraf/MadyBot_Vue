// src/JS/NetworkCheck/ApiService.js

import axios from 'axios';
import initHttpClientConfig from '../../config/HttpClientConfig';
import MarkdownConverter from '../Utils/MarkdownConverter';
import logger from '../LogService';

class ApiService {
  constructor() {
    this.httpClient = null;
    this.isInitialized = false;
    this.endpoint = '/receive-data';
  }

  // Método asíncrono para inicializar la instancia de axios con la configuración correcta
  async init() {
    if (!this.isInitialized) {
      logger.debug('[ApiService] Iniciando configuración HttpClient...');
      const config = await initHttpClientConfig();
      this.httpClient = axios.create(config);
      this.isInitialized = true;
      logger.info('[ApiService] HttpClient inicializado con baseURL:', config.baseURL);
    }
  }

  async sendApiMessage(prompt_user, user_data, stream = false, datetime = null) {
    // Aseguramos que la instancia de axios esté lista
    if (!this.isInitialized) {
      await this.init();
    }

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
    if (!this.isInitialized) {
      await this.init();
    }

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
const apiServiceInstance = new ApiService();
export default apiServiceInstance;
