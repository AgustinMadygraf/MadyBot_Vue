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
          :class="{'message-received': message.type === 'bot', 'message-sent': message.type === 'user'}"
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
  // Extendemos la configuración original
  extends: ChatBotComponent,

  methods: {
    async SendHandleMessage() {
      // Llamamos al método de negocio (definido en ChatBotLogic.js)
      await this.sendChatMessage();
      // Nos encargamos del scroll en la vista
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

  // Cada vez que cambie la lista de mensajes, desplazamos la vista
  watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    }
  }
};
</script>

<style src="../assets/style.css"></style>
