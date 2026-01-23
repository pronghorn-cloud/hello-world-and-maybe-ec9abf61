<script setup>
/**
 * AppFooter Component
 * 
 * Application footer with Government of Alberta copyright.
 * Follows accessibility and design system standards.
 * 
 * @component
 */
import { computed } from 'vue'
import { APP_CONFIG } from '@/constants'

defineProps({
  /**
   * Show copyright text
   */
  showCopyright: {
    type: Boolean,
    default: true
  }
})

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="app-footer" role="contentinfo">
    <div class="app-footer__container">
      <div v-if="$slots.default" class="app-footer__content">
        <slot />
      </div>
      
      <div v-if="$slots.links" class="app-footer__links">
        <slot name="links" />
      </div>

      <p v-if="showCopyright" class="app-footer__copyright">
        © {{ currentYear }} {{ APP_CONFIG.organization }}. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: var(--goa-grey-light);
  color: var(--goa-grey);
  padding: 1.5rem;
  margin-top: auto;
}

.app-footer__container {
  max-width: 1200px;
  margin: 0 auto;
}

.app-footer__content {
  margin-bottom: 1rem;
}

.app-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.app-footer__links a {
  color: var(--goa-blue);
  text-decoration: none;
  font-size: 0.875rem;
}

.app-footer__links a:hover {
  text-decoration: underline;
}

.app-footer__copyright {
  font-size: 0.875rem;
  margin: 0;
}

/* Responsive */
@media (max-width: 640px) {
  .app-footer {
    padding: 1rem;
  }

  .app-footer__links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
