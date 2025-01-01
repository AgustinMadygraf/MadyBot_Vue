/*
Path: src/config/socketConfig.js
Este script se encarga de manejar la configuración del WebSocket.
*/

import LogService from '../JS/LogService.js'; // Importamos LogService

export class WebSocketService {
  constructor(config) {
    this.config = config;
    this.socket = null;
  }

  async getApiEndpoint() {
    try {
      if (!this.config.USE_SOCKET_ENDPOINT) {
        LogService.info('[WebSocketService] Uso directo de API_ENDPOINT.');
        return this.config.API_ENDPOINT;
      }

      return new Promise((resolve) => {
        this.socket = new WebSocket(this.config.SOCKET_URL);

        this.socket.onopen = () => {
          LogService.info('[WebSocketService] Conexión WebSocket abierta. Solicitando API_ENDPOINT...');
          this.socket.send('GET_API_ENDPOINT');
        };

        this.socket.onmessage = (event) => {
          try {
            const endpoint = JSON.parse(event.data).endpoint;
            LogService.info('[WebSocketService] API_ENDPOINT recibido:', endpoint);
            this.socket.close();
            resolve(endpoint);
          } catch (parseError) {
            LogService.error('[WebSocketService] Error al parsear mensaje del WebSocket:', parseError.message);
            this.socket.close();
            resolve(this.config.API_ENDPOINT);
          }
        };

        this.socket.onerror = (error) => {
          LogService.warn('[WebSocketService] Error en WebSocket:', error.message || 'Sin detalles');
          LogService.info('[WebSocketService] Usando API_ENDPOINT de respaldo.');
          resolve(this.config.API_ENDPOINT);
        };

        // Timeout después de 5 segundos
        setTimeout(() => {
          if (this.socket.readyState !== WebSocket.OPEN) {
            LogService.warn('[WebSocketService] Timeout en WebSocket. Usando API_ENDPOINT de respaldo.');
            resolve(this.config.API_ENDPOINT);
          }
        }, 5000);
      });
    } catch (error) {
      LogService.error('[WebSocketService] Error general al obtener API_ENDPOINT:', error.message);
      return this.config.API_ENDPOINT;
    }
  }
}
