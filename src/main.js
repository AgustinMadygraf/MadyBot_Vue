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
    // Configuración inicial de Mermaid
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose', // Permitir etiquetas HTML personalizadas
      theme: 'default',
      logLevel: 5, // Habilitar nivel máximo de logs para Mermaid
    });

    // Depuración: Verificar versión de Mermaid
    console.log(`Versión de Mermaid: ${mermaid.version}`);

    // Verificar la existencia del contenedor
    const mermaidContainer = document.getElementById('mermaid');
    if (!mermaidContainer) {
      console.error('Error: El contenedor de Mermaid no se encontró.');
      return;
    }
    console.log('Contenedor de Mermaid encontrado:', mermaidContainer);

    // Depuración: Verificar contenido del contenedor
    console.log('Contenido inicial del contenedor de Mermaid:', mermaidContainer.innerHTML);

    // Renderizar el diagrama de Mermaid
    mermaid.init(undefined, mermaidContainer);
    console.log('Mermaid se ha renderizado correctamente.');

    // Depuración: Verificar contenido después del renderizado
    console.log('Contenido del contenedor después del renderizado:', mermaidContainer.innerHTML);
  } catch (error) {
    console.error('Error al inicializar Mermaid:', error.message);
    console.error('Detalles del error:', error);
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
