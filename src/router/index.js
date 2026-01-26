/**
 * Vue Router Configuration
 * @techstack TS-001 - Vue 3.5.24, Vue Router 4.3.0, JavaScript only
 * 
 * Routes:
 * - / (Welcome): Entry form page (E-001)
 * - /response (Response): Greeting response page (E-003)
 * 
 * Security:
 * - E-003-F-006: Route guard prevents direct access to ResponsePage without form data
 */

import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import ResponsePage from '../views/ResponsePage.vue'

/**
 * Application routes configuration
 */
const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: WelcomePage,
    meta: {
      title: 'Welcome - HelloWorld App'
    }
  },
  {
    path: '/response',
    name: 'Response',
    component: ResponsePage,
    meta: {
      title: 'Response - HelloWorld App'
    },
    /**
     * E-003-F-006: Route guard for direct access prevention
     * Prevents users from accessing ResponsePage directly without valid form data
     */
    beforeEnter: (to, from, next) => {
      const hasFormData = sessionStorage.getItem('formData')
      if (!hasFormData && from.name !== 'Welcome') {
        next({ name: 'Welcome' })
      } else {
        next()
      }
    }
  },
  {
    // Catch-all redirect to Welcome page
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

/**
 * Create and configure Vue Router instance
 */
const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * Update document title on route change
 */
router.afterEach((to) => {
  document.title = to.meta.title || 'HelloWorld App'
})

export default router
