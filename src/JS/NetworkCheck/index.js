/*
Path: src/JS/NetworkCheck/index.js

*/

import { getGlobalEndpoint, setGlobalEndpoint } from '../../config/HttpClientConfig.js';
import MessageService from '../ChatBot/MessageService';
import AppConfig from '../../config';
import logger from '../LogService';
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

  /**
   * Verifica la salud del endpoint PHP realizando una solicitud GET a la ruta /health-check.
   * @returns {Promise<boolean>} Retorna true si el endpoint PHP está saludable, de lo contrario, false.
   */
  async checkPhpEndpointHealth() {
    try {
      logger.info('[NetworkService] Verificando salud de PHP_ENDPOINT...');
      await axios.get(`${AppConfig.PHP_ENDPOINT}/health-check`);
      logger.info('[NetworkService] PHP_ENDPOINT está saludable.');
      return true;
    } catch (error) {
      logger.warn('[NetworkService] PHP_ENDPOINT no está saludable:', error.message);
      return false;
    }
  }

  /**
   * Obtiene el API_ENDPOINT desde la configuración o, en caso de fallo, desde el backend PHP.
   * @returns {Promise<string>} Retorna el API_ENDPOINT válido.
   * @throws {Error} Lanza un error si no se puede obtener un API_ENDPOINT válido.
   */
  async getApiEndpoint() {
    try {
      logger.info('[NetworkService] Intentando usar API_ENDPOINT de config.json');
      await axios.get(`${AppConfig.API_ENDPOINT}/health-check`);
      logger.info('[NetworkService] API_ENDPOINT de config.json funcionando.');
      return AppConfig.API_ENDPOINT;
    } catch (error) {
      logger.warn('[NetworkService] Fallback: Obteniendo API_ENDPOINT desde PHP...');
      try {
        const isPhpHealthy = await this.checkPhpEndpointHealth();
        if (!isPhpHealthy) {
          throw new Error('PHP_ENDPOINT no está saludable');
        }
        const response = await axios.get(AppConfig.PHP_ENDPOINT);
        if (!response.data.endpoint) {
          logger.warn('[NetworkService] El campo "endpoint" está undefined en la respuesta de PHP. Usando valor por defecto.');
          throw new Error('El endpoint devuelto por PHP es undefined');
        }
        logger.info('[NetworkService] API_ENDPOINT obtenido desde PHP:', response.data.endpoint);
        return response.data.endpoint;
      } catch (phpError) {
        logger.error('[NetworkService] Error al obtener API_ENDPOINT desde PHP:', phpError.message);
        throw new Error('No se pudo obtener un API_ENDPOINT válido');
      }
    }
  }

  /**
   * Inicializa la configuración del cliente HTTP utilizando el API_ENDPOINT obtenido.
   * @returns {Promise<Object>} Configuración para el cliente HTTP.
   */
  async initializeHttpClientConfig() {
    try {
      const baseURL = await this.getApiEndpoint();
      return {
        baseURL,
        headers: { 'Content-Type': 'application/json' },
        timeout: 50,
      };
    } catch (error) {
      logger.error('[NetworkService] Error al inicializar la configuración del cliente HTTP:', error.message);
      throw error;
    }
  }

  /**
   * Método coordinador que gestiona la secuencia de inicialización de la conexión.
   * @returns {Promise<boolean>} Retorna true si la inicialización es exitosa, de lo contrario, false.
   */
  async initializeConnection() {
    try {
      logger.info('[NetworkService] Iniciando proceso de inicialización de conexión...');
      const baseURL = await this.getApiEndpoint();
      this.baseUrl = baseURL;
      logger.debug('[NetworkService] API_ENDPOINT establecido a:', this.baseUrl);

      const phpHealthy = await this.checkPhpEndpointHealth();
      if (!phpHealthy) {
        logger.warn('[NetworkService] PHP_ENDPOINT no está saludable durante la inicialización.');
      }

      const backendConnected = await this.checkBackendConnection();
      if (backendConnected === true) {
        logger.info('[NetworkService] Inicialización de conexión completada con éxito.');
        return true;
      } else if (backendConnected === false) {
        logger.warn('[NetworkService] Inicialización de conexión completada con fallos.');
        return false;
      } else {
        logger.error('[NetworkService] Error durante la inicialización de conexión:', backendConnected.message);
        return false;
      }
    } catch (error) {
      logger.error('[NetworkService] Error durante la inicialización de conexión:', error.message);
      return false;
    }
  }
}

/**
 * Inicializa la configuración del cliente HTTP.
 * @returns {Promise<Object>} Configuración para el cliente HTTP.
 */
const initHttpClientConfig = async () => {
  const networkService = new NetworkService();
  return await networkService.initializeHttpClientConfig();
};

export default initHttpClientConfig;
