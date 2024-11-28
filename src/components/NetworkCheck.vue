<!--
Path: src/components/NetworkCheck.vue
Este componente se encarga de verificar la conexión a internet del usuario. 
Si no hay conexión, se muestra un mensaje de error.
-->

<template>
    <div v-if="!isConnected" class="network-error">
      <p>No está conectado a la red permitida. Por favor, conéctese a la red correcta para acceder a la aplicación.</p>
    </div>
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
  
  <style scoped>
  .network-error {
    color: red;
    font-weight: bold;
    text-align: center;
    margin-top: 20px;
  }
  </style>