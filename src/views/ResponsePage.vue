<template>
  <div class="response-page">
    <h1>Hello, {{ name }}!</h1>
    <p class="greeting-message">Welcome to our application.</p>
    <p class="date-info">You selected the date: <strong>{{ formattedDate }}</strong></p>
    
    <button @click="goBack" class="back-btn">Go Back</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const name = computed(() => route.query.name || 'Guest')
const date = computed(() => route.query.date || '')

const formattedDate = computed(() => {
  if (!date.value) return 'Not specified'
  const dateObj = new Date(date.value)
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const goBack = () => {
  router.push({ name: 'Welcome' })
}
</script>

<style scoped>
.response-page {
  text-align: center;
  padding: 40px 20px;
}

.response-page h1 {
  color: #4CAF50;
  font-size: 2.5em;
  margin-bottom: 20px;
}

.greeting-message {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 15px;
}

.date-info {
  font-size: 1.1em;
  color: #333;
  margin-bottom: 30px;
}

.back-btn {
  padding: 12px 30px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.back-btn:hover {
  background-color: #1976D2;
}
</style>
