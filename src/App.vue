<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <div class="header-content">
        <h1>HelloWorld</h1>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>&copy; {{ new Date().getFullYear() }} HelloWorld App</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #0070c4;
  color: #fff;
  padding: 1rem 1.5rem;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.header-content h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.main-content {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  width: 100%;
}

.app-footer {
  background-color: #f0f0f0;
  color: #666;
  padding: 1.5rem;
  margin-top: auto;
}

.app-footer p {
  max-width: 800px;
  margin: 0 auto;
  font-size: 0.875rem;
}
</style>
