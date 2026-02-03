<template>
  <div class="response-message">
    <p class="greeting">{{ message }}</p>
  </div>
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
.response-message {
  background: linear-gradient(135deg, #e8f4fd 0%, #d4e9f7 100%);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin: 2rem 0;
  box-shadow: 0 4px 15px rgba(74, 144, 217, 0.1);
}

.greeting {
  font-size: 1.5rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .response-message {
    padding: 1.5rem;
  }

  .greeting {
    font-size: 1.25rem;
  }
}
</style>
