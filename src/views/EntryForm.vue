<template>
  <div class="goa-entry-form">
    <div class="goa-card">
      <h1 class="goa-entry-form__title">Welcome</h1>
      <p class="goa-entry-form__intro">Enter your name to receive a personalized greeting.</p>
      
      <form @submit.prevent="handleSubmit" novalidate class="goa-form">
        <div class="goa-form-group">
          <label for="name" class="goa-label goa-label--required">
            Your name
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

/**
 * GOA Entry Form Component
 * 
 * Compliance:
 * - ADS-001: WCAG 2.2 AA accessible form with proper labels, hints, and error handling
 * - ADS-003: Clear, human-centered content and instructions
 * - ADS-004: Uses GOA design tokens for all visual styling
 * - ADS-005: Follows GOA Design System form patterns
 * - ADS-006: Semantic HTML with proper form structure
 * - ADS-007: Logical information hierarchy (title > intro > form > action)
 * - ADS-008: Form validation and state management
 * - ADS-010: Supplementary styling using GOA CSS custom properties
 */

const router = useRouter()

const name = ref('')
const errorMessage = ref('')

/**
 * ADS-001: Computes aria-describedby value for accessibility
 * Links input to hint text and error message when present
 */
const getAriaDescribedBy = computed(() => {
  const ids = ['name-hint']
  if (errorMessage.value) {
    ids.push('name-error')
  }
  return ids.join(' ')
})

/**
 * ADS-008: Sanitizes user input for security
 * @param {string} input - The raw user input
 * @returns {string} - Sanitized string
 */
function sanitizeInput(input) {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'&]/g, '')
    .trim()
    .slice(0, 100)
}

/**
 * ADS-003: Validates with clear, human-centered error messages
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
 * ADS-008: Clears error state when user begins correcting input
 */
function clearError() {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}

/**
 * ADS-008: Handles form submission with validation
 */
function handleSubmit() {
  if (validateName()) {
    const sanitizedName = sanitizeInput(name.value)
    sessionStorage.setItem('userName', sanitizedName)
    router.push({ name: 'ResponseForm' })
  }
}
</script>

<style scoped>
/* ADS-007: Content container with appropriate max-width for readability */
.goa-entry-form {
  max-width: 600px;
  margin: 0 auto;
}

/* ADS-004: Design Tokens - Typography hierarchy */
.goa-entry-form__title {
  color: var(--goa-color-text);
  margin-bottom: var(--goa-space-sm);
}

/* ADS-003: Introductory text with secondary color for hierarchy */
.goa-entry-form__intro {
  color: var(--goa-color-text-secondary);
  margin-bottom: var(--goa-space-lg);
  font-size: var(--goa-font-size-lg);
}

/* ADS-004: Design Tokens - Spacing for form actions */
.goa-form__actions {
  margin-top: var(--goa-space-lg);
  padding-top: var(--goa-space-md);
}

/* ADS-005: Responsive adjustments */
@media (max-width: 480px) {
  .goa-entry-form .goa-card {
    padding: var(--goa-space-md);
  }
}
</style>