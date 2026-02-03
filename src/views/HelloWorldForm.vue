<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ErrorMessageDisplay from '@/components/ErrorMessageDisplay.vue';
import { useFormValidation } from '@/composables/useFormValidation.js';
import { sanitizeName } from '@/services/DataSanitizer.js';
import { saveFormData, loadFormData } from '@/services/FormPersistenceService.js';

/**
 * HelloWorldForm View
 * Entry form for collecting user's name and generating a greeting
 */
defineOptions({
  name: 'HelloWorldForm',
});

const router = useRouter();
const { errors, validateForm, clearValidation } = useFormValidation();

const formData = ref({
  name: '',
});

const isSubmitting = ref(false);

/**
 * Handles input changes and persists form data
 * @param {Event} event - The input event
 */
const handleNameInput = (event) => {
  formData.value.name = event.detail.value || '';
  saveFormData(formData.value);
};

/**
 * Handles form submission
 */
const handleSubmit = async () => {
  clearValidation();

  const sanitizedData = {
    name: sanitizeName(formData.value.name),
  };

  if (!validateForm(sanitizedData)) {
    return;
  }

  isSubmitting.value = true;

  try {
    // Save sanitized data for the response page
    saveFormData(sanitizedData);

    // Navigate to response page
    router.push({
      name: 'HelloWorldResponse',
    });
  } catch (error) {
    console.error('Form submission error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

/**
 * Handles form reset
 */
const handleReset = () => {
  formData.value.name = '';
  clearValidation();
  saveFormData(formData.value);
};

// Load persisted form data on mount
onMounted(() => {
  const savedData = loadFormData();
  if (savedData && savedData.name) {
    formData.value.name = savedData.name;
  }
});
</script>

<template>
  <div class="hello-world-form">
    <goa-page-block width="704px">
      <h1 class="page-title">Hello World</h1>
      <p class="page-description">
        Enter your name below to receive a personalized greeting.
      </p>

      <ErrorMessageDisplay :errors="errors" />

      <goa-form-item
        label="Name"
        requirement="required"
        helper-text="Enter your first and last name"
        class="form-group"
      >
        <goa-input
          id="name-input"
          name="name"
          type="text"
          :value.prop="formData.name"
          placeholder="Enter your name"
          width="100%"
          maxlength="100"
          @_change="handleNameInput"
        ></goa-input>
      </goa-form-item>

      <div class="action-bar">
        <goa-button
          type="primary"
          :disabled.prop="isSubmitting"
          @_click="handleSubmit"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </goa-button>

        <goa-button
          type="secondary"
          :disabled.prop="isSubmitting"
          @_click="handleReset"
        >
          Reset
        </goa-button>
      </div>
    </goa-page-block>
  </div>
</template>

<style scoped>
.hello-world-form {
  padding: 1rem 0;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0070c4;
  margin: 0 0 0.5rem 0;
}

.page-description {
  font-size: 1.125rem;
  color: #666666;
  margin: 0 0 2rem 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.action-bar {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
