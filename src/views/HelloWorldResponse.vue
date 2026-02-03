<template>
  <div class="response-container">
    <h2 class="page-header">HelloWorld Response</h2>
    
    <ErrorMessageDisplay v-if="error" :message="error" />
    
    <template v-if="formData && !error">
      <ResponseMessage :name="formData.name" :date="formattedDate" />
      
      <div class="data-summary">
        <h3>Submitted Data</h3>
        <dl class="data-list">
          <dt>Name:</dt>
          <dd>{{ formData.name }}</dd>
          <dt>Date:</dt>
          <dd>{{ formattedDate }}</dd>
        </dl>
      </div>
    </template>
    
    <div class="actions">
      <BackButton text="Back to Form" to="/" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ResponseMessage from '../components/ResponseMessage.vue'
import BackButton from '../components/BackButton.vue'
import ErrorMessageDisplay from '../components/ErrorMessageDisplay.vue'
import { FormPersistenceService } from '../services/FormPersistenceService'

const router = useRouter()
const formData = ref(null)
const error = ref('')

const formattedDate = computed(() => {
  if (!formData.value?.date) return ''
  
  const date = new Date(formData.value.date)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

onMounted(() => {
  const savedData = FormPersistenceService.getFormData()
  
  if (!savedData) {
    error.value = 'No form data found. Please submit the form first.'
    return
  }
  
  if (!savedData.name || !savedData.date) {
    error.value = 'Incomplete form data. Please fill out all required fields.'
    return
  }
  
  formData.value = savedData
})
</script>

<style scoped>
.response-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.page-header {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.75rem;
}

.data-summary {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.data-summary h3 {
  color: #495057;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.data-list {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
}

.data-list dt {
  font-weight: 600;
  color: #6c757d;
}

.data-list dd {
  color: #2c3e50;
  margin: 0;
}

.actions {
  text-align: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .response-container {
    padding: 1.5rem;
  }

  .page-header {
    font-size: 1.5rem;
  }
}
</style>
