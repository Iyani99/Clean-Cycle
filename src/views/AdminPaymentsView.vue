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
 * Summary cards reflect this local sample so they stay consistent when a row
 * is marked Paid. This is display-only prototype state, not a real payment.
 */
const searchQuery = ref('')
const statusFilter = ref('All Statuses')
const hasSwitchedStatus = ref(false)

const payments = reactive([
  {
    id: '#CC-001',
    name: 'Jerson Tomas',
    amount: 85.0,
    method: 'COD',
    status: 'Pending',
    date: 'Aug 21, 2026',
  },
  {
    id: '#CC-002',
    name: 'Maria Santos',
    amount: 335.0,
    method: 'Online Payment',
    status: 'Paid',
    date: 'Aug 20, 2026',
  },
  {
    id: '#CC-003',
    name: 'Ana Dela Cruz',
    amount: 220.0,
    method: 'Online Payment',
    status: 'Paid',
    date: 'Aug 19, 2026',
  },
  {
    id: '#CC-004',
    name: 'Paolo Reyes',
    amount: 250.0,
    method: 'COD',
    status: 'Pending',
    date: 'Aug 18, 2026',
  },
  {
    id: '#CC-005',
    name: 'Liza Garcia',
    amount: 360.0,
    method: 'COD',
    status: 'Pending',
    date: 'Aug 17, 2026',
  },
  {
    id: '#CC-006',
    name: 'Carlo Mendoza',
    amount: 420.0,
    method: 'COD',
    status: 'Paid',
    date: 'Aug 16, 2026',
  },
])

const summary = computed(() => {
  const paid = payments.filter((payment) => payment.status === 'Paid')
  const pending = payments.filter((payment) => payment.status === 'Pending')
  return {
    totalPaid: paid.reduce((total, payment) => total + payment.amount, 0),
    totalPending: pending.reduce((total, payment) => total + payment.amount, 0),
    paidCount: paid.length,
    pendingCount: pending.length,
  }
})

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
          Overview of sample transactions and outstanding balances.
        </p>
      </div>
    </header>

    <div class="summary-grid">
      <article class="summary-card">
        <div class="summary-card__head">
          <span class="summary-card__label">TOTAL PAID (SAMPLE)</span>
          <span class="summary-card__icon summary-card__icon--paid">
            <AppIcon name="check-circle" :size="16" />
          </span>
        </div>
        <div class="summary-card__value">
          <span class="summary-card__peso">₱</span>
          <span class="summary-card__amount">{{ summary.totalPaid.toFixed(2) }}</span>
        </div>
        <p class="summary-card__support">
          {{ summary.paidCount }} paid {{ summary.paidCount === 1 ? 'booking' : 'bookings' }} in sample
        </p>
      </article>

      <article class="summary-card">
        <div class="summary-card__head">
          <span class="summary-card__label">TOTAL PENDING (SAMPLE)</span>
          <span class="summary-card__icon summary-card__icon--pending">
            <AppIcon name="history" :size="16" />
          </span>
        </div>
        <div class="summary-card__value">
          <span class="summary-card__peso">₱</span>
          <span class="summary-card__amount">{{ summary.totalPending.toFixed(2) }}</span>
        </div>
        <p class="summary-card__support">
          {{ summary.pendingCount }} pending {{ summary.pendingCount === 1 ? 'booking' : 'bookings' }} in sample
        </p>
      </article>

      <article class="reminder-card">
        <span class="reminder-card__icon">
          <AppIcon name="card" :size="26" />
        </span>
        <h2 class="reminder-card__title">Send Reminders</h2>
        <p class="reminder-card__text">Notify customers with pending payments.</p>
        <button type="button" class="reminder-card__btn" :disabled="summary.pendingCount === 0">
          Notify All ({{ summary.pendingCount }})
        </button>
      </article>
    </div>

    <section class="controls-card" aria-label="Search and filter payments">
      <label class="search-box">
        <AppIcon name="search" :size="16" />
        <input v-model="searchQuery" type="text" aria-label="Search payments" placeholder="Search ID or Customer..." />
      </label>

      <div class="controls-card__right">
        <select v-model="statusFilter" class="status-select" @change="hasSwitchedStatus = true">
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
          <tbody :key="statusFilter" :class="{ 'cc-filter-results-enter': hasSwitchedStatus }">
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
                  type="button"
                  class="mark-paid-btn"
                  :class="{ 'mark-paid-btn--done': payment.status === 'Paid' }"
                  :disabled="payment.status === 'Paid'"
                  @click="markAsPaid(payment)"
                >
                  <AppIcon v-if="payment.status === 'Paid'" name="check" :size="14" />
                  {{ payment.status === 'Paid' ? 'Paid' : 'Mark as Paid' }}
                </button>
              </td>
            </tr>
            <tr v-if="filteredPayments.length === 0">
              <td colspan="7" class="payments-table__empty">
                <div class="payments-table__empty-content">
                  <span class="payments-table__empty-icon" aria-hidden="true">
                    <AppIcon name="card" :size="20" />
                  </span>
                  <span class="payments-table__empty-title">No payments found.</span>
                  <span class="payments-table__empty-helper">
                    {{ searchQuery.trim() ? 'Try a different search or status filter.' : statusFilter === 'All Statuses' ? 'There are currently no payments.' : `There are currently no payments marked ${statusFilter.toLowerCase()}.` }}
                  </span>
                </div>
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
        <div class="pagination">
          <button type="button" class="page-btn" disabled aria-label="Previous page">‹</button>
          <button type="button" class="page-btn page-btn--active">1</button>
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
  color: var(--cc-text-on-dark);
}

.reminder-card__title {
  font-size: 1.0625rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--cc-text-on-dark);
}

.reminder-card__text {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.9);
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

.reminder-card__btn:enabled:hover {
  background-color: #eef2f7;
}

.reminder-card__btn:disabled {
  opacity: 0.6;
  cursor: default;
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

.search-box:focus-within {
  border-color: var(--cc-primary);
  box-shadow: 0 0 0 3px rgba(0, 60, 144, 0.12);
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
  min-height: 460px;
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

.payments-table__empty {
  height: 240px;
  text-align: center;
  vertical-align: middle;
}

.payments-table__empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  white-space: normal;
}

.payments-table__empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 8px;
  border-radius: 999px;
  background-color: #e7f0fa;
  color: var(--cc-secondary);
}

.payments-table__empty-title {
  color: var(--cc-heading);
  font-weight: 600;
}

.payments-table__empty-helper {
  color: var(--cc-text);
  font-size: 0.8125rem;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 110px;
  padding: 6px 14px;
  border: 1px solid var(--cc-primary);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-primary);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 160ms ease;
}

.mark-paid-btn:enabled:hover {
  background-color: #e7f0fa;
}

.mark-paid-btn:focus-visible {
  outline: 2px solid var(--cc-tertiary);
  outline-offset: 2px;
}

.mark-paid-btn--done {
  border-color: #b7d9c8;
  background-color: #e0f4ef;
  color: #157347;
  cursor: default;
}

@media (prefers-reduced-motion: reduce) {
  .mark-paid-btn {
    transition: none;
  }
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
