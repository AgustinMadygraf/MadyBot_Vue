<template>
  <div id="app">
    <NetworkCheck />
    <NavBar />
    <MenuTabs />
  </div>
</template>

<script>
import NetworkCheck from './components/NetworkCheck.vue';
import NavBar from './components/NavBar.vue';
import MenuTabs from './components/MenuTabs.vue';

export default {
  components: {
    NetworkCheck,
    NavBar,
    MenuTabs,
  },
};
</script>
