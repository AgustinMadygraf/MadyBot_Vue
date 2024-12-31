// src/NetworkCheck/network.js

import MessageService from '../ChatBot/MessageService';

export class NetworkService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || process.env.VUE_APP_URL_BACK;
    this.endpoint = '/receive-data';
  }

  async checkBackendConnection() {
    console.log('Iniciando verificación de conexión con el backend...');

    try {
      const url = `${this.baseUrl}${this.endpoint}`;
      console.log('URL del backend:', url);

      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this._getRequestPayload()),
      });

      console.log('Respuesta recibida del backend:', response);

      if (response.ok) {
        console.log('Conexión con el backend exitosa. Enviando mensaje de bienvenida...');
        await MessageService.sendBotMessage('Hola!');
      }

      return response.ok;
    } catch (error) {
      console.error('Error durante la verificación de conexión:', error);
      return { error: true, message: error.message };
    }
  }

  _getRequestPayload() {
    return {
      prompt_user: 'Probando conexión con el backend',
      user_data: {
        id: '12345',
        browserData: {
          userAgent: navigator.userAgent,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          platform: navigator.platform,
        },
      },
      stream: false,
    };
  }
}
