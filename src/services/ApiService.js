/*
Path: src/services/ApiService.js
El servicio ApiService se encarga de enviar mensajes a la API de MadyBot.
*/

import axios from 'axios';
import MarkdownService from './MarkdownService';

// Configuración del interceptor de Axios
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Network Error') {
      console.error('[ERROR API] Network Error: El backend no está disponible.');
      return Promise.reject(new Error('El servidor no está disponible. Por favor, intente más tarde.'));
    }
    return Promise.reject(error);
  }
);

class ApiService {
  static async sendApiMessage(prompt_user, user_data, stream, datetime) {
    console.log("[INFO] Iniciando envío de mensaje a la API...");
    console.log("[INFO] Datos enviados:", { prompt_user, user_data, stream, datetime });
    try {
      const url_python = (process.env.VUE_APP_URL_BACK +'/receive-data');
      console.log("[INFO] URL de la API:", url_python);
      const response = await axios.post(url_python, {
        prompt_user,
        stream,
        datetime,
        user_data
      });
      console.log("[INFO] Respuesta recibida de la API:", response.data);
      return this.processApiResponse(response.data);
    } catch (apiError) {
      console.error("[ERROR API] Error al enviar el mensaje a la API:", apiError.message);
      throw new Error("Error en la solicitud a la API en ApiService: " + apiError.message);
    }
  }

  static processApiResponse(data) {
    try {
      const htmlResponse = data.response_MadyBot ? MarkdownService.convertToHtml(data.response_MadyBot) : null;
      const htmlResponse_stream = data.response_MadyBot_stream ? MarkdownService.convertToHtml(data.response_MadyBot_stream) : null;
      console.log("[INFO] Respuesta convertida a HTML:", { htmlResponse, htmlResponse_stream });
      return { normal: htmlResponse, stream: htmlResponse_stream };
    } catch (conversionError) {
      console.error("[ERROR API] Error al convertir la respuesta a HTML:", conversionError);
      throw new Error("Error en la conversión a HTML en ApiService: " + conversionError.message);
    }
  }
}

export default ApiService;
