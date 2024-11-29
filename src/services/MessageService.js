/*
Path: src/services/MessageService.js
El servicio MessageService se encarga de enviar mensajes al servicio ApiService.
*/

import ApiService from './ApiService';
import IdGenerationService from './IdGenerationService';

class MessageService {
  constructor() {
    this.userId = IdGenerationService.generateUserId();
  }

  async sendBotMessage(userMessage) {
    console.log("[INFO] Iniciando el envío del mensaje:", userMessage);

    try {
      const datetime = Math.floor(Date.now() / 1000);
      console.log("[INFO] Fecha y hora actual:", datetime);
      const stream = process.env.VUE_APP_STREAM === 'true';
      console.log("[INFO] Stream:", stream);
      const response_diccionario = await ApiService.sendApiMessage(userMessage, this.userId, stream, datetime);
      const response = response_diccionario["normal"];
      console.log("[INFO] Mensaje enviado exitosamente:", response);
      return response;
    } catch (error) {
      console.error("[ERROR MessageService] Error al enviar el mensaje:", error.message);
      throw new Error("Hubo un problema al enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      console.log("[INFO] Operación de envío de mensaje finalizada.");
    }
  }
}

export default new MessageService();