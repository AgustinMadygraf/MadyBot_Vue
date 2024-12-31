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
  import mermaid from 'mermaid';
  
  export default {
    methods: {
      initMermaid() {
        console.log("Inicializando Mermaid...");
        const mermaidContainer = document.getElementById('mermaid');
        if (!mermaidContainer) {
          console.error("El contenedor de Mermaid no se encontró.");
          return;
        }
  
        try {
          // Configurar Mermaid
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose', // Permitir HTML
            theme: 'default', // Tema predeterminado
            logLevel: 5, // Nivel de depuración
          });
  
          console.log(`Versión de Mermaid: ${mermaid.version || 'indefinida'}`);
  
          // Renderizar Mermaid
          mermaid.init(undefined, mermaidContainer);
  
          console.log("Mermaid se ha renderizado correctamente.");
        } catch (error) {
          console.error("Error al renderizar Mermaid:", error);
        }
      },
    },
    mounted() {
      this.initMermaid();
    },
  };
  </script>
  
  <style scoped>
  #mermaid {
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #f9f9f9;
    overflow-x: auto;
  }
  </style>
  