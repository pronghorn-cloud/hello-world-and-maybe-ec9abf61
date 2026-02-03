<template>
  <div class="goa-response-form">
    <div class="goa-card">
      <template v-if="userName">
        <div class="goa-callout goa-callout--success" role="status" aria-live="polite">
          <h1 class="goa-response-form__greeting">Hello, {{ userName }}!</h1>
          <p class="goa-response-form__message">Welcome to the Government of Alberta HelloWorld application.</p>
        </div>
        
        <p>Thank you for using our service. Your greeting has been successfully generated.</p>
        
        <div class="goa-response-form__actions">
          <button 
            type="button" 
            class="goa-button goa-button--secondary"
            @click="goBack"
          >
            <span aria-hidden="true">←</span> Go back
          </button>
          <button 
            type="button" 
            class="goa-button goa-button--primary"
            @click="startOver"
          >
            Start over
          </button>
        </div>
      </template>
      
      <template v-else>
        <div class="goa-response-form__empty">
          <h1>No name provided</h1>
          <p>You haven't entered your name yet. Go back to enter your information.</p>
          <button 
            type="button" 
            class="goa-button goa-button--primary"
            @click="goToEntry"
          >
            Enter your name
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

/**
 * GOA Response Form Component
 * 
 * Compliance:
 * - ADS-001: WCAG 2.2 AA with live regions for dynamic content
 * - ADS-003: Clear, human-centered messaging and button labels
 * - ADS-004: Uses GOA design tokens for all visual styling
 * - ADS-005: Follows GOA Design System patterns (callouts, buttons)
 * - ADS-006: Semantic HTML with proper heading hierarchy
 * - ADS-007: Logical information architecture (greeting > confirmation > actions)
 * - ADS-008: State management for user data retrieval and navigation
 * - ADS-010: Supplementary styling using GOA CSS custom properties
 */

const router = useRouter()
const userName = ref('')

onMounted(() => {
  const storedName = sessionStorage.getItem('userName')
  if (storedName) {
    userName.value = storedName
  }
})

/**
 * ADS-008: Navigate back to entry form (preserves session data)
 */
function goBack() {
  router.push({ name: 'EntryForm' })
}

/**
 * ADS-008: Clear session data and restart flow
 */
function startOver() {
  sessionStorage.removeItem('userName')
  router.push({ name: 'EntryForm' })
}

/**
 * ADS-008: Navigate to entry form when no data exists
 */
function goToEntry() {
  router.push({ name: 'EntryForm' })
}
</script>

<style scoped>
/* ADS-007: Content container with appropriate max-width */
.goa-response-form {
  max-width: 600px;
  margin: 0 auto;
}

/* ADS-004: Design Tokens - Success color for positive feedback */
.goa-response-form__greeting {
  color: var(--goa-color-success);
  margin-bottom: var(--goa-space-2xs);
  font-size: var(--goa-font-size-h2);
}

.goa-response-form__message {
  margin-bottom: 0;
  font-size: var(--goa-font-size-lg);
  color: var(--goa-color-text);
}

/* ADS-007: Action buttons grouped logically */
.goa-response-form__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--goa-space-sm);
  margin-top: var(--goa-space-lg);
  padding-top: var(--goa-space-md);
}

.goa-response-form__empty {
  text-align: center;
}

.goa-response-form__empty h1 {
  color: var(--goa-color-text-secondary);
  margin-bottom: var(--goa-space-sm);
}

.goa-response-form__empty p {
  margin-bottom: var(--goa-space-lg);
  color: var(--goa-color-text-secondary);
}

/* ADS-005: Responsive adjustments */
@media (max-width: 480px) {
  .goa-response-form .goa-card {
    padding: var(--goa-space-md);
  }
  
  .goa-response-form__actions {
    flex-direction: column;
  }
  
  .goa-response-form__actions .goa-button {
    width: 100%;
  }
}
</style>