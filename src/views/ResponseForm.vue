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
            <span aria-hidden="true">←</span> Go Back
          </button>
          <button 
            type="button" 
            class="goa-button goa-button--primary"
            @click="startOver"
          >
            Start Over
          </button>
        </div>
      </template>
      
      <template v-else>
        <div class="goa-response-form__empty">
          <h1>No Name Provided</h1>
          <p>It looks like you haven't entered your name yet. Please go back to enter your information.</p>
          <button 
            type="button" 
            class="goa-button goa-button--primary"
            @click="goToEntry"
          >
            Enter Your Name
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// GOA Response Form - Strictly follows GOA Design System standards

const router = useRouter()
const userName = ref('')

onMounted(() => {
  // Retrieve name from sessionStorage
  const storedName = sessionStorage.getItem('userName')
  if (storedName) {
    userName.value = storedName
  }
})

/**
 * Navigate back to entry form (preserves data)
 */
function goBack() {
  router.push({ name: 'EntryForm' })
}

/**
 * Clear data and start fresh
 */
function startOver() {
  sessionStorage.removeItem('userName')
  router.push({ name: 'EntryForm' })
}

/**
 * Navigate to entry form when no data exists
 */
function goToEntry() {
  router.push({ name: 'EntryForm' })
}
</script>

<style scoped>
.goa-response-form {
  max-width: 600px;
  margin: 0 auto;
}

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
}

.greeting-message {
  margin-bottom: 0;
  font-size: var(--goa-font-size-lg);
}

.response-actions {
  display: flex;
  gap: var(--goa-space-md);
  margin-top: var(--goa-space-xl);
  flex-wrap: wrap;
}

.no-data {
  text-align: center;
}

.no-data h1 {
  color: var(--goa-color-greyscale-700);
}

.no-data p {
  margin-bottom: var(--goa-space-xl);
  color: var(--goa-color-greyscale-700);
}

@media (max-width: 480px) {
  .response-form .goa-card {
    padding: var(--goa-space-lg);
  }
  
  .response-actions {
    flex-direction: column;
  }
  
  .response-actions .goa-button {
    width: 100%;
  }
}
</style>