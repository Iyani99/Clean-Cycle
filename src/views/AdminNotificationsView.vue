<script setup>
import { ref } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Notifications - Admin.
 *
 * Frontend-only prototype. The two notifications are a local static array —
 * there is no backend, no notification service, and nothing persists across a
 * refresh. "Mark all as read" and "Dismiss" only change this local list (same
 * `read` flag pattern as the Customer Notifications screen). "View Details" and
 * "View Invoice" are intentionally inert: the approved frame shows no detail
 * page, modal, or invoice screen for them to open.
 *
 * The two empty cards under the notifications are part of the approved frame
 * and are reproduced as-is (no text, no icons).
 */
const notifications = ref([
  {
    id: 1,
    title: 'New Booking Request',
    message:
      'Customer Jerson T. has requested a dry cleaning service pickup for tomorrow at 9:00 AM.',
    time: '10 mins ago',
    icon: 'calendar',
    tone: 'blue',
    actionLabel: 'View Details',
    read: false,
  },
  {
    id: 2,
    title: 'Payment Received',
    message:
      'Payment of ₱150.00 for Invoice #INV-2026-667 (Atan B.) has been successfully processed.',
    time: '1 hour ago',
    icon: 'cash',
    tone: 'teal',
    actionLabel: 'View Invoice',
    read: false,
  },
])

const emptyCards = 2

function markAllRead() {
  notifications.value.forEach((notification) => {
    notification.read = true
  })
}

function dismiss(id) {
  notifications.value = notifications.value.filter((notification) => notification.id !== id)
}
</script>

<template>
  <AdminLayout>
    <div class="notifications-page">
      <header class="notifications-header">
        <div>
          <h1 class="notifications-header__title">Notifications</h1>
          <p class="notifications-header__subtitle">Manage your recent alerts and updates.</p>
        </div>
        <button type="button" class="mark-all-btn" @click="markAllRead">Mark all as read</button>
      </header>

      <section class="notifications-list" aria-label="Notifications">
        <article v-for="notification in notifications" :key="notification.id" class="notif-card">
          <span class="notif-card__icon" :class="`notif-card__icon--${notification.tone}`">
            <AppIcon :name="notification.icon" :size="22" />
          </span>

          <div class="notif-card__body">
            <h2 class="notif-card__title">{{ notification.title }}</h2>
            <p class="notif-card__message">{{ notification.message }}</p>
            <div class="notif-card__actions">
              <button type="button" class="notif-card__primary-action">
                {{ notification.actionLabel }}
              </button>
              <button type="button" class="notif-card__dismiss" @click="dismiss(notification.id)">
                Dismiss
              </button>
            </div>
          </div>

          <div class="notif-card__meta">
            <span class="notif-card__dot-slot">
              <span
                v-if="!notification.read"
                class="notif-card__dot"
                role="img"
                aria-label="Unread"
              ></span>
            </span>
            <span class="notif-card__time">{{ notification.time }}</span>
          </div>
        </article>

        <div v-for="n in emptyCards" :key="`empty-${n}`" class="notif-card notif-card--empty"></div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
/* The approved frame insets the content a little further than the shared
   Admin shell's own padding, on desktop only. */
.notifications-page {
  padding: 0 20px;
}

/* Header ------------------------------------------------------------- */
.notifications-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.notifications-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
  margin-bottom: 6px;
}

.notifications-header__subtitle {
  font-size: 0.8125rem;
  color: var(--cc-text);
}

.mark-all-btn {
  flex-shrink: 0;
  padding: 7px 14px;
  border: none;
  border-radius: 4px;
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  cursor: pointer;
}

.mark-all-btn:hover {
  background-color: #002d6d;
}

/* Notification cards ------------------------------------------------- */
.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notif-card {
  display: flex;
  align-items: flex-start;
  gap: 22px;
  padding: 22px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
}

/* Blank placeholder cards from the approved frame. */
.notif-card--empty {
  min-height: 84px;
  padding: 0;
}

.notif-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 999px;
}

.notif-card__icon--blue {
  background-color: #1552bd;
  color: #b9cff8;
}

.notif-card__icon--teal {
  background-color: #0b6355;
  color: #79e6cb;
}

.notif-card__body {
  flex: 1;
  min-width: 0;
}

.notif-card__title {
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--cc-heading);
  margin-bottom: 4px;
}

.notif-card__message {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--cc-text);
  margin-bottom: 15px;
}

.notif-card__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.notif-card__primary-action {
  padding: 4px 14px;
  border: 1px solid var(--cc-primary);
  border-radius: 4px;
  background-color: var(--cc-surface);
  color: var(--cc-primary);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  cursor: pointer;
}

.notif-card__primary-action:hover {
  background-color: #e7f0fa;
}

.notif-card__dismiss {
  padding: 4px 6px;
  border: none;
  background: none;
  color: var(--cc-text);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  cursor: pointer;
}

.notif-card__dismiss:hover {
  color: var(--cc-heading);
  text-decoration: underline;
}

/* Timestamp + unread dot, top-right. The dot slot keeps its height when the
   dot disappears so the timestamp does not jump. */
.notif-card__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}

.notif-card__dot-slot {
  display: flex;
  height: 10px;
  margin: -7px -6px 5px 0;
}

.notif-card__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background-color: var(--cc-primary);
}

.notif-card__time {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--cc-heading);
  white-space: nowrap;
}

/* Responsive --------------------------------------------------------- */
@media (max-width: 860px) {
  .notifications-page {
    padding: 0;
  }
}

@media (max-width: 560px) {
  .notifications-header {
    margin-bottom: 24px;
  }

  .notifications-header__title {
    font-size: 1.4rem;
  }

  .notif-card {
    gap: 14px;
    padding: 16px;
  }

  .notif-card__icon {
    width: 40px;
    height: 40px;
  }

  .notif-card__dot-slot {
    margin-top: -3px;
    margin-right: -2px;
  }
}
</style>
