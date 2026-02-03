<template>
  <header class="goa-header" role="banner">
    <a href="#main-content" class="goa-skip-link">Skip to main content</a>
    <div class="goa-header__container">
      <a href="https://www.alberta.ca" class="goa-header__logo" aria-label="Alberta.ca">
        <svg class="goa-header__logo-svg" viewBox="0 0 130 30" role="img" aria-hidden="true" focusable="false">
          <text x="0" y="22" fill="currentColor" font-size="18" font-weight="700">Alberta.ca</text>
        </svg>
      </a>
      <nav class="goa-header__nav" aria-label="Service navigation">
        <span class="goa-header__service-name">HelloWorld</span>
      </nav>
    </div>
  </header>
</template>

<script setup>
// GOA Header Component - Strictly follows GOA Design System standards
// Reference: https://design.alberta.ca/components/header
</script>

<style scoped>
.goa-header {
  background-color: var(--goa-color-primary);
  color: var(--goa-color-white);
  padding: 0;
}

.goa-header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--goa-space-sm) var(--goa-space-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--goa-space-md);
  min-height: 64px;
}

.goa-header__logo {
  display: inline-flex;
  align-items: center;
  color: var(--goa-color-white);
  text-decoration: none;
  padding: var(--goa-space-2xs);
  margin: calc(var(--goa-space-2xs) * -1);
  border-radius: var(--goa-border-radius);
}

.goa-header__logo:hover {
  opacity: 0.9;
}

.goa-header__logo:focus {
  outline: none;
  box-shadow: var(--goa-focus-box-shadow);
}

.goa-header__logo:focus:not(:focus-visible) {
  box-shadow: none;
}

.goa-header__logo:focus-visible {
  outline: none;
  box-shadow: var(--goa-focus-box-shadow);
}

.goa-header__logo-svg {
  height: 30px;
  width: auto;
  display: block;
}

.goa-header__nav {
  display: flex;
  align-items: center;
}

.goa-header__service-name {
  font-size: var(--goa-font-size-lg);
  font-weight: var(--goa-font-weight-bold);
  color: var(--goa-color-white);
  letter-spacing: -0.01em;
}

@media (max-width: 480px) {
  .goa-header__container {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--goa-space-2xs);
    padding: var(--goa-space-sm);
    min-height: auto;
  }
  
  .goa-header__service-name {
    font-size: var(--goa-font-size-base);
  }
}
</style>
  color: var(--goa-color-white);
}

@media (max-width: 480px) {
  .goa-header__container {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .goa-header__app-name {
    font-size: 1.25rem;
  }
}
</style>