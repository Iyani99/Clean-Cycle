<script setup>
import { RouterLink } from 'vue-router'
import BaseButton from './BaseButton.vue'
import logoIcon from '../assets/images/logo-icon.png'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Book Now', to: '/book' },
]
</script>

<template>
  <header class="navbar">
    <div class="navbar__inner container">
      <RouterLink to="/" class="brand" aria-label="Clean-Cycle home">
        <img :src="logoIcon" alt="" class="brand__icon" width="48" height="48" />
        <span class="brand__name">
          <span class="brand__clean">CLEAN</span
          ><span class="brand__dash">-</span
          ><span class="brand__cycle">CYCLE</span>
        </span>
      </RouterLink>

      <nav class="navbar__links" aria-label="Primary">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="navbar__link"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="navbar__actions">
        <BaseButton to="/login" variant="outline">Login</BaseButton>
        <BaseButton to="/signup" variant="primary">Sign Up</BaseButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: var(--cc-surface);
  border-bottom: 1px solid var(--cc-border-strong);
  box-shadow: var(--cc-shadow-header);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 74px;
  flex-wrap: wrap;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand__icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.brand__name {
  font-family: var(--cc-font-brand);
  font-weight: 900;
  font-size: 1rem;
  letter-spacing: 0.5px;
  color: var(--cc-primary);
}

.brand__clean {
  color: var(--cc-secondary);
}

.brand__dash {
  color: var(--cc-primary);
}

.brand__cycle {
  color: var(--cc-tertiary);
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.navbar__link {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.6px;
  color: var(--cc-text);
  padding: 6px 0;
  border-bottom: 2px solid transparent;
}

.navbar__link:hover {
  color: var(--cc-primary);
}

.navbar__link.router-link-exact-active {
  color: var(--cc-primary);
  font-weight: 700;
  border-bottom-color: var(--cc-primary);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Tablet / mobile: stack the three groups vertically. */
@media (max-width: 768px) {
  .navbar__inner {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 12px;
    padding-bottom: 12px;
    gap: 12px;
  }

  .navbar__links {
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
