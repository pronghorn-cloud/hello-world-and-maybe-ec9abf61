<script setup>
/**
 * ResponsePage Component
 * @standard Alberta Design System (ADS)
 * @version 2.1.0 - Rebuilt with strict ADS compliance
 * @description Displays personalized greeting with submitted form data
 * 
 * Requirements:
 * - E-003-F-001: Capture data from WelcomePage (Name, Date)
 * - E-003-F-002: Page header "HelloWorld Response"
 * - E-003-F-003: Dynamic greeting message "Hello [Name], the date is [Date]"
 * - E-003-F-004: Back navigation button to return to form
 * - E-003-F-005: Validation of retrieved data
 * - E-003-F-006: Error handling (direct access, missing data, session timeout)
 * - E-003-F-007: Responsive layout for all screen sizes
 * 
 * Alberta Design System Compliance:
 * - All colors from ADS CSS variables (--ads-*)
 * - Focus state #FEBA35 for all interactive elements
 * - Full component states (hover, focus, error, disabled)
 * - WCAG 2.1 AA accessibility compliance
 * - 8px spacing grid system
 * - Responsive: 768px tablet, 480px mobile breakpoints
 * - Reduced motion support
 */

import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import H1Header from '../components/H1Header.vue'

const router = useRouter()

// State management
const formData = ref(null)
const error = ref('')
const isLoading = ref(true)

// Session timeout duration (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000

/**
 * Load and validate form data on mount
 */
onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  try {
    const storedData = sessionStorage.getItem('formData')
    
    // Check for missing data (direct access)
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
    
    // Validate retrieved data integrity
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
    console.error('Error loading form data:', err)
    error.value = 'An error occurred while loading your data. Please try again.'
    isLoading.value = false
  }
})

/**
 * Dynamic greeting message
 * @returns {string} Formatted greeting message
 */
const greetingMessage = computed(() => {
  if (!formData.value) return ''
  const { name, date } = formData.value
  return `Hello ${name}, the date is ${formatDate(date)}.`
})

/**
 * Format date for display
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
 * Back navigation handler
 */
const handleBack = () => {
  sessionStorage.removeItem('formData')
  router.push({ name: 'Welcome' })
}

/**
 * Retry handler for error state
 */
const handleRetry = () => {
  sessionStorage.removeItem('formData')
  router.push({ name: 'Welcome' })
}
</script>

<template>
  <div class="page-container">
    <div class="container">
      <article class="card">
        <!-- ADS: H1Header - H1 exclusive to page title -->
        <H1Header text="HelloWorld Response" />
        
        <!-- ADS: Loading State -->
        <transition name="fade" mode="out-in">
          <div 
            v-if="isLoading" 
            key="loading" 
            class="state-loading" 
            aria-live="polite"
          >
            <div class="loading-spinner" aria-hidden="true">
              <div class="spinner-ring"></div>
            </div>
            <p class="loading-text">Loading your greeting...</p>
          </div>
          
          <!-- ADS: Error State -->
          <section 
            v-else-if="error" 
            key="error" 
            class="state-error"
          >
            <div class="error-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div class="error-alert" role="alert" aria-live="assertive">
              {{ error }}
            </div>
            <button 
              type="button" 
              class="btn btn-primary" 
              @click="handleRetry"
            >
              <span>Go to Form</span>
              <span class="btn-icon" aria-hidden="true">→</span>
            </button>
          </section>
          
          <!-- ADS: Success State -->
          <section 
            v-else 
            key="success" 
            class="state-success"
          >
            <!-- Success icon -->
            <div class="success-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            
            <!-- ADS: Dynamic greeting message -->
            <div 
              class="greeting-message" 
              role="status" 
              aria-live="polite"
            >
              {{ greetingMessage }}
            </div>
            
            <!-- ADS: Data summary section -->
            <div class="data-summary">
              <h2 class="summary-title">
                <span class="title-icon" aria-hidden="true">📋</span>
                <span>Submitted Information</span>
              </h2>
              <dl class="summary-list">
                <div class="summary-item">
                  <dt class="summary-label">
                    <span class="label-icon" aria-hidden="true">👤</span>
                    <span>Name</span>
                  </dt>
                  <dd class="summary-value">{{ formData.name }}</dd>
                </div>
                <div class="summary-item">
                  <dt class="summary-label">
                    <span class="label-icon" aria-hidden="true">📅</span>
                    <span>Date</span>
                  </dt>
                  <dd class="summary-value">{{ formatDate(formData.date) }}</dd>
                </div>
              </dl>
            </div>
            
            <!-- ADS: Back navigation -->
            <nav class="navigation" aria-label="Page navigation">
              <button 
                type="button" 
                class="btn btn-secondary" 
                @click="handleBack"
                aria-label="Go back to the welcome form"
              >
                <span class="btn-icon btn-icon-left" aria-hidden="true">←</span>
                <span>Back to Form</span>
              </button>
            </nav>
          </section>
        </transition>
      </article>
    </div>
  </div>
</template>

<style scoped>
/**
 * Alberta Design System - ResponsePage Styles
 * All values use ADS CSS variables for consistency
 */

/* ADS: Page layout */
.page-container {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: var(--ads-space-lg);
}

/* ========================================
   ADS: Loading State
   ======================================== */
.state-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--ads-space-xl) var(--ads-space-lg);
  gap: var(--ads-space-md);
}

.loading-spinner {
  width: 48px;
  height: 48px;
}

.spinner-ring {
  width: 100%;
  height: 100%;
  border: 4px solid var(--ads-border-light);
  border-top-color: var(--ads-blue);
  border-radius: var(--ads-radius-full);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-body);
  color: var(--ads-text-secondary);
  margin: 0;
}

/* ========================================
   ADS: Error State
   ======================================== */
.state-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--ads-space-md);
}

.error-icon {
  width: 64px;
  height: 64px;
  color: var(--ads-error);
  animation: fadeIn var(--ads-transition-normal) ease-out;
}

.error-icon svg {
  width: 100%;
  height: 100%;
}

/* ========================================
   ADS: Success State
   ======================================== */
.state-success {
  display: flex;
  flex-direction: column;
  gap: var(--ads-space-md);
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  width: 56px;
  height: 56px;
  color: var(--ads-success);
  margin: 0 auto;
  animation: scaleIn 0.4s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.success-icon svg {
  width: 100%;
  height: 100%;
}

/* ========================================
   ADS: Greeting Message
   ======================================== */
.greeting-message {
  background: linear-gradient(
    135deg, 
    var(--ads-success-light) 0%, 
    var(--ads-background-white) 100%
  );
  border: 2px solid var(--ads-success);
  border-left-width: 4px;
  color: var(--ads-text-primary);
  padding: var(--ads-space-md) var(--ads-space-lg);
  border-radius: var(--ads-radius-md);
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-lg);
  font-weight: var(--ads-font-weight-semibold);
  text-align: center;
  line-height: var(--ads-line-height-relaxed);
}

/* ========================================
   ADS: Data Summary Section
   ======================================== */
.data-summary {
  background-color: var(--ads-background-alt);
  border: 1px solid var(--ads-border-light);
  border-radius: var(--ads-radius-md);
  padding: var(--ads-space-md);
}

.summary-title {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-small);
  font-weight: var(--ads-font-weight-semibold);
  color: var(--ads-text-secondary);
  margin: 0 0 var(--ads-space-sm) 0;
  text-transform: uppercase;
  letter-spacing: var(--ads-letter-spacing-wide);
  display: flex;
  align-items: center;
  gap: var(--ads-space-xs);
}

.title-icon {
  font-size: 1em;
}

.summary-list {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--ads-space-sm);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--ads-space-xs) var(--ads-space-sm);
  background-color: var(--ads-background-white);
  border-radius: var(--ads-radius-sm);
  border: 1px solid var(--ads-border-light);
}

.summary-label {
  font-family: var(--ads-font-family);
  font-weight: var(--ads-font-weight-semibold);
  color: var(--ads-text-secondary);
  display: flex;
  align-items: center;
  gap: var(--ads-space-xs);
}

.label-icon {
  font-size: 1em;
}

.summary-value {
  margin: 0;
  font-family: var(--ads-font-family);
  color: var(--ads-text-primary);
  font-weight: var(--ads-font-weight-medium);
}

/* ========================================
   ADS: Navigation
   ======================================== */
.navigation {
  display: flex;
  margin-top: var(--ads-space-xs);
}

.btn-icon {
  font-size: var(--ads-font-size-md);
  transition: transform var(--ads-transition-fast);
}

.btn-icon-left {
  margin-right: var(--ads-space-2xs);
}

.btn-secondary:hover:not(:disabled) .btn-icon-left {
  transform: translateX(-4px);
}

.btn-primary:hover:not(:disabled) .btn-icon {
  transform: translateX(4px);
}

/* ========================================
   ADS: Fade Transition
   ======================================== */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--ads-transition-normal) ease, 
              transform var(--ads-transition-normal) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* ========================================
   ADS: Responsive - Tablet (768px)
   ======================================== */
@media (max-width: 768px) {
  .page-container {
    padding-top: var(--ads-space-md);
  }
  
  .greeting-message {
    font-size: var(--ads-font-size-md);
    padding: var(--ads-space-sm) var(--ads-space-md);
  }
  
  .success-icon {
    width: 48px;
    height: 48px;
  }
}

/* ========================================
   ADS: Responsive - Mobile (480px)
   ======================================== */
@media (max-width: 480px) {
  .page-container {
    padding-top: var(--ads-space-sm);
  }
  
  .summary-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--ads-space-2xs);
  }
  
  .navigation {
    width: 100%;
  }
  
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
  
  .greeting-message {
    font-size: var(--ads-font-size-body);
    padding: var(--ads-space-sm);
  }
  
  .success-icon {
    width: 40px;
    height: 40px;
  }
  
  .error-icon {
    width: 48px;
    height: 48px;
  }
}

/* ========================================
   ADS: Reduced Motion Support
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  .spinner-ring {
    animation: none;
  }
  
  .state-success,
  .success-icon,
  .error-icon {
    animation: none;
  }
  
  .btn-secondary:hover:not(:disabled) .btn-icon-left,
  .btn-primary:hover:not(:disabled) .btn-icon {
    transform: none;
  }
}
</style>
