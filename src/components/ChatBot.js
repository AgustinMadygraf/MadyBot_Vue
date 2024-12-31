/*
Path: ChatBot.js
Este archivo contiene la lógica de la aplicación de chat de MadyBot con soporte para Socket.IO.
*/

import MadyBot_VueScript from './MadyBot_Vue.js';
import './MadyBot_Vue.css';
import io from 'socket.io-client';

export default {
  data() {
    const scriptData = MadyBot_VueScript.data();
    return {
      ...scriptData,
      messages: [],
      isStreamerMode: process.env.VUE_APP_STREAM === 'true',
      socket: null, // Instancia del socket
    };
  },
  methods: {
    ...MadyBot_VueScript.methods,

    /**
     * Envía un mensaje del usuario y lo transmite al servidor.
     */
    async SendHandleMessage() {
      if (!this.userMessage) return;

      const currentTime = new Date().toLocaleTimeString('es-ES', { hour12: false });
      this.messages.push({ text: this.userMessage, type: 'user', time: currentTime });

      try {
        console.log('Enviando mensaje desde ChatBot:', this.userMessage);

        // Envía el mensaje al servidor a través del socket
        this.socket.emit('userMessage', { text: this.userMessage, time: currentTime });

        // Limpia el campo de entrada
        this.userMessage = '';
      } catch (error) {
        console.error('[ERROR ChatBot] Error al enviar el mensaje:', error.message);
      }
    },

    /**
     * Maneja la recepción de un mensaje del bot desde el servidor.
     * @param {Object} message - Mensaje recibido del bot.
     */
    handleBotMessage(message) {
      console.log('[INFO ChatBot] Mensaje recibido del bot:', message);
      this.messages.push({ text: message.text, type: 'bot', time: message.time });
    },
  },
  async created() {
    try {
      // Establece la conexión con el servidor Socket.IO
      this.socket = io(process.env.VUE_APP_SOCKET_URL);

      // Escucha mensajes del bot
      this.socket.on('botMessage', this.handleBotMessage);

      // Enviar mensaje de bienvenida
      this.socket.emit('userMessage', { text: 'Hola!' });
    } catch (error) {
      console.error('[ERROR ChatBot] Error al inicializar el socket:', error.message);
    }
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('[INFO ChatBot] Socket desconectado.');
    }
  },
};
