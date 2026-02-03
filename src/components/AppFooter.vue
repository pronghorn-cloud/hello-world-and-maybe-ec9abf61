<template>
  <footer class="goa-footer" role="contentinfo">
    <div class="goa-footer__container">
      <nav class="goa-footer__nav" aria-label="Footer navigation">
        <ul class="goa-footer__links" role="list">
          <li>
            <a href="https://www.alberta.ca/accessibility.aspx" class="goa-footer__link">Accessibility</a>
          </li>
          <li>
            <a href="https://www.alberta.ca/privacystatement.aspx" class="goa-footer__link">Privacy</a>
          </li>
          <li>
            <a href="https://www.alberta.ca/disclaimer.aspx" class="goa-footer__link">Terms of use</a>
          </li>
        </ul>
      </nav>
      <div class="goa-footer__copyright">
        <p>© {{ currentYear }} Government of Alberta</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

/**
 * GOA Footer Component
 * 
 * Compliance:
 * - ADS-001: Accessible navigation with proper ARIA labels
 * - ADS-003: Clear, human-centered link text
 * - ADS-004: Uses GOA design tokens for colors, spacing, typography
 * - ADS-005: Follows GOA Design System footer pattern
 * - ADS-006: Semantic HTML with contentinfo landmark
 * - ADS-010: Supplementary styling using GOA CSS custom properties
 */

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* ADS-004: Design Tokens - Footer uses black background per GOA standard */
.goa-footer {
  background-color: var(--goa-color-black);
  color: var(--goa-color-white);
  padding: var(--goa-space-lg) 0;
  margin-top: auto;
}

.goa-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--goa-space-sm);
}

.goa-footer__nav {
  margin-bottom: var(--goa-space-md);
}

/* ADS-007: Information Architecture - Logical content grouping */
.goa-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--goa-space-md);
  list-style: none;
  padding: 0;
  margin: 0;
}

/* ADS-004: Design Tokens - Link styling with proper contrast */
.goa-footer__link {
  color: var(--goa-color-white);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  font-size: var(--goa-font-size-sm);
  padding: var(--goa-space-3xs);
  margin: calc(var(--goa-space-3xs) * -1);
  border-radius: var(--goa-border-radius-sm);
}

.goa-footer__link:hover {
  color: var(--goa-color-greyscale-200);
}

/* ADS-001: Accessibility - Visible focus indicators */
.goa-footer__link:focus {
  outline: none;
  box-shadow: var(--goa-focus-box-shadow);
}

.goa-footer__link:focus:not(:focus-visible) {
  box-shadow: none;
}

.goa-footer__link:focus-visible {
  outline: none;
  box-shadow: var(--goa-focus-box-shadow);
}

.goa-footer__copyright {
  padding-top: var(--goa-space-md);
  border-top: 1px solid var(--goa-color-greyscale-700);
}

.goa-footer__copyright p {
  font-size: var(--goa-font-size-sm);
  color: var(--goa-color-greyscale-200);
  margin: 0;
}

/* ADS-005: Responsive design following GOA breakpoints */
@media (max-width: 480px) {
  .goa-footer__links {
    flex-direction: column;
    gap: var(--goa-space-sm);
  }
}
</style>