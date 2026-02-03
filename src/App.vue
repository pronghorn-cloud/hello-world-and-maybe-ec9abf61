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

// GOA App Layout - Strictly follows GOA Design System standards
</script>

<style scoped>
.goa-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.goa-main {
  flex: 1 0 auto;
  padding: var(--goa-space-lg) 0;
}

.goa-main:focus {
  outline: none;
}

.goa-main__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--goa-space-sm);
  width: 100%;
}

@media (min-width: 768px) {
  .goa-main {
    padding: var(--goa-space-xl) 0;
  }
  
  .goa-main__container {
    padding: 0 var(--goa-space-md);
  }
}
</style>
    padding: 3rem 2rem;
  }
}
</style>