/*
Path: src/JS/NetworkCheck/BrowserDataService.js
El servicio BrowserDataService se encarga de obtener datos del navegador del usuario.
*/

import LogService from '../LogService.js'; // Importamos LogService

class BrowserDataService {
  /**
   * Obtiene los datos del navegador del usuario.
   * @returns {Object} - Objeto con información del navegador.
   */
  getBrowserData() {
    try {
      const browserData = {
        userAgent: this._getUserAgent(),
        screenResolution: this._getScreenResolution(),
        language: this._getLanguage(),
        platform: this._getPlatform(),
      };
      LogService.info('[BrowserDataService] Datos del navegador obtenidos:', browserData);
      return browserData;
    } catch (error) {
      LogService.error('[ERROR BrowserDataService] Error al obtener datos del navegador:', error.message);
      LogService.debug('Detalles del error:', error);
      throw new Error('No se pudo obtener la información del navegador.');
    }
  }

  /**
   * Obtiene el User-Agent del navegador.
   * @returns {string} - El User-Agent del navegador.
   */
  _getUserAgent() {
    const userAgent = navigator.userAgent || 'User-Agent no disponible';
    LogService.debug('[BrowserDataService] User-Agent:', userAgent);
    return userAgent;
  }

  /**
   * Obtiene la resolución de pantalla del navegador.
   * @returns {string} - Resolución de pantalla en formato "ancho x alto".
   */
  _getScreenResolution() {
    const resolution = `${window.screen.width}x${window.screen.height}`;
    LogService.debug('[BrowserDataService] Resolución de pantalla:', resolution);
    return resolution;
  }

  /**
   * Obtiene el idioma del navegador.
   * @returns {string} - Idioma del navegador.
   */
  _getLanguage() {
    const language = navigator.language || 'Idioma no disponible';
    LogService.debug('[BrowserDataService] Idioma:', language);
    return language;
  }

  /**
   * Obtiene la plataforma del navegador.
   * @returns {string} - Plataforma del sistema operativo.
   */
  _getPlatform() {
    const platform = navigator.platform || 'Plataforma no disponible';
    LogService.debug('[BrowserDataService] Plataforma:', platform);
    return platform;
  }
}

// Exporta una instancia preconfigurada del servicio
const browserDataServiceInstance = new BrowserDataService();
export default browserDataServiceInstance;
