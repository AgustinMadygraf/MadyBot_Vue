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
      
      const responseMessage = await MessageService.sendBotMessage(userMessage);
      console.log("Respuesta del bot:", responseMessage);

      // Aquí puedes manejar el almacenamiento de mensajes si es necesario
      // Por ejemplo, podrías enviar los mensajes a un backend para almacenamiento

      return responseMessage;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Si necesitas obtener mensajes, podrías hacerlo desde el backend
  async getMessages() {
    // Implementa la lógica para obtener mensajes desde el backend si es necesario
    return [];
  }
}

export default new ChatService();