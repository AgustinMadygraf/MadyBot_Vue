<template>
    <div id="mermaid">
    graph TD;
    App[App.vue] --> NetworkCheck[NetworkCheck.vue];
    App --> NavBar[NavBar.vue];
    App --> MenuTabs[MenuTabs.vue];
    MenuTabs --> MadyBot[MadyBot_Vue.vue];
    MenuTabs --> MermaidDiagram[MermaidDiagram.vue];
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
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: 'default',
            logLevel: 5, // Máxima depuración
          });
          console.log(`Versión de Mermaid: ${mermaid.version || 'indefinida'}`);
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
  