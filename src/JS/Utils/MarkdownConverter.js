/*
Path: src/JS/Utils/MarkdownConverter.js
Este servicio se encarga de convertir texto Markdown a HTML.
*/

import { marked } from 'marked';

class MarkdownConverter {
  static convertToHtml(markdown) {
    if (typeof markdown !== 'string' || markdown.trim() === '') {
      throw new Error('El texto proporcionado no es válido para convertir a HTML.');
    }
    return marked(markdown);
  }
}

export default MarkdownConverter;
