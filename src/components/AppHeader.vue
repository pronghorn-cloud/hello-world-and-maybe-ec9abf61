<template>
  <header class="goa-header">
    <div class="goa-header__container">
      <a href="https://www.alberta.ca" class="goa-header__logo" aria-label="Government of Alberta Home">
        <svg class="goa-header__logo-svg" viewBox="0 0 200 50" aria-hidden="true">
          <text x="0" y="35" fill="currentColor" font-size="20" font-weight="bold">Alberta.ca</text>
        </svg>
      </a>
      <div class="goa-header__title">
        <h1 class="goa-header__app-name">HelloWorld</h1>
      </div>
    </div>
  </header>
</template>

<script setup>
// Header component - follows GOA design system
</script>

<style scoped>
.goa-header {
  background-color: var(--goa-color-primary);
  color: var(--goa-color-white);
  padding: 1rem 0;
}

.goa-header__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.goa-header__logo {
  color: var(--goa-color-white);
  text-decoration: none;
  display: flex;
  align-items: center;
}

.goa-header__logo:focus {
  outline: 3px solid var(--goa-color-interactive-focus);
  outline-offset: 2px;
}

.goa-header__logo-svg {
  height: 40px;
  width: auto;
}

.goa-header__title {
  flex: 1;
}

.goa-header__app-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
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