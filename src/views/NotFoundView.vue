<script setup>
import BaseButton from '../components/BaseButton.vue'

/**
 * Not Found (404). A small supporting screen for unknown URLs, not one of the
 * approved Figma frames. It keeps the public navbar, so it looks the same for
 * any invalid path (customer, admin or otherwise).
 */
</script>

<template>
  <main class="not-found">
    <p class="not-found__code" aria-hidden="true">404</p>
    <h1 class="not-found__title">Page Not Found</h1>
    <p class="not-found__text">The page you're looking for doesn't exist.</p>
    <BaseButton to="/" size="lg">Back to Home</BaseButton>
  </main>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 74px);
  padding: 48px 24px;
  text-align: center;
  background-color: var(--cc-bg);
}

.not-found__code {
  font-family: var(--cc-font-brand);
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.2;
  color: var(--cc-secondary);
}

.not-found__title {
  margin-top: 8px;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--cc-heading);
}

.not-found__text {
  margin: 12px 0 32px;
  font-size: 1rem;
  color: var(--cc-text);
}

@media (max-width: 480px) {
  .not-found__code {
    font-size: 3rem;
  }

  .not-found__title {
    font-size: 1.6rem;
  }
}
</style>
