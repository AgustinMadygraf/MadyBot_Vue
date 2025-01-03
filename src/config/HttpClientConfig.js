/*
Path: src/config/HttpClientConfig.js

*/

import LogService from '../JS/LogService.js';

let globalEndpoint = null;

export function setGlobalEndpoint(newEndpoint) {
  globalEndpoint = newEndpoint;
  LogService.info('[HttpClientConfig] globalEndpoint actualizado a:', newEndpoint);
  console.log('globalEndpoint:', globalEndpoint);
  console.log('newEndpoint:', newEndpoint);
}

export function getGlobalEndpoint() {
  return globalEndpoint;
}