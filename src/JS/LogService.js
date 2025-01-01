/*
Path: src/JS/LogService.js
Este script se encarga de enviar los logs al servidor.
*/

import log from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

class LogService {
  constructor() {
    const env = process.env.NODE_ENV; // "development" o "production"
    this.logger = log;

    prefix.reg(log);
    prefix.apply(log, {
      format(level, name, timestamp) {
        const callerStackLine = getCallerFileStack();
        const parsedLocation = parseFileAndLine(callerStackLine) || '';
        
        // Podés ajustar el formato a tu gusto
        return `${timestamp} [${level}] [${parsedLocation}]`;
      },
    });

    if (env === 'development') {
      this.logger.setLevel('debug');
    } else {
      this.logger.setLevel('info');
    }
  }

  debug(...args) {
    this.logger.debug(...args);
  }

  info(...args) {
    this.logger.info(...args);
  }

  warn(...args) {
    this.logger.warn(...args);
  }

  error(...args) {
    this.logger.error(...args);
  }
}

// === Funciones de ayuda ===
function getCallerFileStack() {
  const stackLines = new Error().stack.split('\n').map(line => line.trim());
  // Buscamos la primera línea de "src/" que no sea LogService.js
  return stackLines.find(line =>
    line.includes('webpack-internal:///./src/') && 
    !line.includes('LogService.js')
  ) || '';
}

function parseFileAndLine(stackLine) {
  // Regex para extraer "src/JS/NetworkCheck/ApiService.js" y la línea
  const regex = /webpack-internal:\/\/\/\.(\/.*?):(\d+):\d+/;
  const match = stackLine.match(regex);

  if (!match) return null;

  let filePath = match[1].replace(/^\/?/, ''); // Quita el slash inicial
  const lineNumber = match[2];

  // Eliminar "src/" del path si existe
  if (filePath.startsWith('src/JS')) {
    filePath = filePath.slice(6); // Elimina los primeros 6 caracteres ("src/JS")
  }

  return `${filePath}:${lineNumber}`;
}

export default new LogService();
