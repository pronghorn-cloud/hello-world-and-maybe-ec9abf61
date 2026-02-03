<template>
  <goa-app-footer>
    <template #secondaryNavigation>
      <span class="footer-text">&copy; {{ currentYear }} HelloWorld App. All rights reserved.</span>
    </template>
  </goa-app-footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-text {
  color: var(--goa-color-greyscale-white);
  font-size: var(--goa-font-size-1);
}
</style>

}
</style>
