<script setup>
import { RouterLink } from 'vue-router'

/**
 * Service card used in the homepage "Our Core Services" section.
 * The homepage shows two of these (Wash & Fold, Dry Cleaning), so it is a
 * reusable component. Content comes from props / static data in the view.
 */
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // imported SVG url
  iconBg: { type: String, default: 'var(--cc-secondary)' },
  image: { type: String, required: true }, // imported image url
  accent: { type: String, default: 'var(--cc-secondary)' }, // "Learn More" color
  to: { type: [String, Object], default: '/services' },
})
</script>

<template>
  <article class="service-card">
    <span class="service-card__icon" :style="{ backgroundColor: iconBg }">
      <img :src="icon" alt="" />
    </span>

    <h3 class="service-card__title">{{ title }}</h3>
    <p class="service-card__text">{{ description }}</p>

    <div class="service-card__media">
      <img :src="image" :alt="title" loading="lazy" />
    </div>

    <RouterLink
      :to="to"
      class="service-card__link"
      :style="{ color: accent }"
    >
      Learn More
      <svg
        class="service-card__arrow"
        viewBox="0 0 10.6667 10.6667"
        width="11"
        height="11"
        aria-hidden="true"
      >
        <path
          d="M8.11667 6H0V4.66667H8.11667L4.38333 0.933333L5.33333 0L10.6667 5.33333L5.33333 10.6667L4.38333 9.73333L8.11667 6V6"
          fill="currentColor"
        />
      </svg>
    </RouterLink>
  </article>
</template>

<style scoped>
.service-card {
  display: flex;
  flex-direction: column;
  background-color: var(--cc-bg);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  padding: 24px;
}

.service-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--cc-radius-sm);
  margin-bottom: 16px;
}

.service-card__icon img {
  width: auto;
  height: 20px;
}

.service-card__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--cc-heading);
  margin-bottom: 8px;
}

.service-card__text {
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--cc-text);
  margin-bottom: 20px;
}

.service-card__media {
  border-radius: var(--cc-radius-sm);
  overflow: hidden;
  margin-bottom: 20px;
}

.service-card__media img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.service-card__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: auto;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.6px;
}

.service-card__link:hover {
  text-decoration: underline;
}
</style>
