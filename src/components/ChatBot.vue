<!--
Path: src/components/ChatBot.vue
Este archivo es el componente Vue que se encarga de mostrar el chatbot en la interfaz de usuario.
-->

<template>
  <div :class="{'streamer-mode': isStreamerMode}" class="container-fluid d-flex background-image">
    <img src="@/assets/left.jpg" class="iframe" alt="Left Image" />
    <div class="chatbot_card">
      <div class="card_header">
        <img src="../../src/assets/chatbot-icon.jpg" alt="Chatbot" class="chatbot_icon" />
        <div>
          <h3>MadyBot</h3>
          <p class="status">en línea</p>
        </div>
      </div>
      <div class="card_body" ref="messageContainer">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="{
            'message-received': message.type === 'bot',
            'message-sent': message.type === 'user'
          }"
        >
          <div v-html="message.text"></div>
          <div class="message-time">{{ message.time }}</div>
        </div>
      </div>
      <div class="card_footer">
        <div class="input-group mb-2">
          <input
            v-model="userMessage"
            @keyup.enter="SendHandleMessage"
            placeholder="Mensaje"
            class="form-control"
          />
          <button
            @click="SendHandleMessage"
            :disabled="!userMessage"
            class="btn btn-primary"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBotComponent from '../JS/ChatBot/index.js';

export default {
  // Extiende el objeto exportado por ChatBotComponent,
  // que a su vez incluye ChatBotLogic.js
  extends: ChatBotComponent,

  methods: {
    async SendHandleMessage() {
      /*
        Llamamos al método de negocio `sendChatMessage`.
        Este método no manejará el scroll ni la referencia a `messageContainer`,
        sino que se limita a la lógica de envío y recepción.
      */
      await this.sendChatMessage();
      /*
        Luego de enviar el mensaje, si deseamos forzar
        la posición del scroll, llamamos a nuestro método local.
      */
      this.scrollToBottom();
    },

    // Método para desplazar el scroll hasta el final
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  },

  watch: {
    /*
      Cada vez que cambie la lista de mensajes,
      forzamos el scroll al final del contenedor.
      Así evitamos la necesidad de usar this.$refs en ChatBotLogic.js.
    */
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  }
};
</script>

<style src="../assets/style.css"></style>
