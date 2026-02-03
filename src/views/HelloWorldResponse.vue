<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BackButton from '@/components/BackButton.vue';
import ResponseMessage from '@/components/ResponseMessage.vue';
import { loadFormData, clearFormData } from '@/services/FormPersistenceService.js';

/**
 * HelloWorldResponse View
 * Displays the personalized greeting based on submitted name
 */
defineOptions({
  name: 'HelloWorldResponse',
});

const router = useRouter();

const userName = ref('');

/**
 * Computed greeting message
 */
const greetingMessage = computed(() => {
  if (!userName.value) {
    return 'Hello, World!';
  }
  return `Hello, ${userName.value}!`;
});

/**
 * Handles starting over - clears data and returns to form
 */
const handleStartOver = () => {
  clearFormData();
  router.push({ name: 'HelloWorldForm' });
};

// Load user data on mount
onMounted(() => {
  const savedData = loadFormData();
  if (savedData && savedData.name) {
    userName.value = savedData.name;
  } else {
    // If no data, redirect back to form
    router.push({ name: 'HelloWorldForm' });
  }
});
</script>

<template>
  <div class="hello-world-response">
    <goa-page-block width="704px">
      <BackButton
        label="Back to form"
        to="/"
      />

      <h1 class="page-title">Your Greeting</h1>
      <p class="page-description">
        Here is your personalized greeting message.
      </p>

      <ResponseMessage :message="greetingMessage" />

      <div class="response-details">
        <div class="detail-item">
          <span class="detail-label">Name entered:</span>
          <span class="detail-value">{{ userName }}</span>
        </div>
      </div>

      <div class="action-bar">
        <goa-button
          type="primary"
          @_click="handleStartOver"
        >
          Start Over
        </goa-button>
      </div>
    </goa-page-block>
  </div>
</template>

<style scoped>
.hello-world-response {
  padding: 1rem 0;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #0070c4;
  margin: 1.5rem 0 0.5rem 0;
}

.page-description {
  font-size: 1.125rem;
  color: #666666;
  margin: 0 0 2rem 0;
}

.response-details {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.detail-item {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
}

.detail-label {
  font-weight: 600;
  color: #333333;
}

.detail-value {
  color: #666666;
}

.action-bar {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
