<script setup>
/**
 * App.vue - Root Component
 * @standard Alberta Design System (ADS)
 * @version 2.0.0 - Rebuilt Visual Components
 * @description Main application wrapper with accessibility features
 * 
 * ADS Compliance:
 * - Skip link for keyboard navigation
 * - Proper document structure
 * - Focus management support
 * - Smooth page transitions
 */
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)

onMounted(() => {
  // Trigger fade-in animation after mount
  setTimeout(() => {
    isLoaded.value = true
  }, 50)
})
</script>

<template>
  <div class="ads-app" :class="{ 'is-loaded': isLoaded }">
    <!-- ADS: Skip link for keyboard accessibility -->
    <a href="#main-content" class="skip-link">
      Skip to main content
    </a>
    
    <!-- Main application content -->
    <main id="main-content" class="main-content" tabindex="-1">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    
    <!-- App footer -->
    <footer class="app-footer">
      <p class="footer-text">Alberta Design System Compliant</p>
    </footer>
  </div>
</template>

<style scoped>
/**
 * Alberta Design System - App Container
 * Rebuilt with enhanced visual styling
 */
.ads-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, var(--ads-background) 0%, var(--ads-background-alt) 100%);
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.ads-app.is-loaded {
  opacity: 1;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Remove focus outline when not using keyboard */
.main-content:focus {
  outline: none;
}

/* ADS: Skip link styles */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--ads-space-sm);
  background-color: var(--ads-blue);
  color: var(--ads-text-inverse);
  padding: var(--ads-space-xs) var(--ads-space-sm);
  border-radius: var(--ads-radius-md);
  text-decoration: none;
  font-weight: var(--ads-font-weight-semibold);
  z-index: var(--ads-z-toast);
  transition: top 0.2s ease-in-out;
  box-shadow: var(--ads-shadow-lg);
}

.skip-link:focus {
  top: var(--ads-space-sm);
  outline: var(--ads-focus-outline);
  outline-offset: var(--ads-focus-offset);
}

/* App Footer */
.app-footer {
  padding: var(--ads-space-sm) var(--ads-space-md);
  text-align: center;
  border-top: 1px solid var(--ads-border-light);
  background-color: var(--ads-background-white);
}

.footer-text {
  margin: 0;
  font-size: var(--ads-font-size-small);
  color: var(--ads-text-muted);
}

/* Page Transition Animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .app-footer {
    padding: var(--ads-space-xs) var(--ads-space-sm);
  }
  
  .footer-text {
    font-size: var(--ads-font-size-xs);
  }
}
</style>

}
</style>