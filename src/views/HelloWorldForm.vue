<template>
  <div class="form-container">
    <h2 class="form-title">HelloWorld Entry Form</h2>
    
    <form @submit.prevent="handleSubmit" class="hello-form">
      <div class="form-group">
        <label for="name">Name <span class="required">*</span></label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="Enter your name"
          :class="{ error: errors.name }"
          @blur="validateField('name')"
        />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="date">Date <span class="required">*</span></label>
        <input
          id="date"
          v-model="formData.date"
          type="date"
          :class="{ error: errors.date }"
          @blur="validateField('date')"
        />
        <span v-if="errors.date" class="error-message">{{ errors.date }}</span>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFormValidation } from '../composables/useFormValidation'
import { FormPersistenceService } from '../services/FormPersistenceService'
import { DataSanitizer } from '../services/DataSanitizer'

const router = useRouter()

const formData = reactive({
  name: '',
  date: ''
})

const { errors, validateField, validateForm } = useFormValidation(formData)

const isFormValid = computed(() => {
  return formData.name.trim() !== '' && 
         formData.date !== '' && 
         !errors.name && 
         !errors.date
})

const handleSubmit = () => {
  if (validateForm()) {
    const sanitizedData = {
      name: DataSanitizer.sanitizeString(formData.name),
      date: DataSanitizer.sanitizeDate(formData.date)
    }
    
    FormPersistenceService.saveFormData(sanitizedData)
    router.push('/response')
  }
}
</script>

<style scoped>
.form-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.form-title {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.75rem;
}

.hello-form {
  max-width: 400px;
  margin: 0 auto;
}

.required {
  color: #e74c3c;
}

.error-message {
  display: block;
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.btn-primary {
  width: 100%;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
  }
}
</style>
