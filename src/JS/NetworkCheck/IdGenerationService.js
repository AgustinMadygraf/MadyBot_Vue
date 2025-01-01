/*
Path: src/JS/NetworkCheck/IdGenerationService.js
El servicio IdGenerationService se encarga de generar IDs de usuario.
*/

import { v4 as uuidv4 } from 'uuid';
import BrowserDataService from '@/JS/NetworkCheck/BrowserDataService';
import logger from '../LogService';

class IdGenerationService {
  constructor(browserDataService) {
    this.browserDataService = browserDataService || new BrowserDataService();
  }

  /**
   * Genera un ID único con datos del navegador incluidos.
   * @returns {Object} - Objeto con el ID generado y datos del navegador.
   */
  generateUserId() {
    logger.debug('[IdGenerationService] Iniciando generación de ID');
    try {
      const browserData = this.browserDataService.getBrowserData();
      if (!browserData || typeof browserData !== 'object') {
        logger.warn('[IdGenerationService] Datos del navegador no válidos:', browserData);
        throw new Error('Error al obtener datos del navegador.');
      }

      const userId = uuidv4();
      logger.info('[IdGenerationService] ID generado con éxito:', userId);

      return {
        id: userId,
        browserData: browserData,
      };
    } catch (error) {
      logger.error('[IdGenerationService] Error al generar el ID:', error.message);
      throw new Error('Error al generar el ID del usuario.');
    }
  }
}

// Exporta una instancia preconfigurada del servicio
const idGenerationServiceInstance = new IdGenerationService(BrowserDataService);
export default idGenerationServiceInstance;
