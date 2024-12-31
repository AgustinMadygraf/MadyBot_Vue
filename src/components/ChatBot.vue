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
import emitter from '../JS/ChatBot/eventBus.js';  // Ajustar la ruta si difiere en tu proyecto

export default {
  /*
    Extiende la configuración de ChatBotComponent, que a su vez
    incorpora la lógica de ChatBotLogic.js.
  */
  extends: ChatBotComponent,

  created() {
    // Escuchamos los eventos emitidos desde la lógica de negocio (ChatBotLogic.js)
    emitter.on('messageSent', () => {
      this.scrollToBottom();
    });

    emitter.on('errorOccurred', (errorMsg) => {
      console.error("Error en ChatBot:", errorMsg);
      // Podrías, por ejemplo, mostrar un modal o un alert con el error
      this.scrollToBottom();
    });
  },

  methods: {
    async SendHandleMessage() {
      // Llamamos a la lógica de enviar mensajes
      await this.sendChatMessage();
    },

    // Método para desplazar el scroll hasta el final de la ventana de chat
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  },

  watch: {
    /*
      Cada vez que se actualiza la lista de mensajes (ya sea por envío
      del usuario o respuesta del bot), forzamos el scroll para ver el último.
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
