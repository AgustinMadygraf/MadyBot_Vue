/*
Path: MadyBot_VueComponent.js
Este archivo contiene la lógica de la aplicación de chat de MadyBot.
*/

import MadyBot_VueScript from './MadyBot_Vue.js';
import './MadyBot_Vue.css';

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
  created() {
    // Añade un mensaje de bienvenida cuando el componente se crea
    this.messages.push({
      text: '¡Bienvenido al chat de MadyBot!',
      type: 'bot',
      time: new Date().toLocaleTimeString('es-ES', { hour12: false }) // Formato de 24 horas
    });
  }
};
