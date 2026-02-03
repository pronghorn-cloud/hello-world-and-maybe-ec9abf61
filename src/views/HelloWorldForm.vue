<template>
  <goa-container type="non-interactive" accent="thin">
    <h2 class="form-title">HelloWorld Entry Form</h2>
    
    <form @submit.prevent="handleSubmit" class="hello-form">
      <goa-form-item
        label="Name"
        requirement="required"
        :error="errors.name || ''"
      >
        <goa-input
          id="name"
          name="name"
          :value="formData.name"
          @_change="handleNameChange"
          @blur="validateField('name')"
          width="100%"
        >
        </goa-input>
      </goa-form-item>

      <goa-form-item
        label="Date"
        requirement="required"
        :error="errors.date || ''"
        class="goa-mt-l"
      >
        <goa-input
          id="date"
          name="date"
          type="date"
          :value="formData.date"
          @_change="handleDateChange"
          @blur="validateField('date')"
          width="100%"
        >
        </goa-input>
      </goa-form-item>

      <div class="form-actions goa-mt-xl">
        <goa-button type="primary" @_click="handleSubmit" :disabled="!isFormValid">
          Submit
        </goa-button>
      </div>
    </form>
  </goa-container>
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

const handleNameChange = (event) => {
  formData.name = event.detail.value
}

const handleDateChange = (event) => {
  formData.date = event.detail.value
}

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
.form-title {
  color: var(--goa-color-text-default);
  margin-bottom: var(--goa-space-l);
  text-align: center;
  font-size: var(--goa-font-size-6);
  font-weight: 700;
}

.hello-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-actions {
  text-align: center;
}
</style>
