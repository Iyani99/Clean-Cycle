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
      path: '/tracking',
      name: 'tracking',
      // Service Tracking - Customer: authenticated screen with its own
      // CustomerNavbar, so the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/TrackingView.vue'),
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
    {
      path: '/settings',
      name: 'settings',
      // Settings/Profile - Customer: authenticated customer screen with its own
      // CustomerNavbar, so the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/SettingsView.vue'),
    },
    {
      path: '/notifications',
      name: 'notifications',
      // Notification - Customer: authenticated customer screen with its own
      // CustomerNavbar, so the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/NotificationsView.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      // Dashboard - Admin: renders its own AdminSidebar shell, so the public
      // navbar is hidden here (same pattern as the customer screens).
      meta: { hideNavbar: true },
      component: () => import('../views/AdminDashboardView.vue'),
    },
    {
      path: '/admin/bookings',
      name: 'admin-bookings',
      // Booking Management - Admin: renders the same AdminSidebar shell, so
      // the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/AdminBookingsView.vue'),
    },
    {
      path: '/admin/customers',
      name: 'admin-customers',
      // Customer Management - Admin: renders the same AdminSidebar shell, so
      // the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/AdminCustomersView.vue'),
    },
    {
      path: '/admin/payments',
      name: 'admin-payments',
      // Payment Management - Admin: renders the same AdminSidebar shell, so
      // the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/AdminPaymentsView.vue'),
    },
    {
      path: '/admin/logistics',
      name: 'admin-logistics',
      // Logistics Management - Admin: renders the same AdminSidebar shell, so
      // the public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/AdminLogisticsView.vue'),
    },
    {
      path: '/admin/reports',
      name: 'admin-reports',
      // Reports Overview - Admin: renders the same AdminSidebar shell, so the
      // public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/AdminReportsView.vue'),
    },
    {
      path: '/admin/notifications',
      name: 'admin-notifications',
      // Notifications - Admin: renders the same AdminSidebar shell, so the
      // public navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/AdminNotificationsView.vue'),
    },
    {
      path: '/admin/settings',
      name: 'admin-settings',
      // Settings - Admin: renders the same AdminSidebar shell, so the public
      // navbar is hidden here.
      meta: { hideNavbar: true },
      component: () => import('../views/AdminSettingsView.vue'),
    },
    {
      // Catch-all for unknown URLs. Must stay LAST so it never shadows a real
      // route. Not one of the approved screens; it keeps the public navbar.
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
