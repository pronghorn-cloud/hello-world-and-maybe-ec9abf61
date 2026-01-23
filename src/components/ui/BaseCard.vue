<script setup>
/**
 * BaseCard Component
 * 
 * A reusable card container component following Alberta Design System.
 * Provides consistent styling for content sections.
 * 
 * @component
 * @example
 * <BaseCard title="Welcome">
 *   <p>Card content goes here</p>
 * </BaseCard>
 */

defineProps({
  /**
   * Optional card title
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * Card padding size
   * @values small, medium, large
   */
  padding: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  /**
   * Whether the card has a shadow
   */
  elevated: {
    type: Boolean,
    default: true
  },
  /**
   * ARIA role for the card
   */
  role: {
    type: String,
    default: null
  },
  /**
   * ARIA label for the card region
   */
  ariaLabel: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div
    :class="[
      'base-card',
      `base-card--padding-${padding}`,
      { 'base-card--elevated': elevated }
    ]"
    :role="role"
    :aria-label="ariaLabel || title || null"
  >
    <h3 v-if="title" class="base-card__title">
      {{ title }}
    </h3>
    <div class="base-card__content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.base-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.base-card--elevated {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Padding variants */
.base-card--padding-small {
  padding: 1rem;
}

.base-card--padding-medium {
  padding: 1.5rem;
}

.base-card--padding-large {
  padding: 2rem;
}

.base-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--goa-grey-dark);
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e0e0e0;
}

.base-card__content {
  color: var(--goa-grey-dark);
}

.base-card__footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}
</style>
