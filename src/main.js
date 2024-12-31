/*
Path: src/main.js
Este script es el punto de entrada de la aplicación.
Aquí inicializamos Mermaid y verificamos la conexión con el backend.
*/

import { createApp, nextTick } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import mermaid from 'mermaid';
import { NetworkService } from './JS/NetworkCheck';

// Inicializar Mermaid con configuración personalizada
const initializeMermaid = () => {
  console.log('Inicializando Mermaid...');
  try {
    // Configuración inicial de Mermaid
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose', // Permitir etiquetas HTML personalizadas
      theme: 'default',
      logLevel: 5, // Habilitar nivel máximo de logs para Mermaid
    });

    console.log(`Versión de Mermaid: ${mermaid.version}`);
  } catch (error) {
    console.error('Error durante la configuración inicial de Mermaid:', error);
  }
};

// Crear la aplicación de Vue
const app = createApp(App);

// Inyectar NetworkService
const networkService = new NetworkService();

// Verificar la conexión con el backend
nextTick(async () => {
  console.log('Iniciando la verificación de conexión con el backend...');
  const isConnected = await networkService.checkBackendConnection();
  console.log('Resultado de la verificación de conexión:', isConnected);

  if (!isConnected) {
    console.error('No se pudo conectar al backend. Por favor, verifique su conexión de red.');
    return;
  }

  console.log('Conexión con el backend exitosa.');

  // Inicializar Mermaid después de verificar la conexión
  initializeMermaid();
});

// Montar la aplicación
app.mount('#app');