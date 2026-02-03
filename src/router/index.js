import { createRouter, createWebHistory } from 'vue-router';
import HelloWorldForm from '@/views/HelloWorldForm.vue';
import HelloWorldResponse from '@/views/HelloWorldResponse.vue';

const routes = [
  {
    path: '/',
    name: 'HelloWorldForm',
    component: HelloWorldForm,
    meta: {
      title: 'Hello World Form',
    },
  },
  {
    path: '/response',
    name: 'HelloWorldResponse',
    component: HelloWorldResponse,
    meta: {
      title: 'Hello World Response',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const baseTitle = 'Government of Alberta';
  document.title = to.meta.title
    ? `${to.meta.title} - ${baseTitle}`
    : baseTitle;
});

export default router;
