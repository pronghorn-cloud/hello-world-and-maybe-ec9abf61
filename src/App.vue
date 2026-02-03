<template>
  <div class="goa-flex-column">
    <AppHeader />
    <main class="goa-flex-grow">
      <div class="goa-layout-container">
        <router-view />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style scoped>
/* Layout handled by GOA utility classes - no additional styles needed */
</style>

}
</style>
