<!--
Path: src/components/MermaidDiagram.vue
Este componente renderiza un diagrama Mermaid en la aplicación con mejor manejo de errores.
-->

<template>
    <div>
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
  