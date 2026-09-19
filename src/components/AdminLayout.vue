<script setup>
import AdminSidebar from './AdminSidebar.vue'

/**
 * Shared Admin screen shell: sidebar + main content area. Extracted once a
 * second Admin screen (Booking Management) needed the exact same wrapper as
 * the Dashboard — sidebar, flex row layout, main padding, and the ≤860px
 * breakpoint where `AdminSidebar` itself collapses to a horizontal bar.
 * Screen-specific content (headers, cards, tables) stays local to each view.
 *
 * `showLogout` is an opt-in that is passed straight to `AdminSidebar`; it
 * defaults to off so existing Admin screens are unchanged.
 */
defineProps({
  showLogout: { type: Boolean, default: false },
})
</script>

<template>
  <div class="admin-layout">
    <AdminSidebar :show-logout="showLogout" />
    <main class="admin-layout__main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
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
