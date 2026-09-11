<script setup>
import { ref } from 'vue'
import AdminSidebar from '../components/AdminSidebar.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Dashboard - Admin (Figma frame "Dashboard Admin/Customer" — Admin side).
 *
 * Frontend-only prototype. Every number and row below is static mock data —
 * there is no backend, no live booking data, no real revenue calculation, and
 * no notification service. "Last Updated" is fixed text, not a live clock.
 */
const stats = [
  { key: 'total', label: 'TOTAL BOOKINGS', value: '0', icon: 'inbox', tone: 'blue' },
  { key: 'pending', label: 'PENDING', value: '0', icon: 'history', tone: 'pink' },
  { key: 'ongoing', label: 'ONGOING', value: '0', icon: 'spin', tone: 'teal' },
  { key: 'delivery', label: 'FOR DELIVERY', value: '0', icon: 'truck', tone: 'blue' },
  { key: 'completed', label: 'COMPLETED (TODAY)', value: '0', icon: 'check-circle', tone: 'blue' },
  { key: 'revenue', label: 'TOTAL REVENUE', value: '₱0', icon: 'cash', tone: 'green' },
]

const recentBookings = [
  {
    id: '#BK-0921',
    name: 'Jerson Tomas',
    datetime: 'Aug 21, 2026, 10:00 AM',
    service: 'Wash & Fold',
    status: 'Pending',
    rider: 'Unassigned',
  },
]

const bannerVisible = ref(true)

function dismissBanner() {
  bannerVisible.value = false
}
</script>

<template>
  <div class="admin-dashboard">
    <AdminSidebar />

    <main class="admin-dashboard__main">
      <header class="admin-dashboard__header">
        <h1 class="admin-dashboard__title">Dashboard Overview</h1>
        <div class="admin-dashboard__updated">
          <span class="admin-dashboard__updated-label">Last Updated</span>
          <span class="admin-dashboard__updated-value">10:30 AM</span>
        </div>
      </header>
      <hr class="admin-dashboard__divider" />

      <div v-if="bannerVisible" class="banner">
        <div class="banner__text">
          <AppIcon name="megaphone" :size="20" />
          <span>New Booking Notification: 5 new bookings requiring assignment</span>
        </div>
        <div class="banner__actions">
          <!-- Inert: Booking Management doesn't exist yet, so this doesn't
               route anywhere. Kept visually present per the screenshot. -->
          <button type="button" class="banner__review">Review Now</button>
          <button type="button" class="banner__dismiss" @click="dismissBanner">Dismiss</button>
        </div>
      </div>

      <div class="stats-grid">
        <article v-for="stat in stats" :key="stat.key" class="stat-card">
          <span class="stat-card__text">
            <span class="stat-card__label">{{ stat.label }}</span>
            <span class="stat-card__value">{{ stat.value }}</span>
          </span>
          <span class="stat-card__icon" :class="`stat-card__icon--${stat.tone}`">
            <AppIcon :name="stat.icon" :size="20" />
          </span>
        </article>
      </div>

      <section class="recent-card" aria-label="Recent bookings">
        <header class="recent-card__head">
          <h2 class="recent-card__title">Recent Bookings</h2>
          <button type="button" class="recent-card__view-all">View All →</button>
        </header>

        <div class="recent-card__scroll">
          <table class="recent-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DATE/TIME</th>
                <th>SERVICE</th>
                <th>STATUS</th>
                <th>RIDER</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking in recentBookings" :key="booking.id">
                <td><span class="booking-id">{{ booking.id }}</span></td>
                <td>{{ booking.name }}</td>
                <td>{{ booking.datetime }}</td>
                <td>{{ booking.service }}</td>
                <td><span class="status-pill">{{ booking.status }}</span></td>
                <td>{{ booking.rider }}</td>
                <td>
                  <button type="button" class="row-action" aria-label="Row actions">
                    <AppIcon name="more-vertical" :size="18" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.admin-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: var(--cc-bg);
}

.admin-dashboard__main {
  flex: 1;
  min-width: 0;
  padding: 32px 40px 56px;
}

/* Header ------------------------------------------------------------- */
.admin-dashboard__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.admin-dashboard__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.admin-dashboard__updated {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.admin-dashboard__updated-label {
  font-size: 0.75rem;
  color: var(--cc-text);
}

.admin-dashboard__updated-value {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.admin-dashboard__divider {
  border: none;
  border-top: 1px solid var(--cc-border);
  margin: 16px 0 24px;
}

/* Banner --------------------------------------------------------------- */
.banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 18px 24px;
  margin-bottom: 24px;
  border-radius: var(--cc-radius-lg);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
}

.banner__text {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.banner__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.banner__review {
  padding: 8px 16px;
  border: none;
  border-radius: var(--cc-radius-sm);
  background-color: rgba(255, 255, 255, 0.16);
  color: var(--cc-text-on-dark);
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
}

.banner__review:hover {
  background-color: rgba(255, 255, 255, 0.26);
}

.banner__dismiss {
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: var(--cc-radius-sm);
  background-color: transparent;
  color: var(--cc-text-on-dark);
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
}

.banner__dismiss:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

/* Summary cards --------------------------------------------------------- */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 20px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
}

.stat-card__text {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-card__label {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--cc-text);
}

.stat-card__value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.stat-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 999px;
}

.stat-card__icon--blue {
  background-color: #e7f0fa;
  color: var(--cc-secondary);
}

.stat-card__icon--teal {
  background-color: #e0f4ef;
  color: var(--cc-tertiary);
}

.stat-card__icon--pink {
  background-color: #fbe4e6;
  color: #c94a5a;
}

.stat-card__icon--green {
  background-color: #157347;
  color: var(--cc-text-on-dark);
}

/* Recent bookings -------------------------------------------------------- */
.recent-card {
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  overflow: hidden;
}

.recent-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--cc-border);
}

.recent-card__title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.recent-card__view-all {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-primary);
  background: none;
  border: none;
  cursor: pointer;
}

.recent-card__view-all:hover {
  text-decoration: underline;
}

.recent-card__scroll {
  overflow-x: auto;
  min-height: 220px;
}

.recent-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.recent-table th {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--cc-text);
  text-align: left;
  padding: 14px 24px;
  border-bottom: 1px solid var(--cc-border);
}

.recent-table td {
  font-size: 0.875rem;
  color: var(--cc-text);
  padding: 16px 24px;
  border-bottom: 1px solid var(--cc-border);
}

.booking-id {
  color: var(--cc-primary);
  font-weight: 600;
}

.status-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: #fbe4e6;
  color: #c94a5a;
  font-size: 0.75rem;
  font-weight: 600;
}

.row-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--cc-radius-sm);
  background: none;
  color: var(--cc-text);
  cursor: pointer;
}

.row-action:hover {
  background-color: var(--cc-bg);
}

/* Responsive -------------------------------------------------------------- */
@media (max-width: 860px) {
  .admin-dashboard {
    flex-direction: column;
  }

  .admin-dashboard__main {
    padding: 24px 20px 40px;
  }
}

@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .stats-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .admin-dashboard__title {
    font-size: 1.4rem;
  }

  .admin-dashboard__updated {
    align-items: flex-start;
    text-align: left;
  }
}
</style>
