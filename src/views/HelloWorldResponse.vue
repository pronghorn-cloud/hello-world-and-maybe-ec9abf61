<template>
  <goa-container type="non-interactive" accent="thin">
    <h2 class="page-header">HelloWorld Response</h2>
    
    <ErrorMessageDisplay v-if="error" :message="error" />
    
    <template v-if="formData && !error">
      <ResponseMessage :name="formData.name" :date="formattedDate" />
      
      <goa-container type="info" class="goa-mt-l" accent="thick">
        <h3 class="data-summary-title">Submitted Data</h3>
        <goa-details heading="View Details" open>
          <dl class="data-list">
            <div class="data-row">
              <dt>Name:</dt>
              <dd>{{ formData.name }}</dd>
            </div>
            <div class="data-row">
              <dt>Date:</dt>
              <dd>{{ formattedDate }}</dd>
            </div>
          </dl>
        </goa-details>
      </goa-container>
    </template>
    
    <div class="actions goa-mt-xl goa-text-center">
      <BackButton text="Back to Form" to="/" />
    </div>
  </goa-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ResponseMessage from '../components/ResponseMessage.vue'
import BackButton from '../components/BackButton.vue'
import ErrorMessageDisplay from '../components/ErrorMessageDisplay.vue'
import { FormPersistenceService } from '../services/FormPersistenceService'

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
.page-header {
  color: var(--goa-color-text-default);
  margin-bottom: var(--goa-space-l);
  text-align: center;
  font-size: var(--goa-font-size-6);
  font-weight: 700;
}

.data-summary-title {
  color: var(--goa-color-text-default);
  margin-bottom: var(--goa-space-m);
  font-size: var(--goa-font-size-4);
}

.data-list {
  margin: 0;
}

.data-row {
  display: flex;
  gap: var(--goa-space-m);
  padding: var(--goa-space-s) 0;
  border-bottom: 1px solid var(--goa-color-greyscale-200);
}

.data-row:last-child {
  border-bottom: none;
}

.data-row dt {
  font-weight: 600;
  color: var(--goa-color-text-secondary);
  min-width: 80px;
}

.data-row dd {
  color: var(--goa-color-text-default);
  margin: 0;
}

.actions {
  margin-top: var(--goa-space-xl);
}
</style>


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
