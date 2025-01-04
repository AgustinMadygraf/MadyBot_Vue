/*
Path: src/JS/NetworkCheck/ConnectionChecker.js
*/

import { setGlobalEndpoint } from './UrlConfig.js';
import MessageService from '../ChatBot/MessageService';
import logger from '../LogService';

/**
 * Verifica la conexión con el backend realizando una solicitud POST.
 * @param {string} baseUrl - URL base del servidor a verificar.
 * @param {string} endpoint - Endpoint para la verificación.
 * @param {Function} getRequestPayload - Función para obtener el payload de la solicitud.
 * @returns {Promise<boolean|Object>} Retorna true en caso de éxito, false en caso de fallo, o un objeto de error.
 */
export async function checkBackendConnection(baseUrl, endpoint, getRequestPayload) {
  logger.info('[ConnectionChecker] Iniciando verificación de conexión con el backend');

  try {
    const url = `${baseUrl}${endpoint}`;
    logger.debug('[ConnectionChecker] URL completa para la verificación:', url);

    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getRequestPayload()),
    });

    if (response.ok) {
      // Ajuste tras la validación exitosa
      setGlobalEndpoint(baseUrl);
      logger.info('[ConnectionChecker] Conexión exitosa con el backend');

      await MessageService.sendBotMessage('Hola!');
      return true;
    } else {
      logger.warn('[ConnectionChecker] Conexión fallida con el backend. Código de estado:', response.status);
      return false;
    }
  } catch (error) {
    logger.error('[ConnectionChecker] Error durante la verificación de conexión:', error.message);
    return { error: true, message: error.message };
  }
}