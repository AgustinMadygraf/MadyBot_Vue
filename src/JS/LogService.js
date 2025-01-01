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

    // Configurar el complemento de prefijos
    prefix.reg(log);
    prefix.apply(log, {
      format(level, name, timestamp) {
        // Agrega el stack trace para mostrar la línea de código
        const stack = new Error().stack.split('\n')[3]?.trim();
        return `${timestamp} [${level}] ${stack}`;
      },
    });

    // Configura el nivel de log según el entorno
    if (env === 'development') {
      this.logger.setLevel('debug');
    } else {
      this.logger.setLevel('warn'); // Excluir "debug" e "info" en producción
    }
  }

  debug(...args) {
    this.logger.debug('[DEBUG]', ...args);
  }

  info(...args) {
    this.logger.info('[INFO]', ...args);
  }

  warn(...args) {
    this.logger.warn('[WARN]', ...args);
  }

  error(...args) {
    this.logger.error('[ERROR]', ...args);
  }
}

export default new LogService();
