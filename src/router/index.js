import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import ResponsePage from '../views/ResponsePage.vue'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage,
    meta: {
      title: 'Welcome - Alberta Design System App'
    }
  },
  {
    path: '/response',
    name: 'Response',
    component: ResponsePage,
    meta: {
      title: 'Response - Alberta Design System App'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Alberta Design System App'
  next()
})

export default router
