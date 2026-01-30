<script setup>
/**
 * H1Header Component
 * @standard Alberta Design System (ADS)
 * @description Reusable H1 component for page headers - H1 is exclusive to page titles
 * @prop {String} text - Required. The header text to display
 * 
 * Alberta Design System Compliance:
 * - H1 is exclusive to page titles (one per page)
 * - Typography: Acumin Pro Semi Condensed, 2.25rem desktop
 * - Brand color accent border (#0070C4 - ADS Blue)
 * - Responsive: 768px tablet, 480px mobile breakpoints
 * - Focus state: #FEBA35 for interactive elements
 * - WCAG 2.1 AA accessibility compliance
 */

const props = defineProps({
  text: {
    type: String,
    required: true,
    validator: (value) => value.trim().length > 0
  }
})
</script>

<template>
  <header class="header-wrapper">
    <h1 class="page-header">
      {{ text }}
    </h1>
  </header>
</template>

<style scoped>
.header-wrapper {
  width: 100%;
}

/* Alberta Design System: H1 Page Title
   H1 is exclusive to page title - only one per page */
.page-header {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-h1);
  font-weight: var(--ads-font-weight-bold);
  color: var(--ads-text-primary);
  margin: 0 0 var(--ads-space-md) 0;
  padding-bottom: var(--ads-space-xs);
  border-bottom: 3px solid var(--ads-blue);
  text-align: center;
  line-height: 1.2;
}

/* Alberta Design System: Tablet breakpoint (768px) */
@media (max-width: 768px) {
  .page-header {
    margin-bottom: var(--ads-space-sm);
  }
}

/* Alberta Design System: Mobile breakpoint (480px) */
@media (max-width: 480px) {
  .page-header {
    padding-bottom: 6px;
  }
}
</style>
