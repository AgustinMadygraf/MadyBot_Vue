/*
Path: src/JS/MenuTabs/MenuService.js
El servicio MenuService se encarga de manejar la lógica relacionada con las pestañas y el menú.
*/

import LogService from '../LogService.js'; // Importamos LogService

class MenuService {
  constructor() {
    this.currentTab = 'inicio';
    LogService.info('[MenuService] Servicio inicializado con la pestaña "inicio".');
  }

  /**
   * Cambia la pestaña actual según el hash en la URL.
   * @param {string} hash - El hash actual de la URL.
   * @returns {string} - La nueva pestaña activa.
   */
  updateTabFromHash(hash) {
    const newTab = hash ? hash.replace('#', '') : 'inicio';
    LogService.info(`[MenuService] Pestaña cambiada a: ${newTab}`);
    return newTab;
  }

  /**
   * Registra una acción del menú.
   * @param {string} action - La acción seleccionada.
   */
  logMenuAction(action) {
    LogService.info(`[MenuService] Acción seleccionada: ${action}`);
  }
}

export default new MenuService();
