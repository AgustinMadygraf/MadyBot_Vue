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

async function initApp() {
  console.log('Iniciando la aplicación...');
  try {
    const isConnected = await checkBackendConnection();
    console.log('Resultado de la verificación de conexión:', isConnected);
    if (isConnected) {
      console.log('Conexión con el backend exitosa. Iniciando la aplicación...');
      createApp(App).mount('#app');
    } else {
      console.error('No se pudo conectar al backend. Por favor, verifique su conexión de red.');
      // Aquí puedes mostrar un mensaje de error en la interfaz si lo deseas
    }
  } catch (error) {
    console.error('Error durante la inicialización de la aplicación:', error);
  }
}

initApp();