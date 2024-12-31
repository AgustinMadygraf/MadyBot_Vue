<!--
Path: src/components/NetworkCheck.vue
Este componente se encarga de verificar la conexión a internet del usuario. 
Si no hay conexión, se muestra un mensaje de error.
-->

<template>
  <div v-if="!isConnected" class="network-error">
    <p>No hay conexión con el servidor.</p>
  </div>
</template>

<script>
import { NetworkService } from '../utils/network.js';

export default {
  data() {
    return {
      isConnected: true,
      networkService: null,
    };
  },
  created() {
    this.networkService = new NetworkService();
    this.checkConnection();
  },
  methods: {
    async checkConnection() {
      this.isConnected = await this.networkService.checkBackendConnection();
    },
  },
};
</script>
