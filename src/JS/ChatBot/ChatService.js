/*
Path: src/JS/ChatBot/ChatService.js
Clase responsable de la lógica de envío de mensajes.
*/

import MessageService from './MessageService.js';

class ChatService {
  async sendUserMessage(userMessage, currentTime) {
    try {
      console.log("Enviando mensaje del usuario:", userMessage);
      console.log("Hora del mensaje del usuario:", currentTime);

      // Llamamos al servicio que interactúa con la API real
      const responseMessage = await MessageService.sendBotMessage(userMessage);
      console.log("Respuesta del bot:", responseMessage);

      // Podrías guardar historial de mensajes en un backend, si lo deseas
      return responseMessage;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Ejemplo de método para obtener mensajes desde un backend, si fuera necesario
  async getMessages() {
    // Implementación opcional
    return [];
  }
}

export default new ChatService();
