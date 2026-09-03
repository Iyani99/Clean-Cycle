<script setup>
import BaseButton from './BaseButton.vue'

/**
 * Shared shell for the Week 5 navigation placeholder pages
 * (Services, Book Now, Login, Sign Up). These demonstrate working
 * frontend routing only — no real functionality yet.
 */
defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
})
</script>

<template>
  <main class="placeholder">
    <div class="placeholder__inner container">
      <p class="placeholder__eyebrow">Coming soon</p>
      <h1 class="placeholder__title">{{ title }}</h1>
      <p class="placeholder__message">{{ message }}</p>
      <BaseButton to="/" variant="outline">Back to Home</BaseButton>
    </div>
  </main>
</template>

<style scoped>
.placeholder {
  background-color: var(--cc-bg);
  min-height: 60vh;
  display: flex;
}

.placeholder__inner {
  margin: auto;
  padding-top: 80px;
  padding-bottom: 80px;
  text-align: center;
  max-width: 560px;
}

.placeholder__eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--cc-secondary);
  margin-bottom: 12px;
}

.placeholder__title {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--cc-heading);
  margin-bottom: 16px;
}

.placeholder__message {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--cc-text);
  margin-bottom: 28px;
}
</style>
