<!--
Path: src/App.vue
Este es el componente principal de la aplicación. Aquí se importa el componente MadyBot_Vue y se muestra en la plantilla.
-->

<template>
  <div id="app">
    <MadyBot_Vue />
  </div>
</template>

<script>
import MadyBot_Vue from './components/MadyBot_Vue.vue';

export default {
  components: {
    MadyBot_Vue
  }
};
</script>
