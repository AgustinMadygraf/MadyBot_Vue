<!--
Path: src/components/MermaidDiagram.vue
Este componente renderiza un diagrama Mermaid en la aplicación con mejor manejo de errores.
-->

<template>
    <div>
        <p>
      Las clases marcadas con <i>&lt;I&gt;</i> son interfaces; las marcadas con <i>&lt;DS&gt;</i> son Estructuras de Datos.
      Las flechas de cabeza abierta son relaciones en uso.
      Las flechas de cabeza cerrada son relaciones de <i>implementación</i> o de <i>herencia</i>.
    </p>
      <div id="mermaid">
        graph TD;
            App[App.vue] --> NetworkCheck[NetworkCheck.vue];
            App --> NavBar[NavBar.vue];
            App --> MenuTabs[MenuTabs.vue];
            MenuTabs --> MadyBot[MadyBot_Vue.vue];
            MenuTabs --> MermaidDiagram[MermaidDiagram.vue];
    </div>
    </div>
  </template>
  
  <script>
  import { useMermaid } from '../hooks/useMermaid';
  
  export default {
    mounted() {
      const { initMermaid } = useMermaid();
      initMermaid('mermaid'); // Inicializar Mermaid en el contenedor con ID 'mermaid'
    },
  };
  </script>
  