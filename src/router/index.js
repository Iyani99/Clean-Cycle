import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/services',
      name: 'services',
      // Lazy-loaded placeholder page (Week 5 navigation demo).
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('../views/BookNowView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      // The Customer Login screen has its own full-page layout (no public navbar).
      meta: { hideNavbar: true },
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      // The Customer Signup screen has its own full-page layout (no public navbar).
      meta: { hideNavbar: true },
      component: () => import('../views/SignUpView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
