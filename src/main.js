/*
Path: src/main.js
Este script es el punto de entrada de la aplicación.
Aquí se importa la función checkBackendConnection del archivo src/utils/network.js 
y se llama a esta función para verificar la conexión con el backend antes de iniciar la aplicación. 
Si la conexión es exitosa, la aplicación se inicia normalmente. Si la conexión falla, 
se muestra un mensaje de error en la consola y la aplicación no se inicia.
*/

import { checkBackendConnection } from './utils/network';
import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const app = createApp(App);

app.mount('#app');

app.config.globalProperties.$nextTick(async () => {
  console.log('Iniciando la verificación de conexión con el backend...');
  const isConnected = await checkBackendConnection();
  console.log('Resultado de la verificación de conexión:', isConnected);
  if (!isConnected) {
    console.error('No se pudo conectar al backend. Por favor, verifique su conexión de red.');
    // Aquí puedes mostrar un mensaje de error en la interfaz si lo deseas
  }
});