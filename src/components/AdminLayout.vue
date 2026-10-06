<script setup>
import AdminSidebar from './AdminSidebar.vue'

/**
 * Shared Admin screen shell: sidebar + main content area. Extracted once a
 * second Admin screen (Booking Management) needed the exact same wrapper as
 * the Dashboard — sidebar, flex row layout, main padding, and the ≤860px
 * breakpoint where `AdminSidebar` itself collapses to a horizontal bar.
 * Screen-specific content (headers, cards, tables) stays local to each view.
 *
 * `showNewBooking` is passed straight to the sidebar; only the Add New Booking
 * screen turns it off.
 */
defineProps({
  showNewBooking: { type: Boolean, default: true },
})
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar :show-new-booking="showNewBooking" />
    <main class="admin-layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  --cc-shadow-admin-card:
    0 0 18px rgba(15, 23, 42, 0.11),
    0 8px 24px rgba(15, 23, 42, 0.10);
  display: flex;
  min-height: 100vh;
  background-color: var(--cc-bg);
}

.admin-layout__main {
  flex: 1;
  min-width: 0;
  padding: 32px 40px 56px;
}

@media (max-width: 860px) {
  .admin-layout {
    flex-direction: column;
  }

  .admin-layout__main {
    padding: 24px 20px 40px;
  }
}
</style>

<style>
/* Shared depth for large Admin surfaces. Reports uses the same Admin-only
   shadow in its card styles; keep controls, rows, and placeholders flat. */
.admin-layout__main :is(
  .stat-card,
  .recent-card,
  .filter-card,
  .controls-card,
  .table-card,
  .summary-card,
  .reminder-card,
  .settings-main > .card,
  .settings-aside > .aside-card,
  .new-booking > .card,
  .notif-card:not(.notif-card--empty)
) {
  box-shadow: var(--cc-shadow-admin-card);
}
</style>
