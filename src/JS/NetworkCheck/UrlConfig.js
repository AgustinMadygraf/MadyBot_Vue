/*
Path: src/JS/NetworkCheck/UrlConfig.js

*/

import logger from '../LogService.js';

let globalEndpoint = null;

/**
 * Establece el endpoint global.
 * @param {string} newEndpoint - El nuevo endpoint a establecer.
 */
export function setGlobalEndpoint(newEndpoint) {
  globalEndpoint = newEndpoint;
  logger.info('[UrlConfig] globalEndpoint actualizado a:', newEndpoint);
}

/**
 * Obtiene el endpoint global.
 * @returns {string|null} El endpoint global actual.
 */
export function getGlobalEndpoint() {
  return globalEndpoint;
}