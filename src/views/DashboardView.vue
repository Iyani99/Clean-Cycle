<script setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'
import CustomerNavbar from '../components/CustomerNavbar.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Customer Dashboard (Figma frame "Dashboard - Customer").
 *
 * Front-end prototype only. Every number, order, and update below is static
 * mock data held in local component state — there is no API, no stored account,
 * and no real booking / tracking / notification system.
 */
const customerName = 'Jerson'

const stats = [
  { key: 'active', label: 'Active Services', value: 1, icon: 'washer', tone: 'blue' },
  { key: 'ready', label: 'Ready for Pickup', value: 0, icon: 'check-circle', tone: 'teal' },
  { key: 'completed', label: 'Completed Orders', value: 0, icon: 'history', tone: 'grey' },
]

const currentOrder = '#8892'
const steps = [
  { label: 'Received', icon: 'inbox', state: 'done' },
  { label: 'Washing', icon: 'waves', state: 'done' },
  { label: 'Drying', icon: 'spin', state: 'current' },
  { label: 'Folding', icon: 'hanger', state: 'todo' },
  { label: 'Ready', icon: 'check-circle', state: 'todo' },
]

const recentServices = [
  {
    id: '#CC-001',
    type: 'Wash and Fold',
    date: 'August 21, 2026',
    amount: '₱0.00',
    status: 'Washing',
  },
]

const updates = reactive([
  {
    id: 1,
    text: 'Your order #CC-001 has moved to the Drying phase.',
    time: '10 mins ago',
    unread: true,
  },
])

function markAllRead() {
  updates.forEach((update) => {
    update.unread = false
  })
}
</script>

<template>
  <CustomerNavbar />

  <main class="dashboard">
    <div class="dashboard__grid container">
      <header class="welcome">
        <h1 class="welcome__title">Welcome back, {{ customerName }}!</h1>
        <p class="welcome__text">Here is a quick overview of your laundry services today.</p>
      </header>

      <RouterLink to="/book" class="pickup">
        <span class="pickup__plus"><AppIcon name="plus" :size="18" /></span>
        <h2 class="pickup__title">Schedule a Pickup</h2>
        <p class="pickup__text">
          Need fresh clothes? Book your next laundry service in just a few taps.
        </p>
        <span class="pickup__cta">
          Book Now
          <AppIcon name="arrow-right" :size="18" />
        </span>
      </RouterLink>

      <section class="overview" aria-label="Service overview">
        <div class="stats">
          <article v-for="stat in stats" :key="stat.key" class="stat">
            <span class="stat__icon" :class="`stat__icon--${stat.tone}`">
              <AppIcon :name="stat.icon" :size="20" />
            </span>
            <span class="stat__body">
              <span class="stat__label">{{ stat.label }}</span>
              <span class="stat__value">{{ stat.value }}</span>
            </span>
          </article>
        </div>

        <section class="current" aria-label="Current service">
          <header class="current__head">
            <h2 class="current__title">Current Service</h2>
            <span class="current__order">Order {{ currentOrder }}</span>
          </header>

          <div class="current__scroll">
            <ol class="stepper">
              <li
                v-for="step in steps"
                :key="step.label"
                class="step"
                :class="`step--${step.state}`"
              >
                <span class="step__circle"><AppIcon :name="step.icon" :size="18" /></span>
                <span class="step__label">{{ step.label }}</span>
              </li>
            </ol>
          </div>
        </section>

        <section class="recent" aria-label="Recent services">
          <header class="recent__head">
            <h2 class="recent__title">Recent Services</h2>
            <button type="button" class="recent__view-all">View All</button>
          </header>

          <div class="recent__scroll">
            <table class="recent__table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Service Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="service in recentServices" :key="service.id">
                  <td>{{ service.id }}</td>
                  <td>{{ service.type }}</td>
                  <td>{{ service.date }}</td>
                  <td>{{ service.amount }}</td>
                  <td>{{ service.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>

      <aside class="updates" aria-label="Updates">
        <header class="updates__head">
          <AppIcon name="bell" :size="18" />
          <h2 class="updates__title">Updates</h2>
        </header>

        <ul class="updates__list">
          <li
            v-for="update in updates"
            :key="update.id"
            class="update"
            :class="{ 'update--unread': update.unread }"
          >
            <span class="update__dot" aria-hidden="true"></span>
            <span class="update__body">
              <span class="update__text">{{ update.text }}</span>
              <span class="update__time">{{ update.time }}</span>
            </span>
          </li>
        </ul>

        <button type="button" class="updates__mark" @click="markAllRead">Mark All As Read</button>
      </aside>
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  background-color: var(--cc-bg);
  min-height: calc(100vh - 74px);
}

.dashboard__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 384px;
  gap: 24px;
  align-items: start;
  padding-top: 32px;
  padding-bottom: 48px;
}

/* Welcome ------------------------------------------------------------- */
.welcome {
  grid-column: 1;
}

.welcome__title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--cc-heading);
  margin-bottom: 8px;
}

.welcome__text {
  font-size: 1rem;
  color: var(--cc-text);
}

/* Schedule a Pickup ------------------------------------------------- */
.pickup {
  grid-column: 2;
  grid-row: 1;
  align-self: start;
  display: flex;
  flex-direction: column;
  padding: 18px 20px;
  border-radius: var(--cc-radius-lg);
  background-image: linear-gradient(135deg, #003c90 0%, #1e5fa8 100%);
  color: var(--cc-text-on-dark);
  box-shadow: var(--cc-shadow-card);
}

.pickup__plus {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.18);
  margin-bottom: 10px;
}

.pickup__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--cc-text-on-dark);
  margin-bottom: 4px;
}

.pickup__text {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 16px;
}

.pickup__cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

/* Overview card --------------------------------------------------- */
.overview {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 24px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
}

/* Stat cards ---------------------------------------------------- */
.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.stat {
  display: flex;
  flex-direction: column;
  padding: 18px;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
}

.stat__body {
  display: flex;
  flex-direction: column;
}

.stat__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--cc-radius-sm);
  margin-bottom: 14px;
}

.stat__icon--blue {
  background-color: #e7f0fa;
  color: var(--cc-secondary);
}

.stat__icon--teal {
  background-color: #e0f4ef;
  color: var(--cc-tertiary);
}

.stat__icon--grey {
  background-color: #eef0f2;
  color: var(--cc-text);
}

.stat__label {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--cc-text);
  margin-bottom: 6px;
}

.stat__value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
}

/* Current service + stepper --------------------------------- */
.current__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

.current__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.current__order {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--cc-primary);
  background-color: #e7f0fa;
  border-radius: 999px;
  padding: 4px 12px;
}

.current__scroll {
  overflow-x: auto;
}

.stepper {
  display: flex;
  list-style: none;
  min-width: 460px;
}

.step {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step::before {
  content: '';
  position: absolute;
  top: 19px;
  right: 50%;
  left: -50%;
  height: 2px;
  background-color: var(--cc-border);
}

.step:first-child::before {
  display: none;
}

.step--done::before,
.step--current::before {
  background-color: var(--cc-primary);
}

.step__circle {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background-color: var(--cc-surface);
  border: 2px solid var(--cc-border-strong);
  color: var(--cc-border-strong);
}

.step--done .step__circle,
.step--current .step__circle {
  background-color: var(--cc-primary);
  border-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
}

.step--current .step__circle {
  box-shadow: 0 0 0 4px rgba(0, 60, 144, 0.15);
}

.step__label {
  font-size: 0.75rem;
  color: var(--cc-text);
  text-align: center;
}

.step--current .step__label {
  color: var(--cc-primary);
  font-weight: 700;
}

/* Recent services ------------------------------------------ */
.recent {
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
  padding: 20px;
}

.recent__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.recent__title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.recent__view-all {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-primary);
  background: none;
  border: 1px solid var(--cc-primary);
  border-radius: var(--cc-radius-sm);
  padding: 6px 14px;
  cursor: pointer;
}

.recent__view-all:hover {
  background-color: #e7f0fa;
}

.recent__scroll {
  overflow-x: auto;
}

.recent__table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.recent__table th {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--cc-text);
  text-align: left;
  background-color: var(--cc-bg);
  padding: 12px 16px;
}

.recent__table td {
  font-size: 0.875rem;
  color: var(--cc-text);
  padding: 16px;
  border-top: 1px solid var(--cc-border);
}

.recent__table td:first-child {
  color: var(--cc-heading);
  font-weight: 600;
}

/* Updates ---------------------------------------------- */
.updates {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  min-height: 320px;
  padding: 20px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
}

.updates__head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--cc-heading);
  margin-bottom: 18px;
}

.updates__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.updates__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.update {
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  border-radius: var(--cc-radius-sm);
}

.update--unread {
  background-color: var(--cc-bg);
}

.update__dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  margin-top: 6px;
  border-radius: 999px;
  background-color: var(--cc-border-strong);
}

.update--unread .update__dot {
  background-color: var(--cc-primary);
}

.update__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.update__text {
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--cc-heading);
}

.update__time {
  font-size: 0.75rem;
  color: var(--cc-text);
}

.updates__mark {
  align-self: center;
  margin-top: auto;
  padding-top: 20px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-primary);
  background: none;
  border: none;
  cursor: pointer;
}

.updates__mark:hover {
  text-decoration: underline;
}

/* Responsive ----------------------------------------- */
@media (max-width: 960px) {
  .dashboard__grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .welcome,
  .pickup,
  .overview,
  .updates {
    grid-column: 1;
  }

  .pickup {
    grid-row: auto;
  }

  .updates {
    min-height: 0;
  }
}

@media (max-width: 700px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .stat {
    flex-direction: row;
    align-items: center;
    gap: 14px;
  }

  .stat__icon {
    margin-bottom: 0;
  }
}

@media (max-width: 520px) {
  .dashboard__grid {
    padding-top: 24px;
  }

  .welcome__title {
    font-size: 1.6rem;
  }

  .overview {
    padding: 18px;
  }
}
</style>
