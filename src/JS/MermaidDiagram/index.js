/*
Path: src/JS/MermaidDiagram/index.js
Este script se encarga de inicializar y renderizar diagramas Mermaid en un contenedor HTML.
*/

import mermaid from 'mermaid';
import { mermaidOptions } from './mermaidConfig';
import LogService from '../LogService'; // Importa la clase LogService

export const useMermaid = () => {
  const initMermaid = (containerId) => {
    const container = document.getElementById(containerId);

    if (!container) {
      LogService.error(`El contenedor con ID "${containerId}" no se encontró.`);
      return;
    }

    try {
      // Inicializar Mermaid con opciones configuradas
      mermaid.initialize(mermaidOptions);
      LogService.info(`Versión de Mermaid: ${mermaid.version || 'indefinida'}`);
      LogService.debug('Contenido inicial del contenedor:', container.innerText);

      // Renderizar Mermaid
      mermaid.init(undefined, container);

      LogService.info('Mermaid se ha renderizado correctamente.');
      LogService.debug('Contenido después del renderizado:', container.innerHTML);
    } catch (error) {
      LogService.error('Error al renderizar Mermaid:', error.message);
      LogService.debug('Detalles del error:', error);
    }
  };

  return { initMermaid };
};
