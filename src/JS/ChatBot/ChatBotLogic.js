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
      lastSentMessage: '',
      errorMessage: '' // Ejemplo de variable adicional para gestionar errores
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

      // Limpiamos el campo de entrada
      this.userMessage = '';

      try {
        // Llamamos al servicio para obtener la respuesta del bot
        const responseMessage = await ChatService.sendUserMessage(
          this.lastSentMessage,
          currentTime
        );

        // Agregamos la respuesta del bot a la lista de mensajes
        this.messages.push({
          text: responseMessage,
          type: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour12: false })
        });

        // Emitimos un evento para notificar que hubo un cambio (si se desea)
        this.$emit('conversationUpdated');

      } catch (error) {
        console.error("[ERROR MadyBot_Vue] Error al enviar el mensaje:", error.message);

        // Añadimos mensaje de error a la conversación
        this.messages.push({
          text: "Actualmente estamos experimentando problemas de conexión con el servidor. Por favor, intente nuevamente más tarde o contacte al soporte si el problema persiste.",
          type: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour12: false })
        });

        this.errorMessage = error.message;

        // Emitimos un evento para que la vista reaccione al error
        this.$emit('conversationUpdated');
      }
    }
  }
};
