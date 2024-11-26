/*
Path: src/services/MarkdownService.js
El servicio MarkdownService se encarga de convertir texto en formato Markdown a HTML.
*/

// Importación corregida
import { marked } from 'marked';  // Importa la función `marked` directamente

console.log("Valor de marked:", marked);  // Verifica el contenido de `marked`

class MarkdownService {
  static convertToHtml(markdownText) {
    try {
      // Llama a la función `marked` para convertir Markdown a HTML
      return marked(markdownText);
      // Si `marked.parse` es la función correcta, usa:
      // return marked.parse(markdownText);
    } catch (error) {
      console.error("Error en convertToHtml:", error);
      throw error;
    }
  }
}

export default MarkdownService;
