/**
 * Vue Router Configuration
 * Defines application routes for WelcomePage and ResponsePage
 */
import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'
import ResponsePage from '../views/ResponsePage.vue'

/**
 * Application Routes
 * - WelcomePage: Home route for name input (E-003-F-001)
 * - ResponsePage: Greeting display route (E-003-F-003)
 */
const routes = [
  {
    path: '/',
    name: 'WelcomePage',
    component: WelcomePage,
    meta: {
      title: 'Welcome - Hello World App'
    }
  },
  {
    path: '/response',
    name: 'ResponsePage',
    component: ResponsePage,
    meta: {
      title: 'Greeting - Hello World App'
    }
  },
  {
    // Catch-all redirect to home
    path: '/:pathMatch(.*)*',
    redirect: { name: 'WelcomePage' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Hello World App'
  next()
})

export default router
