/*
Path: src/services/IdGenerationService.js
El servicio IdGenerationService se encarga de generar IDs de usuario.
*/

import { v4 as uuidv4 } from 'uuid';
import BrowserDataService from '@/services/BrowserDataService';

class IdGenerationService {
  static generateUserId() {
    const browserData = BrowserDataService.getBrowserData();
    return {
      id: uuidv4(),
      browserData: browserData
    };
  }
}

export default IdGenerationService;