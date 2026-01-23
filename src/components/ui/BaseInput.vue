<script setup>
/**
 * BaseInput Component
 * 
 * A reusable input component with label, error handling, and accessibility.
 * Follows Alberta Design System and WCAG 2.1 AA standards.
 * 
 * @component
 * @example
 * <BaseInput
 *   v-model="name"
 *   label="Full Name"
 *   required
 *   :error="errors.name"
 * />
 */
import { computed, useAttrs } from 'vue'

const props = defineProps({
  /**
   * Input value (v-model)
   */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /**
   * Input label text
   */
  label: {
    type: String,
    required: true
  },
  /**
   * Input type
   */
  type: {
    type: String,
    default: 'text'
  },
  /**
   * Unique input ID (auto-generated if not provided)
   */
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substring(2, 9)}`
  },
  /**
   * Placeholder text
   */
  placeholder: {
    type: String,
    default: ''
  },
  /**
   * Required field
   */
  required: {
    type: Boolean,
    default: false
  },
  /**
   * Disabled state
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * Error message
   */
  error: {
    type: String,
    default: ''
  },
  /**
   * Helper text shown below input
   */
  helpText: {
    type: String,
    default: ''
  },
  /**
   * Autocomplete attribute
   */
  autocomplete: {
    type: String,
    default: 'off'
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'input'])

const attrs = useAttrs()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const hasError = computed(() => !!props.error)
const errorId = computed(() => `${props.id}-error`)
const helpTextId = computed(() => `${props.id}-help`)

const describedBy = computed(() => {
  const ids = []
  if (props.error) {
    ids.push(errorId.value)
  }
  if (props.helpText) {
    ids.push(helpTextId.value)
  }
  return ids.length ? ids.join(' ') : null
})

function handleBlur(event) {
  emit('blur', event)
}

function handleFocus(event) {
  emit('focus', event)
}

function handleInput(event) {
  emit('input', event)
}
</script>

<template>
  <div class="base-input">
    <label :for="id" class="base-input__label">
      {{ label }}
      <span v-if="required" class="base-input__required" aria-hidden="true">*</span>
      <span v-if="required" class="sr-only">(required)</span>
    </label>

    <input
      :id="id"
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      :aria-invalid="hasError ? 'true' : 'false'"
      :aria-describedby="describedBy"
      :class="[
        'base-input__field',
        { 'base-input__field--error': hasError },
        { 'base-input__field--disabled': disabled }
      ]"
      v-bind="attrs"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
    />

    <p
      v-if="helpText && !error"
      :id="helpTextId"
      class="base-input__help-text"
    >
      {{ helpText }}
    </p>

    <p
      v-if="error"
      :id="errorId"
      class="base-input__error"
      role="alert"
      aria-live="polite"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.base-input {
  margin-bottom: 1.5rem;
}

.base-input__label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--goa-grey-dark);
  font-size: 1rem;
  line-height: 1.5;
}

.base-input__required {
  color: var(--goa-red);
  margin-left: 0.25rem;
}

.base-input__field {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  line-height: 1.5;
  color: var(--goa-grey-dark);
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  min-height: 48px; /* Touch target size */
}

.base-input__field::placeholder {
  color: var(--goa-grey);
}

.base-input__field:focus {
  outline: none;
  border-color: var(--goa-blue);
  box-shadow: 0 0 0 3px rgba(0, 112, 196, 0.2);
}

.base-input__field--error {
  border-color: var(--goa-red);
  background-color: #ffebee;
}

.base-input__field--error:focus {
  border-color: var(--goa-red);
  box-shadow: 0 0 0 3px rgba(227, 28, 61, 0.2);
}

.base-input__field--disabled {
  background-color: var(--goa-grey-light);
  cursor: not-allowed;
  opacity: 0.7;
}

.base-input__help-text {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--goa-grey);
}

.base-input__error {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--goa-red);
  font-weight: 500;
}

/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
