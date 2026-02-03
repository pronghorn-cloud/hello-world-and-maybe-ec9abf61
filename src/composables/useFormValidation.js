import { reactive } from 'vue'

export function useFormValidation(formData) {
  const errors = reactive({
    name: '',
    date: ''
  })

  const validationRules = {
    name: [
      {
        test: (value) => value.trim() !== '',
        message: 'Name is required'
      },
      {
        test: (value) => value.trim().length >= 2,
        message: 'Name must be at least 2 characters'
      },
      {
        test: (value) => value.trim().length <= 100,
        message: 'Name must not exceed 100 characters'
      },
      {
        test: (value) => /^[a-zA-Z\s'-]+$/.test(value.trim()),
        message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
      }
    ],
    date: [
      {
        test: (value) => value !== '',
        message: 'Date is required'
      },
      {
        test: (value) => {
          const selectedDate = new Date(value)
          return !isNaN(selectedDate.getTime())
        },
        message: 'Please enter a valid date'
      }
    ]
  }

  const validateField = (fieldName) => {
    const value = formData[fieldName]
    const rules = validationRules[fieldName]

    if (!rules) return true

    for (const rule of rules) {
      if (!rule.test(value)) {
        errors[fieldName] = rule.message
        return false
      }
    }

    errors[fieldName] = ''
    return true
  }

  const validateForm = () => {
    let isValid = true

    for (const fieldName of Object.keys(validationRules)) {
      if (!validateField(fieldName)) {
        isValid = false
      }
    }

    return isValid
  }

  const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key] = ''
    })
  }

  return {
    errors,
    validateField,
    validateForm,
    clearErrors
  }
}
