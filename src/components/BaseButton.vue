<script setup>
import { RouterLink } from 'vue-router'

/**
 * Simple button-styled router link used across the site
 * (navbar actions, hero call-to-action, placeholder pages).
 *
 * variant: "primary" (filled blue) | "outline" (blue border)
 * size:    "sm" (navbar) | "lg" (hero CTA)
 */
defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'sm',
  },
})
</script>

<template>
  <RouterLink
    :to="to"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`]"
  >
    <slot />
  </RouterLink>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--cc-radius-sm);
  font-weight: 700;
  letter-spacing: 0.6px;
  text-align: center;
  border: 1px solid transparent;
  transition:
    background-color 0.15s ease,
    color 0.15s ease;
}

.btn--sm {
  padding: 8px 16px;
  font-size: 0.75rem;
}

.btn--lg {
  padding: 18px 24px;
  font-size: 1rem;
  box-shadow: var(--cc-shadow-cta);
}

.btn--primary {
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
}

.btn--primary:hover {
  background-color: #002d6d;
}

.btn--outline {
  background-color: transparent;
  border-color: var(--cc-primary);
  color: var(--cc-primary);
}

.btn--outline:hover {
  background-color: rgba(0, 60, 144, 0.06);
}
</style>
