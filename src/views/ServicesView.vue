<script setup>
import { RouterLink } from 'vue-router'
import CustomerNavbar from '../components/CustomerNavbar.vue'
import AppIcon from '../components/AppIcon.vue'

import washAndFoldImage from '../assets/images/wash-and-fold.jpg'
import dryCleaningImage from '../assets/images/dry-cleaning.jpg'

/**
 * Services - Customer (Figma frame "Services - Customer").
 *
 * Frontend-only prototype. The service list, prices, and features below are
 * static mock data — there is no pricing API, no cart, and no booking logic.
 * Every "Book Now" button just routes to the (placeholder) /book screen.
 *
 * The two cards share the same structure and differ only in this data, so the
 * markup is a single `v-for` rather than a separate component. The homepage
 * `ServiceCard` is a different layout (icon tile, mid-card image, "Learn More"
 * link) and is intentionally not reused here.
 */
const services = [
  {
    title: 'Wash & Fold',
    image: washAndFoldImage,
    price: '₱ 85.00',
    unit: 'per Kg',
    description:
      'Keep your clothes fresh and ready to wear with our reliable laundry service.',
    features: ['Color separation included'],
  },
  {
    title: 'Dry Cleaning',
    image: dryCleaningImage,
    price: '₱ 70.00',
    unit: 'starting per item',
    description:
      'Special care for your delicate clothes and formal wear. We gently clean your garments to help maintain their quality and appearance.',
    features: ['Stain pre-treatment', 'Hand-finished pressing'],
  },
]
</script>

<template>
  <CustomerNavbar />

  <main class="services-page">
    <div class="services-page__inner container">
      <header class="services-intro">
        <h1 class="services-intro__title">Our Services</h1>
        <p class="services-intro__text">
          Quality laundry and dry cleaning services with fair pricing, reliable
          pickup, and fresh, clean results.
        </p>
      </header>

      <div class="offer-grid">
        <article v-for="service in services" :key="service.title" class="offer">
          <div class="offer__media">
            <img :src="service.image" :alt="service.title" loading="lazy" />
          </div>

          <div class="offer__body">
            <div class="offer__heading">
              <h2 class="offer__title">{{ service.title }}</h2>
              <p class="offer__price">
                {{ service.price }}
                <span class="offer__unit">{{ service.unit }}</span>
              </p>
            </div>

            <p class="offer__text">{{ service.description }}</p>

            <ul class="offer__features">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="offer__feature"
              >
                <span class="offer__check"><AppIcon name="check-circle" :size="18" /></span>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <RouterLink to="/book" class="offer__cta">
              Book Now
              <AppIcon name="arrow-right" :size="18" />
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<style scoped>
.services-page {
  background-color: var(--cc-bg);
  min-height: calc(100vh - 74px);
}

.services-page__inner {
  padding-top: 48px;
  padding-bottom: 64px;
}

/* Intro ------------------------------------------------------------- */
.services-intro {
  margin-bottom: 48px;
}

.services-intro__title {
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--cc-heading);
  margin-bottom: 12px;
}

.services-intro__text {
  max-width: 640px;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--cc-text);
}

/* Service cards --------------------------------------------------- */
.offer-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  align-items: start;
}

.offer {
  display: flex;
  flex-direction: column;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  overflow: hidden;
}

.offer__media img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.offer__body {
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.offer__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.offer__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.offer__price {
  flex-shrink: 0;
  text-align: right;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--cc-primary);
  line-height: 1.2;
}

.offer__unit {
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--cc-text);
  margin-top: 2px;
}

.offer__text {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--cc-text);
  margin-bottom: 16px;
}

.offer__features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
}

.offer__feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--cc-text);
}

.offer__check {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--cc-primary);
}

.offer__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  padding: 13px 20px;
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.offer__cta:hover {
  background-color: #002d6d;
}

/* Responsive ----------------------------------------------------- */
@media (max-width: 860px) {
  .offer-grid {
    grid-template-columns: minmax(0, 1fr);
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 600px) {
  .services-page__inner {
    padding-top: 32px;
  }

  .services-intro {
    margin-bottom: 32px;
  }

  .services-intro__title {
    font-size: 2.1rem;
  }
}
</style>
