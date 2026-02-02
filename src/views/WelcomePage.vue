<script setup>
/**
 * WelcomePage Component
 * @standard Alberta Design System (ADS)
 * @version 2.1.0 - Rebuilt with strict ADS compliance
 * @description Entry form page with Name and Date fields
 * 
 * Requirements:
 * - E-001-F-006: Form validation (required fields for Name and Date)
 * - E-001-F-007: Error handling and user feedback
 * - E-003-F-001: Data capture for ResponsePage
 * - E-003-F-005: Input validation and sanitization
 * 
 * Alberta Design System Compliance:
 * - All colors from ADS CSS variables (--ads-*)
 * - Focus state #FEBA35 for all interactive elements
 * - Full component states (hover, focus, error, disabled)
 * - WCAG 2.1 AA accessibility compliance
 * - 8px spacing grid system
 * - Responsive: 768px tablet, 480px mobile breakpoints
 * - Reduced motion support
 */

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import H1Header from '../components/H1Header.vue'

const router = useRouter()

// Form fields - Field 1 (Name) and Field 2 (Date)
const name = ref('')
const date = ref('')

// Error states for user feedback
const nameError = ref('')
const dateError = ref('')
const formError = ref('')

// Loading state for submit button
const isSubmitting = ref(false)

/**
 * Input sanitization to prevent XSS and limit data length
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>"'&]/g, '')
    .substring(0, 100)
}

/**
 * Form validation for Name field
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
 * Form validation for Date field
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
 * Computed property for button state
 * @returns {boolean} Form validity status
 */
const isFormValid = computed(() => {
  return name.value.trim().length >= 2 && date.value !== ''
})

/**
 * Form submission handler with validation and data persistence
 */
const handleSubmit = async () => {
  formError.value = ''
  
  const isNameValid = validateName()
  const isDateValid = validateDate()
  
  if (!isNameValid || !isDateValid) {
    formError.value = 'Please correct the errors above'
    return
  }
  
  try {
    isSubmitting.value = true
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const formData = {
      name: sanitizeInput(name.value),
      date: date.value,
      timestamp: Date.now()
    }
    
    sessionStorage.setItem('formData', JSON.stringify(formData))
    router.push({ name: 'Response' })
  } catch (error) {
    formError.value = 'An error occurred. Please try again.'
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

/**
 * Clear name error on input
 */
const clearNameError = () => {
  if (nameError.value) nameError.value = ''
  if (formError.value) formError.value = ''
}

/**
 * Clear date error on input
 */
const clearDateError = () => {
  if (dateError.value) dateError.value = ''
  if (formError.value) formError.value = ''
}
</script>

<template>
  <div class="page-container">
    <div class="container">
      <article class="card">
        <!-- ADS: H1Header component - H1 exclusive to page title -->
        <H1Header 
          text="Welcome" 
          subtitle="Enter your details to get started"
        />
        
        <form 
          @submit.prevent="handleSubmit" 
          novalidate 
          aria-label="Welcome form"
          class="welcome-form"
        >
          <!-- ADS: General Form Error Alert -->
          <transition name="fade">
            <div 
              v-if="formError" 
              class="error-alert" 
              role="alert" 
              aria-live="polite"
            >
              {{ formError }}
            </div>
          </transition>
          
          <!-- ADS: Field 1 - Name (Required) -->
          <div class="form-group">
            <label for="name" class="form-label">
              <span class="label-text">Name</span>
              <span class="required-indicator" aria-label="required">*</span>
            </label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="form-input"
              :class="{ error: nameError }"
              :aria-invalid="!!nameError"
              :aria-describedby="nameError ? 'name-error' : 'name-hint'"
              placeholder="Enter your name"
              @input="clearNameError"
              @blur="validateName"
              autocomplete="name"
              maxlength="100"
              required
            />
            <p 
              v-if="!nameError" 
              id="name-hint" 
              class="form-hint"
            >
              Letters, spaces, and hyphens only
            </p>
            <transition name="fade">
              <p 
                v-if="nameError" 
                id="name-error" 
                class="error-message" 
                role="alert" 
                aria-live="polite"
              >
                {{ nameError }}
              </p>
            </transition>
          </div>
          
          <!-- ADS: Field 2 - Date (Required) -->
          <div class="form-group">
            <label for="date" class="form-label">
              <span class="label-text">Date</span>
              <span class="required-indicator" aria-label="required">*</span>
            </label>
            <input
              id="date"
              v-model="date"
              type="date"
              class="form-input"
              :class="{ error: dateError }"
              :aria-invalid="!!dateError"
              :aria-describedby="dateError ? 'date-error' : 'date-hint'"
              @input="clearDateError"
              @blur="validateDate"
              required
            />
            <p 
              v-if="!dateError" 
              id="date-hint" 
              class="form-hint"
            >
              Select a date from the calendar
            </p>
            <transition name="fade">
              <p 
                v-if="dateError" 
                id="date-error" 
                class="error-message" 
                role="alert" 
                aria-live="polite"
              >
                {{ dateError }}
              </p>
            </transition>
          </div>
          
          <!-- ADS: Submit Button with all states -->
          <div class="form-actions">
            <button
              type="submit"
              class="btn btn-primary btn-submit"
              :disabled="!isFormValid || isSubmitting"
              :aria-disabled="!isFormValid || isSubmitting"
            >
              <span v-if="isSubmitting" class="btn-loading">
                <span class="btn-spinner" aria-hidden="true"></span>
                <span>Processing...</span>
              </span>
              <span v-else class="btn-content">
                <span>Submit</span>
                <span class="btn-icon" aria-hidden="true">→</span>
              </span>
            </button>
          </div>
        </form>
      </article>
    </div>
  </div>
</template>

<style scoped>
/**
 * Alberta Design System - WelcomePage Styles
 * All values use ADS CSS variables for consistency
 */

/* ADS: Page layout */
.page-container {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: var(--ads-space-lg);
}

/* ADS: Form container */
.welcome-form {
  display: flex;
  flex-direction: column;
}

/* ADS: Form hint text */
.form-hint {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-small);
  color: var(--ads-text-muted);
  margin-top: var(--ads-space-2xs);
  margin-bottom: 0;
  line-height: var(--ads-line-height-normal);
}

/* ADS: Form actions container */
.form-actions {
  margin-top: var(--ads-space-md);
}

/* ADS: Submit button full width */
.btn-submit {
  width: 100%;
}

/* ADS: Button content layout */
.btn-content,
.btn-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ads-space-xs);
}

/* ADS: Button icon */
.btn-icon {
  font-size: var(--ads-font-size-md);
  transition: transform var(--ads-transition-fast);
}

.btn-primary:hover:not(:disabled) .btn-icon {
  transform: translateX(4px);
}

/* ADS: Loading spinner */
.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--ads-text-inverse);
  border-top-color: transparent;
  border-radius: var(--ads-radius-full);
  animation: btn-spin 0.8s linear infinite;
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ADS: Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--ads-transition-fast), 
              transform var(--ads-transition-fast);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ADS: Responsive - Tablet (768px) */
@media (max-width: 768px) {
  .page-container {
    padding-top: var(--ads-space-md);
  }
}

/* ADS: Responsive - Mobile (480px) */
@media (max-width: 480px) {
  .page-container {
    padding-top: var(--ads-space-sm);
    align-items: flex-start;
  }
}

/* ADS: Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .btn-spinner {
    animation: none;
  }
  
  .btn-primary:hover:not(:disabled) .btn-icon {
    transform: none;
  }
}
</style>
