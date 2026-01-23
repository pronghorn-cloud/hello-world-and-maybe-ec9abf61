<script setup>
/**
 * App Component - Root Application Component
 * 
 * Main application wrapper with header, footer, and router view.
 * Implements Government of Alberta Design System standards.
 * 
 * @component
 */
import { RouterView } from 'vue-router'
import { AppHeader, AppFooter, SkipLink } from '@/components/layout'
</script>

<template>
  <div class="app">
    <!-- Skip Link for Accessibility (WCAG 2.4.1) -->
    <SkipLink target-id="main-content" />

    <!-- Header -->
    <AppHeader title="HelloWorld" />

    <!-- Main Content Area -->
    <main id="main-content" class="app__main" tabindex="-1">
      <div class="app__container">
        <RouterView />
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app__main {
  flex: 1;
  padding: 2rem 1.5rem;
}

.app__main:focus {
  outline: none;
}

.app__container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive */
@media (max-width: 640px) {
  .app__main {
    padding: 1.5rem 1rem;
  }
}
</style>
