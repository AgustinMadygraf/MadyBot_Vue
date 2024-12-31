<!-- 
 Path: src/components/NavBar.vue 
 Este componente se encarga de mostrar la barra de navegación de la aplicación.
 -->

<template>
    <nav class="navbar">
      <div class="navbar-container">
        <ul class="navbar-menu">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#dev">Dev</a></li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  };
  </script>
