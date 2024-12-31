<template>
  <div id="app">
    <NetworkCheck />
    <NavBar />
    <div class="menu-container">
      <button @click="toggleMenu" class="menu-button">⋮</button>
      <div v-if="isMenuOpen" class="menu">
        <ul>
          <li>
            <a @click="menuAction('Sistema de Gestión de Calidad')" href="/iso-9001-comercializacion/dist/index.html" target="_blank">
              Sistema de Gestión de Calidad
            </a>
          </li>
          <li>
            <a @click="menuAction('Manual de Operación')" href="/automatizacion/app/views/manualoperacion.php" target="_blank">
              Manual de Operación
            </a>
          </li>
          <li>
            <a @click="menuAction('API Xubio')" href="https://main.xubio.com/API/documentation/index.html" target="_blank">
              API Xubio
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="currentTab === 'inicio'">
      <MadyBot_Vue />
    </div>
    <div v-if="currentTab === 'dev'" class="dev-container">
      <h2>Diagrama de Componentes</h2>
      <div id="mermaid">
        <mermaid>
          graph TD;
          App --> NavBar;
          App --> MadyBot_Vue;
          App --> NetworkCheck;
        </mermaid>
      </div>
    </div>
  </div>
</template>

<script>
import MadyBot_Vue from './components/MadyBot_Vue.vue';
import NetworkCheck from './components/NetworkCheck.vue';
import NavBar from './components/NavBar.vue';
import mermaid from 'mermaid';

export default {
  components: {
    MadyBot_Vue,
    NetworkCheck,
    NavBar
  },
  data() {
    return {
      isMenuOpen: false,
      currentTab: 'inicio'
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    menuAction(action) {
      console.log(`Selected: ${action}`);
      this.isMenuOpen = false;
    },
    onHashChange() {
      const hash = window.location.hash.replace('#', '');
      this.currentTab = hash || 'inicio';
    },
    initMermaid() {
      console.log("Inicializando Mermaid...");

      const mermaidContainer = document.getElementById('mermaid');
      if (!mermaidContainer) {
        console.error("El contenedor de Mermaid no se encontró.");
        return;
      }

      try {
        mermaid.initialize({ startOnLoad: false });
        mermaid.init(undefined, mermaidContainer);
        console.log("Mermaid se ha renderizado correctamente.");
      } catch (error) {
        console.error("Error al renderizar Mermaid:", error);
      }
    }
  },
  mounted() {
    window.addEventListener('hashchange', this.onHashChange);
    this.onHashChange();

    if (this.currentTab === 'dev') {
      this.initMermaid();
    }
  },
  watch: {
    currentTab(newTab) {
      if (newTab === 'dev') {
        this.initMermaid();
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }
};
</script>
