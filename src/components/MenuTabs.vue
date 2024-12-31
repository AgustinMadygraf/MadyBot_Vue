<!--
Path: src/components/MenuTabs.vue
Este componente se encarga de mostrar las pestañas de la aplicación.
-->

<template>
  <div>
    <!-- Menú principal -->
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

    <!-- Contenido de pestañas -->
    <div v-if="currentTab === 'inicio'">
      <MadyBot_Vue />
    </div>
    <div v-if="currentTab === 'dev'" class="dev-container">
      <h2>Diagrama de Componentes</h2>
      <MermaidDiagram />
    </div>
  </div>
</template>

<script>
import MenuService from '@/services/MenuService';
import MadyBot_Vue from './MadyBot_Vue.vue';
import MermaidDiagram from './MermaidDiagram.vue';

export default {
  components: {
    MadyBot_Vue,
    MermaidDiagram,
  },
  data() {
    return {
      isMenuOpen: false,
      currentTab: MenuService.currentTab,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    menuAction(action) {
      MenuService.logMenuAction(action);
      this.isMenuOpen = false;
    },
    onHashChange() {
      const hash = window.location.hash;
      this.currentTab = MenuService.updateTabFromHash(hash);
    },
  },
  mounted() {
    window.addEventListener('hashchange', this.onHashChange);
    this.onHashChange();
  },
  beforeUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  },
};
</script>
