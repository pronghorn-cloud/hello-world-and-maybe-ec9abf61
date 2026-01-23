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
    component: ResponsePage,
    beforeEnter: (to, from, next) => {
      // E-003-F-006: Prevent direct access without form data
      const hasFormData = sessionStorage.getItem('formData')
      if (!hasFormData && from.name !== 'Welcome') {
        next({ name: 'Welcome' })
      } else {
        next()
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router