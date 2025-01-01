/*
Path: src/JS/ChatBot/ChatService.js
Clase responsable de la lógica de envío de mensajes.
*/

import MessageService from './MessageService.js';
import LogService from '../LogService.js'; // Importamos LogService

class ChatService {
  async sendUserMessage(userMessage, currentTime) {
    try {
      LogService.info("Enviando mensaje del usuario:", userMessage);
      LogService.debug("Hora del mensaje del usuario:", currentTime);

      // Llamamos al servicio que interactúa con la API real
      const responseMessage = await MessageService.sendBotMessage(userMessage);
      LogService.info("Respuesta del bot obtenida correctamente.");
      LogService.debug("Respuesta del bot:", responseMessage);

      // Podrías guardar historial de mensajes en un backend, si lo deseas
      return responseMessage;
    } catch (error) {
      LogService.error("Error al enviar mensaje del usuario:", error.message);
      LogService.debug("Detalles del error:", error);
      throw new Error(error.message);
    }
  }

  // Ejemplo de método para obtener mensajes desde un backend, si fuera necesario
  async getMessages() {
    LogService.info("Obteniendo historial de mensajes desde el backend.");
    try {
      // Aquí podrías implementar la lógica para obtener mensajes
      const messages = []; // Simulación de respuesta
      LogService.debug("Mensajes obtenidos:", messages);
      return messages;
    } catch (error) {
      LogService.error("Error al obtener mensajes:", error.message);
      LogService.debug("Detalles del error al obtener mensajes:", error);
      throw new Error(error.message);
    }
  }
}

export default new ChatService();
