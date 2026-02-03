<template>
  <div class="goa-entry-form">
    <div class="goa-card">
      <h1 class="goa-entry-form__title">Welcome</h1>
      <p class="goa-entry-form__intro">Please enter your name to receive a personalized greeting.</p>
      
      <form @submit.prevent="handleSubmit" novalidate class="goa-form">
        <div class="goa-form-group">
          <label for="name" class="goa-label goa-label--required">
            Your Name
          </label>
          <span id="name-hint" class="goa-hint">Enter your first and last name</span>
          <input
            id="name"
            v-model.trim="name"
            type="text"
            class="goa-input"
            :class="{ 'goa-input--error': errorMessage }"
            :aria-invalid="errorMessage ? 'true' : 'false'"
            :aria-describedby="getAriaDescribedBy"
            autocomplete="name"
            @input="clearError"
          />
          <div 
            v-if="errorMessage" 
            id="name-error" 
            class="goa-error-message" 
            role="alert" 
            aria-live="polite"
          >
            {{ errorMessage }}
          </div>
        </div>
        
        <div class="goa-form__actions">
          <button type="submit" class="goa-button goa-button--primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// GOA Entry Form - Strictly follows GOA Design System standards

const router = useRouter()

const name = ref('')
const errorMessage = ref('')

/**
 * Computes aria-describedby value based on current state
 */
const getAriaDescribedBy = computed(() => {
  const ids = ['name-hint']
  if (errorMessage.value) {
    ids.push('name-error')
  }
  return ids.join(' ')
})

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
    errorMessage.value = 'Enter your name'
    return false
  }
  
  if (name.value.length < 2) {
    errorMessage.value = 'Name must be at least 2 characters'
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
.goa-entry-form {
  max-width: 600px;
  margin: 0 auto;
}

.goa-entry-form__title {
  color: var(--goa-color-text);
  margin-bottom: var(--goa-space-sm);
}

.goa-entry-form__intro {
  color: var(--goa-color-text-secondary);
  margin-bottom: var(--goa-space-lg);
  font-size: var(--goa-font-size-lg);
}

.goa-form__actions {
  margin-top: var(--goa-space-lg);
  padding-top: var(--goa-space-md);
}

@media (max-width: 480px) {
  .goa-entry-form .goa-card {
    padding: var(--goa-space-md);
  }
}
</style>
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