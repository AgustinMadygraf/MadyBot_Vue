/*
Path: src/JS/ChatBot/index.js
Este archivo contiene la lógica de la aplicación de chat de MadyBot.
*/

import ChatBotLogicScript from './ChatBotLogic.js';
import MessageService from './MessageService.js';
import LogService from '../LogService.js'; // Importamos LogService

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
      LogService.info('Enviando mensaje desde ChatBotComponent:', this.userMessage);
      try {
        await ChatBotLogicScript.methods.sendChatMessage.call(this);
        LogService.info('Mensaje enviado correctamente desde ChatBotComponent.');
      } catch (error) {
        LogService.error('[ERROR SendHandleMessage] Error al enviar mensaje:', error.message);
        LogService.debug('Detalles del error:', error);
      }
    }
  },
  async created() {
    try {
      const welcomeMessage = await MessageService.sendBotMessage("Hola!");
      this.messages.push({ 
        text: welcomeMessage, 
        type: 'bot', 
        time: new Date().toLocaleTimeString('es-ES', { hour12: false }) 
      });
      LogService.info('Mensaje de bienvenida enviado y agregado al historial de mensajes.');
    } catch (error) {
      LogService.error('[ERROR ChatBotComponent] Error al enviar el mensaje de bienvenida:', error.message);
      LogService.debug('Detalles del error en el mensaje de bienvenida:', error);
    }
  }
};
