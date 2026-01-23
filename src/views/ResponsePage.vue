<script setup>
/**
 * ResponsePage Component - Greeting Display
 * 
 * Requirements:
 * - E-003-F-001: Display personalized greeting
 * - E-003-F-002: Show submitted date
 * - E-003-F-003: Back button navigation
 * - E-003-F-004: Format greeting message
 * - E-003-F-005: Handle missing data gracefully
 * - E-003-F-006: Accessible response display
 * - E-003-F-007: Clear visual hierarchy
 */
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Get data from query parameters
const name = computed(() => route.query.name || '')
const date = computed(() => route.query.date || '')

// Check for valid data (E-003-F-005)
const hasValidData = computed(() => name.value && date.value)

// Format greeting (E-003-F-001, E-003-F-004)
const greetingMessage = computed(() => {
  return hasValidData.value ? `Hello, ${name.value}!` : ''
})

// Format date for display (E-003-F-002)
const formattedDate = computed(() => {
  if (!date.value) return ''
  
  try {
    const dateObj = new Date(date.value + 'T00:00:00')
    return dateObj.toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return date.value
  }
})

// Navigate back (E-003-F-003)
function goBack() {
  router.push({ name: 'Welcome' })
}
</script>

<template>
  <div class="response-page">
    <!-- Valid Data State (E-003-F-006, E-003-F-007) -->
    <template v-if="hasValidData">
      <h2 class="page-title">Your Greeting</h2>

      <div class="card response-card" role="region" aria-label="Personalized greeting">
        <!-- Greeting (E-003-F-001, E-003-F-004) -->
        <p class="greeting-message" aria-live="polite">
          {{ greetingMessage }}
        </p>

        <!-- Date Display (E-003-F-002) -->
        <div class="date-section">
          <p class="date-label">Date submitted:</p>
          <p class="date-value">{{ formattedDate }}</p>
        </div>

        <hr class="divider" aria-hidden="true" />

        <p class="thank-you-message">
          Thank you for using the HelloWorld application.
        </p>

        <!-- Back Button (E-003-F-003) -->
        <button type="button" class="btn-secondary back-btn" @click="goBack">
          ← Back to Welcome
        </button>
      </div>
    </template>

    <!-- Missing Data State (E-003-F-005) -->
    <template v-else>
      <div class="card error-card">
        <h2 class="error-title">No Data Found</h2>
        <p class="error-message-text">
          It looks like you haven't submitted the form yet. 
          Please go back to the welcome page and enter your information.
        </p>
        <button type="button" class="btn-primary" @click="goBack">
          Go to Welcome Page
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.response-page {
  max-width: 500px;
}

.page-title {
  font-size: 2rem;
  color: var(--goa-blue);
  margin-bottom: 1.5rem;
}

.response-card {
  max-width: 400px;
}

.greeting-message {
  font-size: 1.5rem;
  color: var(--goa-blue);
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.date-section {
  margin-bottom: 1.5rem;
}

.date-label {
  font-size: 0.875rem;
  color: var(--goa-grey);
  margin-bottom: 0.25rem;
}

.date-value {
  font-weight: 500;
  color: var(--goa-grey-dark);
}

.divider {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
}

.thank-you-message {
  color: var(--goa-grey);
  margin-bottom: 1.5rem;
}

.back-btn {
  width: 100%;
}

.error-card {
  max-width: 400px;
  text-align: center;
}

.error-title {
  font-size: 1.5rem;
  color: var(--goa-red);
  margin-bottom: 1rem;
}

.error-message-text {
  color: var(--goa-grey);
  margin-bottom: 1.5rem;
}
</style>
