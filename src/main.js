/**
 * Application Entry Point
 * @techstack TS-001 - Vue 3.5.24, Vite 7.2.4, JavaScript only
 * 
 * Initializes the Vue application with:
 * - Vue Router for navigation
 * - Global styles
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles.css'

// Create Vue application instance
const app = createApp(App)

// Register Vue Router
app.use(router)

// Mount application to DOM
app.mount('#app')
