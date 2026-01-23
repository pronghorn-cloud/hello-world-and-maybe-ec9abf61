<template>
  <div id="app-container">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Application Header -->
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">Hello World App</h1>
        <nav class="app-nav" aria-label="Main navigation">
          <router-link to="/" class="nav-link">
            <span class="nav-icon" aria-hidden="true">🏠</span>
            Home
          </router-link>
        </nav>
      </div>
    </header>
    
    <!-- Main Content Area -->
    <main id="main-content" class="app-main" role="main">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    
    <!-- Application Footer -->
    <footer class="app-footer">
      <p class="footer-text">&copy; {{ currentYear }} Hello World App. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
/**
 * App Component
 * Root application component using Vue 3 Composition API
 * Implements Alberta Design System styling
 */
import { computed } from 'vue'

// Compute current year for footer
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* App Container */
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header Styles - Alberta Design System */
.app-header {
  background-color: var(--ads-color-primary);
  color: var(--ads-text-inverse);
  padding: var(--ads-spacing-md) var(--ads-spacing-xl);
  box-shadow: var(--ads-shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--ads-spacing-md);
}

.app-title {
  margin: 0;
  font-size: var(--ads-font-size-xl);
  font-weight: var(--ads-font-weight-bold);
  color: var(--ads-text-inverse);
}

/* Navigation Styles */
.app-nav {
  display: flex;
  gap: var(--ads-spacing-md);
}

.nav-link {
  color: var(--ads-text-inverse);
  text-decoration: none;
  padding: var(--ads-spacing-sm) var(--ads-spacing-md);
  border-radius: var(--ads-radius-md);
  transition: background-color var(--ads-transition-fast);
  display: flex;
  align-items: center;
  gap: var(--ads-spacing-sm);
  font-weight: var(--ads-font-weight-medium);
}

.nav-link:hover,
.nav-link:focus {
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--ads-text-inverse);
}

.nav-link:focus {
  outline: 2px solid var(--ads-text-inverse);
  outline-offset: 2px;
}

.nav-icon {
  font-size: var(--ads-font-size-md);
}

/* Main Content Area */
.app-main {
  flex: 1;
  padding: var(--ads-spacing-xl);
  background-color: var(--ads-bg-secondary);
}

/* Footer Styles */
.app-footer {
  background-color: var(--ads-color-secondary);
  color: var(--ads-text-inverse);
  text-align: center;
  padding: var(--ads-spacing-md);
}

.footer-text {
  margin: 0;
  font-size: var(--ads-font-size-sm);
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity var(--ads-transition-normal), 
              transform var(--ads-transition-normal);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Styles */
@media (max-width: 600px) {
  .app-header {
    padding: var(--ads-spacing-md);
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .app-title {
    font-size: var(--ads-font-size-lg);
  }
  
  .app-main {
    padding: var(--ads-spacing-md);
  }
}
</style>
