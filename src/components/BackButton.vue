<script setup>
import { useRouter } from 'vue-router';

/**
 * BackButton Component
 * Provides consistent back navigation using GOA button styling
 */
defineOptions({
  name: 'BackButton',
});

const props = defineProps({
  label: {
    type: String,
    default: 'Back',
  },
  to: {
    type: [String, Object],
    default: '/',
  },
});

const router = useRouter();

const handleClick = () => {
  router.push(props.to);
};
</script>

<template>
  <goa-button
    type="tertiary"
    leading-icon="arrow-back"
    @_click="handleClick"
  >
    {{ label }}
  </goa-button>
</template>
