<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import H1Header from '../components/H1Header.vue'

const router = useRouter()

// State
const formData = ref(null)
const error = ref('')
const isLoading = ref(true)

// Session timeout duration (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000

// E-003-F-006: Error handling for direct access, missing data, session timeouts
onMounted(() => {
  try {
    const storedData = sessionStorage.getItem('formData')
    
    // Check for missing data
    if (!storedData) {
      error.value = 'No form data found. Please fill out the form first.'
      isLoading.value = false
      return
    }
    
    const parsed = JSON.parse(storedData)
    
    // Check for session timeout
    if (parsed.timestamp && Date.now() - parsed.timestamp > SESSION_TIMEOUT) {
      sessionStorage.removeItem('formData')
      error.value = 'Your session has expired. Please fill out the form again.'
      isLoading.value = false
      return
    }
    
    // E-003-F-005: Validate retrieved data
    if (!parsed.name || !parsed.date) {
      error.value = 'Invalid form data. Please fill out the form again.'
      isLoading.value = false
      return
    }
    
    formData.value = parsed
    isLoading.value = false
  } catch (err) {
    console.error('Error loading form data:', err)
    error.value = 'An error occurred while loading your data. Please try again.'
    isLoading.value = false
  }
})

// E-003-F-003: Dynamic greeting message "Hello [Field 1] the date..."
const greetingMessage = computed(() => {
  if (!formData.value) return ''
  
  const { name, date } = formData.value
  const formattedDate = formatDate(date)
  
  return `Hello ${name}, the date is ${formattedDate}.`
})

// Format date for display
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (_err) {
    return dateString
  }
}

// E-003-F-004: Back navigation button
const handleBack = () => {
  // Clear session data when going back
  sessionStorage.removeItem('formData')
  router.push({ name: 'Welcome' })
}

// Retry - redirect to welcome page
const handleRetry = () => {
  sessionStorage.removeItem('formData')
  router.push({ name: 'Welcome' })
}
</script>

<template>
  <div class="container">
    <div class="card">
      <!-- E-003-F-002: Page header "HelloWorld Response" -->
      <H1Header text="HelloWorld Response" />
      
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <p>Loading...</p>
      </div>
      
      <!-- Error State - E-003-F-006 -->
      <div v-else-if="error" class="error-state">
        <div class="error-alert" role="alert">
          {{ error }}
        </div>
        <button 
          type="button" 
          class="btn btn-primary" 
          @click="handleRetry"
        >
          Go to Form
        </button>
      </div>
      
      <!-- Success State -->
      <div v-else class="success-state">
        <!-- E-003-F-003: Dynamic greeting message -->
        <div class="greeting-message" role="status">
          {{ greetingMessage }}
        </div>
        
        <!-- Form Data Summary -->
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
        <button 
          type="button" 
          class="btn btn-secondary" 
          @click="handleBack"
        >
          ← Back to Form
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error-state {
  text-align: center;
}

.success-state {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.data-summary {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 1rem;
}

.summary-title {
  font-size: 1rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.75rem;
}

.summary-list {
  margin: 0;
}

.summary-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.summary-item:last-child {
  margin-bottom: 0;
}

.summary-item dt {
  font-weight: 600;
  color: #555;
}

.summary-item dd {
  margin: 0;
  color: #333;
}

.btn-secondary {
  align-self: flex-start;
}

@media (max-width: 480px) {
  .summary-item {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .btn-secondary {
    align-self: stretch;
  }
}
</style>