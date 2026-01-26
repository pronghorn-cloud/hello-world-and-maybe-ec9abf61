<script setup>
/**
 * WelcomePage Component
 * @requirement E-001 HelloWorld Entry Form
 * @description Entry form page with Name and Date fields
 * 
 * Requirements Implemented:
 * - E-001-F-006: Form validation (required fields for Name and Date)
 * - E-001-F-007: Error handling and user feedback
 * - E-003-F-001: Data capture for ResponsePage
 * - E-003-F-005: Input validation and sanitization
 * 
 * @standard DS-XX3 - Uses H1Header component
 * @techstack TS-001 - Vue 3.5.24 Composition API, JavaScript only
 */

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import H1Header from '../components/H1Header.vue'

const router = useRouter()

// Form fields - E-001: Field 1 (Name) and Field 2 (Date)
const name = ref('')
const date = ref('')

// Error states for E-001-F-007: User feedback
const nameError = ref('')
const dateError = ref('')
const formError = ref('')

/**
 * E-003-F-005: Input validation and sanitization
 * Sanitizes user input to prevent XSS and limit data length
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>"'&]/g, '') // Remove potentially harmful characters
    .substring(0, 100) // Limit length
}

/**
 * E-001-F-006: Form validation for Name field
 * Validates that name is required, minimum 2 characters, letters only
 * @returns {boolean} Validation result
 */
const validateName = () => {
  const sanitized = sanitizeInput(name.value)
  if (!sanitized) {
    nameError.value = 'Name is required'
    return false
  }
  if (sanitized.length < 2) {
    nameError.value = 'Name must be at least 2 characters'
    return false
  }
  if (!/^[a-zA-Z\s-]+$/.test(sanitized)) {
    nameError.value = 'Name can only contain letters, spaces, and hyphens'
    return false
  }
  nameError.value = ''
  return true
}

/**
 * E-001-F-006: Form validation for Date field
 * Validates that date is required and valid
 * @returns {boolean} Validation result
 */
const validateDate = () => {
  if (!date.value) {
    dateError.value = 'Date is required'
    return false
  }
  const selectedDate = new Date(date.value)
  
  if (isNaN(selectedDate.getTime())) {
    dateError.value = 'Please enter a valid date'
    return false
  }
  dateError.value = ''
  return true
}

/**
 * Computed property to check if form is valid for button state
 * @returns {boolean} Form validity status
 */
const isFormValid = computed(() => {
  return name.value.trim().length >= 2 && date.value !== ''
})

/**
 * E-001-F-007: Error handling and user feedback
 * E-003-F-001: Capture and store form data for ResponsePage
 * Handles form submission with validation and data persistence
 */
const handleSubmit = () => {
  formError.value = ''
  
  const isNameValid = validateName()
  const isDateValid = validateDate()
  
  // E-001-F-007: Display validation errors
  if (!isNameValid || !isDateValid) {
    formError.value = 'Please correct the errors above'
    return
  }
  
  try {
    // E-003-F-001: Capture and store form data
    const formData = {
      name: sanitizeInput(name.value),
      date: date.value,
      timestamp: Date.now()
    }
    
    sessionStorage.setItem('formData', JSON.stringify(formData))
    
    // Navigate to response page
    router.push({ name: 'Response' })
  } catch (error) {
    // E-001-F-007: Error handling
    formError.value = 'An error occurred. Please try again.'
    console.error('Form submission error:', error)
  }
}

/**
 * Clear name error on input for better UX
 */
const clearNameError = () => {
  if (nameError.value) nameError.value = ''
  if (formError.value) formError.value = ''
}

/**
 * Clear date error on input for better UX
 */
const clearDateError = () => {
  if (dateError.value) dateError.value = ''
  if (formError.value) formError.value = ''
}
</script>

<template>
  <main class="container">
    <article class="card">
      <!-- DS-XX3: H1Header component -->
      <H1Header text="Welcome" />
      
      <form @submit.prevent="handleSubmit" novalidate aria-label="Welcome form">
        <!-- E-001-F-007: General Form Error Alert -->
        <div v-if="formError" class="error-alert" role="alert" aria-live="polite">
          {{ formError }}
        </div>
        
        <!-- E-001-F-006: Field 1 - Name (Required) -->
        <div class="form-group">
          <label for="name" class="form-label">
            Name <span aria-label="required">*</span>
          </label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="form-input"
            :class="{ error: nameError }"
            :aria-invalid="!!nameError"
            :aria-describedby="nameError ? 'name-error' : undefined"
            placeholder="Enter your name"
            @input="clearNameError"
            @blur="validateName"
            autocomplete="name"
            maxlength="100"
            required
          />
          <p 
            v-if="nameError" 
            id="name-error" 
            class="error-message" 
            role="alert" 
            aria-live="polite"
          >
            {{ nameError }}
          </p>
        </div>
        
        <!-- E-001-F-006: Field 2 - Date (Required) -->
        <div class="form-group">
          <label for="date" class="form-label">
            Date <span aria-label="required">*</span>
          </label>
          <input
            id="date"
            v-model="date"
            type="date"
            class="form-input"
            :class="{ error: dateError }"
            :aria-invalid="!!dateError"
            :aria-describedby="dateError ? 'date-error' : undefined"
            @input="clearDateError"
            @blur="validateDate"
            required
          />
          <p 
            v-if="dateError" 
            id="date-error" 
            class="error-message" 
            role="alert" 
            aria-live="polite"
          >
            {{ dateError }}
          </p>
        </div>
        
        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="!isFormValid"
          :aria-disabled="!isFormValid"
        >
          Submit
        </button>
      </form>
    </article>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn-primary {
  margin-top: 1rem;
}
</style>
