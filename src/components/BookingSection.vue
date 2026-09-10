<script setup>
/**
 * One numbered section of the Book Now form: a dark round step badge, a title,
 * and a white card body (`<slot>`). Used five times on the Book Now screen, so
 * the shared header + card styling lives here rather than being repeated.
 */
defineProps({
  step: { type: [Number, String], required: true },
  title: { type: String, required: true },
})
</script>

<template>
  <section class="booking-section">
    <header class="booking-section__head">
      <span class="booking-section__badge">{{ step }}</span>
      <h2 class="booking-section__title">{{ title }}</h2>
    </header>
    <div class="booking-section__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.booking-section {
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  padding: 24px;
}

.booking-section__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.booking-section__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background-color: var(--cc-heading);
  color: var(--cc-text-on-dark);
  font-size: 0.75rem;
  font-weight: 700;
}

.booking-section__title {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--cc-heading);
}
</style>
