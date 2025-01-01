/*
Path: src/main.js
Este script es el punto de entrada de la aplicación.
Aquí inicializamos Mermaid y verificamos la conexión con el backend.
*/

import { createApp, nextTick } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { NetworkService } from './JS/NetworkCheck';
import mermaid from 'mermaid';
import logger from './JS/LogService';

// Inicializar Mermaid con configuración personalizada
const initializeMermaid = () => {
  logger.info('[Main] Inicializando Mermaid...');
  try {
    // Configuración inicial de Mermaid
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose', // Permitir etiquetas HTML personalizadas
      theme: 'default',
      logLevel: 5, // Habilitar nivel máximo de logs para Mermaid
    });

    logger.info(`[Main] Versión de Mermaid: ${mermaid.version}`);
  } catch (error) {
    logger.error('[Main] Error durante la configuración inicial de Mermaid:', error.message);
  }
};

// Crear la aplicación de Vue
const app = createApp(App);

// Inyectar NetworkService
const networkService = new NetworkService();

// Verificar la conexión con el backend
nextTick(async () => {
  logger.info('[Main] Iniciando la verificación de conexión con el backend...');
  try {
    const isConnected = await networkService.checkBackendConnection();
    logger.debug('[Main] Resultado de la verificación de conexión:', isConnected);

    if (!isConnected) {
      logger.warn('[Main] No se pudo conectar al backend. Verifique su conexión de red.');
      return;
    }

    logger.info('[Main] Conexión con el backend exitosa.');

    // Inicializar Mermaid después de verificar la conexión
    initializeMermaid();
  } catch (error) {
    logger.error('[Main] Error al verificar la conexión con el backend:', error.message);
  }
});

// Montar la aplicación
app.mount('#app');
