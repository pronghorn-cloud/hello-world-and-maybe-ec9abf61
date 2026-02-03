<template>
  <goa-callout v-if="message" type="emergency" heading="Error" role="alert">
    {{ message }}
  </goa-callout>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
/* GOA callout component is pre-styled - no custom styles needed */
</style>

}

.error-text {
  font-size: 0.95rem;
  font-weight: 500;
}
</style>
