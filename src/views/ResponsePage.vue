<template>
  <div class="response-container">
    <div class="response-card">
      <!-- Page Header (E-003-F-002) -->
      <header class="page-header">
        <div class="greeting-icon" aria-hidden="true">👋</div>
        
        <!-- Dynamic Greeting Message (E-003-F-003) -->
        <h2 class="greeting-title">Hello, {{ displayName }}!</h2>
        
        <p class="greeting-message">
          Welcome to our application. We're delighted to have you here!
        </p>
      </header>

      <!-- Greeting Details -->
      <div class="greeting-details">
        <dl class="details-list">
          <div class="detail-item">
            <dt class="detail-label">Name Entered:</dt>
            <dd class="detail-value">{{ displayName }}</dd>
          </div>
          <div class="detail-item">
            <dt class="detail-label">Greeted at:</dt>
            <dd class="detail-value">{{ formattedTimestamp }}</dd>
          </div>
        </dl>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <!-- Back Navigation Button (E-003-F-004) -->
        <button
          @click="handleGoBack"
          class="btn btn-primary"
          aria-label="Go back to enter a different name"
        >
          <span class="btn-icon" aria-hidden="true">←</span>
          Enter Another Name
        </button>

        <button
          @click="handleCopyGreeting"
          class="btn btn-secondary"
          :aria-label="copyState.copied ? 'Greeting copied to clipboard' : 'Copy greeting to clipboard'"
          :aria-live="copyState.copied ? 'polite' : 'off'"
        >
          <span class="btn-icon" aria-hidden="true">{{ copyState.copied ? '✓' : '📋' }}</span>
          {{ copyState.copied ? 'Copied!' : 'Copy Greeting' }}
        </button>
      </div>

      <!-- Error Display (E-003-F-006) -->
      <Transition name="fade">
        <div v-if="errorState.hasError" class="error-banner" role="alert">
          <span class="error-icon" aria-hidden="true">⚠</span>
          {{ errorState.message }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
/**
 * ResponsePage Component
 * Implements E-003: HelloWorld Response Page requirements
 * - E-003-F-002: Page header display
 * - E-003-F-003: Dynamic greeting message
 * - E-003-F-004: Back navigation button
 * - E-003-F-006: Error handling
 * - E-003-F-007: Responsive layout
 */
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Router and route instances
const router = useRouter()
const route = useRoute()

// Timestamp for greeting
const timestamp = ref(new Date())

// Copy state
const copyState = reactive({
  copied: false
})

// Error state (E-003-F-006)
const errorState = reactive({
  hasError: false,
  message: ''
})

/**
 * Sanitizes and formats the display name from query params
 * Implements input sanitization (E-003-F-005)
 */
const displayName = computed(() => {
  const name = route.query.name
  
  if (!name || typeof name !== 'string') {
    return 'Guest'
  }
  
  // Sanitize the name - remove any potentially harmful characters
  const sanitized = name
    .trim()
    .replace(/[<>"'&]/g, '')
    .substring(0, 50)
  
  if (!sanitized) {
    return 'Guest'
  }
  
  // Capitalize first letter of each word
  return sanitized
    .split(' ')
    .map(word => {
      if (word.length === 0) return ''
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .filter(word => word.length > 0)
    .join(' ')
})

/**
 * Formats timestamp for display
 */
const formattedTimestamp = computed(() => {
  return timestamp.value.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

/**
 * Generates the greeting text for copying
 */
const greetingText = computed(() => {
  return `Hello, ${displayName.value}! Welcome to our application.`
})

/**
 * Back Navigation Handler (E-003-F-004)
 * Navigates user back to the welcome page
 */
function handleGoBack() {
  router.push({ name: 'WelcomePage' })
}

/**
 * Copies greeting to clipboard
 * Implements error handling (E-003-F-006)
 */
async function handleCopyGreeting() {
  try {
    // Clear any previous errors
    errorState.hasError = false
    errorState.message = ''
    
    // Use modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(greetingText.value)
    } else {
      // Fallback for older browsers or non-secure contexts
      fallbackCopyToClipboard(greetingText.value)
    }
    
    // Show success feedback
    copyState.copied = true
    setTimeout(() => {
      copyState.copied = false
    }, 2000)
    
  } catch (error) {
    // Error handling (E-003-F-006)
    console.error('Failed to copy greeting:', error)
    errorState.hasError = true
    errorState.message = 'Failed to copy greeting. Please try again.'
    
    // Auto-clear error after 5 seconds
    setTimeout(() => {
      errorState.hasError = false
      errorState.message = ''
    }, 5000)
  }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 */
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.left = '-9999px'
  textArea.style.top = '-9999px'
  textArea.setAttribute('readonly', '')
  textArea.setAttribute('aria-hidden', 'true')
  
  document.body.appendChild(textArea)
  textArea.select()
  
  try {
    const successful = document.execCommand('copy')
    if (!successful) {
      throw new Error('execCommand copy failed')
    }
    copyState.copied = true
    setTimeout(() => {
      copyState.copied = false
    }, 2000)
  } catch (error) {
    throw error
  } finally {
    document.body.removeChild(textArea)
  }
}

/**
 * Redirect to welcome page if no name provided
 * Error handling (E-003-F-006)
 */
onMounted(() => {
  if (!route.query.name) {
    router.push({ name: 'WelcomePage' })
  }
})
</script>

<style scoped>
/* Response Container - Responsive Layout (E-003-F-007) */
.response-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: var(--ads-spacing-md);
}

.response-card {
  background: var(--ads-bg-primary);
  border-radius: var(--ads-radius-lg);
  box-shadow: var(--ads-shadow-lg);
  padding: var(--ads-spacing-2xl);
  width: 100%;
  max-width: 520px;
  text-align: center;
  animation: slideUp var(--ads-transition-slow) ease-out;
}

/* Page Header (E-003-F-002) */
.page-header {
  margin-bottom: var(--ads-spacing-xl);
}

.greeting-icon {
  font-size: 4rem;
  margin-bottom: var(--ads-spacing-md);
  animation: wave 1.5s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-10deg); }
}

/* Dynamic Greeting (E-003-F-003) */
.greeting-title {
  color: var(--ads-color-primary);
  font-size: var(--ads-font-size-3xl);
  margin-bottom: var(--ads-spacing-md);
  word-break: break-word;
}

.greeting-message {
  color: var(--ads-text-secondary);
  font-size: var(--ads-font-size-md);
  line-height: var(--ads-line-height-relaxed);
  margin-bottom: 0;
}

/* Greeting Details */
.greeting-details {
  background: var(--ads-bg-secondary);
  border-radius: var(--ads-radius-md);
  padding: var(--ads-spacing-lg);
  margin-bottom: var(--ads-spacing-xl);
}

.details-list {
  margin: 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--ads-spacing-sm) 0;
}

.detail-item:not(:last-child) {
  border-bottom: 1px solid var(--ads-bg-tertiary);
}

.detail-label {
  font-weight: var(--ads-font-weight-semibold);
  color: var(--ads-text-secondary);
  font-size: var(--ads-font-size-sm);
}

.detail-value {
  color: var(--ads-text-primary);
  font-size: var(--ads-font-size-sm);
  margin: 0;
}

/* Action Buttons (E-003-F-004) */
.action-buttons {
  display: flex;
  gap: var(--ads-spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: var(--ads-spacing-md) var(--ads-spacing-lg);
  font-size: var(--ads-font-size-base);
  font-weight: var(--ads-font-weight-semibold);
  border: none;
  border-radius: var(--ads-radius-md);
  cursor: pointer;
  transition: all var(--ads-transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ads-spacing-sm);
  min-width: 160px;
}

.btn:focus {
  outline: none;
  box-shadow: var(--ads-focus-ring);
}

.btn-icon {
  font-size: var(--ads-font-size-md);
}

.btn-primary {
  background-color: var(--ads-color-primary);
  color: var(--ads-text-inverse);
}

.btn-primary:hover {
  background-color: var(--ads-color-primary-dark);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: var(--ads-color-secondary);
  color: var(--ads-text-inverse);
}

.btn-secondary:hover {
  background-color: #444444;
  transform: translateY(-1px);
}

/* Error Banner (E-003-F-006) */
.error-banner {
  margin-top: var(--ads-spacing-lg);
  padding: var(--ads-spacing-md);
  background-color: rgba(216, 41, 47, 0.1);
  border: 1px solid var(--ads-color-error);
  border-radius: var(--ads-radius-md);
  color: var(--ads-color-error);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ads-spacing-sm);
  font-size: var(--ads-font-size-sm);
}

.error-icon {
  flex-shrink: 0;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--ads-transition-fast);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive Layout (E-003-F-007) */
@media (max-width: 600px) {
  .response-card {
    padding: var(--ads-spacing-lg);
    border-radius: var(--ads-radius-md);
  }

  .greeting-icon {
    font-size: 3rem;
  }

  .greeting-title {
    font-size: var(--ads-font-size-2xl);
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--ads-spacing-xs);
  }
}
</style>