<template>
  <button class="back-button btn btn-secondary" @click="handleBack">
    <span class="back-icon">←</span>
    <span class="back-text">{{ text }}</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  text: {
    type: String,
    default: 'Back'
  },
  to: {
    type: String,
    default: '/'
  }
})

const router = useRouter()

const handleBack = () => {
  router.push(props.to)
}
</script>

<style scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.back-icon {
  font-size: 1.2rem;
}

.back-text {
  font-size: 1rem;
}
</style>
