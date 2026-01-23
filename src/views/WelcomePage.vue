<template>
  <div class="welcome-container">
    <div class="welcome-card">
      <!-- Page Header (E-003-F-002) -->
      <header class="page-header">
        <h2 class="page-title">Welcome! Enter Your Name</h2>
        <p class="page-description">
          Please enter your name below to receive a personalized greeting.
        </p>
      </header>

      <!-- Form Data Capture (E-003-F-001) -->
      <form @submit.prevent="handleSubmit" novalidate class="welcome-form">
        <div class="form-group">
          <label for="nameInput" class="form-label">
            Your Name <span class="required" aria-hidden="true">*</span>
          </label>
          <input
            id="nameInput"
            ref="nameInputRef"
            v-model="formData.name"
            type="text"
            class="form-input"
            :class="{ 'input-error': validation.hasError }"
            placeholder="Enter your name"
            maxlength="50"
            autocomplete="name"
            aria-required="true"
            :aria-invalid="validation.hasError"
            :aria-describedby="validation.hasError ? 'nameError' : 'nameHint'"
            @input="handleInput"
            @blur="validateOnBlur"
          />
          <p id="nameHint" class="form-hint" :class="{ 'sr-only': validation.hasError }">
            Enter 2-50 characters (letters, spaces, hyphens, apostrophes)
          </p>
          
          <!-- Error Handling (E-003-F-006) -->
          <Transition name="fade">
            <p 
              v-if="validation.hasError" 
              id="nameError" 
              class="error-message" 
              role="alert"
              aria-live="polite"
            >
              <span class="error-icon" aria-hidden="true">⚠</span>
              {{ validation.errorMessage }}
            </p>
          </Transition>
        </div>

        <button
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
          :aria-busy="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner" aria-hidden="true"></span>
          {{ isSubmitting ? 'Submitting...' : 'Say Hello' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
/**
 * WelcomePage Component
 * Implements E-003: HelloWorld Response Page requirements
 * - E-003-F-001: Form data capture
 * - E-003-F-002: Page header display
 * - E-003-F-005: Input validation/sanitization
 * - E-003-F-006: Error handling
 * - E-003-F-007: Responsive layout
 */
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Router instance
const router = useRouter()

// Template refs
const nameInputRef = ref(null)

// Form state (E-003-F-001)
const formData = reactive({
  name: ''
})

// Validation state (E-003-F-006)
const validation = reactive({
  hasError: false,
  errorMessage: ''
})

// Submission state
const isSubmitting = ref(false)

/**
 * Input Validation & Sanitization (E-003-F-005)
 * Validates name input against defined rules
 * @returns {boolean} Whether validation passed
 */
function validateName() {
  // Sanitize input - trim whitespace
  const sanitizedName = formData.name.trim()
  
  // Required field validation
  if (!sanitizedName) {
    validation.errorMessage = 'Name is required. Please enter your name.'
    validation.hasError = true
    return false
  }
  
  // Minimum length validation
  if (sanitizedName.length < 2) {
    validation.errorMessage = 'Name must be at least 2 characters long.'
    validation.hasError = true
    return false
  }
  
  // Maximum length validation
  if (sanitizedName.length > 50) {
    validation.errorMessage = 'Name must be no more than 50 characters.'
    validation.hasError = true
    return false
  }
  
  // Character pattern validation (letters, spaces, hyphens, apostrophes)
  const namePattern = /^[a-zA-Z\s'-]+$/
  if (!namePattern.test(sanitizedName)) {
    validation.errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes.'
    validation.hasError = true
    return false
  }
  
  // Validation passed
  validation.hasError = false
  validation.errorMessage = ''
  return true
}

/**
 * Handles input event - clears error on user input
 */
function handleInput() {
  if (validation.hasError) {
    validation.hasError = false
    validation.errorMessage = ''
  }
}

/**
 * Validates on blur if field has content
 */
function validateOnBlur() {
  if (formData.name.trim()) {
    validateName()
  }
}

/**
 * Sanitizes user input to prevent XSS
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
  return input
    .trim()
    .replace(/[<>"'&]/g, '') // Remove potentially dangerous characters
    .substring(0, 50) // Enforce max length
}

/**
 * Form submission handler (E-003-F-001)
 * Validates input and navigates to response page
 */
async function handleSubmit() {
  // Validate before submission
  if (!validateName()) {
    nameInputRef.value?.focus()
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Sanitize the input before passing to next page
    const sanitizedName = sanitizeInput(formData.name)
    
    // Simulate async operation (e.g., API call)
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Navigate to response page with sanitized name
    router.push({
      name: 'ResponsePage',
      query: { name: sanitizedName }
    })
  } catch (error) {
    // Error handling (E-003-F-006)
    validation.errorMessage = 'An unexpected error occurred. Please try again.'
    validation.hasError = true
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

// Focus input on mount for accessibility
onMounted(() => {
  nameInputRef.value?.focus()
})
</script>

<style scoped>
/* Welcome Container - Responsive Layout (E-003-F-007) */
.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: var(--ads-spacing-md);
}

.welcome-card {
  background: var(--ads-bg-primary);
  border-radius: var(--ads-radius-lg);
  box-shadow: var(--ads-shadow-lg);
  padding: var(--ads-spacing-2xl);
  width: 100%;
  max-width: 480px;
  animation: slideUp var(--ads-transition-slow) ease-out;
}

/* Page Header (E-003-F-002) */
.page-header {
  text-align: center;
  margin-bottom: var(--ads-spacing-xl);
}

.page-title {
  color: var(--ads-text-primary);
  margin-bottom: var(--ads-spacing-sm);
  font-size: var(--ads-font-size-2xl);
}

.page-description {
  color: var(--ads-text-secondary);
  margin-bottom: 0;
}

/* Form Styles */
.welcome-form {
  width: 100%;
}

.form-group {
  margin-bottom: var(--ads-spacing-lg);
}

.form-label {
  display: block;
  margin-bottom: var(--ads-spacing-sm);
  font-weight: var(--ads-font-weight-semibold);
  color: var(--ads-text-primary);
}

.required {
  color: var(--ads-color-error);
}

.form-input {
  width: 100%;
  padding: var(--ads-spacing-md);
  font-size: var(--ads-font-size-base);
  border: 2px solid var(--ads-bg-tertiary);
  border-radius: var(--ads-radius-md);
  transition: border-color var(--ads-transition-fast), 
              box-shadow var(--ads-transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--ads-color-primary);
  box-shadow: var(--ads-focus-ring);
}

.form-input.input-error {
  border-color: var(--ads-color-error);
}

.form-input.input-error:focus {
  box-shadow: 0 0 0 3px rgba(216, 41, 47, 0.2);
}

.form-hint {
  font-size: var(--ads-font-size-sm);
  color: var(--ads-text-muted);
  margin-top: var(--ads-spacing-xs);
  margin-bottom: 0;
}

/* Error Message (E-003-F-006) */
.error-message {
  color: var(--ads-color-error);
  font-size: var(--ads-font-size-sm);
  margin: var(--ads-spacing-sm) 0 0 0;
  display: flex;
  align-items: center;
  gap: var(--ads-spacing-xs);
}

.error-icon {
  flex-shrink: 0;
}

/* Submit Button */
.submit-button {
  width: 100%;
  padding: var(--ads-spacing-md);
  font-size: var(--ads-font-size-md);
  font-weight: var(--ads-font-weight-semibold);
  color: var(--ads-text-inverse);
  background-color: var(--ads-color-primary);
  border: none;
  border-radius: var(--ads-radius-md);
  cursor: pointer;
  transition: background-color var(--ads-transition-fast),
              transform var(--ads-transition-fast);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--ads-spacing-sm);
}

.submit-button:hover:not(:disabled) {
  background-color: var(--ads-color-primary-dark);
}

.submit-button:focus {
  outline: none;
  box-shadow: var(--ads-focus-ring);
}

.submit-button:active:not(:disabled) {
  transform: scale(0.98);
}

.submit-button:disabled {
  background-color: var(--ads-bg-tertiary);
  color: var(--ads-text-muted);
  cursor: not-allowed;
}

/* Spinner Animation */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--ads-transition-fast);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Layout (E-003-F-007) */
@media (max-width: 600px) {
  .welcome-card {
    padding: var(--ads-spacing-lg);
    border-radius: var(--ads-radius-md);
  }

  .page-title {
    font-size: var(--ads-font-size-xl);
  }
}
</style>