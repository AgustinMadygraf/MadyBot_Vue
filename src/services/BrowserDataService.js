/*
Path: src/services/BrowserDataService.js
El servicio BrowserDataService se encarga de obtener datos del navegador del usuario.
*/

class BrowserDataService {
  /**
   * Obtiene los datos del navegador del usuario.
   * @returns {Object} - Objeto con información del navegador.
   */
  getBrowserData() {
    try {
      return {
        userAgent: this._getUserAgent(),
        screenResolution: this._getScreenResolution(),
        language: this._getLanguage(),
        platform: this._getPlatform(),
      };
    } catch (error) {
      console.error('[ERROR BrowserDataService] Error al obtener datos del navegador:', error.message);
      throw new Error('No se pudo obtener la información del navegador.');
    }
  }

  /**
   * Obtiene el User-Agent del navegador.
   * @returns {string} - El User-Agent del navegador.
   */
  _getUserAgent() {
    return navigator.userAgent || 'User-Agent no disponible';
  }

  /**
   * Obtiene la resolución de pantalla del navegador.
   * @returns {string} - Resolución de pantalla en formato "ancho x alto".
   */
  _getScreenResolution() {
    return `${window.screen.width}x${window.screen.height}`;
  }

  /**
   * Obtiene el idioma del navegador.
   * @returns {string} - Idioma del navegador.
   */
  _getLanguage() {
    return navigator.language || 'Idioma no disponible';
  }

  /**
   * Obtiene la plataforma del navegador.
   * @returns {string} - Plataforma del sistema operativo.
   */
  _getPlatform() {
    return navigator.platform || 'Plataforma no disponible';
  }
}

// Exporta una instancia preconfigurada del servicio
const browserDataServiceInstance = new BrowserDataService();
export default browserDataServiceInstance;
