<script setup>
import { computed, ref } from 'vue'
import CustomerNavbar from '../components/CustomerNavbar.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Notification - Customer.
 *
 * Frontend-only prototype. The notification list below is a local, static
 * array — there is no backend, no notification service, no browser
 * Notification API, and nothing persists across a refresh. Only the first
 * item ("Order Confirmed") matches the approved screenshot; the rest are
 * mock items revealed by "Load More" to give the otherwise mostly-empty
 * screen a small demo interaction.
 */
const notifications = ref([
  {
    id: 1,
    title: 'Order Confirmed',
    detail: 'Your laundry booking has been confirmed and is ready for processing.',
    time: '2 hours ago',
    read: false,
    showDetail: false,
  },
  {
    id: 2,
    title: 'Laundry Picked Up',
    detail: 'Your laundry has been picked up for processing.',
    time: '4 hours ago',
    read: false,
    showDetail: false,
  },
  {
    id: 3,
    title: 'Service In Progress',
    detail: 'Your Wash & Fold service is currently being processed.',
    time: 'Yesterday',
    read: false,
    showDetail: false,
  },
  {
    id: 4,
    title: 'Delivery Scheduled',
    detail: 'Your laundry is scheduled for delivery.',
    time: 'Yesterday',
    read: false,
    showDetail: false,
  },
])

// Only the first (screenshot) notification is visible until "Load More" is
// clicked, so the initial frame stays faithful to the approved screenshot.
const visibleCount = ref(1)
const visibleNotifications = computed(() => notifications.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < notifications.value.length)

function loadMore() {
  visibleCount.value = notifications.value.length
}

function markAllRead() {
  notifications.value.forEach((notification) => {
    notification.read = true
  })
}

function toggleDetail(notification) {
  notification.showDetail = !notification.showDetail
}
</script>

<template>
  <CustomerNavbar />

  <main class="notifications">
    <div class="notifications__content container">
      <header class="notifications__header">
        <h1 class="notifications__title">Notifications</h1>
        <button type="button" class="notifications__mark-all" @click="markAllRead">
          Mark all as read
        </button>
      </header>

      <div class="notifications__list">
        <article
          v-for="notification in visibleNotifications"
          :key="notification.id"
          class="notif-card"
          :class="{ 'notif-card--read': notification.read }"
        >
          <span class="notif-card__icon">
            <AppIcon name="check-circle" :size="20" />
          </span>
          <div class="notif-card__body">
            <p class="notif-card__title">{{ notification.title }}</p>
            <button type="button" class="notif-card__details" @click="toggleDetail(notification)">
              Details
            </button>
            <p v-if="notification.showDetail" class="notif-card__detail-text">
              {{ notification.detail }}
            </p>
          </div>
          <span class="notif-card__time">{{ notification.time }}</span>
        </article>
      </div>

      <div v-if="hasMore" class="notifications__load-more">
        <button type="button" class="load-more-btn" @click="loadMore">Load More</button>
      </div>
    </div>

    <!-- Footer year matches the approved screenshot (2023), which differs from
         Settings/Profile's footer (2024) — a likely Figma inconsistency,
         reproduced as-is rather than silently normalized. -->
    <footer class="notifications__footer">© 2023 Clean-Cycle. All rights reserved.</footer>
  </main>
</template>

<style scoped>
.notifications {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 74px);
  background-color: var(--cc-surface);
}

.notifications__content {
  flex: 1;
  padding-top: 32px;
  padding-bottom: 56px;
}

.notifications__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.notifications__title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--cc-heading);
}

.notifications__mark-all {
  background: none;
  border: none;
  color: var(--cc-primary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.notifications__mark-all:hover {
  text-decoration: underline;
}

/* Notification card ---------------------------------------------------- */
.notifications__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notif-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
}

.notif-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
}

/* Read notifications fade to a muted treatment; unread stays as approved
   in the screenshot (the "Order Confirmed" card is shown unread). */
.notif-card--read .notif-card__icon {
  background-color: var(--cc-border-strong);
}

.notif-card__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notif-card__title {
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.notif-card--read .notif-card__title {
  font-weight: 600;
  color: var(--cc-text);
}

.notif-card__details {
  align-self: flex-start;
  padding: 0;
  border: none;
  background: none;
  color: var(--cc-primary);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
}

.notif-card__details:hover {
  text-decoration: underline;
}

.notif-card__detail-text {
  font-size: 0.8125rem;
  color: var(--cc-text);
  line-height: 1.5;
}

.notif-card__time {
  flex-shrink: 0;
  font-size: 0.8125rem;
  color: var(--cc-text);
  white-space: nowrap;
}

/* Load More ------------------------------------------------------------ */
.notifications__load-more {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.load-more-btn {
  padding: 10px 24px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-heading);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.load-more-btn:hover {
  background-color: var(--cc-bg);
}

/* Footer ----------------------------------------------------------------- */
.notifications__footer {
  padding: 24px 0;
  border-top: 1px solid var(--cc-border);
  text-align: center;
  font-size: 0.8125rem;
  color: var(--cc-text);
}

/* Responsive ------------------------------------------------------------- */
@media (max-width: 500px) {
  .notif-card {
    flex-wrap: wrap;
    padding: 16px 18px;
  }

  .notif-card__time {
    width: 100%;
    padding-left: 56px;
  }

  .notifications__title {
    font-size: 1.6rem;
  }
}
</style>
