import { ref, computed } from 'vue';

/**
 * useFormValidation Composable
 * Provides reactive form validation with customizable rules
 */
export const useFormValidation = () => {
  const errors = ref([]);
  const touched = ref({});

  /**
   * Validates a name field
   * @param {string} value - The name value to validate
   * @param {string} fieldName - The display name of the field
   * @returns {string|null} - Error message or null if valid
   */
  const validateName = (value, fieldName = 'Name') => {
    if (!value || value.trim() === '') {
      return `${fieldName} is required`;
    }

    const trimmed = value.trim();

    if (trimmed.length < 2) {
      return `${fieldName} must be at least 2 characters`;
    }

    if (trimmed.length > 100) {
      return `${fieldName} must be less than 100 characters`;
    }

    // Check for valid name characters (letters, spaces, hyphens, apostrophes)
    const namePattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    if (!namePattern.test(trimmed)) {
      return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
    }

    return null;
  };

  /**
   * Validates the entire form
   * @param {Object} formData - The form data to validate
   * @returns {boolean} - True if form is valid
   */
  const validateForm = (formData) => {
    const newErrors = [];

    const nameError = validateName(formData.name, 'Name');
    if (nameError) {
      newErrors.push(nameError);
    }

    errors.value = newErrors;
    return newErrors.length === 0;
  };

  /**
   * Marks a field as touched
   * @param {string} fieldName - The field name to mark as touched
   */
  const markTouched = (fieldName) => {
    touched.value[fieldName] = true;
  };

  /**
   * Checks if a field has been touched
   * @param {string} fieldName - The field name to check
   * @returns {boolean} - True if field has been touched
   */
  const isTouched = (fieldName) => {
    return touched.value[fieldName] === true;
  };

  /**
   * Clears all validation errors and touched states
   */
  const clearValidation = () => {
    errors.value = [];
    touched.value = {};
  };

  /**
   * Computed property indicating if form has errors
   */
  const hasErrors = computed(() => errors.value.length > 0);

  /**
   * Computed property indicating if form is valid
   */
  const isValid = computed(() => errors.value.length === 0);

  return {
    errors,
    touched,
    hasErrors,
    isValid,
    validateName,
    validateForm,
    markTouched,
    isTouched,
    clearValidation,
  };
};

export default useFormValidation;
