/*
Path: src/JS/ChatBot/index.js
Este archivo contiene la lógica de la aplicación de chat de MadyBot.
*/

import ChatBotLogicScript from './ChatBotLogic.js';
import MessageService from './MessageService.js';

export default {
  data() {
    const scriptData = ChatBotLogicScript.data();
    return {
      ...scriptData,
      messages: [],
      isStreamerMode: process.env.VUE_APP_STREAM === 'false'
    };
  },
  methods: {
    ...ChatBotLogicScript.methods,
    async SendHandleMessage() {
      console.log('Sending message from ChatBotComponent:', this.userMessage);
      await ChatBotLogicScript.methods.sendChatMessage.call(this);
    }
  },
  async created() {
    try {
      const welcomeMessage = await MessageService.sendBotMessage("Hola!");
      this.messages.push({ text: welcomeMessage, type: 'bot', time: new Date().toLocaleTimeString('es-ES', { hour12: false }) });
    } catch (error) {
      console.error("[ERROR ChatBotComponent] Error al enviar el mensaje de bienvenida:", error.message);
    }
  }
};
