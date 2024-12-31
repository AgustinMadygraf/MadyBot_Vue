/*
Path: src/components/ChatBotLogic.js
Este archivo contiene la lógica de la aplicación de chat de MadyBot.
*/

import ChatService from '../services/ChatService';

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
      console.log("[INFO] Mensaje almacenado:", this.lastSentMessage);
      const currentTime = new Date().toLocaleTimeString('es-ES', { hour12: false });
      console.log("[INFO] Hora actual:", currentTime);
      this.messages.push({ text: this.lastSentMessage, type: 'user', time: currentTime });
      console.log("[INFO] Mensajes después de añadir el mensaje del usuario:", this.messages);
      this.$nextTick(() => {
        const messageContainer = this.$refs.messageContainer;
        if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        }
      });
      this.userMessage = '';
      try {
        const responseMessage = await ChatService.sendUserMessage(this.lastSentMessage, currentTime);
        this.messages.push({ text: responseMessage, type: 'bot', time: new Date().toLocaleTimeString('es-ES', { hour12: false }) });
        console.log("[INFO] Mensajes después de añadir la respuesta del bot:", this.messages);
        this.$forceUpdate();
        this.$nextTick(() => {
          const messageContainer = this.$refs.messageContainer;
          if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
          }
        });
      } catch (error) {
        console.error("[ERROR MadyBot_Vue] Error al enviar el mensaje:", error.message);
        this.messages.push({
          text: "Actualmente estamos experimentando problemas de conexión con el servidor. Por favor, intente nuevamente más tarde o contacte al soporte si el problema persiste.",
          type: 'bot',
          time: new Date().toLocaleTimeString('es-ES', { hour12: false })
        });
        this.$forceUpdate();
        this.$nextTick(() => {
          const messageContainer = this.$refs.messageContainer;
          if (messageContainer) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
          }
        });
      }
    }
  }
};