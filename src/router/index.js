/**
 * Vue Router Configuration
 * 
 * Defines application routes with meta information for SEO and accessibility.
 * 
 * @module router
 */
import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '@/views/WelcomePage.vue'
import ResponsePage from '@/views/ResponsePage.vue'
import { APP_CONFIG, ROUTES } from '@/constants'

/**
 * Route definitions
 * @type {Array}
 */
const routes = [
  {
    path: '/',
    name: ROUTES.WELCOME,
    component: WelcomePage,
    meta: {
      title: `Welcome - ${APP_CONFIG.name}`,
      description: 'Enter your information to receive a personalized greeting'
    }
  },
  {
    path: '/response',
    name: ROUTES.RESPONSE,
    component: ResponsePage,
    meta: {
      title: `Your Greeting - ${APP_CONFIG.name}`,
      description: 'View your personalized greeting'
    }
  },
  {
    // Catch-all redirect to home
    path: '/:pathMatch(.*)*',
    redirect: { name: ROUTES.WELCOME }
  }
]

/**
 * Router instance
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

/**
 * Navigation guard for document title and focus management
 */
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || `${APP_CONFIG.name} - ${APP_CONFIG.organization}`
  
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }
  
  next()
})

/**
 * After navigation hook for accessibility
 */
router.afterEach(() => {
  const mainContent = document.getElementById('main-content')
  if (mainContent) {
    mainContent.focus()
  }
})

export default router


