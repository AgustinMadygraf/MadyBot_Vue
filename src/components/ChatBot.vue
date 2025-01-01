<!--
Path: src/components/ChatBot.vue
Este componente es el encargado de mostrar el chatbot en la interfaz de usuario.
-->

<template>
  <div :class="{'streamer-mode': isStreamerMode}" class="container-fluid d-flex background-image">
    <img src="@/assets/left.jpg" class="iframe" alt="Left Image" />
    <div class="chatbot_card">
      <div class="card_header">
        <img
          src="../../src/assets/chatbot-icon.jpg"
          alt="Chatbot"
          class="chatbot_icon"
        />
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
import emitter from '../JS/ChatBot/eventBus.js';
import { EVENTS } from '../JS/ChatBot/constants.js';
import LogService from '../JS/LogService.js';

export default {
  extends: ChatBotComponent,

  created() {
    this.initializeEventListeners();
    LogService.info("[ChatBot] Componente creado e inicializado.");
  },

  methods: {
    initializeEventListeners() {
      emitter.on(EVENTS.MESSAGE_SENT, this.scrollToBottom);
      emitter.on(EVENTS.ERROR_OCCURRED, this.handleError);
      LogService.info("[ChatBot] Listeners de eventos inicializados.");
    },

    async handleMessage() {
      try {
        await this.sendChatMessage();
        LogService.info("[ChatBot] Mensaje enviado correctamente.");
      } catch (error) {
        LogService.error("[ChatBot] Error al enviar mensaje:", error.message);
        this.handleError(error.message);
      }
    },

    handleError(errorMsg) {
      LogService.error("[ChatBot] Error manejado:", errorMsg);
      this.scrollToBottom();
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
          LogService.debug("[ChatBot] Scroll ajustado al final del contenedor.");
        }
      });
    },
  },

  beforeUnmount() {
    emitter.off(EVENTS.MESSAGE_SENT, this.scrollToBottom);
    emitter.off(EVENTS.ERROR_OCCURRED, this.handleError);
    LogService.info("[ChatBot] Listeners de eventos eliminados antes de desmontar.");
  }
};
</script>

<style src="../assets/style.css"></style>
