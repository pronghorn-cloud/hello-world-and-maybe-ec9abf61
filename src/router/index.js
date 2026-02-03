import { createRouter, createWebHistory } from 'vue-router'
import EntryForm from '../views/EntryForm.vue'
import ResponseForm from '../views/ResponseForm.vue'

const routes = [
  {
    path: '/',
    name: 'EntryForm',
    component: EntryForm
  },
  {
    path: '/response',
    name: 'ResponseForm',
    component: ResponseForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router