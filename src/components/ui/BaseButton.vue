<script setup>
/**
 * BaseButton Component
 * 
 * A reusable button component following Alberta Design System standards.
 * Supports primary, secondary, and text variants with proper accessibility.
 * 
 * @component
 * @example
 * <BaseButton variant="primary" @click="handleClick">Submit</BaseButton>
 */

defineProps({
  /**
   * Button variant style
   * @values primary, secondary, text
   */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'text'].includes(value)
  },
  /**
   * Button type attribute
   * @values button, submit, reset
   */
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  /**
   * Disabled state
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * Loading state - shows spinner and disables button
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * Full width button
   */
  fullWidth: {
    type: Boolean,
    default: false
  },
  /**
   * Accessible label for screen readers (when button has icon only)
   */
  ariaLabel: {
    type: String,
    default: null
  }
})

defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-label="ariaLabel"
    :aria-busy="loading"
    :class="[
      'base-button',
      `base-button--${variant}`,
      { 'base-button--full-width': fullWidth },
      { 'base-button--loading': loading }
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true"></span>
    <span :class="{ 'base-button__content--hidden': loading }">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  line-height: 1.5;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  position: relative;
  min-height: 48px; /* Touch target size */
}

.base-button:focus-visible {
  outline: 2px solid var(--goa-blue);
  outline-offset: 2px;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Primary Variant */
.base-button--primary {
  color: #ffffff;
  background-color: var(--goa-blue);
  border: 2px solid var(--goa-blue);
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--goa-blue-dark);
  border-color: var(--goa-blue-dark);
}

.base-button--primary:active:not(:disabled) {
  background-color: #003a61;
  border-color: #003a61;
}

/* Secondary Variant */
.base-button--secondary {
  color: var(--goa-blue);
  background-color: transparent;
  border: 2px solid var(--goa-blue);
}

.base-button--secondary:hover:not(:disabled) {
  color: #ffffff;
  background-color: var(--goa-blue);
}

.base-button--secondary:active:not(:disabled) {
  color: #ffffff;
  background-color: var(--goa-blue-dark);
  border-color: var(--goa-blue-dark);
}

/* Text Variant */
.base-button--text {
  color: var(--goa-blue);
  background-color: transparent;
  border: 2px solid transparent;
  padding: 0.5rem 1rem;
}

.base-button--text:hover:not(:disabled) {
  background-color: rgba(0, 112, 196, 0.1);
}

.base-button--text:active:not(:disabled) {
  background-color: rgba(0, 112, 196, 0.2);
}

/* Full Width */
.base-button--full-width {
  width: 100%;
}

/* Loading State */
.base-button--loading {
  cursor: wait;
}

.base-button__spinner {
  position: absolute;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.base-button__content--hidden {
  visibility: hidden;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
