/*
Path: src/JS/ChatBot/ChatBotLogic.js
Este archivo contiene la lógica de la aplicación de chat de MadyBot.
*/

import ChatService from './ChatService.js';

export default {
  data() {
    return {
      userMessage: '',
      messages: [],
      lastSentMessage: ''
    };
  },
  methods: {
    async sendChatMessage() {
      console.log("[INFO] Iniciando proceso de envío de mensaje...");
      this.lastSentMessage = this.userMessage;
      const currentTime = new Date().toLocaleTimeString('es-ES', { hour12: false });

      // Agregamos el mensaje del usuario a la lista
      this.messages.push({
        text: this.lastSentMessage,
        type: 'user',
        time: currentTime
      });

      // Limpiamos el input
      this.userMessage = '';

      try {
        // Petición al servicio de chat
        const responseMessage = await ChatService.sendUserMessage(this.lastSentMessage, currentTime);

        // Agregamos la respuesta del bot a la lista de mensajes
        this.messages.push({
          text: responseMessage,
          type: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour12: false })
        });

      } catch (error) {
        console.error("[ERROR MadyBot_Vue] Error al enviar el mensaje:", error.message);

        // Si hay un error, mostramos mensaje de fallo
        this.messages.push({
          text: "Actualmente estamos experimentando problemas de conexión con el servidor. Por favor, intente nuevamente más tarde o contacte al soporte si el problema persiste.",
          type: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour12: false })
        });
      }
    }
  }
};
