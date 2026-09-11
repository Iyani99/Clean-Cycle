<script setup>
import { computed, ref } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Customer Management - Admin.
 *
 * Frontend-only prototype. The customer list is a local static array — there
 * is no backend, no real persistence, no search/sort API, and no export.
 * "Total: N" always reflects the full customer list (a small dashboard-style
 * count), while the table footer's "Showing X to Y of Z entries" reflects the
 * currently filtered result — chosen because they read as two different
 * things in the screenshot (an overall count vs. a result count), not because
 * one is "more correct".
 *
 * Note: this screen's screenshot uses booking ID "#CC-001" for the customer,
 * matching Booking Management's mock row rather than the Admin Dashboard's
 * "#BK-0921" — a pre-existing Figma/mock-data inconsistency across the three
 * Admin screens, reproduced as-is rather than silently normalized.
 */
const customers = [
  {
    id: '#CC-001',
    name: 'Jerson Tomas',
    initials: 'JT',
    contact: '09123456789',
    address: '123 Kanya kanya na St, Sta Barbara, Baliwag',
    bookings: 1,
    status: 'Active',
  },
]

const searchQuery = ref('')
const statusFilter = ref('All Statuses')
const sortBy = ref('Customer ID')

const filteredCustomers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  const filtered = customers.filter((customer) => {
    const matchesStatus = statusFilter.value === 'All Statuses' || customer.status === statusFilter.value
    const matchesSearch =
      query === '' ||
      customer.id.toLowerCase().includes(query) ||
      customer.name.toLowerCase().includes(query) ||
      customer.contact.toLowerCase().includes(query) ||
      customer.address.toLowerCase().includes(query)
    return matchesStatus && matchesSearch
  })

  return [...filtered].sort((a, b) => {
    if (sortBy.value === 'Customer Name') return a.name.localeCompare(b.name)
    if (sortBy.value === 'Bookings') return b.bookings - a.bookings
    return a.id.localeCompare(b.id)
  })
})
</script>

<template>
  <AdminLayout>
    <header class="customers-header">
      <div>
        <h1 class="customers-header__title">Customer Management</h1>
        <p class="customers-header__subtitle">
          Manage customer accounts, contact details, and booking history.
        </p>
      </div>
      <button type="button" class="new-customer-btn">
        <AppIcon name="plus" :size="16" />
        New Customer
      </button>
    </header>

    <section class="controls-card" aria-label="Search and filter customers">
      <label class="search-box">
        <AppIcon name="search" :size="16" />
        <input v-model="searchQuery" type="text" placeholder="Search customers..." />
      </label>

      <label class="select-box">
        <span class="select-box__prefix">Status:</span>
        <select v-model="statusFilter" class="select-box__control">
          <option>All Statuses</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </label>

      <label class="select-box">
        <span class="select-box__prefix">Sort By:</span>
        <select v-model="sortBy" class="select-box__control">
          <option>Customer ID</option>
          <option>Customer Name</option>
          <option>Bookings</option>
        </select>
      </label>

      <div class="controls-card__total">
        <span>Total: {{ customers.length }}</span>
        <button type="button" class="icon-btn" aria-label="Export customer list">
          <AppIcon name="download" :size="18" />
        </button>
      </div>
    </section>

    <section class="table-card" aria-label="Customers table">
      <div class="table-card__scroll">
        <table class="customers-table">
          <thead>
            <tr>
              <th>CUSTOMER ID</th>
              <th>CUSTOMER NAME</th>
              <th>CONTACT NUMBER</th>
              <th>ADDRESS</th>
              <th>BOOKINGS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in filteredCustomers" :key="customer.id">
              <td><span class="customer-id">{{ customer.id }}</span></td>
              <td>
                <span class="customer-name">
                  <span class="customer-avatar">{{ customer.initials }}</span>
                  {{ customer.name }}
                </span>
              </td>
              <td>{{ customer.contact }}</td>
              <td class="customer-address">{{ customer.address }}</td>
              <td class="customer-bookings">{{ customer.bookings }}</td>
              <td>
                <span
                  class="status-pill"
                  :class="{ 'status-pill--inactive': customer.status === 'Inactive' }"
                >
                  {{ customer.status.toUpperCase() }}
                </span>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="table-card__footer">
        <span class="table-card__count">
          Showing {{ filteredCustomers.length > 0 ? 1 : 0 }} to {{ filteredCustomers.length }} of
          {{ filteredCustomers.length }} entries
        </span>
        <!-- Screenshot shows page 2/3 controls despite a single-record dataset
             — a Figma/mockup inconsistency, reproduced as-is rather than
             manufacturing extra customers to justify it. All non-"1" controls
             are inert. -->
        <div class="pagination">
          <button type="button" class="page-btn page-btn--text" disabled>Previous</button>
          <button type="button" class="page-btn page-btn--active">1</button>
          <button type="button" class="page-btn" disabled>2</button>
          <button type="button" class="page-btn" disabled>3</button>
          <span class="page-ellipsis">...</span>
          <button type="button" class="page-btn page-btn--text" disabled>Next</button>
        </div>
      </footer>
    </section>
  </AdminLayout>
</template>

<style scoped>
/* Header ----------------------------------------------------------- */
.customers-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.customers-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
  margin-bottom: 6px;
}

.customers-header__subtitle {
  font-size: 0.9375rem;
  color: var(--cc-text);
}

.new-customer-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 12px 20px;
  border: none;
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
}

.new-customer-btn:hover {
  background-color: #002d6d;
}

/* Controls card ------------------------------------------------------- */
.controls-card {
  display: flex;
  align-items: center;
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
  width: 260px;
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

.select-box {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  width: 176px;
  padding: 9px 14px;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
}

.select-box__prefix {
  flex-shrink: 0;
  font-size: 0.8125rem;
  color: var(--cc-text);
}

.select-box__control {
  border: none;
  outline: none;
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-heading);
  background: none;
  cursor: pointer;
}

.controls-card__total {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
  flex-shrink: 0;
  font-size: 0.875rem;
  color: var(--cc-text);
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: var(--cc-radius-sm);
  background: none;
  color: var(--cc-text);
  cursor: pointer;
}

.icon-btn:hover {
  background-color: var(--cc-bg);
}

/* Customer table -------------------------------------------------------- */
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

.customers-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.customers-table th {
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

.customers-table td {
  font-size: 0.875rem;
  color: var(--cc-text);
  padding: 16px 24px;
  border-bottom: 1px solid var(--cc-border);
}

.customer-address {
  white-space: normal;
  min-width: 200px;
}

.customer-id {
  color: var(--cc-heading);
  font-weight: 700;
}

.customer-name {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--cc-heading);
  font-weight: 600;
}

.customer-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background-color: #e7f0fa;
  color: var(--cc-secondary);
  font-size: 0.75rem;
  font-weight: 700;
}

.customer-bookings {
  text-align: center;
}

.status-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: #e0f4ef;
  color: #157347;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.status-pill--inactive {
  background-color: #eef0f2;
  color: var(--cc-text);
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
  gap: 6px;
}

.page-ellipsis {
  padding: 0 4px;
  color: var(--cc-text);
  font-size: 0.8125rem;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-text);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: not-allowed;
}

.page-btn:disabled {
  opacity: 0.6;
}

.page-btn--text {
  padding: 0 14px;
}

.page-btn--active {
  border-color: var(--cc-primary);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  cursor: default;
}

/* Responsive --------------------------------------------------------- */
@media (max-width: 560px) {
  .customers-header__title {
    font-size: 1.4rem;
  }

  .new-customer-btn {
    width: 100%;
    justify-content: center;
  }

  .controls-card {
    padding: 16px;
  }

  .search-box {
    width: 100%;
  }

  .select-box {
    width: 100%;
  }

  .controls-card__total {
    margin-left: 0;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
