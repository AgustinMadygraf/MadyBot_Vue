/*
Path: src/JS/ChatBot/ChatBotLogic.js
Este archivo contiene la lógica de la aplicación de chat de MadyBot.
*/

import ChatService from './ChatService.js';
import emitter from './eventBus.js';

export default {
  data() {
    return {
      userMessage: '',
      messages: [],
      lastSentMessage: '',
      errorMessage: ''
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
      this.userMessage = '';

      try {
        const responseMessage = await ChatService.sendUserMessage(
          this.lastSentMessage,
          currentTime
        );
        this.messages.push({
          text: responseMessage,
          type: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour12: false })
        });

        // Emitimos un evento mediante mitt
        emitter.emit('messageSent');

      } catch (error) {
        console.error("[ERROR MadyBot_Vue] Error al enviar el mensaje:", error.message);

        this.messages.push({
          text: "Actualmente estamos experimentando problemas de conexión con el servidor. Por favor, intente nuevamente más tarde o contacte al soporte si el problema persiste.",
          type: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour12: false })
        });

        this.errorMessage = error.message;

        // Emitimos un evento de error mediante mitt
        emitter.emit('errorOccurred', this.errorMessage);
      }
    }
  }
};
