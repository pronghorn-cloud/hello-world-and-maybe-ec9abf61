<script setup>
/**
 * WelcomePage Component - Entry Form
 * 
 * Requirements:
 * - E-001-F-006: Form Validation (Name and Date required)
 * - E-001-F-007: Error Handling
 */
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const formData = reactive({
  name: '',
  date: ''
})

// Validation errors (E-001-F-007)
const errors = reactive({
  name: '',
  date: ''
})

// Submission state
const isSubmitting = ref(false)

/**
 * Validate name field (E-001-F-006)
 */
function validateName() {
  const name = formData.name.trim()
  
  if (!name) {
    errors.name = 'Name is required'
    return false
  }
  
  if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
    return false
  }
  
  errors.name = ''
  return true
}

/**
 * Validate date field (E-001-F-006)
 */
function validateDate() {
  if (!formData.date) {
    errors.date = 'Date is required'
    return false
  }
  
  const selectedDate = new Date(formData.date)
  
  if (isNaN(selectedDate.getTime())) {
    errors.date = 'Please enter a valid date'
    return false
  }
  
  errors.date = ''
  return true
}

/**
 * Clear error on input
 */
function clearError(field) {
  errors[field] = ''
}

/**
 * Handle form submission
 */
function handleSubmit() {
  isSubmitting.value = true
  
  const isNameValid = validateName()
  const isDateValid = validateDate()
  
  if (isNameValid && isDateValid) {
    router.push({
      name: 'Response',
      query: {
        name: formData.name.trim(),
        date: formData.date
      }
    })
  }
  
  isSubmitting.value = false
}
</script>

<template>
  <div class="welcome-page">
    <h2 class="page-title">Welcome</h2>
    
    <p class="page-description">
      Please enter your information below.
    </p>

    <form @submit.prevent="handleSubmit" class="card form-card" novalidate>
      <!-- Name Field -->
      <div class="form-group">
        <label for="name" class="form-label">
          Name <span class="required" aria-hidden="true">*</span>
          <span class="sr-only">(required)</span>
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          class="form-input"
          :class="{ 'form-input-error': errors.name }"
          placeholder="Enter your name"
          aria-describedby="name-error"
          :aria-invalid="errors.name ? 'true' : 'false'"
          @input="clearError('name')"
          @blur="validateName"
        />
        <p v-if="errors.name" id="name-error" class="error-message" role="alert">
          {{ errors.name }}
        </p>
      </div>

      <!-- Date Field -->
      <div class="form-group">
        <label for="date" class="form-label">
          Date <span class="required" aria-hidden="true">*</span>
          <span class="sr-only">(required)</span>
        </label>
        <input
          id="date"
          v-model="formData.date"
          type="date"
          class="form-input"
          :class="{ 'form-input-error': errors.date }"
          aria-describedby="date-error"
          :aria-invalid="errors.date ? 'true' : 'false'"
          @input="clearError('date')"
          @blur="validateDate"
        />
        <p v-if="errors.date" id="date-error" class="error-message" role="alert">
          {{ errors.date }}
        </p>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn-primary submit-btn" :disabled="isSubmitting">
        {{ isSubmitting ? 'Submitting...' : 'Submit' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.welcome-page {
  max-width: 500px;
}

.page-title {
  font-size: 2rem;
  color: var(--goa-blue);
  margin-bottom: 1rem;
}

.page-description {
  color: var(--goa-grey);
  margin-bottom: 2rem;
}

.form-card {
  max-width: 400px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.required {
  color: var(--goa-red);
}

.submit-btn {
  width: 100%;
}
</style>
