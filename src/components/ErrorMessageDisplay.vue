<script setup>
/**
 * ErrorMessageDisplay Component
 * Displays validation errors or API errors using GOA callout
 */
defineOptions({
  name: 'ErrorMessageDisplay',
});

defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'Please correct the following errors',
  },
});
</script>

<template>
  <goa-callout
    v-if="errors.length > 0"
    type="emergency"
    :heading="title"
    role="alert"
    aria-live="polite"
  >
    <ul class="error-list">
      <li
        v-for="(error, index) in errors"
        :key="index"
        class="error-item"
      >
        {{ error }}
      </li>
    </ul>
  </goa-callout>
</template>

<style scoped>
.error-list {
  margin: 0;
  padding-left: 1.25rem;
}

.error-item {
  margin-bottom: 0.25rem;
}

.error-item:last-child {
  margin-bottom: 0;
}
</style>
