<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import H1Header from '../components/H1Header.vue'

const router = useRouter()

// Form fields - E-003-F-001: Field 1 (Name) and Field 2 (Date)
const name = ref('')
const date = ref('')

// Error states
const nameError = ref('')
const dateError = ref('')
const formError = ref('')

// E-003-F-005: Input validation and sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/[<>"'&]/g, '') // Remove potentially harmful characters
    .substring(0, 100) // Limit length
}

// E-001-F-006: Form validation for Name field
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

// E-001-F-006: Form validation for Date field
const validateDate = () => {
  if (!date.value) {
    dateError.value = 'Date is required'
    return false
  }
  const selectedDate = new Date(date.value)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  if (isNaN(selectedDate.getTime())) {
    dateError.value = 'Please enter a valid date'
    return false
  }
  dateError.value = ''
  return true
}

// Check if form is valid for button state
const isFormValid = computed(() => {
  return name.value.trim().length >= 2 && date.value !== ''
})

// E-001-F-007: Error handling and user feedback
const handleSubmit = () => {
  formError.value = ''
  
  const isNameValid = validateName()
  const isDateValid = validateDate()
  
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
    formError.value = 'An error occurred. Please try again.'
    console.error('Form submission error:', error)
  }
}

// Clear error on input
const clearNameError = () => {
  if (nameError.value) nameError.value = ''
  if (formError.value) formError.value = ''
}

const clearDateError = () => {
  if (dateError.value) dateError.value = ''
  if (formError.value) formError.value = ''
}
</script>

<template>
  <div class="container">
    <div class="card">
      <H1Header text="Welcome" />
      
      <form @submit.prevent="handleSubmit" novalidate>
        <!-- General Form Error -->
        <div v-if="formError" class="error-alert" role="alert">
          {{ formError }}
        </div>
        
        <!-- Field 1: Name -->
        <div class="form-group">
          <label for="name" class="form-label">Name *</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="form-input"
            :class="{ error: nameError }"
            placeholder="Enter your name"
            @input="clearNameError"
            @blur="validateName"
            autocomplete="name"
            required
          />
          <p v-if="nameError" class="error-message" role="alert">
            {{ nameError }}
          </p>
        </div>
        
        <!-- Field 2: Date -->
        <div class="form-group">
          <label for="date" class="form-label">Date *</label>
          <input
            id="date"
            v-model="date"
            type="date"
            class="form-input"
            :class="{ error: dateError }"
            @input="clearDateError"
            @blur="validateDate"
            required
          />
          <p v-if="dateError" class="error-message" role="alert">
            {{ dateError }}
          </p>
        </div>
        
        <!-- Submit Button -->
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="!isFormValid"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
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