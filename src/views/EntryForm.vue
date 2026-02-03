<template>
  <div class="entry-form">
    <div class="goa-card">
      <h1>Welcome</h1>
      <p>Please enter your name to receive a personalized greeting.</p>
      
      <form @submit.prevent="handleSubmit" novalidate>
        <div class="goa-form-group">
          <label for="name" class="goa-label goa-label--required">
            Your Name
          </label>
          <input
            id="name"
            v-model.trim="name"
            type="text"
            class="goa-input"
            :class="{ 'goa-input--error': errorMessage }"
            :aria-invalid="!!errorMessage"
            :aria-describedby="errorMessage ? 'name-error' : undefined"
            autocomplete="name"
            placeholder="Enter your full name"
            @input="clearError"
          />
          <div v-if="errorMessage" id="name-error" class="goa-error-message" role="alert">
            {{ errorMessage }}
          </div>
        </div>
        
        <button type="submit" class="goa-button goa-button--primary">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const errorMessage = ref('')

/**
 * Sanitizes user input by removing potentially harmful characters
 * @param {string} input - The raw user input
 * @returns {string} - Sanitized string
 */
function sanitizeInput(input) {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>"'&]/g, '') // Remove special characters
    .trim()
    .slice(0, 100) // Limit length
}

/**
 * Validates the name field
 * @returns {boolean} - True if valid
 */
function validateName() {
  if (!name.value) {
    errorMessage.value = 'Name is required. Please enter your name.'
    return false
  }
  
  if (name.value.length < 2) {
    errorMessage.value = 'Name must be at least 2 characters long.'
    return false
  }
  
  return true
}

/**
 * Clears error message when user starts typing
 */
function clearError() {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}

/**
 * Handles form submission
 */
function handleSubmit() {
  if (validateName()) {
    const sanitizedName = sanitizeInput(name.value)
    
    // Store name in sessionStorage for the response page
    sessionStorage.setItem('userName', sanitizedName)
    
    // Navigate to response page
    router.push({ name: 'ResponseForm' })
  }
}
</script>

<style scoped>
.entry-form {
  max-width: 600px;
  margin: 0 auto;
}

.entry-form h1 {
  color: var(--goa-color-primary-dark);
}

.entry-form p {
  color: var(--goa-color-greyscale-700);
  margin-bottom: var(--goa-space-xl);
}

@media (max-width: 480px) {
  .entry-form .goa-card {
    padding: var(--goa-space-lg);
  }
}
</style>