// Path: src/hooks/useMermaid.js
import mermaid from 'mermaid';
import { mermaidOptions } from '../utils/mermaidConfig';

export const useMermaid = () => {
  const initMermaid = (containerId) => {
    const container = document.getElementById(containerId);

    if (!container) {
      console.error(`El contenedor con ID "${containerId}" no se encontró.`);
      return;
    }

    try {
      // Inicializar Mermaid con opciones configuradas
      mermaid.initialize(mermaidOptions);
      console.log(`Versión de Mermaid: ${mermaid.version || 'indefinida'}`);
      console.log('Contenido inicial del contenedor:', container.innerText);

      // Renderizar Mermaid
      mermaid.init(undefined, container);

      console.log('Mermaid se ha renderizado correctamente.');
      console.log('Contenido después del renderizado:', container.innerHTML);
    } catch (error) {
      console.error('Error al renderizar Mermaid:', error.message);
      console.error('Detalles del error:', error);
    }
  };

  return { initMermaid };
};
