<script setup>
import AdminLayout from '../components/AdminLayout.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Reports Overview - Admin.
 *
 * Frontend-only prototype. The four metrics are fixed static values taken from
 * the approved screenshot — they are not calculated from the Bookings or
 * Payments screens. The date-range control is visual only: the screenshot
 * shows no calendar or alternate state, so there is no picker or filtering.
 * The large empty area under the cards is intentional (nothing else is shown
 * in the approved frame). The "Oct 2023" range is reproduced as-is even though
 * other mock data in the project uses 2026.
 */
const dateRange = 'Oct 1, 2023 - Oct 31, 2023'

const metrics = [
  { key: 'total', label: 'TOTAL BOOKINGS', value: '0', icon: 'inbox', tone: 'blue' },
  { key: 'completed', label: 'COMPLETED', value: '0', icon: 'check-circle', tone: 'teal' },
  { key: 'cancelled', label: 'CANCELLED', value: '0', icon: 'x-circle', tone: 'red' },
  {
    key: 'revenue',
    label: 'TOTAL REVENUE (₱)',
    value: '₱ 0.00',
    icon: 'cash',
    tone: 'primary',
    featured: true,
  },
]
</script>

<template>
  <AdminLayout>
    <header class="reports-header">
      <div>
        <h1 class="reports-header__title">Reports Overview</h1>
        <p class="reports-header__subtitle">Comprehensive metrics and performance data.</p>
      </div>
      <button type="button" class="date-range">
        <AppIcon name="calendar" :size="16" />
        <span class="date-range__text">{{ dateRange }}</span>
        <span class="date-range__caret" aria-hidden="true"></span>
      </button>
    </header>

    <div class="metrics-grid">
      <article
        v-for="metric in metrics"
        :key="metric.key"
        class="metric-card"
        :class="{ 'metric-card--featured': metric.featured }"
      >
        <div class="metric-card__head">
          <span class="metric-card__label">{{ metric.label }}</span>
          <span class="metric-card__icon" :class="`metric-card__icon--${metric.tone}`">
            <AppIcon :name="metric.icon" :size="16" />
          </span>
        </div>
        <div class="metric-card__value">{{ metric.value }}</div>
      </article>
    </div>
  </AdminLayout>
</template>

<style scoped>
/* Header ------------------------------------------------------------- */
.reports-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.reports-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-primary);
  margin-bottom: 6px;
}

.reports-header__subtitle {
  font-size: 0.8125rem;
  color: var(--cc-text);
}

/* Date range control (visual only) ----------------------------------- */
.date-range {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
  padding: 5px 14px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  box-shadow: var(--cc-shadow-cta);
  color: var(--cc-text);
  font: inherit;
  cursor: pointer;
}

.date-range__text {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--cc-heading);
  white-space: nowrap;
}

/* Small filled down-caret, as drawn in the frame. */
.date-range__caret {
  width: 0;
  height: 0;
  border-left: 4.5px solid transparent;
  border-right: 4.5px solid transparent;
  border-top: 5px solid var(--cc-text);
}

/* Metric cards -------------------------------------------------------- */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.metric-card {
  min-height: 133px;
  padding: 22px 20px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  box-shadow: var(--cc-shadow-card);
}

.metric-card--featured {
  background: linear-gradient(135deg, #f4f8fd 0%, #e9f1fb 100%);
}

.metric-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.metric-card__label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: var(--cc-text);
}

.metric-card--featured .metric-card__label {
  color: var(--cc-primary);
}

.metric-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 999px;
}

.metric-card__icon--blue {
  background-color: #d9e3f6;
  color: var(--cc-primary);
}

.metric-card__icon--teal {
  background-color: #d2e8e2;
  color: #1f6b59;
}

.metric-card__icon--red {
  background-color: #fbe4e6;
  color: #d13d4a;
}

.metric-card__icon--primary {
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
}

.metric-card__value {
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--cc-heading);
}

.metric-card--featured .metric-card__value {
  color: var(--cc-primary);
}

/* Responsive --------------------------------------------------------- */
/* Four cards stay on one row only while each is wide enough for its label. */
@media (max-width: 1170px) {
  .metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .reports-header {
    margin-bottom: 24px;
  }

  .reports-header__title {
    font-size: 1.4rem;
  }

  .metrics-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
}
</style>
