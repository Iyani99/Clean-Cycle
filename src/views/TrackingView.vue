<script setup>
import { ref } from 'vue'
import CustomerNavbar from '../components/CustomerNavbar.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Service Tracking - Customer (Figma frame "Service Tracking - Customer").
 *
 * Frontend simulation only. The journey below is static mock data held in the
 * component. There is NO live tracking, no polling, no timer, no backend, no
 * GPS or map. The current stage simply stays at "IN PROGRESS".
 */
const orderNo = 'CC-8942-LN'

const trackingSteps = [
  { key: 'received', label: 'RECEIVED', state: 'done', meta: 'Oct 24, 08:30 AM' },
  { key: 'picking-up', label: 'PICKING UP', state: 'done', meta: 'Oct 24, 10:15 AM' },
  { key: 'in-progress', label: 'IN PROGRESS', state: 'current', meta: 'Processing' },
  {
    key: 'ready',
    label: 'READY FOR DELIVERY',
    state: 'pending',
    meta: 'Est. Aug 21, 02:00 PM',
  },
]

const serviceDetails = [
  { label: 'Service Type', value: 'Wash & Fold' },
  { label: 'Items Booked', value: '1 Bag (approx. 1Kg)' },
  { label: 'Scheduled Pickup', value: 'Aug 21, 09:00 AM - 11:00 AM' },
  { label: 'Est. Delivery', value: 'Aug 21, 01:00 PM - 03:00 PM' },
]

const supportRequested = ref(false)

function contactSupport() {
  supportRequested.value = true
}
</script>

<template>
  <CustomerNavbar />

  <main class="tracking">
    <div class="tracking__inner container">
      <header class="tracking__header">
        <div class="tracking__intro">
          <h1 class="tracking__title">Service Tracking</h1>
          <p class="tracking__lead">Track the real-time status of your laundry service.</p>
        </div>
        <span class="tracking__order">
          <span class="tracking__hash">#</span>{{ orderNo }}
        </span>
      </header>

      <div class="tracking__grid">
        <section class="card" aria-label="Status journey">
          <h2 class="card__title">Status Journey</h2>

          <ol class="journey">
            <li
              v-for="step in trackingSteps"
              :key="step.key"
              class="stage"
              :class="`stage--${step.state}`"
            >
              <span class="stage__marker">
                <AppIcon v-if="step.state === 'done'" name="check" :size="14" />
                <span v-else class="stage__dot"></span>
              </span>
              <span class="stage__body">
                <span class="stage__label">{{ step.label }}</span>
                <span class="stage__meta">{{ step.meta }}</span>
              </span>
            </li>
          </ol>
        </section>

        <section class="card" aria-label="Service details">
          <h2 class="card__title">Service Details</h2>

          <dl class="sd">
            <div v-for="row in serviceDetails" :key="row.label" class="sd-row">
              <dt class="sd-row__label">{{ row.label }}</dt>
              <dd class="sd-row__value">{{ row.value }}</dd>
            </div>
          </dl>

          <button type="button" class="sd-support" @click="contactSupport">
            <AppIcon name="headset" :size="18" />
            Contact Support
          </button>

          <p v-if="supportRequested" class="sd-note" role="status">
            Support will contact you shortly.
          </p>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
.tracking {
  background-color: var(--cc-bg);
  min-height: calc(100vh - 74px);
}

.tracking__inner {
  padding-top: 40px;
  padding-bottom: 56px;
}

/* Header ---------------------------------------------------------- */
.tracking__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.tracking__title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--cc-heading);
  margin-bottom: 6px;
}

.tracking__lead {
  font-size: 0.9375rem;
  color: var(--cc-text);
}

.tracking__order {
  align-self: flex-start;
  padding: 10px 18px;
  border-radius: var(--cc-radius-sm);
  background-color: #eef0f2;
  font-size: 1rem;
  font-weight: 700;
  color: var(--cc-heading);
  white-space: nowrap;
}

.tracking__hash {
  margin-right: 8px;
  color: #9aa0a8;
  font-weight: 600;
}

/* Cards --------------------------------------------------------- */
.tracking__grid {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 1fr);
  gap: 24px;
  align-items: stretch;
  margin-top: 36px;
}

.card {
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  padding: 24px 28px;
}

.card__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--cc-heading);
}

/* Status journey ---------------------------------------------- */
.journey {
  display: flex;
  list-style: none;
  max-width: 640px;
  margin-top: 40px;
}

.stage {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

/* Connector for the segment that leads OUT of this stage. Blue once this stage
   is completed, grey otherwise (so current -> pending stays grey). */
.stage:not(:last-child)::after {
  content: '';
  position: absolute;
  z-index: 0;
  top: 13px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: var(--cc-border-strong);
}

.stage--done::after {
  background-color: var(--cc-primary);
}

.stage__marker {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background-color: var(--cc-surface);
}

.stage--done .stage__marker {
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
}

.stage--current .stage__marker {
  border: 3px solid var(--cc-primary);
}

.stage--pending .stage__marker {
  background-color: #d1d5db;
}

.stage__dot {
  display: block;
  border-radius: 999px;
}

.stage--current .stage__dot {
  width: 10px;
  height: 10px;
  background-color: var(--cc-primary);
}

.stage--pending .stage__dot {
  width: 8px;
  height: 8px;
  background-color: #9aa0a8;
}

.stage__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stage__label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.stage--done .stage__label {
  color: var(--cc-primary);
}

.stage--current .stage__label {
  color: var(--cc-heading);
}

.stage--pending .stage__label {
  color: #9aa0a8;
}

.stage__meta {
  font-size: 0.8125rem;
  color: var(--cc-text);
}

.stage--pending .stage__meta {
  color: #9aa0a8;
}

/* Service details -------------------------------------------- */
.sd {
  margin-top: 10px;
}

.sd-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--cc-border);
}

.sd-row__label {
  flex-shrink: 0;
  font-size: 0.875rem;
  color: var(--cc-text);
}

.sd-row__value {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--cc-heading);
  text-align: right;
}

.sd-support {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  margin-top: 22px;
  padding: 12px 16px;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-primary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}

.sd-support:hover {
  background-color: var(--cc-bg);
}

.sd-note {
  margin-top: 10px;
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-primary);
}

/* Responsive ------------------------------------------------ */
@media (max-width: 900px) {
  .tracking__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Below ~560px the horizontal 4-step journey gets too cramped for the
   labels + timestamps, so it becomes a vertical stepper. */
@media (max-width: 560px) {
  .journey {
    flex-direction: column;
    max-width: none;
    margin-top: 28px;
  }

  .stage {
    flex: none;
    flex-direction: row;
    align-items: flex-start;
    gap: 14px;
    text-align: left;
  }

  .stage:not(:first-child) {
    margin-top: 26px;
  }

  .stage:not(:last-child)::after {
    top: 28px;
    left: 13px;
    bottom: -26px;
    width: 2px;
    height: auto;
  }

  .stage__body {
    padding-top: 3px;
  }
}
</style>
