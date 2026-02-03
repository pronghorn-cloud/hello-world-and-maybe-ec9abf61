<template>
  <div class="response-form">
    <div class="goa-card">
      <div v-if="userName" class="response-content">
        <div class="goa-callout goa-callout--success">
          <h1>Hello, {{ userName }}!</h1>
          <p class="greeting-message">Welcome to the Government of Alberta HelloWorld application.</p>
        </div>
        
        <p>Thank you for using our service. Your greeting has been successfully generated.</p>
        
        <div class="response-actions">
          <button 
            type="button" 
            class="goa-button goa-button--secondary"
            @click="goBack"
          >
            ← Go Back
          </button>
          <button 
            type="button" 
            class="goa-button goa-button--primary"
            @click="startOver"
          >
            Start Over
          </button>
        </div>
      </div>
      
      <div v-else class="no-data">
        <h1>No Name Provided</h1>
        <p>It looks like you haven't entered your name yet.</p>
        <button 
          type="button" 
          class="goa-button goa-button--primary"
          @click="goToEntry"
        >
          Enter Your Name
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
.response-form {
  max-width: 600px;
  margin: 0 auto;
}

.response-content h1 {
  color: var(--goa-color-success);
  margin-bottom: var(--goa-space-sm);
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