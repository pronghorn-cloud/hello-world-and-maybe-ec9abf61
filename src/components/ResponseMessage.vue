<template>
  <goa-callout type="success" heading="Welcome!">
    {{ message }}
  </goa-callout>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

const message = computed(() => {
  return `Hello ${props.name}! Today's date is ${props.date}.`
})
</script>

<style scoped>
/* GOA callout component is pre-styled - no custom styles needed */
</style>


@media (max-width: 768px) {
  .response-message {
    padding: 1.5rem;
  }

  .greeting {
    font-size: 1.25rem;
  }
}
</style>
