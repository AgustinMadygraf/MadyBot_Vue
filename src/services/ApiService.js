/*
Path: src/services/ApiService.js
El servicio ApiService se encarga de enviar mensajes a la API de MadyBot.
*/

import axios from 'axios';
import MarkdownService from './MarkdownService';

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || process.env.VUE_APP_URL_BACK;
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
    console.log('[INFO] Iniciando envío de mensaje a la API...');
    console.log('[INFO] Datos enviados:', { prompt_user, user_data, stream, datetime });

    try {
      const url = this.endpoint;
      console.log('[INFO] URL de la API:', url);

      const response = await this.httpClient.post(url, {
        prompt_user,
        stream,
        datetime: datetime || this._getCurrentTimestamp(),
        user_data,
      });

      console.log('[INFO] Respuesta recibida de la API:', response.data);
      return this._processApiResponse(response.data);
    } catch (apiError) {
      console.error('[ERROR API] Error al enviar el mensaje a la API:', apiError.message);
      throw new Error('Error en la solicitud a la API en ApiService: ' + apiError.message);
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
const apiServiceInstance = new ApiService(process.env.VUE_APP_URL_BACK);
export default apiServiceInstance;
