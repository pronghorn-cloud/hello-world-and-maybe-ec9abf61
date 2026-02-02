<template>
  <div id="app-container">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #0070C4;
  color: #FFFFFF;
  padding: 8px 16px;
  z-index: 1000;
  text-decoration: none;
  font-family: 'acumin-pro-semi-condensed', sans-serif;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid #FEBA35;
  outline-offset: 2px;
}
</style>
