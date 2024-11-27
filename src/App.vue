<!--
Path: src/App.vue
Este es el componente principal de la aplicación. Aquí se importa el componente MadyBot_Vue y se muestra en la plantilla.
-->

<template>
  <div id="app">
    <div class="menu-container">
      <button @click="toggleMenu" class="menu-button">⋮</button>
      <div v-if="isMenuOpen" class="menu">
        <ul>
          <li>
            <a @click="menuAction('Sistema de Gestión de Calidad')" href="/iso-9001-comercializacion/dist/index.html" target="_blank">
              Sistema de Gestión de Calidad
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
export default {
  components: {
    MadyBot_Vue
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

<style>
.menu-container {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white; /* Asegúrate de que el fondo sea visible */
  padding: 5px; /* Añade algo de espacio alrededor del botón */
  border: 1px solid #ccc; /* Añade un borde para que sea más visible */
}

.menu-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>