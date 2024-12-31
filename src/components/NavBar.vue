<!-- Path: src/components/NavBar.vue -->
<template>
    <nav class="navbar">
      <div class="navbar-container">
        <h1>Project Name</h1>
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
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #007bff;
    color: white;
  }
  .navbar-menu {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  .navbar-menu li {
    display: inline;
  }
  .navbar-menu a {
    color: white;
    text-decoration: none;
  }
  </style>