<script setup>
import AdminLayout from '../components/AdminLayout.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Reports Overview - Admin.
 *
 * Frontend-only prototype. The summary and weekly detail use coherent sample
 * values; they are not calculated from the Bookings or Payments screens. The
 * date-range control is visual only, with no picker or filtering. The "Oct
 * 2023" range is reproduced as-is even though other mock data uses 2026.
 */
const dateRange = 'Oct 1, 2023 - Oct 31, 2023'

// October sample: 170 completed + 9 cancelled + 25 still active = 204 bookings.
// Revenue represents an illustrative ₱200 average for each completed booking.
const metrics = [
  { key: 'total', label: 'TOTAL BOOKINGS', value: '204', icon: 'inbox', tone: 'blue' },
  { key: 'completed', label: 'COMPLETED', value: '170', icon: 'check-circle', tone: 'teal' },
  { key: 'cancelled', label: 'CANCELLED', value: '9', icon: 'x-circle', tone: 'red' },
  {
    key: 'revenue',
    label: 'TOTAL REVENUE (₱)',
    value: '₱34,000.00',
    icon: 'cash',
    tone: 'primary',
    featured: true,
  },
]

const weeklyBookings = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 6 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 8 },
  { day: 'Fri', count: 7 },
  { day: 'Sat', count: 10 },
  { day: 'Sun', count: 9 },
]
const serviceMix = [
  { name: 'Wash & Fold', count: 31, share: 63, tone: 'blue' },
  { name: 'Dry Cleaning', count: 18, share: 37, tone: 'teal' },
]
const chartLine = weeklyBookings
  .map((item, index) => `${index === 0 ? 'M' : 'L'} ${12 + (index * 596) / 6} ${170 - item.count * 16}`)
  .join(' ')
const chartArea = `${chartLine} L 608 170 L 12 170 Z`
const weeklyTotal = weeklyBookings.reduce((total, item) => total + item.count, 0)
const peakDay = weeklyBookings.reduce((peak, item) => (item.count > peak.count ? item : peak))
const mostRequestedService = serviceMix.reduce((top, item) => (item.count > top.count ? item : top))
</script>

<template>
  <AdminLayout>
    <header class="reports-header">
      <div>
        <h1 class="reports-header__title">Reports Overview</h1>
        <p class="reports-header__subtitle">October summary with a sample week of activity.</p>
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

    <section class="report-panels" aria-label="October report detail">
      <article class="report-panel report-panel--chart">
        <header class="report-panel__header">
          <div>
            <h2 class="report-panel__title">Bookings trend</h2>
            <p class="report-panel__subtitle">
              A sample week within the October reporting period.
            </p>
          </div>
          <span class="report-panel__tag">Example week</span>
        </header>

        <div class="chart-legend"><span class="chart-legend__key"></span>Bookings</div>
        <div class="trend-chart">
          <div class="trend-chart__scale" aria-hidden="true">
            <span>10</span><span>5</span><span>0</span>
          </div>
          <div class="trend-chart__plot">
            <svg
              class="trend-chart__svg"
              viewBox="0 0 620 180"
              preserveAspectRatio="none"
              role="img"
              aria-label="Sample October week bookings: Monday 4, Tuesday 6, Wednesday 5, Thursday 8, Friday 7, Saturday 10, Sunday 9"
            >
              <path class="trend-chart__grid" d="M 12 10 H 608 M 12 90 H 608 M 12 170 H 608" />
              <path class="trend-chart__area" :d="chartArea" />
              <path class="trend-chart__line" :d="chartLine" />
            </svg>
            <div class="trend-chart__days" aria-hidden="true">
              <span v-for="item in weeklyBookings" :key="item.day">{{ item.day }}</span>
            </div>
          </div>
        </div>
        <p class="report-panel__footer">{{ weeklyTotal }} bookings across seven days</p>
      </article>

      <div class="report-panels__side">
        <article class="report-panel">
          <h2 class="report-panel__title">Service mix</h2>
          <p class="report-panel__subtitle">Share of bookings in the sample week.</p>
          <div class="service-mix">
            <div v-for="service in serviceMix" :key="service.name" class="service-mix__row">
              <div class="service-mix__labels">
                <span>{{ service.name }}</span>
                <strong>{{ service.count }} <small>({{ service.share }}%)</small></strong>
              </div>
              <div class="service-mix__track" aria-hidden="true">
                <span
                  class="service-mix__fill"
                  :class="`service-mix__fill--${service.tone}`"
                  :style="{ width: `${service.share}%` }"
                ></span>
              </div>
            </div>
          </div>
        </article>

        <article class="report-panel">
          <h2 class="report-panel__title">Weekly highlights</h2>
          <p class="report-panel__subtitle">A quick read of the sample week.</p>
          <dl class="report-highlights">
            <div><dt>Peak day</dt><dd>{{ peakDay.day }} · {{ peakDay.count }} bookings</dd></div>
            <div><dt>Average per day</dt><dd>{{ weeklyTotal / weeklyBookings.length }} bookings</dd></div>
            <div><dt>Most requested</dt><dd>{{ mostRequestedService.name }}</dd></div>
          </dl>
        </article>
      </div>
    </section>
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

/* Example report detail ---------------------------------------------- */
.report-panels {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(260px, 1fr);
  align-items: stretch;
  gap: 24px;
  margin-top: 24px;
}

.report-panels__side {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 24px;
  min-width: 0;
}

.report-panel {
  min-width: 0;
  padding: 22px 24px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  box-shadow: var(--cc-shadow-card);
}

.report-panel--chart {
  display: flex;
  flex-direction: column;
}

.report-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.report-panel__title {
  margin-bottom: 5px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--cc-heading);
}

.report-panel__subtitle {
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--cc-text);
}

.report-panel__tag {
  flex-shrink: 0;
  padding: 4px 9px;
  border-radius: 999px;
  background-color: #e7f0fa;
  color: var(--cc-primary);
  font-size: 0.6875rem;
  font-weight: 600;
}

.chart-legend {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  color: var(--cc-text);
  font-size: 0.75rem;
}

.chart-legend__key {
  width: 20px;
  height: 3px;
  border-radius: 999px;
  background-color: var(--cc-primary);
}

.trend-chart {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  margin-bottom: 20px;
}

.trend-chart__scale {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  width: 20px;
  height: 160px;
  margin-top: 10px;
  color: var(--cc-text);
  font-size: 0.6875rem;
  line-height: 1;
}

.trend-chart__plot {
  flex: 1;
  min-width: 0;
}

.trend-chart__svg {
  display: block;
  width: 100%;
  height: 180px;
}

.trend-chart__grid {
  fill: none;
  stroke: var(--cc-border);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.trend-chart__area {
  fill: #e7f0fa;
}

.trend-chart__line {
  fill: none;
  stroke: var(--cc-primary);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.trend-chart__days {
  display: flex;
  justify-content: space-between;
  color: var(--cc-text);
  font-size: 0.6875rem;
}

.trend-chart__days span {
  width: 24px;
  text-align: center;
}

.report-panel__footer {
  padding-top: 14px;
  margin-top: auto;
  border-top: 1px solid var(--cc-border);
  color: var(--cc-primary);
  font-size: 0.75rem;
  font-weight: 600;
}

.service-mix {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
}

.service-mix__labels {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 7px;
  color: var(--cc-heading);
  font-size: 0.75rem;
}

.service-mix__labels strong {
  white-space: nowrap;
}

.service-mix__labels small {
  color: var(--cc-text);
  font-size: 0.6875rem;
  font-weight: 400;
}

.service-mix__track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background-color: var(--cc-bg);
}

.service-mix__fill {
  display: block;
  height: 100%;
  border-radius: inherit;
}

.service-mix__fill--blue {
  background-color: var(--cc-secondary);
}

.service-mix__fill--teal {
  background-color: var(--cc-tertiary);
}

.report-highlights {
  margin-top: 12px;
}

.report-highlights > div {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid var(--cc-border);
  font-size: 0.75rem;
}

.report-highlights > div:last-child {
  border-bottom: 0;
}

.report-highlights dt {
  color: var(--cc-text);
}

.report-highlights dd {
  color: var(--cc-heading);
  font-weight: 600;
  text-align: right;
}

/* Responsive --------------------------------------------------------- */
@media (max-width: 1200px) {
  .report-panels {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
  }

  .report-panels__side {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: auto;
  }
}

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

  .report-panels,
  .report-panels__side {
    gap: 16px;
  }

  .report-panels__side {
    grid-template-columns: minmax(0, 1fr);
  }

  .report-panel {
    padding: 18px 16px;
  }
}
</style>
