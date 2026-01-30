<script setup>
/**
 * App.vue - Root Component
 * @standard Alberta Design System (ADS)
 * @description Main application wrapper with accessibility features
 * 
 * ADS Compliance:
 * - Skip link for keyboard navigation
 * - Proper document structure
 * - Focus management support
 */
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="ads-app">
    <!-- ADS: Skip link for keyboard accessibility -->
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>
    
    <!-- Main application content -->
    <div id="main-content" tabindex="-1">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
/**
 * Alberta Design System - App Container
 */
.ads-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--ads-background, #F1F1F1);
}

#main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Remove focus outline when not using keyboard */
#main-content:focus {
  outline: none;
}

/* ADS: Skip link styles */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--ads-space-sm, 1rem);
  background-color: var(--ads-blue, #0070C4);
  color: var(--ads-background-white, #FFFFFF);
  padding: var(--ads-space-xs, 0.5rem) var(--ads-space-sm, 1rem);
  border-radius: var(--ads-radius-sm, 4px);
  text-decoration: none;
  font-weight: var(--ads-font-weight-semibold, 600);
  z-index: 9999;
  transition: top 0.2s ease-in-out;
}

.skip-link:focus {
  top: var(--ads-space-sm, 1rem);
  outline: 3px solid var(--ads-focus, #FEBA35);
  outline-offset: 2px;
}
</style>