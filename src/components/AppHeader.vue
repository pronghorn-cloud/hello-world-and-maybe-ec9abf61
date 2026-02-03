<template>
  <header class="app-header">
    <h1 class="header-title">HelloWorld App</h1>
  </header>
</template>

<script setup>
// AppHeader component - displays the application header
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #4a90d9 0%, #357abd 100%);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1rem;
  }

  .header-title {
    font-size: 1.5rem;
  }
}
</style>
