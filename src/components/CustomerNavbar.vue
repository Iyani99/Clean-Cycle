<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppIcon from './AppIcon.vue'
import logoIcon from '../assets/images/logo-icon.png'

/**
 * Authenticated customer header (Figma "Dashboard - Customer").
 * Shared by the signed-in customer screens. Distinct from the public
 * `AppNavbar` (which shows Login / Sign Up instead of the icon group).
 *
 * The gear icon routes to Settings/Profile (`/settings`) and the bell routes
 * to Notifications (`/notifications`). The avatar opens account actions.
 * The `to: null` branch below is kept for any future nav item without a screen.
 */
const links = [
  { label: 'Home', to: '/dashboard' },
  { label: 'Services', to: '/services' },
  { label: 'Booknow', to: '/book' },
  { label: 'Track Services', to: '/tracking' },
]

const route = useRoute()
const linksNav = ref(null)
const indicatorStyle = ref({})
const indicatorVisible = ref(false)
const indicatorReady = ref(false)
let resizeObserver
let indicatorFrame

function updateIndicator() {
  const nav = linksNav.value
  const activeLink = nav?.querySelector('.customer-nav__link.router-link-exact-active')
  if (!activeLink) {
    indicatorVisible.value = false
    return
  }

  indicatorStyle.value = {
    width: `${activeLink.offsetWidth}px`,
    top: `${activeLink.offsetTop + activeLink.offsetHeight - 2}px`,
    transform: `translateX(${activeLink.offsetLeft}px)`,
  }
  indicatorVisible.value = true
  if (!indicatorReady.value) {
    indicatorFrame = requestAnimationFrame(() => {
      indicatorReady.value = true
    })
  }
}

watch(() => route.path, async () => {
  await nextTick()
  updateIndicator()
}, { flush: 'post' })

const accountOpen = ref(false)
const accountRoot = ref(null)
const accountButton = ref(null)

function closeAccountMenu() {
  accountOpen.value = false
  accountButton.value?.focus()
}

function onDocumentPointerDown(event) {
  if (!accountRoot.value?.contains(event.target)) accountOpen.value = false
}

function onAccountFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) accountOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  updateIndicator()
  resizeObserver = new ResizeObserver(updateIndicator)
  resizeObserver.observe(linksNav.value)
  linksNav.value.querySelectorAll('.customer-nav__link').forEach((link) => resizeObserver.observe(link))
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  resizeObserver?.disconnect()
  if (indicatorFrame) cancelAnimationFrame(indicatorFrame)
})
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

      <nav ref="linksNav" class="customer-nav__links" aria-label="Customer">
        <template v-for="link in links" :key="link.label">
          <RouterLink v-if="link.to" :to="link.to" class="customer-nav__link" :data-label="link.label">
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
        <span
          v-if="indicatorVisible"
          class="customer-nav__indicator"
          :class="{ 'customer-nav__indicator--ready': indicatorReady }"
          :style="indicatorStyle"
          aria-hidden="true"
        ></span>
      </nav>

      <div class="customer-nav__actions">
        <RouterLink to="/notifications" class="customer-nav__icon-btn" aria-label="Notifications">
          <AppIcon name="bell" :size="20" />
        </RouterLink>
        <RouterLink to="/settings" class="customer-nav__icon-btn" aria-label="Settings">
          <AppIcon name="gear" :size="20" />
        </RouterLink>
        <div ref="accountRoot" class="customer-nav__account" @focusout="onAccountFocusOut" @keydown.esc.stop.prevent="closeAccountMenu">
          <button
            ref="accountButton"
            type="button"
            class="customer-nav__avatar"
            aria-label="Account menu"
            aria-controls="customer-account-menu"
            :aria-expanded="accountOpen"
            @click="accountOpen = !accountOpen"
          >
            <AppIcon name="user" :size="22" />
          </button>
          <div v-if="accountOpen" id="customer-account-menu" class="customer-nav__account-menu">
            <RouterLink to="/settings" class="customer-nav__account-link" @click="accountOpen = false">
              <AppIcon name="gear" :size="17" />
              Settings
            </RouterLink>
            <RouterLink to="/login" class="customer-nav__account-link" @click="accountOpen = false">
              <AppIcon name="logout" :size="17" />
              Logout
            </RouterLink>
          </div>
        </div>
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

.customer-nav__brand:focus-visible,
.customer-nav__link:focus-visible,
.customer-nav__icon-btn:focus-visible,
.customer-nav__avatar:focus-visible,
.customer-nav__account-link:focus-visible {
  outline: 2px solid var(--cc-tertiary);
  outline-offset: 3px;
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
  position: relative;
  display: flex;
  align-items: center;
  gap: 28px;
}

.customer-nav__link {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--cc-text);
  padding: 6px 0;
  border-bottom: 2px solid transparent;
  transition: color 180ms ease, transform 180ms ease;
}

.customer-nav__link::before {
  display: block;
  height: 0;
  overflow: hidden;
  content: attr(data-label);
  font-weight: 700;
  visibility: hidden;
}

.customer-nav__link:hover,
.customer-nav__link:focus-visible {
  color: var(--cc-primary);
  transform: scale(1.025);
}

.customer-nav__link.router-link-exact-active {
  color: var(--cc-primary);
  font-weight: 700;
}

.customer-nav__link.router-link-exact-active:hover,
.customer-nav__link.router-link-exact-active:focus-visible {
  color: var(--cc-primary);
}

.customer-nav__indicator {
  position: absolute;
  left: 0;
  height: 2px;
  border-radius: 2px;
  background-color: var(--cc-primary);
  pointer-events: none;
}

.customer-nav__indicator--ready {
  transition: transform 180ms ease, width 180ms ease, top 180ms ease, opacity 180ms ease;
}

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
  transition: color 160ms ease, background-color 160ms ease;
}

.customer-nav__icon-btn:hover,
.customer-nav__icon-btn:focus-visible {
  color: var(--cc-primary);
  background-color: var(--cc-bg);
}

.customer-nav__icon-btn.router-link-active {
  color: var(--cc-primary);
  background-color: #e7f0fa;
}

.customer-nav__icon-btn.router-link-active:hover,
.customer-nav__icon-btn.router-link-active:focus-visible {
  background-color: #e7f0fa;
}

.customer-nav__account {
  position: relative;
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
  transition: background-color 160ms ease, box-shadow 160ms ease;
}

.customer-nav__avatar:hover,
.customer-nav__avatar[aria-expanded='true'] {
  background-color: var(--cc-primary);
  box-shadow: 0 0 0 3px #e7f0fa;
}

.customer-nav__account-menu {
  position: absolute;
  z-index: 20;
  top: calc(100% + 12px);
  right: 0;
  min-width: 156px;
  padding: 6px;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  box-shadow: var(--cc-shadow-customer-card);
}

.customer-nav__account-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  border-radius: 6px;
  color: var(--cc-heading);
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 160ms ease, background-color 160ms ease;
}

.customer-nav__account-link:hover,
.customer-nav__account-link:focus-visible {
  color: var(--cc-primary);
  background-color: #e7f0fa;
}

@media (prefers-reduced-motion: reduce) {
  .customer-nav__link,
  .customer-nav__indicator--ready,
  .customer-nav__icon-btn,
  .customer-nav__avatar,
  .customer-nav__account-link {
    transition: none;
  }

  .customer-nav__link:hover,
  .customer-nav__link:focus-visible {
    transform: none;
  }
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
