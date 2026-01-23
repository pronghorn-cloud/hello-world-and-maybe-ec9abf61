<template>
  <div class="welcome-page">
    <h1>Welcome</h1>
    <p>Please enter your information below:</p>
    
    <form @submit.prevent="handleSubmit" class="entry-form">
      <div class="form-group">
        <label for="name">Name: <span class="required">*</span></label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          placeholder="Enter your name"
          required
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>
      
      <div class="form-group">
        <label for="date">Date: <span class="required">*</span></label>
        <input
          type="date"
          id="date"
          v-model="formData.date"
          required
        />
        <span v-if="errors.date" class="error-message">{{ errors.date }}</span>
      </div>
      
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = reactive({
  name: '',
  date: ''
})

const errors = reactive({
  name: '',
  date: ''
})

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.name = ''
  errors.date = ''
  
  // Validate name
  if (!formData.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }
  
  // Validate date
  if (!formData.date) {
    errors.date = 'Date is required'
    isValid = false
  }
  
  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    router.push({
      name: 'Response',
      query: {
        name: formData.name,
        date: formData.date
      }
    })
  }
}
</script>

<style scoped>
.welcome-page {
  text-align: center;
}

.entry-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.required {
  color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>
