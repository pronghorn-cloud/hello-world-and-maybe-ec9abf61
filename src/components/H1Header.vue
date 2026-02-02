<template>
  <!--
    H1Header Component (ABD-001-002)
    H1 is exclusive to page title - only ONE per page
    This component ensures consistent H1 usage across all pages
  -->
  <header class="page-header">
    <h1 :id="headerId" class="page-title">
      <slot>{{ title }}</slot>
    </h1>
    <p v-if="subtitle" class="page-subtitle">{{ subtitle }}</p>
  </header>
</template>

<script>
export default {
  name: 'H1Header',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    headerId: {
      type: String,
      default: 'page-title'
    }
  }
}
</script>

<style scoped>
.page-header {
  margin-bottom: var(--ads-space-4);
}

.page-title {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-h1);
  font-weight: 700;
  line-height: var(--ads-line-height-tight);
  color: var(--ads-text-primary);
  margin: 0 0 var(--ads-space-1) 0;
}

.page-subtitle {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-body);
  line-height: var(--ads-line-height-normal);
  color: var(--ads-text-secondary);
  margin: 0;
}

@media screen and (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
}

@media screen and (max-width: 480px) {
  .page-title {
    font-size: 1.75rem;
  }
}
</style>
