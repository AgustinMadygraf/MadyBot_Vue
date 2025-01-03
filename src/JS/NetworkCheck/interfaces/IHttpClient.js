/*
Path: src/JS/NetworkCheck/interfaces/IHttpClient.js

*/

/* eslint-disable */

export default class IHttpClient {
    /**
     * Realiza una solicitud POST.
     * @param {string} url - La URL a la que se enviará la solicitud.
     * @param {Object} data - Los datos que se enviarán en el cuerpo de la solicitud.
     * @param {Object} [config] - Configuración adicional para la solicitud.
     * @returns {Promise} - Una promesa que se resuelve con la respuesta de la solicitud.
     */
    post(url, data, config) {
      throw new Error('Método no implementado');
    }
  
    /**
     * Realiza una solicitud GET.
     * @param {string} url - La URL a la que se enviará la solicitud.
     * @param {Object} [config] - Configuración adicional para la solicitud.
     * @returns {Promise} - Una promesa que se resuelve con la respuesta de la solicitud.
     */
    get(url, config) {
      throw new Error('Método no implementado');
    }
  }