<template>
  <goa-button type="secondary" leadingicon="arrow-back" @_click="handleBack">
    {{ text }}
  </goa-button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  text: {
    type: String,
    default: 'Back'
  },
  to: {
    type: String,
    default: '/'
  }
})

const router = useRouter()

const handleBack = () => {
  router.push(props.to)
}
</script>

<style scoped>
/* GOA button component is pre-styled - no custom styles needed */
</style>


.back-text {
  font-size: 1rem;
}
</style>
