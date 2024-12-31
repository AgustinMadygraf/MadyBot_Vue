/*
Path: src/JS/ChatBot/eventBus.js
Este script exporta un objeto que actúa como un bus de eventos para la aplicación.
*/

import mitt from 'mitt';
const emitter = mitt();
export default emitter;
