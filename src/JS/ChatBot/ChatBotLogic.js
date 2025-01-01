/*
Path: src/JS/ChatBot/ChatBotLogic.js
Este archivo contiene la lógica de la aplicación de chat de MadyBot.
*/

import ChatService from './ChatService.js';
import emitter from './eventBus.js';
import LogService from '../LogService.js'; // Importamos LogService

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
      LogService.info("[INFO] Iniciando proceso de envío de mensaje...");
      this.lastSentMessage = this.userMessage;
      const currentTime = new Date().toLocaleTimeString('es-ES', { hour12: false });

      // Añadimos el mensaje del usuario a la lista
      this.messages.push({
        text: this.lastSentMessage,
        type: 'user',
        time: currentTime
      });

      // Borramos el campo de entrada
      this.userMessage = '';

      try {
        // Llamamos a ChatService para procesar la respuesta del bot
        const responseMessage = await ChatService.sendUserMessage(
          this.lastSentMessage,
          currentTime
        );

        // Añadimos la respuesta del bot al arreglo de mensajes
        this.messages.push({
          text: responseMessage,
          type: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour12: false })
        });

        LogService.info("Mensaje enviado correctamente.");
        
        // Notificamos que el mensaje se ha enviado correctamente
        emitter.emit('messageSent');
      } catch (error) {
        LogService.error("[ERROR MadyBot_Vue] Error al enviar el mensaje:", error.message);
        LogService.debug("Detalles del error:", error);

        // Agregamos un mensaje de error a la conversación
        this.messages.push({
          text: "Actualmente estamos experimentando problemas de conexión con el servidor. Por favor, intente nuevamente más tarde o contacte al soporte si el problema persiste.",
          type: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour12: false })
        });

        this.errorMessage = error.message;

        // Emitimos el evento de error
        emitter.emit('errorOccurred', this.errorMessage);
      }
    }
  }
};
