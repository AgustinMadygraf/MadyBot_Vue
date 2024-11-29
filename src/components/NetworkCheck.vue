<!--
Path: src/components/NetworkCheck.vue
Este componente se encarga de verificar la conexión a internet del usuario. 
Si no hay conexión, se muestra un mensaje de error.
-->

<template>
    <div v-if="!isConnected" class="network-error"></div>
  </template>
  
  <script>
  import { checkBackendConnection } from '../utils/network';
  
  export default {
    data() {
      return {
        isConnected: true
      };
    },
    async created() {
      this.isConnected = await checkBackendConnection();
    }
  };
  </script>
