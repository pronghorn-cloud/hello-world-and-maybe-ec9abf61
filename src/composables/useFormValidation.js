/**
 * Form Validation Composable
 * 
 * Provides reusable form validation logic following Vue 3 Composition API patterns.
 * Implements Government of Alberta accessibility standards for error handling.
 * 
 * @module composables/useFormValidation
 */

import { reactive, computed } from 'vue'
import { VALIDATION, ERROR_MESSAGES } from '@/constants'

/**
 * Creates a form validation handler
 * @param {Object} initialFields - Initial field configuration
 * @returns {Object} Validation state and methods
 */
export function useFormValidation(initialFields = {}) {
  // Reactive errors object
  const errors = reactive({})
  
  // Initialize error fields
  Object.keys(initialFields).forEach(field => {
    errors[field] = ''
  })

  /**
   * Check if form has any errors
   * @returns {boolean}
   */
  const hasErrors = computed(() => {
    return Object.values(errors).some(error => error !== '')
  })

  /**
   * Check if form is valid (all fields validated with no errors)
   * @returns {boolean}
   */
  const isValid = computed(() => {
    return !hasErrors.value
  })

  /**
   * Validate a required text field
   * @param {string} value - Field value
   * @param {string} fieldName - Name of the field for error tracking
   * @param {Object} options - Validation options
   * @returns {boolean} - Whether validation passed
   */
  function validateRequired(value, fieldName, options = {}) {
    const trimmedValue = String(value || '').trim()
    const {
      minLength = 0,
      maxLength = Infinity,
      requiredMessage = `${fieldName} is required`,
      minLengthMessage = `${fieldName} is too short`,
      maxLengthMessage = `${fieldName} is too long`
    } = options

    if (!trimmedValue) {
      errors[fieldName] = requiredMessage
      return false
    }

    if (trimmedValue.length < minLength) {
      errors[fieldName] = minLengthMessage
      return false
    }

    if (trimmedValue.length > maxLength) {
      errors[fieldName] = maxLengthMessage
      return false
    }

    errors[fieldName] = ''
    return true
  }

  /**
   * Validate a name field with standard rules
   * @param {string} value - Name value
   * @returns {boolean} - Whether validation passed
   */
  function validateName(value) {
    return validateRequired(value, 'name', {
      minLength: VALIDATION.NAME_MIN_LENGTH,
      maxLength: VALIDATION.NAME_MAX_LENGTH,
      requiredMessage: ERROR_MESSAGES.NAME_REQUIRED,
      minLengthMessage: ERROR_MESSAGES.NAME_MIN_LENGTH,
      maxLengthMessage: ERROR_MESSAGES.NAME_MAX_LENGTH
    })
  }

  /**
   * Validate a date field
   * @param {string} value - Date value (YYYY-MM-DD format)
   * @returns {boolean} - Whether validation passed
   */
  function validateDate(value) {
    if (!value) {
      errors.date = ERROR_MESSAGES.DATE_REQUIRED
      return false
    }

    const dateObj = new Date(value)
    if (isNaN(dateObj.getTime())) {
      errors.date = ERROR_MESSAGES.DATE_INVALID
      return false
    }

    errors.date = ''
    return true
  }

  /**
   * Clear error for a specific field
   * @param {string} fieldName - Field to clear
   */
  function clearError(fieldName) {
    if (fieldName in errors) {
      errors[fieldName] = ''
    }
  }

  /**
   * Clear all errors
   */
  function clearAllErrors() {
    Object.keys(errors).forEach(key => {
      errors[key] = ''
    })
  }

  /**
   * Set a custom error for a field
   * @param {string} fieldName - Field name
   * @param {string} message - Error message
   */
  function setError(fieldName, message) {
    errors[fieldName] = message
  }

  return {
    errors,
    hasErrors,
    isValid,
    validateRequired,
    validateName,
    validateDate,
    clearError,
    clearAllErrors,
    setError
  }
}
