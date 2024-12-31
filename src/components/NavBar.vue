<!-- Path: src/components/NavBar.vue -->
<template>
    <nav class="navbar">
      <div class="navbar-container">
        <h1>Project Name</h1>
        <div>
          <button @click="toggleDevMode" class="navbar-button">
            {{ isDevMode ? 'Salir del Modo Dev' : 'Activar Modo Dev' }}
          </button>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    data() {
      return {
        isDevMode: false
      };
    },
    methods: {
      toggleDevMode() {
        this.isDevMode = !this.isDevMode;
        this.$emit('dev-mode-changed', this.isDevMode);
      }
    }
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
  .navbar-button {
    background-color: white;
    color: #007bff;
    padding: 0.5rem 1rem;
    border: none;
    cursor: pointer;
  }
  .navbar-button:hover {
    background-color: #0056b3;
    color: white;
  }
  </style>
  