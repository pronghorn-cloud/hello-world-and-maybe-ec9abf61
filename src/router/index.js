import { createRouter, createWebHistory } from 'vue-router'
import HelloWorldForm from '../components/HelloWorldForm.vue'
import HelloWorldResponse from '../components/HelloWorldResponse.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorldForm
  },
  {
    path: '/response',
    name: 'Response',
    component: HelloWorldResponse
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
