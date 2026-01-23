<template>
  <div class="form-container">
    <div class="form-card">
      <h2 class="form-title">Welcome! Enter Your Name</h2>
      <p class="form-description">Please enter your name below to receive a personalized greeting.</p>
      
      <form @submit.prevent="handleSubmit" novalidate>
        <div class="form-group">
          <label for="nameInput" class="form-label">
            Your Name <span class="required" aria-hidden="true">*</span>
          </label>
          <input
            id="nameInput"
            v-model="name"
            type="text"
            class="form-input"
            :class="{ 'input-error': hasError }"
            placeholder="Enter your name"
            aria-required="true"
            :aria-invalid="hasError"
            :aria-describedby="hasError ? 'nameError' : undefined"
            @input="clearError"
            @blur="validateOnBlur"
            ref="nameInputRef"
          />
          <transition name="fade">
            <p v-if="hasError" id="nameError" class="error-message" role="alert">
              {{ errorMessage }}
            </p>
          </transition>
        </div>
        
        <button 
          type="submit" 
          class="submit-button"
          :disabled="isSubmitting"
          :aria-busy="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner" aria-hidden="true"></span>
          {{ isSubmitting ? 'Submitting...' : 'Say Hello' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorldForm',
  data() {
    return {
      name: '',
      errorMessage: '',
      hasError: false,
      isSubmitting: false
    }
  },
  mounted() {
    // Focus the input field on mount for accessibility
    this.$refs.nameInputRef.focus()
  },
  methods: {
    validateName() {
      const trimmedName = this.name.trim()
      
      if (!trimmedName) {
        this.errorMessage = 'Name is required. Please enter your name.'
        this.hasError = true
        return false
      }
      
      if (trimmedName.length < 2) {
        this.errorMessage = 'Name must be at least 2 characters long.'
        this.hasError = true
        return false
      }
      
      if (trimmedName.length > 50) {
        this.errorMessage = 'Name must be no more than 50 characters.'
        this.hasError = true
        return false
      }
      
      // Check for valid characters (letters, spaces, hyphens, apostrophes)
      const namePattern = /^[a-zA-Z\s'-]+$/
      if (!namePattern.test(trimmedName)) {
        this.errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes.'
        this.hasError = true
        return false
      }
      
      this.hasError = false
      this.errorMessage = ''
      return true
    },
    
    validateOnBlur() {
      if (this.name.trim()) {
        this.validateName()
      }
    },
    
    clearError() {
      if (this.hasError) {
        this.hasError = false
        this.errorMessage = ''
      }
    },
    
    async handleSubmit() {
      if (!this.validateName()) {
        this.$refs.nameInputRef.focus()
        return
      }
      
      this.isSubmitting = true
      
      try {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Navigate to response page with the name
        this.$router.push({
          name: 'Response',
          query: { name: this.name.trim() }
        })
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again.'
        this.hasError = true
        console.error('Submission error:', error)
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: 1rem;
}

.form-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 480px;
}

.form-title {
  color: #35495e;
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  text-align: center;
}

.form-description {
  color: #666;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #35495e;
}

.required {
  color: #e74c3c;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.2);
}

.form-input.input-error {
  border-color: #e74c3c;
}

.form-input.input-error:focus {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin: 0.5rem 0 0 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.error-message::before {
  content: '⚠';
}

.submit-button {
  width: 100%;
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  background-color: #42b883;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  background-color: #3aa876;
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.4);
}

.submit-button:active:not(:disabled) {
  transform: scale(0.98);
}

.submit-button:disabled {
  background-color: #95d5b8;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .form-card {
    padding: 1.5rem;
    border-radius: 8px;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
}
</style>
