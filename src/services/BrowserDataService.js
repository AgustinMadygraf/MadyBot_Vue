/*
Path: src/services/BrowserDataService.js
El servicio BrowserDataService se encarga de obtener datos del navegador del usuario.
*/

class BrowserDataService {
    static getBrowserData() {
      return {
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        platform: navigator.platform,
      };
    }
  }
  
  export default BrowserDataService;