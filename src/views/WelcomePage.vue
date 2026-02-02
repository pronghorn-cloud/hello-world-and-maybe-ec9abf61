<template>
  <!--
    Welcome Page (E-001)
    Requirements:
    - E-001-F-001: Welcome message for users
    - E-001-F-002: Name Input Field
    - E-001-F-003: Date Input Field with Date Picker
    - E-001-F-004: Form Layout and Structure
    - E-001-F-005: Submit Button and Form Action
    - E-001-F-006: Form Validation
    - E-001-F-007: Error Handling and User Feedback
    - ABD-001 Compliant: Focus states, H1 exclusive, 8px grid, responsive
  -->
  <main id="main-content" class="welcome-page" role="main">
    <div class="ads-container">
      <section class="welcome-content ads-section" aria-labelledby="page-title">
        <!-- H1 Header - Only ONE per page (ABD-001-002) -->
        <H1Header
          title="Welcome to Alberta Services"
          subtitle="Your gateway to provincial services"
          header-id="page-title"
        />
        
        <!-- E-001-F-001: Welcome message for users -->
        <div class="welcome-description">
          <p>
            This application provides easy access to Alberta government services.
            Please fill out the form below to get started.
          </p>
        </div>
        
        <!-- E-001-F-004: Form Layout and Structure -->
        <form 
          class="welcome-form" 
          @submit.prevent="handleSubmit"
          novalidate
          aria-describedby="form-description"
        >
          <p id="form-description" class="visually-hidden">
            Please enter your name and select a date to continue.
          </p>
          
          <!-- E-001-F-007: Error Summary -->
          <div 
            v-if="hasErrors" 
            class="error-summary" 
            role="alert" 
            aria-live="polite"
            tabindex="-1"
            ref="errorSummary"
          >
            <h2 class="error-summary-title">Please correct the following errors:</h2>
            <ul class="error-list">
              <li v-if="errors.name">
                <a href="#name-input" @click.prevent="focusField('name')">{{ errors.name }}</a>
              </li>
              <li v-if="errors.date">
                <a href="#date-input" @click.prevent="focusField('date')">{{ errors.date }}</a>
              </li>
            </ul>
          </div>
          
          <!-- E-001-F-002: Name Input Field -->
          <div class="form-group">
            <label for="name-input" class="ads-label">
              Full Name
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="visually-hidden">(required)</span>
            </label>
            <input
              id="name-input"
              ref="nameInput"
              v-model.trim="formData.name"
              type="text"
              class="ads-input"
              :class="{ 'ads-input-error': errors.name }"
              :aria-invalid="errors.name ? 'true' : 'false'"
              :aria-describedby="errors.name ? 'name-error' : 'name-hint'"
              autocomplete="name"
              required
              @blur="validateName"
            />
            <span id="name-hint" class="field-hint" v-if="!errors.name">
              Enter your full legal name as it appears on official documents.
            </span>
            <span id="name-error" class="field-error" v-if="errors.name" role="alert">
              {{ errors.name }}
            </span>
          </div>
          
          <!-- E-001-F-003: Date Input Field with Date Picker -->
          <div class="form-group">
            <label for="date-input" class="ads-label">
              Select Date
              <span class="required-indicator" aria-hidden="true">*</span>
              <span class="visually-hidden">(required)</span>
            </label>
            <input
              id="date-input"
              ref="dateInput"
              v-model="formData.date"
              type="date"
              class="ads-input"
              :class="{ 'ads-input-error': errors.date }"
              :aria-invalid="errors.date ? 'true' : 'false'"
              :aria-describedby="errors.date ? 'date-error' : 'date-hint'"
              :max="maxDate"
              required
              @blur="validateDate"
            />
            <span id="date-hint" class="field-hint" v-if="!errors.date">
              Select a date up to today's date.
            </span>
            <span id="date-error" class="field-error" v-if="errors.date" role="alert">
              {{ errors.date }}
            </span>
          </div>
          
          <!-- E-001-F-005: Submit Button and Form Action -->
          <div class="form-actions">
            <button
              type="submit"
              class="ads-btn ads-btn-primary"
              :disabled="isSubmitting"
              aria-describedby="submit-description"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit</span>
            </button>
            <span id="submit-description" class="visually-hidden">
              Submit the form to continue to the response page
            </span>
          </div>
        </form>
        
        <!-- Additional information section -->
        <aside class="welcome-info" aria-label="Additional information">
          <h2>What you can do</h2>
          <ul class="feature-list">
            <li>Access government services online</li>
            <li>Submit applications and forms</li>
            <li>Track your requests</li>
            <li>Get support when you need it</li>
          </ul>
        </aside>
      </section>
    </div>
  </main>
</template>

<script>
import H1Header from '../components/H1Header.vue'
import { useRouter } from 'vue-router'
import { ref, reactive, computed, nextTick } from 'vue'

export default {
  name: 'WelcomePage',
  components: {
    H1Header
  },
  setup() {
    const router = useRouter()
    
    // Form data
    const formData = reactive({
      name: '',
      date: ''
    })
    
    // Form state
    const errors = reactive({
      name: '',
      date: ''
    })
    const isSubmitting = ref(false)
    
    // Refs for focus management
    const nameInput = ref(null)
    const dateInput = ref(null)
    const errorSummary = ref(null)
    
    // Computed properties
    const hasErrors = computed(() => !!errors.name || !!errors.date)
    
    const maxDate = computed(() => {
      return new Date().toISOString().split('T')[0]
    })
    
    // E-001-F-006: Form Validation
    const validateName = () => {
      if (!formData.name) {
        errors.name = 'Full name is required.'
        return false
      }
      if (formData.name.length < 2) {
        errors.name = 'Name must be at least 2 characters long.'
        return false
      }
      if (formData.name.length > 100) {
        errors.name = 'Name must be less than 100 characters.'
        return false
      }
      // Basic name validation - allows letters, spaces, hyphens, apostrophes
      const namePattern = /^[a-zA-ZÀ-ÿ\s'-]+$/
      if (!namePattern.test(formData.name)) {
        errors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes.'
        return false
      }
      errors.name = ''
      return true
    }
    
    const validateDate = () => {
      if (!formData.date) {
        errors.date = 'Date is required.'
        return false
      }
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      
      if (isNaN(selectedDate.getTime())) {
        errors.date = 'Please enter a valid date.'
        return false
      }
      if (selectedDate > today) {
        errors.date = 'Date cannot be in the future.'
        return false
      }
      errors.date = ''
      return true
    }
    
    const validateForm = () => {
      const isNameValid = validateName()
      const isDateValid = validateDate()
      return isNameValid && isDateValid
    }
    
    // Focus management for accessibility
    const focusField = (field) => {
      if (field === 'name' && nameInput.value) {
        nameInput.value.focus()
      } else if (field === 'date' && dateInput.value) {
        dateInput.value.focus()
      }
    }
    
    // E-001-F-005: Submit Button and Form Action
    const handleSubmit = async () => {
      // Validate all fields
      if (!validateForm()) {
        // Focus error summary for screen readers
        await nextTick()
        if (errorSummary.value) {
          errorSummary.value.focus()
        }
        return
      }
      
      isSubmitting.value = true
      
      try {
        // Simulate brief processing delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // Navigate to response page with form data
        router.push({
          name: 'Response',
          query: {
            name: formData.name,
            date: formData.date
          }
        })
      } catch (error) {
        console.error('Form submission error:', error)
        // E-001-F-007: Error handling
        errors.name = 'An error occurred. Please try again.'
      } finally {
        isSubmitting.value = false
      }
    }
    
    return {
      formData,
      errors,
      isSubmitting,
      hasErrors,
      maxDate,
      nameInput,
      dateInput,
      errorSummary,
      validateName,
      validateDate,
      focusField,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  background-color: var(--ads-bg-primary);
}

.welcome-content {
  max-width: 800px;
  margin: 0 auto;
}

.welcome-description {
  margin-bottom: var(--ads-space-4);
}

.welcome-description p {
  font-size: var(--ads-font-size-body);
  line-height: var(--ads-line-height-relaxed);
  color: var(--ads-text-primary);
  margin-bottom: var(--ads-space-2);
}

/* Form Styles (E-001-F-004) */
.welcome-form {
  background-color: var(--ads-bg-secondary);
  padding: var(--ads-space-4);
  border-radius: var(--ads-radius-md);
  margin-bottom: var(--ads-space-4);
}

.form-group {
  margin-bottom: var(--ads-space-3);
}

.required-indicator {
  color: #D91E18;
  margin-left: var(--ads-space-1);
}

.field-hint {
  display: block;
  font-size: var(--ads-font-size-small);
  color: var(--ads-text-secondary);
  margin-top: var(--ads-space-1);
}

.field-error {
  display: block;
  font-size: var(--ads-font-size-small);
  color: #D91E18;
  margin-top: var(--ads-space-1);
  font-weight: 600;
}

.ads-input-error {
  border-color: #D91E18;
}

.ads-input-error:focus {
  border-color: #D91E18;
  outline-color: #D91E18;
}

/* Error Summary (E-001-F-007) */
.error-summary {
  background-color: #FDECEA;
  border: 2px solid #D91E18;
  border-radius: var(--ads-radius-md);
  padding: var(--ads-space-3);
  margin-bottom: var(--ads-space-3);
}

.error-summary-title {
  font-size: var(--ads-font-size-body);
  font-weight: 700;
  color: #D91E18;
  margin-bottom: var(--ads-space-2);
}

.error-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.error-list li {
  margin-bottom: var(--ads-space-1);
}

.error-list a {
  color: #D91E18;
  text-decoration: underline;
}

.error-list a:hover {
  color: #A81612;
}

/* Form Actions */
.form-actions {
  margin-top: var(--ads-space-4);
}

/* Info Section */
.welcome-info {
  background-color: var(--ads-bg-secondary);
  padding: var(--ads-space-3);
  border-radius: var(--ads-radius-md);
  border-left: 4px solid var(--ads-blue);
}

.welcome-info h2 {
  font-size: var(--ads-font-size-h3);
  margin-bottom: var(--ads-space-2);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: var(--ads-space-3);
  margin-bottom: var(--ads-space-1);
  line-height: var(--ads-line-height-normal);
}

.feature-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 8px;
  height: 8px;
  background-color: var(--ads-blue);
  border-radius: 50%;
}

/* Responsive Styles (ABD-001-004) */
@media screen and (max-width: 768px) {
  .welcome-content {
    padding: 0 var(--ads-space-2);
  }
  
  .welcome-form {
    padding: var(--ads-space-3);
  }
  
  .welcome-info {
    padding: var(--ads-space-2);
  }
}

@media screen and (max-width: 480px) {
  .welcome-form {
    padding: var(--ads-space-2);
  }
  
  .form-actions .ads-btn {
    width: 100%;
  }
  
  .welcome-info h2 {
    font-size: var(--ads-font-size-body);
    font-weight: 600;
  }
}
</style>
