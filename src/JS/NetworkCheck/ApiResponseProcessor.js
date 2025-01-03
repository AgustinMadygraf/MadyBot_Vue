/*
Path: src/JS/NetworkCheck/ApiResponseProcessor.js

*/

import MarkdownConverter from '../Utils/MarkdownConverter';
import logger from '../LogService';

class ApiResponseProcessor {
  /**
   * Procesa la respuesta de la API.
   * @param {Object} data - Los datos de la respuesta de la API.
   * @returns {Object} - La respuesta procesada con formato HTML.
   */
  processApiResponse(data) {
    try {
      const normal = data.response_MadyBot
        ? MarkdownConverter.convertToHtml(data.response_MadyBot)
        : null;
      const stream = data.response_MadyBot_stream
        ? MarkdownConverter.convertToHtml(data.response_MadyBot_stream)
        : null;

      return { normal, stream };
    } catch (conversionError) {
      logger.error('[ApiResponseProcessor] Error al convertir la respuesta a HTML:', conversionError.message);
      throw new Error('Error al procesar la respuesta de la API.');
    }
  }
}

export default ApiResponseProcessor;