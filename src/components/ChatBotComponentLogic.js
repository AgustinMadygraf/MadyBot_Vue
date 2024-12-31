/*
Path: ChatBotComponentLogic.js
Este archivo contiene la lógica de la aplicación de chat de MadyBot.
*/

import MadyBot_VueScript from './ChatBotLogic.js';
import '../assets/style.css';
import MessageService from '../services/MessageService.js';

export default {
  data() {
    const scriptData = MadyBot_VueScript.data();
    return {
      ...scriptData,
      messages: [],
      isStreamerMode: process.env.VUE_APP_STREAM === 'true'
    };
  },
  methods: {
    ...MadyBot_VueScript.methods,
    async SendHandleMessage() {
      console.log('Sending message from MadyBot_VueComponent:', this.userMessage);
      await MadyBot_VueScript.methods.sendChatMessage.call(this);
    }
  },
  async created() {
    try {
      const welcomeMessage = await MessageService.sendBotMessage("Hola!");
      this.messages.push({ text: welcomeMessage, type: 'bot', time: new Date().toLocaleTimeString('es-ES', { hour12: false }) });
    } catch (error) {
      console.error("[ERROR MadyBot_VueComponent] Error al enviar el mensaje de bienvenida:", error.message);
    }
  }
};
