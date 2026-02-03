<template>
  <div class="goa-app">
    <AppHeader />
    <main id="main-content" class="goa-main" role="main" tabindex="-1">
      <div class="goa-main__container">
        <router-view />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

/**
 * GOA Application Layout
 * 
 * Compliance:
 * - ADS-001: Skip link target, keyboard-accessible main content area
 * - ADS-005: Standard GOA page layout (header, main, footer)
 * - ADS-006: Semantic HTML with proper landmarks (main, role="main")
 * - ADS-007: Consistent information architecture across pages
 * - ADS-009: Orchestrates header, content, and footer components
 * - ADS-010: Layout styling using GOA CSS custom properties
 */
</script>

<style scoped>
/* ADS-005: GOA standard page layout with sticky footer */
.goa-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ADS-004: Design Tokens - Spacing for main content area */
.goa-main {
  flex: 1 0 auto;
  padding: var(--goa-space-lg) 0;
}

/* ADS-001: Remove focus outline when skip link targets main */
.goa-main:focus {
  outline: none;
}

/* ADS-007: Content container with max-width for readability */
.goa-main__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--goa-space-sm);
  width: 100%;
}

/* ADS-005: Responsive spacing adjustments */
@media (min-width: 768px) {
  .goa-main {
    padding: var(--goa-space-xl) 0;
  }
  
  .goa-main__container {
    padding: 0 var(--goa-space-md);
  }
}
</style>