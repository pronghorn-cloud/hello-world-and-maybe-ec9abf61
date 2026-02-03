<template>
  <div v-if="message" class="error-display" role="alert">
    <span class="error-icon">⚠️</span>
    <span class="error-text">{{ message }}</span>
  </div>
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
.error-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #fdeaea;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  color: #721c24;
}

.error-icon {
  font-size: 1.25rem;
}

.error-text {
  font-size: 0.95rem;
  font-weight: 500;
}
</style>
