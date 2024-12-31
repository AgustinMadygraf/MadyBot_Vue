/*
Path: src/services/MenuService.js
El servicio MenuService se encarga de manejar la lógica relacionada con las pestañas y el menú.
*/

class MenuService {
    constructor() {
      this.currentTab = 'inicio';
    }
  
    /**
     * Cambia la pestaña actual según el hash en la URL.
     * @param {string} hash - El hash actual de la URL.
     * @returns {string} - La nueva pestaña activa.
     */
    updateTabFromHash(hash) {
      return hash ? hash.replace('#', '') : 'inicio';
    }
  
    /**
     * Registra una acción del menú.
     * @param {string} action - La acción seleccionada.
     */
    logMenuAction(action) {
      console.log(`[MenuService] Acción seleccionada: ${action}`);
    }
  }
  
  export default new MenuService();
  