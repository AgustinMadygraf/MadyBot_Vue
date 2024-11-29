<!--
Path: src/App.vue
Este es el componente principal de la aplicación. Aquí se importa el componente MadyBot_Vue y se muestra en la plantilla.
-->

<template>
  <div id="app">
    <NetworkCheck />
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
    <MadyBot_Vue />
  </div>
</template>

<script>
import MadyBot_Vue from './components/MadyBot_Vue.vue';
import NetworkCheck from './components/NetworkCheck.vue';

export default {
  components: {
    MadyBot_Vue,
    NetworkCheck
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    menuAction(action) {
      console.log(`Selected: ${action}`);
      this.isMenuOpen = false;
    }
  }
};
</script>

