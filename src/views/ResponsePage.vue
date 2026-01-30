<script setup>
/**
 * ResponsePage Component
 * @requirement E-003 HelloWorld Response Page
 * @description Displays personalized greeting with submitted form data
 * 
 * Requirements Implemented:
 * - E-003-F-001: Capture data from WelcomePage (Name, Date)
 * - E-003-F-002: Page header "HelloWorld Response"
 * - E-003-F-003: Dynamic greeting message "Hello [Name], the date is [Date]"
 * - E-003-F-004: Back navigation button to return to form
 * - E-003-F-005: Validation of retrieved data
 * - E-003-F-006: Error handling (direct access, missing data, session timeout)
 * - E-003-F-007: Responsive layout for all screen sizes
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

import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import H1Header from '../components/H1Header.vue'

const router = useRouter()

// State management
const formData = ref(null)
const error = ref('')
const isLoading = ref(true)

// E-003-F-006: Session timeout duration (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000

/**
 * E-003-F-001: Load and validate form data on mount
 * E-003-F-005: Validate retrieved data
 * E-003-F-006: Handle errors for direct access, missing data, session timeouts
 */
onMounted(() => {
  try {
    const storedData = sessionStorage.getItem('formData')
    
    // E-003-F-006: Check for missing data (direct access)
    if (!storedData) {
      error.value = 'No form data found. Please fill out the form first.'
      isLoading.value = false
      return
    }
    
    const parsed = JSON.parse(storedData)
    
    // E-003-F-006: Check for session timeout
    if (parsed.timestamp && Date.now() - parsed.timestamp > SESSION_TIMEOUT) {
      sessionStorage.removeItem('formData')
      error.value = 'Your session has expired. Please fill out the form again.'
      isLoading.value = false
      return
    }
    
    // E-003-F-005: Validate retrieved data integrity
    if (!parsed.name || typeof parsed.name !== 'string' || parsed.name.trim() === '') {
      error.value = 'Invalid form data. Please fill out the form again.'
      isLoading.value = false
      return
    }
    
    if (!parsed.date || typeof parsed.date !== 'string') {
      error.value = 'Invalid form data. Please fill out the form again.'
      isLoading.value = false
      return
    }
    
    formData.value = parsed
    isLoading.value = false
  } catch (err) {
    // E-003-F-006: Error handling
    console.error('Error loading form data:', err)
    error.value = 'An error occurred while loading your data. Please try again.'
    isLoading.value = false
  }
})

/**
 * E-003-F-003: Dynamic greeting message
 * Generates "Hello [Name], the date is [formatted date]."
 * @returns {string} Formatted greeting message
 */
const greetingMessage = computed(() => {
  if (!formData.value) return ''
  
  const { name, date } = formData.value
  const formattedDate = formatDate(date)
  
  return `Hello ${name}, the date is ${formattedDate}.`
})

/**
 * Format date for display in user-friendly format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (err) {
    console.error('Date formatting error:', err)
    return dateString
  }
}

/**
 * E-003-F-004: Back navigation button handler
 * Clears session data and navigates back to Welcome page
 */
const handleBack = () => {
  sessionStorage.removeItem('formData')
  router.push({ name: 'Welcome' })
}

/**
 * Retry handler for error state
 * Clears session data and redirects to Welcome page
 */
const handleRetry = () => {
  sessionStorage.removeItem('formData')
  router.push({ name: 'Welcome' })
}
</script>

<template>
  <!-- E-003-F-007: Responsive layout container -->
  <main class="container">
    <article class="card">
      <!-- E-003-F-002: Page header "HelloWorld Response" - ADS H1 exclusive to page title -->
      <H1Header text="HelloWorld Response" />
      
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state" aria-live="polite">
        <p>Loading...</p>
      </div>
      
      <!-- E-003-F-006: Error State -->
      <section v-else-if="error" class="error-state">
        <div class="error-alert" role="alert" aria-live="assertive">
          {{ error }}
        </div>
        <button 
          type="button" 
          class="btn btn-primary" 
          @click="handleRetry"
        >
          Go to Form
        </button>
      </section>
      
      <!-- Success State -->
      <section v-else class="success-state">
        <!-- E-003-F-003: Dynamic greeting message -->
        <div class="greeting-message" role="status" aria-live="polite">
          {{ greetingMessage }}
        </div>
        
        <!-- E-003-F-001: Display captured form data summary -->
        <div class="data-summary">
          <h2 class="summary-title">Submitted Information</h2>
          <dl class="summary-list">
            <div class="summary-item">
              <dt>Name:</dt>
              <dd>{{ formData.name }}</dd>
            </div>
            <div class="summary-item">
              <dt>Date:</dt>
              <dd>{{ formatDate(formData.date) }}</dd>
            </div>
          </dl>
        </div>
        
        <!-- E-003-F-004: Back navigation button -->
        <nav class="navigation">
          <button 
            type="button" 
            class="btn btn-secondary" 
            @click="handleBack"
            aria-label="Go back to the welcome form"
          >
            ← Back to Form
          </button>
        </nav>
      </section>
    </article>
  </main>
</template>

<style scoped>
/* Alberta Design System: Loading State */
.loading-state {
  text-align: center;
  padding: var(--ads-space-lg);
  color: var(--ads-text-secondary);
}

/* Alberta Design System: Error State */
.error-state {
  text-align: center;
}

/* Alberta Design System: Success State */
.success-state {
  display: flex;
  flex-direction: column;
  gap: var(--ads-space-md);
}

/* Alberta Design System: Data Summary Section */
.data-summary {
  background-color: var(--ads-background);
  border-radius: var(--ads-radius-sm);
  padding: var(--ads-space-sm);
}

.summary-title {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-body);
  font-weight: var(--ads-font-weight-semibold);
  color: var(--ads-text-secondary);
  margin-bottom: var(--ads-space-xs);
}

.summary-list {
  margin: 0;
}

.summary-item {
  display: flex;
  gap: var(--ads-space-xs);
  margin-bottom: var(--ads-space-xs);
}

.summary-item:last-child {
  margin-bottom: 0;
}

.summary-item dt {
  font-weight: var(--ads-font-weight-semibold);
  color: var(--ads-text-secondary);
}

.summary-item dd {
  margin: 0;
  color: var(--ads-text-primary);
}

/* Alberta Design System: Navigation */
.navigation {
  display: flex;
}

.btn-secondary {
  align-self: flex-start;
}

/* Alberta Design System: Responsive layout - Mobile breakpoint (480px) */
@media (max-width: 480px) {
  .summary-item {
    flex-direction: column;
    gap: 4px;
  }
  
  .btn-secondary {
    align-self: stretch;
    width: 100%;
  }
  
  .navigation {
    width: 100%;
  }
}
</style>
