import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import ResponsePage from '../views/ResponsePage.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage
  },
  {
    path: '/response',
    name: 'Response',
    component: ResponsePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
