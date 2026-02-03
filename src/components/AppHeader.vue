<script setup>
/**
 * AppHeader Component
 * Renders the GOA microsite header with proper branding
 */
defineOptions({
  name: 'AppHeader',
});
</script>

<template>
  <header>
    <goa-microsite-header
      type="alpha"
      version="Hello World App"
    />
  </header>
</template>

<style scoped>
header {
  width: 100%;
}
</style>
