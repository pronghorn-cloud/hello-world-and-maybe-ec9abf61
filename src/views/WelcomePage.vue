<script setup>
/**
 * WelcomePage Component - Entry Form
 * 
 * User entry form with name and date inputs.
 * Implements Government of Alberta Design System and WCAG 2.1 AA standards.
 * 
 * Requirements:
 * - E-001-F-006: Form Validation (Name and Date required)
 * - E-001-F-007: Error Handling with accessible announcements
 * 
 * @component
 */
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { BaseButton, BaseInput, BaseCard } from '@/components/ui'
import { useFormValidation } from '@/composables/useFormValidation'
import { ROUTES } from '@/constants'

const router = useRouter()

// Form data
const formData = reactive({
  name: '',
  date: ''
})

// Form validation using composable
const {
  errors,
  validateName,
  validateDate,
  clearError
} = useFormValidation({ name: '', date: '' })

// Submission state
const isSubmitting = ref(false)

/**
 * Handle field blur for validation
 * @param {string} field - Field name to validate
 */
function handleBlur(field) {
  if (field === 'name') {
    validateName(formData.name)
  } else if (field === 'date') {
    validateDate(formData.date)
  }
}

/**
 * Handle input to clear errors
 * @param {string} field - Field name
 */
function handleInput(field) {
  clearError(field)
}

/**
 * Handle form submission
 * Validates all fields and navigates to response page on success.
 */
function handleSubmit() {
  isSubmitting.value = true
  
  const isNameValid = validateName(formData.name)
  const isDateValid = validateDate(formData.date)
  
  if (isNameValid && isDateValid) {
    router.push({
      name: ROUTES.RESPONSE,
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
    <h2 class="welcome-page__title">Welcome</h2>
    
    <p class="welcome-page__description">
      Please enter your information below to receive a personalized greeting.
    </p>

    <BaseCard class="welcome-page__card" aria-label="Welcome form">
      <form @submit.prevent="handleSubmit" novalidate>
        <!-- Name Field -->
        <BaseInput
          id="name"
          v-model="formData.name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          autocomplete="name"
          required
          :error="errors.name"
          @blur="handleBlur('name')"
          @input="handleInput('name')"
        />

        <!-- Date Field -->
        <BaseInput
          id="date"
          v-model="formData.date"
          label="Date"
          type="date"
          required
          :error="errors.date"
          @blur="handleBlur('date')"
          @input="handleInput('date')"
        />

        <!-- Submit Button -->
        <BaseButton
          type="submit"
          variant="primary"
          full-width
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          Submit
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped>
.welcome-page {
  max-width: 500px;
}

.welcome-page__title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--goa-blue-dark);
  margin-bottom: 0.75rem;
}

.welcome-page__description {
  color: var(--goa-grey);
  margin-bottom: 2rem;
  font-size: 1.125rem;
  line-height: 1.6;
}

.welcome-page__card {
  max-width: 420px;
}

@media (max-width: 640px) {
  .welcome-page__title {
    font-size: 1.5rem;
  }

  .welcome-page__description {
    font-size: 1rem;
  }
}
</style>
