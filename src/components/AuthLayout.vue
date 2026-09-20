<script setup>
import { RouterLink } from 'vue-router'
import BaseButton from './BaseButton.vue'
import logoIcon from '../assets/images/logo-icon.png'

/**
 * Shared full-page shell for the customer auth screens (Login, Signup).
 * Both Figma frames use the same background, decorative blob, "Back to Home
 * Page" pill, centered white card, and CLEAN-CYCLE logo lockup — this component
 * owns all of that; each screen fills the card via the default slot.
 *
 * The top-right pill defaults to "Back to Home Page" and the logo links Home;
 * the Admin account screen overrides them through `backTo` / `backLabel` /
 * `logoTo` / `logoAriaLabel`.
 */
defineProps({
  backTo: { type: String, default: '/' },
  backLabel: { type: String, default: 'Back to Home Page' },
  logoTo: { type: String, default: '/' },
  logoAriaLabel: { type: String, default: 'Clean-Cycle home' },
})
</script>

<template>
  <main class="auth-page">
    <div class="auth-page__backdrop" aria-hidden="true">
      <div class="auth-page__glow"></div>
    </div>

    <div class="auth-page__back">
      <BaseButton :to="backTo" variant="primary">{{ backLabel }}</BaseButton>
    </div>

    <section class="auth-card">
      <RouterLink :to="logoTo" class="auth-card__logo" :aria-label="logoAriaLabel">
        <img :src="logoIcon" alt="" class="auth-card__logo-icon" width="92" height="62" />
        <span class="auth-card__wordmark">
          <span class="auth-card__wordmark--clean">CLEAN</span><span>-</span><span
            class="auth-card__wordmark--cycle"
            >CYCLE</span
          >
        </span>
      </RouterLink>

      <slot />
    </section>
  </main>
</template>

<style scoped>
.auth-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
  background-color: var(--cc-bg);
}

/* Holds the decorative blob and clips it, without turning the page into a
   scroll container — a tall form (Signup) still lets the document scroll. */
.auth-page__backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.auth-page__glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 800px;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  background-image: linear-gradient(45deg, #d9e2ff 0%, #89f5e7 100%);
  filter: blur(32px);
  opacity: 0.12;
}

.auth-page__back {
  position: absolute;
  top: 19px;
  right: 15px;
  z-index: 2;
}

.auth-card {
  position: relative;
  z-index: 1;
  width: 448px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 41px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
  box-shadow: var(--cc-shadow-header);
}

.auth-card__logo {
  align-self: center;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
}

.auth-card__logo-icon {
  /* The source PNG has tall transparent padding; a wide box + cover crops it
     so the mark reads at the size shown in Figma. */
  width: 92px;
  height: 62px;
  object-fit: cover;
}

.auth-card__wordmark {
  font-family: var(--cc-font-brand);
  font-weight: 900;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: var(--cc-primary);
}

.auth-card__wordmark--clean {
  color: var(--cc-secondary);
}

.auth-card__wordmark--cycle {
  color: var(--cc-tertiary);
}

@media (max-width: 480px) {
  .auth-page {
    padding: 40px 16px;
  }

  .auth-card {
    padding: 28px 22px;
  }

  .auth-page__back {
    top: 12px;
    right: 12px;
  }
}
</style>
