<script setup>
/**
 * SkipLink Component
 * 
 * Accessibility component for keyboard users to skip navigation.
 * WCAG 2.1 AA requirement for bypass blocks (2.4.1).
 * 
 * @component
 */
import { A11Y } from '@/constants'

defineProps({
  /**
   * Target element ID to skip to
   */
  targetId: {
    type: String,
    default: 'main-content'
  },
  /**
   * Link text for screen readers
   */
  text: {
    type: String,
    default: A11Y.SKIP_TO_CONTENT
  }
})
</script>

<template>
  <a :href="`#${targetId}`" class="skip-link">
    {{ text }}
  </a>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 9999;
  padding: 1rem 1.5rem;
  background-color: var(--goa-blue);
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0 0 4px 0;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid var(--goa-gold);
  outline-offset: 2px;
}
</style>
