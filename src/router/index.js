import { createRouter, createWebHistory } from 'vue-router'
import HelloWorldForm from '../views/HelloWorldForm.vue'
import HelloWorldResponse from '../views/HelloWorldResponse.vue'

const routes = [
  {
    path: '/',
    name: 'HelloWorldForm',
    component: HelloWorldForm
  },
  {
    path: '/response',
    name: 'HelloWorldResponse',
    component: HelloWorldResponse
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
