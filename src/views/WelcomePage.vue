<script setup>
/**
 * WelcomePage Component
 * @requirement E-001 HelloWorld Entry Form
 * @version 2.0.0 - Rebuilt Visual Components
 * @description Entry form page with Name and Date fields
 * 
 * Requirements Implemented:
 * - E-001-F-006: Form validation (required fields for Name and Date)
 * - E-001-F-007: Error handling and user feedback
 * - E-003-F-001: Data capture for ResponsePage
 * - E-003-F-005: Input validation and sanitization
 * 
 * @standard Alberta Design System (ADS)
 * @techstack TS-001 - Vue 3.5.24 Composition API, JavaScript only
 * 
 * ADS Compliance:
 * - All colors from Alberta Design System palette
 * - Focus state #FEBA35 for all interactive elements
 * - Full component states (hover, focus, error, disabled)
 * - WCAG 2.1 AA accessibility compliance
 * - 8px spacing grid system
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

// Loading state for submit button
const isSubmitting = ref(false)

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
const handleSubmit = async () => {
  formError.value = ''
  
  const isNameValid = validateName()
  const isDateValid = validateDate()
  
  // E-001-F-007: Display validation errors
  if (!isNameValid || !isDateValid) {
    formError.value = 'Please correct the errors above'
    return
  }
  
  try {
    isSubmitting.value = true
    
    // Simulate brief processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
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
  } finally {
    isSubmitting.value = false
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
  <div class="page-container">
    <div class="container">
      <article class="card">
        <!-- Alberta Design System: H1Header component - H1 exclusive to page title -->
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
          <!-- E-001-F-007: General Form Error Alert -->
          <transition name="fade">
            <div v-if="formError" class="error-alert" role="alert" aria-live="polite">
              {{ formError }}
            </div>
          </transition>
          
          <!-- E-001-F-006: Field 1 - Name (Required) -->
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
            <p id="name-hint" class="form-hint" v-if="!nameError">
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
          
          <!-- E-001-F-006: Field 2 - Date (Required) -->
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
            <p id="date-hint" class="form-hint" v-if="!dateError">
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
          
          <!-- Submit Button with all states (hover, focus, disabled) -->
          <div class="form-actions">
            <button
              type="submit"
              class="btn btn-primary btn-submit"
              :disabled="!isFormValid || isSubmitting"
              :aria-disabled="!isFormValid || isSubmitting"
            >
              <span v-if="isSubmitting" class="btn-loading">
                <span class="spinner" aria-hidden="true"></span>
                Processing...
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
/* Page layout */
.page-container {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: var(--ads-space-lg);
}

/* Form styles */
.welcome-form {
  display: flex;
  flex-direction: column;
}

/* Form hint text */
.form-hint {
  font-size: var(--ads-font-size-small);
  color: var(--ads-text-muted);
  margin-top: var(--ads-space-2xs);
  margin-bottom: 0;
}

/* Form actions */
.form-actions {
  margin-top: var(--ads-space-md);
}

/* Submit button */
.btn-submit {
  width: 100%;
  position: relative;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ads-space-xs);
}

.btn-icon {
  transition: transform var(--ads-transition-fast);
}

.btn-submit:hover:not(:disabled) .btn-icon {
  transform: translateX(4px);
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ads-space-xs);
}

/* Loading spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-container {
    padding-top: var(--ads-space-md);
  }
}

@media (max-width: 480px) {
  .page-container {
    padding-top: var(--ads-space-sm);
    align-items: flex-start;
  }
}
</style>

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
            Date <span class="required-indicator" aria-label="required">*</span>
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
        
        <!-- Submit Button with all states (hover, focus, disabled) -->
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
/* Alberta Design System: Form layout */
form {
  display: flex;
  flex-direction: column;
}

/* Alberta Design System: Button spacing */
.btn-primary {
  margin-top: var(--ads-space-sm);
}
</style>
