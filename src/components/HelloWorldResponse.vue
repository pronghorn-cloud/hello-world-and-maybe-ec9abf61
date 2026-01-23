<template>
  <div class="response-container">
    <div class="response-card">
      <div class="greeting-icon" aria-hidden="true">👋</div>
      
      <h2 class="greeting-title">Hello, {{ displayName }}!</h2>
      
      <p class="greeting-message">
        Welcome to our application. We're glad to have you here!
      </p>
      
      <div class="greeting-details">
        <p class="timestamp">
          <span class="label">Greeted at:</span>
          <span class="value">{{ formattedTimestamp }}</span>
        </p>
      </div>
      
      <div class="action-buttons">
        <button 
          @click="goBack" 
          class="btn btn-primary"
          aria-label="Go back to enter a different name"
        >
          Enter Another Name
        </button>
        
        <button 
          @click="copyGreeting" 
          class="btn btn-secondary"
          :aria-label="copied ? 'Greeting copied' : 'Copy greeting to clipboard'"
        >
          {{ copied ? '✓ Copied!' : 'Copy Greeting' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorldResponse',
  data() {
    return {
      timestamp: new Date(),
      copied: false
    }
  },
  computed: {
    displayName() {
      const name = this.$route.query.name
      if (!name) {
        return 'Guest'
      }
      // Capitalize first letter of each word
      return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    },
    
    formattedTimestamp() {
      return this.timestamp.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    greetingText() {
      return `Hello, ${this.displayName}! Welcome to our application.`
    }
  },
  mounted() {
    // Redirect to home if no name provided
    if (!this.$route.query.name) {
      this.$router.push({ name: 'Home' })
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Home' })
    },
    
    async copyGreeting() {
      try {
        await navigator.clipboard.writeText(this.greetingText)
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (error) {
        console.error('Failed to copy:', error)
        // Fallback for older browsers
        this.fallbackCopy(this.greetingText)
      }
    },
    
    fallbackCopy(text) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      } catch (error) {
        console.error('Fallback copy failed:', error)
      }
      document.body.removeChild(textArea)
    }
  }
}
</script>

<style scoped>
.response-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 1rem;
}

.response-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 3rem;
  width: 100%;
  max-width: 520px;
  text-align: center;
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.greeting-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: wave 1.5s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-10deg);
  }
}

.greeting-title {
  color: #42b883;
  font-size: 2.25rem;
  margin: 0 0 1rem 0;
  word-break: break-word;
}

.greeting-message {
  color: #666;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.greeting-details {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.timestamp {
  margin: 0;
  color: #555;
  font-size: 0.9rem;
}

.timestamp .label {
  font-weight: 600;
  margin-right: 0.5rem;
}

.timestamp .value {
  color: #35495e;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 160px;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.4);
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover {
  background-color: #3aa876;
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: #35495e;
  color: white;
}

.btn-secondary:hover {
  background-color: #2c3e50;
  transform: translateY(-1px);
}

@media (max-width: 600px) {
  .response-card {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
  
  .greeting-icon {
    font-size: 3rem;
  }
  
  .greeting-title {
    font-size: 1.75rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
