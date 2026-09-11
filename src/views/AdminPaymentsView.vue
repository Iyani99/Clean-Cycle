<script setup>
import { computed, reactive, ref } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Payment Management - Admin.
 *
 * Frontend-only prototype. The payment list is a local reactive array —
 * there is no backend, no real payment processing, no reminder/notification
 * service, and no persistence. "Mark as Paid" only flips a local `status`
 * field; nothing survives a refresh.
 *
 * Note: the screenshot's "TOTAL PENDING" summary card shows ₱0.00 while the
 * one mock payment row below it is Pending ₱80.00 — a pre-existing Figma/
 * mock-data inconsistency, reproduced as-is rather than silently corrected.
 * The summary cards intentionally stay static after "Mark as Paid" — they
 * are fixed screenshot values, not a live computation over the table.
 */
const summary = {
  totalPaidMonth: '0.00',
  paidChangeNote: '+12.5% from last month',
  totalPending: '0.00',
  pendingBookingsNote: 'Across 24 active bookings',
  notifyCount: 24,
}

const searchQuery = ref('')
const statusFilter = ref('All Statuses')

const payments = reactive([
  {
    id: '#CC-001',
    name: 'Jerson Tomas',
    amount: 80.0,
    method: 'COD',
    status: 'Pending',
    date: 'Aug 21, 2026',
  },
])

const filteredPayments = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return payments.filter((payment) => {
    const matchesStatus = statusFilter.value === 'All Statuses' || payment.status === statusFilter.value
    const matchesSearch =
      query === '' ||
      payment.id.toLowerCase().includes(query) ||
      payment.name.toLowerCase().includes(query)
    return matchesStatus && matchesSearch
  })
})

function markAsPaid(payment) {
  // Frontend prototype: local status flip only, nothing sent or stored.
  payment.status = 'Paid'
}

function peso(amount) {
  return `₱ ${amount.toFixed(2)}`
}
</script>

<template>
  <AdminLayout>
    <header class="payments-header">
      <div>
        <h1 class="payments-header__title">Payment Management</h1>
        <p class="payments-header__subtitle">
          Overview of recent transactions and outstanding balances.
        </p>
      </div>
    </header>

    <div class="summary-grid">
      <article class="summary-card">
        <div class="summary-card__head">
          <span class="summary-card__label">TOTAL PAID (MONTH)</span>
          <span class="summary-card__icon summary-card__icon--paid">
            <AppIcon name="check-circle" :size="16" />
          </span>
        </div>
        <div class="summary-card__value">
          <span class="summary-card__peso">₱</span>
          <span class="summary-card__amount">{{ summary.totalPaidMonth }}</span>
        </div>
        <p class="summary-card__support summary-card__support--positive">
          {{ summary.paidChangeNote }}
        </p>
      </article>

      <article class="summary-card">
        <div class="summary-card__head">
          <span class="summary-card__label">TOTAL PENDING</span>
          <span class="summary-card__icon summary-card__icon--pending">
            <AppIcon name="history" :size="16" />
          </span>
        </div>
        <div class="summary-card__value">
          <span class="summary-card__peso">₱</span>
          <span class="summary-card__amount">{{ summary.totalPending }}</span>
        </div>
        <p class="summary-card__support">{{ summary.pendingBookingsNote }}</p>
      </article>

      <article class="reminder-card">
        <span class="reminder-card__icon">
          <AppIcon name="card" :size="26" />
        </span>
        <h2 class="reminder-card__title">Send Reminders</h2>
        <p class="reminder-card__text">Notify customers with pending payments.</p>
        <button type="button" class="reminder-card__btn">
          Notify All ({{ summary.notifyCount }})
        </button>
      </article>
    </div>

    <section class="controls-card" aria-label="Search and filter payments">
      <label class="search-box">
        <AppIcon name="search" :size="16" />
        <input v-model="searchQuery" type="text" placeholder="Search ID or Customer..." />
      </label>

      <div class="controls-card__right">
        <select v-model="statusFilter" class="status-select">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <button type="button" class="filter-btn">
          <AppIcon name="filter" :size="16" />
          Filter
        </button>
      </div>
    </section>

    <section class="table-card" aria-label="Payments table">
      <div class="table-card__scroll">
        <table class="payments-table">
          <thead>
            <tr>
              <th class="table-th--wrap">BOOKING ID</th>
              <th class="table-th--wrap">CUSTOMER NAME</th>
              <th>AMOUNT</th>
              <th>METHOD</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in filteredPayments" :key="payment.id">
              <td><span class="payment-id">{{ payment.id }}</span></td>
              <td>{{ payment.name }}</td>
              <td class="payment-amount">{{ peso(payment.amount) }}</td>
              <td>{{ payment.method }}</td>
              <td>
                <span
                  class="status-pill"
                  :class="{ 'status-pill--paid': payment.status === 'Paid' }"
                >
                  {{ payment.status }}
                </span>
              </td>
              <td class="payment-date">{{ payment.date }}</td>
              <td>
                <button
                  v-if="payment.status === 'Pending'"
                  type="button"
                  class="mark-paid-btn"
                  @click="markAsPaid(payment)"
                >
                  Mark as Paid
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="table-card__footer">
        <span class="table-card__count">
          Showing {{ filteredPayments.length > 0 ? 1 : 0 }} to {{ filteredPayments.length }} of
          {{ filteredPayments.length }} entries
        </span>
        <!-- Screenshot shows page 2/3 controls despite a single-record dataset
             — the same Figma/mockup inconsistency already reproduced on
             Booking Management and Customer Management. All non-"1" controls
             are inert. -->
        <div class="pagination">
          <button type="button" class="page-btn" disabled aria-label="Previous page">‹</button>
          <button type="button" class="page-btn page-btn--active">1</button>
          <button type="button" class="page-btn" disabled>2</button>
          <button type="button" class="page-btn" disabled>3</button>
          <button type="button" class="page-btn" disabled aria-label="Next page">›</button>
        </div>
      </footer>
    </section>
  </AdminLayout>
</template>

<style scoped>
/* Header ----------------------------------------------------------- */
.payments-header {
  margin-bottom: 24px;
}

.payments-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
  margin-bottom: 6px;
}

.payments-header__subtitle {
  font-size: 0.9375rem;
  color: var(--cc-text);
}

/* Summary cards --------------------------------------------------------- */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.summary-card {
  padding: 20px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
}

.summary-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.summary-card__label {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--cc-text);
}

.summary-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 999px;
}

.summary-card__icon--paid {
  background-color: #157347;
  color: var(--cc-text-on-dark);
}

.summary-card__icon--pending {
  background-color: #fbeecb;
  color: #92700c;
}

.summary-card__value {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 10px;
}

.summary-card__peso {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.summary-card__amount {
  font-size: 2rem;
  font-weight: 700;
  color: var(--cc-heading);
  line-height: 1.1;
}

.summary-card__support {
  font-size: 0.8125rem;
  color: var(--cc-text);
}

.summary-card__support--positive {
  color: #157347;
  font-weight: 600;
}

/* Send Reminders card ----------------------------------------------- */
.reminder-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 20px;
  background-color: var(--cc-primary);
  border-radius: var(--cc-radius-lg);
  color: var(--cc-text-on-dark);
}

.reminder-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  border-radius: var(--cc-radius-sm);
  background-color: rgba(255, 255, 255, 0.15);
}

.reminder-card__title {
  font-size: 1.0625rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.reminder-card__text {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 16px;
}

.reminder-card__btn {
  padding: 10px 20px;
  border: none;
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-primary);
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
}

.reminder-card__btn:hover {
  background-color: #eef2f7;
}

/* Controls card ------------------------------------------------------- */
.controls-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 18px 20px;
  margin-bottom: 24px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  width: 280px;
  max-width: 100%;
  padding: 9px 14px;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
  color: var(--cc-text);
}

.search-box input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  font: inherit;
  font-size: 0.75rem;
  color: var(--cc-heading);
  background: none;
}

.search-box input::placeholder {
  color: #8b8f9a;
}

.controls-card__right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.status-select {
  padding: 9px 14px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-heading);
  background-color: var(--cc-surface);
  cursor: pointer;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-heading);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
}

.filter-btn:hover {
  background-color: var(--cc-bg);
}

/* Payment table -------------------------------------------------------- */
.table-card {
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  overflow: hidden;
}

.table-card__scroll {
  overflow-x: auto;
  min-height: 300px;
}

.payments-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.payments-table th {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--cc-text);
  text-align: left;
  background-color: var(--cc-bg);
  padding: 14px 24px;
  border-bottom: 1px solid var(--cc-border);
}

.table-th--wrap {
  white-space: normal;
  max-width: 90px;
}

.payments-table td {
  font-size: 0.875rem;
  color: var(--cc-text);
  padding: 16px 24px;
  border-bottom: 1px solid var(--cc-border);
}

.payment-id {
  color: var(--cc-heading);
  font-weight: 700;
}

.payment-amount {
  color: var(--cc-heading);
  font-weight: 600;
}

.payment-date {
  white-space: normal;
  max-width: 90px;
}

.status-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: #fbeecb;
  color: #92700c;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pill--paid {
  background-color: #e0f4ef;
  color: #157347;
}

.mark-paid-btn {
  padding: 6px 14px;
  border: 1px solid var(--cc-primary);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-primary);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}

.mark-paid-btn:hover {
  background-color: #e7f0fa;
}

/* Footer / pagination ---------------------------------------------- */
.table-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 24px;
}

.table-card__count {
  font-size: 0.8125rem;
  color: var(--cc-text);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-text);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: not-allowed;
}

.page-btn:disabled {
  opacity: 0.6;
}

.page-btn--active {
  border-color: var(--cc-primary);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  cursor: default;
  opacity: 1;
}

/* Responsive --------------------------------------------------------- */
@media (max-width: 1024px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .reminder-card {
    grid-column: span 2;
  }
}

@media (max-width: 560px) {
  .summary-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .reminder-card {
    grid-column: span 1;
  }

  .payments-header__title {
    font-size: 1.4rem;
  }

  .controls-card {
    padding: 16px;
  }

  .search-box {
    width: 100%;
  }

  .controls-card__right {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
