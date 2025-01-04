/*
Path: src/JS/NetworkCheck/ApiEndpointProvider.js
*/

import axios from 'axios';
import AppConfig from '../../config';
import { checkPhpEndpointHealth } from './PhpHealthChecker.js';
import logger from '../LogService';

/**
 * Obtiene el API_ENDPOINT desde la configuración o, en caso de fallo, desde el backend PHP.
 * @returns {Promise<string>} Retorna el API_ENDPOINT válido.
 * @throws {Error} Lanza un error si no se puede obtener un API_ENDPOINT válido.
 */
export async function getApiEndpoint() {
  try {
    logger.info('[ApiEndpointProvider] Intentando usar API_ENDPOINT de config.json');
    await axios.get(`${AppConfig.API_ENDPOINT}/health-check`);
    logger.info('[ApiEndpointProvider] API_ENDPOINT de config.json funcionando.');
    return AppConfig.API_ENDPOINT;
  } catch (error) {
    logger.warn('[ApiEndpointProvider] Fallback: Obteniendo API_ENDPOINT desde PHP...');
    try {
      const isPhpHealthy = await checkPhpEndpointHealth();
      if (!isPhpHealthy) {
        throw new Error('PHP_ENDPOINT no está saludable');
      }
      const response = await axios.get(AppConfig.PHP_ENDPOINT);
      if (!response.data.endpoint) {
        logger.warn('[ApiEndpointProvider] El campo "endpoint" está undefined en la respuesta de PHP. Usando valor por defecto.');
        throw new Error('El endpoint devuelto por PHP es undefined');
      }
      logger.info('[ApiEndpointProvider] API_ENDPOINT obtenido desde PHP:', response.data.endpoint);
      return response.data.endpoint;
    } catch (phpError) {
      logger.error('[ApiEndpointProvider] Error al obtener API_ENDPOINT desde PHP:', phpError.message);
      throw new Error('No se pudo obtener un API_ENDPOINT válido');
    }
  }
}