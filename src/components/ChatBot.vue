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
/* 
  Importamos el componente base que ya integra la lógica de ChatBotLogic.js.
  Ajusta la ruta según la estructura de tu proyecto.
*/
import ChatBotComponent from '../JS/ChatBot/index.js';

/*
  Importamos nuestro Event Bus basado en mitt.
  Ajusta la ruta a donde creaste tu `eventBus.js`.
*/
import emitter from '../JS/ChatBot/eventBus.js';

export default {
  extends: ChatBotComponent,

  created() {
    /*
      Reemplazamos this.$on() por emitter.on().
      Aquí escuchamos eventos emitidos desde ChatBotLogic.js.
    */
    emitter.on('messageSent', () => {
      this.scrollToBottom();
    });

    emitter.on('errorOccurred', (errorMsg) => {
      console.error("Error en ChatBot:", errorMsg);
      // Si quieres mostrar el error en pantalla, podrías
      // setear una variable local y usarla en el template o un alert.
      this.scrollToBottom();
    });
  },

  methods: {
    async SendHandleMessage() {
      /*
        Llamamos al método de negocio `sendChatMessage()`.
        Como la lógica de negocio emitirá eventos en caso de éxito o error,
        no es necesario forzar la UI aquí, pero podrías hacer un scroll 
        inmediato si así lo deseas.
      */
      await this.sendChatMessage();
      // Por ejemplo, si deseas forzar el scroll cada vez que envíes el mensaje:
      // this.scrollToBottom();
    },

    /*
      Método que se encarga de desplazar el scroll hasta el final del contenedor
      cuando sea necesario. Sólo pertenece a la UI, no a la lógica de negocio.
    */
    scrollToBottom() {
      const container = this.$refs.messageContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  },

  watch: {
    /*
      Cada vez que cambie la lista de mensajes, nos aseguramos de que el
      scroll muestre el último mensaje. Esto es opcional, 
      dependiendo de tu preferencia.
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
