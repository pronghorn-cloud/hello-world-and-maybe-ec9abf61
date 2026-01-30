<script setup>
/**
 * H1Header Component
 * @standard Alberta Design System (ADS)
 * @version 2.0.0 - Rebuilt Visual Components
 * @description Reusable H1 component for page headers - H1 is exclusive to page titles
 * @prop {String} text - Required. The header text to display
 * @prop {String} subtitle - Optional. Subtitle text below the header
 * 
 * Alberta Design System Compliance:
 * - H1 is exclusive to page titles (one per page)
 * - Typography: Acumin Pro Semi Condensed, 2.25rem desktop
 * - Brand color accent border (#0070C4 - ADS Blue)
 * - Responsive: 768px tablet, 480px mobile breakpoints
 * - Focus state: #FEBA35 for interactive elements
 * - WCAG 2.1 AA accessibility compliance
 */

const props = defineProps({
  text: {
    type: String,
    required: true,
    validator: (value) => value.trim().length > 0
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <header class="header-wrapper">
    <div class="header-content">
      <h1 class="page-header">
        {{ text }}
      </h1>
      <p v-if="subtitle" class="page-subtitle">
        {{ subtitle }}
      </p>
    </div>
    <div class="header-accent" aria-hidden="true"></div>
  </header>
</template>

<style scoped>
.header-wrapper {
  width: 100%;
  margin-bottom: var(--ads-space-md);
  animation: fadeInDown 0.4s ease-out;
}

.header-content {
  text-align: center;
  padding-bottom: var(--ads-space-sm);
}

/* Alberta Design System: H1 Page Title
   H1 is exclusive to page title - only one per page */
.page-header {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-h1);
  font-weight: var(--ads-font-weight-bold);
  color: var(--ads-text-primary);
  margin: 0;
  line-height: var(--ads-line-height-tight);
  letter-spacing: var(--ads-letter-spacing-tight);
}

.page-subtitle {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-body);
  font-weight: var(--ads-font-weight-regular);
  color: var(--ads-text-secondary);
  margin: var(--ads-space-xs) 0 0 0;
}

/* Decorative accent line */
.header-accent {
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--ads-blue) 20%,
    var(--ads-blue) 80%,
    transparent 100%
  );
  border-radius: var(--ads-radius-full);
  margin-top: var(--ads-space-xs);
}

/* Animation */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Alberta Design System: Tablet breakpoint (768px) */
@media (max-width: 768px) {
  .header-wrapper {
    margin-bottom: var(--ads-space-sm);
  }
  
  .header-content {
    padding-bottom: var(--ads-space-xs);
  }
  
  .header-accent {
    height: 3px;
  }
}

/* Alberta Design System: Mobile breakpoint (480px) */
@media (max-width: 480px) {
  .header-accent {
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--ads-blue) 10%,
      var(--ads-blue) 90%,
      transparent 100%
    );
  }
  
  .page-subtitle {
    font-size: var(--ads-font-size-small);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .header-wrapper {
    animation: none;
  }
}
</style>

  }
}
</style>
