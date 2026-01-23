<script setup>
/**
 * H1Header Component - DS-XX3 Standard
 * Reusable H1 component for page headers
 */
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <h1 class="page-header">{{ text }}</h1>
</template>

<style scoped>
.page-header {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #4a90d9;
  text-align: center;
}

@media (max-width: 768px) {
  .page-header {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    font-size: 1.25rem;
  }
}
</style>