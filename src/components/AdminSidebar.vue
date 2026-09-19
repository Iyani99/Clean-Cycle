<script setup>
import { RouterLink } from 'vue-router'
import AppIcon from './AppIcon.vue'
import logoIcon from '../assets/images/logo-icon.png'

/**
 * Persistent left Admin sidebar (Figma "Dashboard - Admin"). Shared shell
 * used by every Admin screen.
 *
 * All eight nav items link to real screens. The `to: null` (inert) branch is
 * kept for any future item without a screen, matching the pattern already used
 * in `CustomerNavbar`. "+ New Booking" stays inert — New Record Admin is a
 * separate, not-yet-built screen.
 *
 * Logout is shown on every Admin screen, above the profile block. It goes to
 * `/login`, which already has the Customer/Admin selector, so the role can be
 * switched easily while demoing. There is no real auth, so nothing is cleared.
 */

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'grid', to: '/admin/dashboard' },
  { key: 'bookings', label: 'Bookings', icon: 'calendar', to: '/admin/bookings' },
  { key: 'customers', label: 'Customers', icon: 'users', to: '/admin/customers' },
  { key: 'logistics', label: 'Logistics', icon: 'truck', to: '/admin/logistics' },
  { key: 'payments', label: 'Payments', icon: 'card', to: '/admin/payments' },
  { key: 'reports', label: 'Reports', icon: 'bar-chart', to: '/admin/reports' },
  { key: 'notifications', label: 'Notifications', icon: 'bell', to: '/admin/notifications' },
  { key: 'settings', label: 'Settings', icon: 'gear', to: '/admin/settings' },
]
</script>

<template>
  <aside class="admin-sidebar">
    <RouterLink to="/admin/dashboard" class="admin-sidebar__brand" aria-label="Clean-Cycle admin">
      <img :src="logoIcon" alt="" class="admin-sidebar__logo" width="40" height="27" />
      <span class="admin-sidebar__wordmark">
        <span class="admin-sidebar__wordmark--clean">CLEAN</span><span>-</span><span
          class="admin-sidebar__wordmark--cycle"
          >CYCLE</span
        >
      </span>
    </RouterLink>

    <button type="button" class="admin-sidebar__new-booking">
      <AppIcon name="plus" :size="16" />
      New Booking
    </button>

    <nav class="admin-sidebar__nav" aria-label="Admin">
      <template v-for="item in navItems" :key="item.key">
        <RouterLink v-if="item.to" :to="item.to" class="admin-sidebar__link">
          <AppIcon :name="item.icon" :size="18" />
          {{ item.label }}
        </RouterLink>
        <span
          v-else
          class="admin-sidebar__link admin-sidebar__link--disabled"
          aria-disabled="true"
        >
          <AppIcon :name="item.icon" :size="18" />
          {{ item.label }}
        </span>
      </template>
      <RouterLink to="/login" class="admin-sidebar__link admin-sidebar__logout">
        <AppIcon name="logout" :size="18" />
        Logout
      </RouterLink>
    </nav>

    <div class="admin-sidebar__profile">
      <span class="admin-sidebar__avatar">
        <AppIcon name="user" :size="18" />
      </span>
      <span class="admin-sidebar__profile-text">
        <span class="admin-sidebar__profile-name">Admin User</span>
        <span class="admin-sidebar__profile-email">maybitawkahitwala@gmail.com</span>
      </span>
    </div>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 240px;
  min-height: 100vh;
  padding: 24px 16px;
  background-color: var(--cc-surface);
  border-right: 1px solid var(--cc-border);
}

.admin-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px;
  margin-bottom: 20px;
}

.admin-sidebar__logo {
  width: 40px;
  height: 27px;
  object-fit: cover;
}

.admin-sidebar__wordmark {
  font-family: var(--cc-font-brand);
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.3px;
  white-space: nowrap;
  color: var(--cc-primary);
}

.admin-sidebar__wordmark--clean {
  color: var(--cc-secondary);
}

.admin-sidebar__wordmark--cycle {
  color: var(--cc-tertiary);
}

.admin-sidebar__new-booking {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 20px;
  border: none;
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
}

.admin-sidebar__new-booking:hover {
  background-color: #002d6d;
}

.admin-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.admin-sidebar__link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--cc-radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--cc-text);
}

.admin-sidebar__link:hover {
  background-color: var(--cc-bg);
}

.admin-sidebar__link.router-link-active {
  background-color: #e7f0fa;
  color: var(--cc-primary);
  font-weight: 700;
}

/* Sits at the bottom of the nav column, just above the profile block. */
.admin-sidebar__logout {
  margin-top: auto;
}

.admin-sidebar__link--disabled {
  cursor: default;
}

.admin-sidebar__link--disabled:hover {
  background-color: transparent;
}

.admin-sidebar__profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 8px 0;
  margin-top: 16px;
  border-top: 1px solid var(--cc-border);
}

.admin-sidebar__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background-color: var(--cc-secondary);
  color: var(--cc-text-on-dark);
}

.admin-sidebar__profile-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.admin-sidebar__profile-name {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.admin-sidebar__profile-email {
  font-size: 0.75rem;
  color: var(--cc-text);
  overflow-wrap: break-word;
}

/* Responsive ------------------------------------------------------------ */
@media (max-width: 860px) {
  .admin-sidebar {
    width: 100%;
    min-height: 0;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    border-right: none;
    border-bottom: 1px solid var(--cc-border);
  }

  .admin-sidebar__brand {
    margin-bottom: 0;
    margin-right: auto;
  }

  .admin-sidebar__new-booking {
    width: auto;
    margin-bottom: 0;
  }

  .admin-sidebar__nav {
    flex: none;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    order: 3;
    margin-top: 12px;
  }

  .admin-sidebar__logout {
    margin-top: 0;
  }

  .admin-sidebar__profile {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
}
</style>
