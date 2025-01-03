/*
Path: src/JS/NetworkCheck/index.js

*/

import { getGlobalEndpoint, setGlobalEndpoint } from '../../config/HttpClientConfig.js';
import MessageService from '../ChatBot/MessageService';
import AppConfig from '../../config';
import logger from '../LogService';
import LogService from '../LogService.js';
import axios from 'axios';

/**
 * Servicio encargado de verificar la conexión con el backend y gestionar la URL global.
 */
export class NetworkService {
  /**
   * @param {string} [baseUrl] - URL base del servidor a verificar.
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl || getGlobalEndpoint() || AppConfig.API_ENDPOINT;
    this.endpoint = '/receive-data';
    logger.debug('[NetworkService] Servicio iniciado con configuración:', {
      baseUrl: this.baseUrl,
      endpoint: this.endpoint,
    });
  }

  /**
   * Verifica la conexión con el backend realizando una solicitud POST.
   * @returns {Promise<boolean|Object>} Retorna true en caso de éxito, false en caso de fallo, o un objeto de error.
   */
  async checkBackendConnection() {
    logger.info('[NetworkService] Iniciando verificación de conexión con el backend');

    try {
      const url = `${this.baseUrl}${this.endpoint}`;
      logger.debug('[NetworkService] URL completa para la verificación:', url);

      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this._getRequestPayload()),
      });

      if (response.ok) {
        // Ajuste tras la validación exitosa
        setGlobalEndpoint(this.baseUrl);
        logger.info('[NetworkService] Conexión exitosa con el backend');

        await MessageService.sendBotMessage('Hola!');
        return true;
      } else {
        logger.warn('[NetworkService] Conexión fallida con el backend. Código de estado:', response.status);
        return false;
      }
    } catch (error) {
      logger.error('[NetworkService] Error durante la verificación de conexión:', error.message);
      return { error: true, message: error.message };
    }
  }

  /**
   * Genera el payload de la solicitud para la verificación de conexión.
   * @private
   * @returns {Object} - Objeto con los datos a enviar en la solicitud.
   */
  _getRequestPayload() {
    const payload = {
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

    logger.debug('[NetworkService] Payload generado para la solicitud:', payload);
    return payload;
  }
}



const checkPhpEndpointHealth = async () => {
  try {
    LogService.info('[HttpClientConfig] Verificando salud de PHP_ENDPOINT...');
    await axios.get(`${AppConfig.PHP_ENDPOINT}/health-check`);
    LogService.info('[HttpClientConfig] PHP_ENDPOINT está saludable.');
    return true;
  } catch (error) {
    LogService.warn('[HttpClientConfig] PHP_ENDPOINT no está saludable:', error.message);
    return false;
  }
};

const getApiEndpoint = async () => {
  try {
    LogService.info('[HttpClientConfig] Intentando usar API_ENDPOINT de config.json');
    await axios.get(`${AppConfig.API_ENDPOINT}/health-check`);
    LogService.info('[HttpClientConfig] API_ENDPOINT de config.json funcionando.');
    return AppConfig.API_ENDPOINT;
  } catch (error) {
    LogService.warn('[HttpClientConfig] Fallback: Obteniendo API_ENDPOINT desde PHP...');
    try {
      const isPhpHealthy = await checkPhpEndpointHealth();
      if (!isPhpHealthy) {
        throw new Error('PHP_ENDPOINT no está saludable');
      }
      const response = await axios.get(AppConfig.PHP_ENDPOINT);
      if (!response.data.endpoint) {
        LogService.warn('[HttpClientConfig] El campo "endpoint" está undefined en la respuesta de PHP. Usando valor por defecto.');
        throw new Error('El endpoint devuelto por PHP es undefined');
      }
      LogService.info('[HttpClientConfig] API_ENDPOINT obtenido desde PHP:', response.data.endpoint);
      return response.data.endpoint;
    } catch (phpError) {
      LogService.error('[HttpClientConfig] Error al obtener API_ENDPOINT desde PHP:', phpError.message);
      throw new Error('No se pudo obtener un API_ENDPOINT válido');
    }
  }
};

const initHttpClientConfig = async () => {
  const baseURL = await getApiEndpoint();
  return {
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 50,
  };
};

export default initHttpClientConfig;
