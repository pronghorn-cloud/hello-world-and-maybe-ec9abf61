<template>
  <footer class="app-footer">
    <p>&copy; {{ currentYear }} HelloWorld App. All rights reserved.</p>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  background-color: #333;
  color: #aaa;
  text-align: center;
  padding: 1rem 2rem;
  margin-top: auto;
}

.app-footer p {
  margin: 0;
  font-size: 0.875rem;
}
</style>
