/*
Path: src/JS/NetworkCheck/PhpHealthChecker.js
*/

import axios from 'axios';
import AppConfig from '../../config';
import logger from '../LogService';

/**
 * Verifica la salud del endpoint PHP realizando una solicitud GET a la ruta /health-check.
 * @returns {Promise<boolean>} Retorna true si el endpoint PHP está saludable, de lo contrario, false.
 */
export async function checkPhpEndpointHealth() {
  try {
    logger.info('[PhpHealthChecker] Verificando salud de PHP_ENDPOINT...');
    await axios.get(`${AppConfig.PHP_ENDPOINT}/health-check`);
    logger.info('[PhpHealthChecker] PHP_ENDPOINT está saludable.');
    return true;
  } catch (error) {
    logger.warn('[PhpHealthChecker] PHP_ENDPOINT no está saludable:', error.message);
    return false;
  }
}