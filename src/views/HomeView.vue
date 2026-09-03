<script setup>
import BaseButton from '../components/BaseButton.vue'
import ServiceCard from '../components/ServiceCard.vue'

import heroImage from '../assets/images/hero-laundry.jpg'
import washFoldImage from '../assets/images/wash-and-fold.jpg'
import dryCleaningImage from '../assets/images/dry-cleaning.jpg'
import washFoldIcon from '../assets/icons/wash-fold.svg'
import dryCleaningIcon from '../assets/icons/dry-cleaning.svg'

// Static content for the "Our Core Services" section (frontend-only, no backend).
const services = [
  {
    title: 'Wash & Fold',
    description:
      'Everyday laundry washed, expertly dried, and neatly folded. Perfect for t-shirts, jeans, socks, and regular wear.',
    icon: washFoldIcon,
    iconBg: 'var(--cc-secondary)',
    image: washFoldImage,
    accent: 'var(--cc-secondary)',
  },
  {
    title: 'Dry Cleaning',
    description:
      'Professional stain removal and specialized care for delicate fabrics, suits, dresses, and formal wear.',
    icon: dryCleaningIcon,
    iconBg: 'var(--cc-tertiary)',
    image: dryCleaningImage,
    accent: 'var(--cc-tertiary)',
  },
]
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="hero">
      <div class="hero__inner container">
        <div class="hero__content">
          <h1 class="hero__title">Quality Laundry Service, Delivered.</h1>
          <p class="hero__text">
            Experience the convenience of professional wash, fold, and dry
            cleaning services right at your doorstep. We handle the dirty work so
            you don't have to.
          </p>
          <BaseButton to="/book" variant="primary" size="lg">Book Now</BaseButton>
        </div>

        <div class="hero__media">
          <img
            :src="heroImage"
            alt="Freshly folded towels and neatly stacked laundry"
          />
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="services">
      <div class="services__inner container">
        <header class="services__header">
          <h2 class="services__title">Our Core Services</h2>
          <p class="services__subtitle">
            We take care of your clothes with reliable cleaning services that keep
            them fresh, clean, and ready to wear.
          </p>
        </header>

        <div class="services__grid">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            :title="service.title"
            :description="service.description"
            :icon="service.icon"
            :icon-bg="service.iconBg"
            :image="service.image"
            :accent="service.accent"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Hero -------------------------------------------------------------------- */
.hero {
  background-color: var(--cc-bg);
}

.hero__inner {
  display: flex;
  align-items: center;
  gap: 40px;
  padding-top: 80px;
  padding-bottom: 80px;
}

.hero__content {
  flex: 1 1 0;
  min-width: 0;
}

.hero__title,
.hero__text {
  overflow-wrap: break-word;
}

.hero__title {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.96px;
  color: var(--cc-heading);
  margin-bottom: 24px;
}

.hero__text {
  max-width: 512px;
  width: 100%;
  font-size: 1rem;
  line-height: 1.65;
  color: var(--cc-text);
  margin-bottom: 32px;
}

.hero__media {
  flex: 1 1 0;
  min-width: 0;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  overflow: hidden;
  box-shadow: var(--cc-shadow-card);
}

.hero__media img {
  width: 100%;
  height: 600px;
  object-fit: cover;
}

/* Services -------------------------------------------------------------- */
.services {
  background-color: var(--cc-surface);
  border-top: 1px solid var(--cc-border);
}

.services__inner {
  padding-top: 62px;
  padding-bottom: 100px;
}

.services__header {
  max-width: 672px;
  width: 100%;
  margin: 0 auto 40px;
  text-align: center;
}

.services__title {
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.24px;
  color: var(--cc-heading);
  margin-bottom: 16px;
}

.services__subtitle {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--cc-text);
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 984px; /* 480 + 480 + 24 gap, matches Figma */
  margin: 0 auto;
}

/* Responsive ---------------------------------------------------------- */
@media (max-width: 900px) {
  .hero__inner {
    flex-direction: column;
    align-items: stretch;
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .hero__content,
  .hero__media {
    flex: none;
    width: 100%;
  }

  .hero__title {
    font-size: 2.25rem;
  }

  .hero__media img {
    height: 360px;
  }
}

@media (max-width: 720px) {
  .services__grid {
    grid-template-columns: 1fr;
    max-width: 480px;
  }
}
</style>
