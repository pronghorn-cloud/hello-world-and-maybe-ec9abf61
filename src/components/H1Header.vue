<script setup>
/**
 * H1Header Component
 * @standard DS-XX3
 * @description Reusable H1 component for page headers following DS-XX3 design standard
 * @prop {String} text - Required. The header text to display
 * 
 * DS-XX3 Compliance:
 * - Consistent typography (2rem desktop, 1.5rem tablet, 1.25rem mobile)
 * - Brand color accent border (#4a90d9)
 * - Responsive design with breakpoints at 768px and 480px
 * - Accessible with proper semantic HTML
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
    <h1 class="page-header" role="heading" aria-level="1">
      {{ text }}
    </h1>
  </header>
</template>

<style scoped>
.header-wrapper {
  width: 100%;
}

.page-header {
  font-size: 2rem;
  font-weight: 700;
  color: #333333;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #4a90d9;
  text-align: center;
  line-height: 1.2;
}

/* DS-XX3: Tablet breakpoint */
@media (max-width: 768px) {
  .page-header {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

/* DS-XX3: Mobile breakpoint */
@media (max-width: 480px) {
  .page-header {
    font-size: 1.25rem;
    padding-bottom: 0.375rem;
  }
}
</style>