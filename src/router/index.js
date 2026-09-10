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
      // Services - Customer: authenticated customer screen with its own
      // CustomerNavbar, so the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: '/book',
      name: 'book',
      // Book now - Customer: authenticated customer screen with its own
      // CustomerNavbar, so the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/BookNowView.vue'),
    },
    {
      path: '/payment',
      name: 'payment',
      // Payment Page - Customer: standalone order-summary card. The Figma frame
      // shows no navbar, so none is rendered here.
      meta: { hideNavbar: true },
      component: () => import('../views/PaymentView.vue'),
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
    {
      path: '/dashboard',
      name: 'dashboard',
      // The Customer Dashboard renders its own authenticated header (CustomerNavbar),
      // so the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/DashboardView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
