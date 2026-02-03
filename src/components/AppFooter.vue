<template>
  <footer class="goa-footer">
    <div class="goa-footer__container">
      <div class="goa-footer__links">
        <a href="https://www.alberta.ca/accessibility" class="goa-footer__link">Accessibility</a>
        <a href="https://www.alberta.ca/privacy" class="goa-footer__link">Privacy</a>
        <a href="https://www.alberta.ca/disclaimer" class="goa-footer__link">Disclaimer</a>
      </div>
      <p class="goa-footer__copyright">
        © {{ currentYear }} Government of Alberta
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.goa-footer {
  background-color: var(--goa-color-black);
  color: var(--goa-color-white);
  padding: 2rem 0;
  margin-top: auto;
}

.goa-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.goa-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.goa-footer__link {
  color: var(--goa-color-white);
  text-decoration: underline;
  font-size: 0.875rem;
}

.goa-footer__link:hover {
  color: var(--goa-color-greyscale-200);
}

.goa-footer__link:focus {
  outline: 3px solid var(--goa-color-interactive-focus);
  outline-offset: 2px;
}

.goa-footer__copyright {
  font-size: 0.875rem;
  color: var(--goa-color-greyscale-200);
  margin: 0;
}

@media (max-width: 480px) {
  .goa-footer__links {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>