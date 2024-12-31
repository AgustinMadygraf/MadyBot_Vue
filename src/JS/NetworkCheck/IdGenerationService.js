/*
Path: src/JS/NetworkCheck/IdGenerationService.js
El servicio IdGenerationService se encarga de generar IDs de usuario.
*/

import { v4 as uuidv4 } from 'uuid';
import BrowserDataService from '@/JS/NetworkCheck/BrowserDataService';

class IdGenerationService {
  constructor(browserDataService) {
    this.browserDataService = browserDataService || BrowserDataService;
  }

  /**
   * Genera un ID único con datos del navegador incluidos.
   * @returns {Object} - Objeto con el ID generado y datos del navegador.
   */
  generateUserId() {
    try {
      const browserData = this.browserDataService.getBrowserData();
      const userId = uuidv4();
      console.log('[INFO IdGenerationService] ID generado:', userId);
      return {
        id: userId,
        browserData: browserData,
      };
    } catch (error) {
      console.error('[ERROR IdGenerationService] Error al generar el ID:', error.message);
      throw new Error('Error al generar el ID del usuario.');
    }
  }
}

// Exporta una instancia preconfigurada del servicio
const idGenerationServiceInstance = new IdGenerationService(BrowserDataService);
export default idGenerationServiceInstance;
