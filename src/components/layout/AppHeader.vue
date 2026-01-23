<script setup>
/**
 * AppHeader Component
 * 
 * Application header with Government of Alberta branding.
 * Includes navigation and accessibility features.
 * 
 * @component
 */
import { APP_CONFIG } from '@/constants'

defineProps({
  /**
   * Application title displayed in header
   */
  title: {
    type: String,
    default: APP_CONFIG.name
  }
})
</script>

<template>
  <header class="app-header" role="banner">
    <div class="app-header__container">
      <div class="app-header__brand">
        <h1 class="app-header__title">{{ title }}</h1>
      </div>
      <nav v-if="$slots.navigation" class="app-header__nav" aria-label="Main navigation">
        <slot name="navigation" />
      </nav>
      <div v-if="$slots.actions" class="app-header__actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--goa-blue);
  color: #ffffff;
  padding: 0 1.5rem;
  min-height: 64px;
  display: flex;
  align-items: center;
}

.app-header__container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-header__title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Responsive */
@media (max-width: 640px) {
  .app-header {
    padding: 0 1rem;
    min-height: 56px;
  }

  .app-header__title {
    font-size: 1.25rem;
  }
}
</style>
