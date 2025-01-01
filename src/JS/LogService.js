/*
Path: src/JS/LogService.js
Este script se encarga de enviar los logs al servidor.
*/

class LogService {
    constructor() {
      this.logLevel = process.env.VUE_APP_LOG_LEVEL || 'info';
      this.levels = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
      };
    }
  
    debug(...args) {
      if (this.shouldLog('debug')) {
        console.debug('[DEBUG]', ...args);
      }
    }
  
    info(...args) {
      if (this.shouldLog('info')) {
        console.info('[INFO]', ...args);
      }
    }
  
    warn(...args) {
      if (this.shouldLog('warn')) {
        console.warn('[WARN]', ...args);
      }
    }
  
    error(...args) {
      if (this.shouldLog('error')) {
        console.error('[ERROR]', ...args);
      }
    }
  
    shouldLog(level) {
      return this.levels[level] >= this.levels[this.logLevel];
    }
  }
  
  export default new LogService();