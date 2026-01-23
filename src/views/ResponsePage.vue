<script setup>
/**
 * ResponsePage Component - Greeting Display
 * 
 * Displays personalized greeting with submitted information.
 * Implements Government of Alberta Design System and WCAG 2.1 AA standards.
 * 
 * Requirements:
 * - E-003-F-001: Display personalized greeting
 * - E-003-F-002: Show submitted date in Canadian format
 * - E-003-F-003: Back button navigation
 * - E-003-F-004: Format greeting message
 * - E-003-F-005: Handle missing data gracefully
 * - E-003-F-006: Accessible response display
 * - E-003-F-007: Clear visual hierarchy
 * 
 * @component
 */
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BaseButton, BaseCard } from '@/components/ui'
import { useDateFormatter } from '@/composables/useDateFormatter'
import { ROUTES } from '@/constants'

const route = useRoute()
const router = useRouter()
const { formatLong } = useDateFormatter()

// Get data from query parameters
const name = computed(() => route.query.name || '')
const date = computed(() => route.query.date || '')

// Check for valid data (E-003-F-005)
const hasValidData = computed(() => {
  return Boolean(name.value && date.value)
})

// Format greeting (E-003-F-001, E-003-F-004)
const greetingMessage = computed(() => {
  return hasValidData.value ? `Hello, ${name.value}!` : ''
})

// Format date for display (E-003-F-002)
const formattedDate = computed(() => {
  return formatLong(date.value)
})

/**
 * Navigate back to welcome page (E-003-F-003)
 */
function goBack() {
  router.push({ name: ROUTES.WELCOME })
}
</script>

<template>
  <div class="response-page">
    <!-- Valid Data State (E-003-F-006, E-003-F-007) -->
    <template v-if="hasValidData">
      <h2 class="response-page__title">Your Greeting</h2>

      <BaseCard 
        class="response-page__card" 
        role="region" 
        aria-label="Personalized greeting"
      >
        <!-- Greeting (E-003-F-001, E-003-F-004) -->
        <p class="response-page__greeting" aria-live="polite">
          {{ greetingMessage }}
        </p>

        <!-- Date Display (E-003-F-002) -->
        <div class="response-page__date-section">
          <p class="response-page__date-label">Date submitted:</p>
          <p class="response-page__date-value">
            <time :datetime="date">{{ formattedDate }}</time>
          </p>
        </div>

        <hr class="response-page__divider" aria-hidden="true" />

        <p class="response-page__thank-you">
          Thank you for using the HelloWorld application.
        </p>

        <!-- Back Button (E-003-F-003) -->
        <BaseButton
          variant="secondary"
          full-width
          @click="goBack"
        >
          ← Back to Welcome
        </BaseButton>
      </BaseCard>
    </template>

    <!-- Missing Data State (E-003-F-005) -->
    <template v-else>
      <BaseCard class="response-page__error-card">
        <div class="response-page__error-content">
          <h2 class="response-page__error-title">No Data Found</h2>
          <p class="response-page__error-message">
            It looks like you haven't submitted the form yet. 
            Please go back to the welcome page and enter your information.
          </p>
          <BaseButton
            variant="primary"
            @click="goBack"
          >
            Go to Welcome Page
          </BaseButton>
        </div>
      </BaseCard>
    </template>
  </div>
</template>

<style scoped>
.response-page {
  max-width: 500px;
}

.response-page__title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--goa-blue-dark);
  margin-bottom: 1.5rem;
}

.response-page__card {
  max-width: 420px;
}

.response-page__greeting {
  font-size: 1.75rem;
  color: var(--goa-blue);
  font-weight: 600;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.response-page__date-section {
  margin-bottom: 1.5rem;
}

.response-page__date-label {
  font-size: 0.875rem;
  color: var(--goa-grey);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.response-page__date-value {
  font-weight: 500;
  color: var(--goa-grey-dark);
  font-size: 1.125rem;
}

.response-page__divider {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 1.5rem 0;
}

.response-page__thank-you {
  color: var(--goa-grey);
  margin-bottom: 1.5rem;
}

.response-page__error-card {
  max-width: 420px;
}

.response-page__error-content {
  text-align: center;
}

.response-page__error-title {
  font-size: 1.5rem;
  color: var(--goa-red);
  margin-bottom: 1rem;
}

.response-page__error-message {
  color: var(--goa-grey);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .response-page__title {
    font-size: 1.5rem;
  }

  .response-page__greeting {
    font-size: 1.5rem;
  }
}
</style>
