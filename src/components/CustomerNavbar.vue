<script setup>
import { RouterLink } from 'vue-router'
import AppIcon from './AppIcon.vue'
import logoIcon from '../assets/images/logo-icon.png'

/**
 * Authenticated customer header (Figma "Dashboard - Customer").
 * Shared by the signed-in customer screens. Distinct from the public
 * `AppNavbar` (which shows Login / Sign Up instead of the icon group).
 *
 * The gear icon routes to Settings/Profile (`/settings`) and the bell routes
 * to Notifications (`/notifications`). The avatar remains inert for this
 * prototype. The `to: null` branch below is kept for any future nav item that
 * has no screen yet.
 */
const links = [
  { label: 'Home', to: '/dashboard' },
  { label: 'Services', to: '/services' },
  { label: 'Booknow', to: '/book' },
  { label: 'Track Services', to: '/tracking' },
]
</script>

<template>
  <header class="customer-nav">
    <div class="customer-nav__inner container">
      <RouterLink to="/dashboard" class="customer-nav__brand" aria-label="Clean-Cycle dashboard">
        <img :src="logoIcon" alt="" class="customer-nav__logo" width="66" height="44" />
        <span class="customer-nav__wordmark">
          <span class="customer-nav__wordmark--clean">CLEAN</span><span>-</span><span
            class="customer-nav__wordmark--cycle"
            >CYCLE</span
          >
        </span>
      </RouterLink>

      <nav class="customer-nav__links" aria-label="Customer">
        <template v-for="link in links" :key="link.label">
          <RouterLink v-if="link.to" :to="link.to" class="customer-nav__link">
            {{ link.label }}
          </RouterLink>
          <span
            v-else
            class="customer-nav__link customer-nav__link--disabled"
            aria-disabled="true"
            :title="`${link.label} — coming soon`"
          >
            {{ link.label }}
          </span>
        </template>
      </nav>

      <div class="customer-nav__actions">
        <RouterLink to="/notifications" class="customer-nav__icon-btn" aria-label="Notifications">
          <AppIcon name="bell" :size="20" />
        </RouterLink>
        <RouterLink to="/settings" class="customer-nav__icon-btn" aria-label="Settings">
          <AppIcon name="gear" :size="20" />
        </RouterLink>
        <button type="button" class="customer-nav__avatar" aria-label="Your profile">
          <AppIcon name="user" :size="22" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.customer-nav {
  background-color: var(--cc-surface);
  border-bottom: 1px solid var(--cc-border-strong);
  box-shadow: var(--cc-shadow-header);
}

.customer-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 74px;
  flex-wrap: wrap;
}

.customer-nav__brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.customer-nav__logo {
  width: 66px;
  height: 44px;
  object-fit: cover;
}

.customer-nav__wordmark {
  font-family: var(--cc-font-brand);
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.5px;
  color: var(--cc-primary);
}

.customer-nav__wordmark--clean {
  color: var(--cc-secondary);
}

.customer-nav__wordmark--cycle {
  color: var(--cc-tertiary);
}

.customer-nav__links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.customer-nav__link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--cc-text);
  padding: 6px 0;
  border-bottom: 2px solid transparent;
}

.customer-nav__link:hover {
  color: var(--cc-primary);
}

.customer-nav__link.router-link-exact-active {
  color: var(--cc-primary);
  font-weight: 700;
  border-bottom-color: var(--cc-primary);
}

/* Track Services has no screen yet — matches the other links visually but
   does not navigate. */
.customer-nav__link--disabled {
  cursor: default;
}

.customer-nav__link--disabled:hover {
  color: var(--cc-text);
}

.customer-nav__actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.customer-nav__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--cc-text);
  background: none;
  border: none;
  border-radius: 999px;
  cursor: pointer;
}

.customer-nav__icon-btn:hover {
  color: var(--cc-primary);
  background-color: var(--cc-bg);
}

.customer-nav__icon-btn.router-link-active {
  color: var(--cc-primary);
  background-color: var(--cc-bg);
}

.customer-nav__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  color: var(--cc-text-on-dark);
  background-color: var(--cc-secondary);
  border: none;
  border-radius: 999px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .customer-nav__inner {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 12px;
    padding-bottom: 12px;
    gap: 12px;
  }

  .customer-nav__links {
    flex-wrap: wrap;
    gap: 16px 20px;
  }
}
</style>
