/*
Path: src/main.js
Este script es el punto de entrada de la aplicación.
Aquí inicializamos Mermaid y verificamos la conexión con el backend.
*/

import { checkBackendConnection } from './utils/network';
import { createApp, nextTick } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import mermaid from 'mermaid';

// Inicializar Mermaid con configuración personalizada
const initializeMermaid = () => {
  console.log('Inicializando Mermaid...');
  try {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
    });

    const mermaidContainer = document.getElementById('mermaid');
    if (!mermaidContainer) {
      console.error('El contenedor de Mermaid no se encontró.');
      return;
    }

    mermaid.init(undefined, mermaidContainer);
    console.log('Mermaid se ha renderizado correctamente.');
  } catch (error) {
    console.error('Error al inicializar Mermaid:', error);
  }
};

// Crear la aplicación de Vue
const app = createApp(App);

// Verificar la conexión con el backend
nextTick(async () => {
  console.log('Iniciando la verificación de conexión con el backend...');
  const isConnected = await checkBackendConnection();
  console.log('Resultado de la verificación de conexión:', isConnected);

  if (!isConnected) {
    console.error('No se pudo conectar al backend. Por favor, verifique su conexión de red.');
    // Aquí puedes manejar un mensaje de error en la UI si lo deseas
  } else {
    console.log('Conexión con el backend exitosa.');
  }

  // Inicializar Mermaid después de verificar la conexión
  initializeMermaid();
});

// Montar la aplicación
app.mount('#app');
