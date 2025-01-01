// src/JS/NetworkCheck/index.js

import MessageService from '../ChatBot/MessageService';
import AppConfig from '../../config';

export class NetworkService {
  constructor(baseUrl) {
    console.log('Iniciando servicio de verificación de conexión con el backend...');
    console.log('Base URL:', baseUrl);
    console.log('AppConfig:', AppConfig.API_ENDPOINT);
    this.baseUrl = baseUrl || AppConfig.API_ENDPOINT;
    this.endpoint = '/receive-data';
    console.log('URL del backend:', this.baseUrl);
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
