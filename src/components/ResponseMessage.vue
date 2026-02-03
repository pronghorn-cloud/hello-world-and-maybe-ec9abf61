<script setup>
/**
 * ResponseMessage Component
 * Displays the greeting response message
 */
defineOptions({
  name: 'ResponseMessage',
});

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <goa-callout
    type="success"
    heading="Greeting"
  >
    <p class="response-text">{{ message }}</p>
  </goa-callout>
</template>

<style scoped>
.response-text {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
