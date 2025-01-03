/*
Path: src/JS/NetworkCheck/MarkdownService.js
El servicio MarkdownService se encarga de convertir texto en formato Markdown a HTML.
*/

import { marked } from 'marked';
import logger from '../LogService';

class MarkdownService {
  constructor(options = {}) {
    // Configuración predeterminada para `marked`
    this.options = {
      gfm: true, // Habilita el soporte para GitHub Flavored Markdown
      breaks: true, // Habilita saltos de línea
      ...options, // Sobrescribe con opciones personalizadas
    };

    // Inicializa `marked` con las opciones configuradas
    marked.setOptions(this.options);
    logger.debug('[MarkdownService] Inicializado con opciones:', this.options);
  }

  /**
   * Convierte un texto en formato Markdown a HTML.
   * @param {string} markdownText - Texto en formato Markdown.
   * @returns {string} - Texto convertido a HTML.
   */
  convertToHtml(markdownText) {
    try {
      logger.debug('[MarkdownService] Iniciando conversión de Markdown a HTML');
      if (!this.isValidMarkdown(markdownText)) {
        logger.warn('[MarkdownService] El texto proporcionado no es válido:', markdownText);
        throw new Error('El texto proporcionado no es válido.');
      }

      // Llama a `marked` para convertir el texto Markdown a HTML
      const html = marked(markdownText);
      logger.info('[MarkdownService] Conversión exitosa.');
      return html;
    } catch (error) {
      logger.error('[MarkdownService] Error al convertir Markdown a HTML:', error.message);
      throw error;
    }
  }

  /**
   * Valida si un texto dado es Markdown válido.
   * @param {string} markdownText - Texto en formato Markdown.
   * @returns {boolean} - True si el texto es válido, False si no lo es.
   */
  isValidMarkdown(markdownText) {
    const isValid = typeof markdownText === 'string' && markdownText.trim().length > 0;
    if (!isValid) {
      logger.debug('[MarkdownService] Validación fallida para el texto:', markdownText);
    }
    return isValid;
  }
}

// Exporta una instancia del servicio con configuración predeterminada
const markdownServiceInstance = new MarkdownService();
export default markdownServiceInstance;
