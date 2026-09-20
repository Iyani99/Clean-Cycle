<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Booking Management - Admin.
 *
 * Frontend-only prototype. The booking list is a local reactive array — there
 * is no backend, no real persistence, no search API, and no assignment logic.
 * "Confirm" only flips a local `status` field; nothing survives a refresh.
 *
 * Note: this screen's screenshot uses booking ID "#CC-001", while the Admin
 * Dashboard's Recent Bookings mock row uses "#BK-0921" — a pre-existing
 * Figma/mock-data inconsistency between the two approved frames, reproduced
 * as-is rather than silently normalized.
 */
const statusFilters = ['All', 'Pending', 'Confirmed', 'Picked Up', 'Washing', 'Out for Delivery', 'Completed']
const activeFilter = ref('All')
const searchQuery = ref('')

const bookings = reactive([
  {
    id: '#CC-001',
    name: 'Jerson Tomas',
    service: 'Wash & Fold (1 kg)',
    status: 'Pending',
    rider: 'Unassigned',
  },
])

const filteredBookings = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return bookings.filter((booking) => {
    const matchesFilter = activeFilter.value === 'All' || booking.status === activeFilter.value
    const matchesSearch =
      query === '' ||
      booking.id.toLowerCase().includes(query) ||
      booking.name.toLowerCase().includes(query)
    return matchesFilter && matchesSearch
  })
})

function confirmBooking(booking) {
  // Frontend prototype: local status flip only, nothing sent or stored.
  booking.status = 'Confirmed'
}
</script>

<template>
  <AdminLayout>
    <header class="bookings-header">
      <div>
        <h1 class="bookings-header__title">Booking Management</h1>
        <p class="bookings-header__subtitle">Manage and track all customer laundry orders.</p>
      </div>
      <RouterLink to="/admin/bookings/new" class="new-booking-btn">
        <AppIcon name="plus" :size="16" />
        New Booking
      </RouterLink>
    </header>

    <section class="filter-card" aria-label="Filter and search bookings">
      <div class="filter-pills">
        <button
          v-for="filter in statusFilters"
          :key="filter"
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill--active': activeFilter === filter }"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <label class="search-box">
        <AppIcon name="search" :size="16" />
        <input v-model="searchQuery" type="text" placeholder="Search Booking ID or Customer" />
      </label>
    </section>

    <section class="table-card" aria-label="Bookings table">
      <div class="table-card__scroll">
        <table class="bookings-table">
          <thead>
            <tr>
              <th>BOOKING ID</th>
              <th>CUSTOMER NAME</th>
              <th>SERVICE</th>
              <th>STATUS</th>
              <th>RIDER ASSIGNED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in filteredBookings" :key="booking.id">
              <td><span class="booking-id">{{ booking.id }}</span></td>
              <td>{{ booking.name }}</td>
              <td>{{ booking.service }}</td>
              <td>
                <span
                  class="status-pill"
                  :class="{ 'status-pill--confirmed': booking.status === 'Confirmed' }"
                >
                  {{ booking.status }}
                </span>
              </td>
              <td>{{ booking.rider }}</td>
              <td class="actions-cell">
                <button
                  v-if="booking.status === 'Pending'"
                  type="button"
                  class="action-link action-link--confirm"
                  @click="confirmBooking(booking)"
                >
                  Confirm
                </button>
                <button type="button" class="action-link action-link--view">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="table-card__footer">
        <span class="table-card__count">
          Showing {{ filteredBookings.length > 0 ? 1 : 0 }} to {{ filteredBookings.length }} of
          {{ filteredBookings.length }} entries
        </span>
        <div class="pagination">
          <button type="button" class="page-btn" disabled aria-label="Previous page">‹</button>
          <button type="button" class="page-btn" disabled aria-label="Next page">›</button>
        </div>
      </footer>
    </section>
  </AdminLayout>
</template>

<style scoped>
/* Header ----------------------------------------------------------- */
.bookings-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.bookings-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
  margin-bottom: 6px;
}

.bookings-header__subtitle {
  font-size: 0.9375rem;
  color: var(--cc-text);
}

.new-booking-btn {
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

.new-booking-btn:hover {
  background-color: #002d6d;
}

/* Filter + search card ---------------------------------------------- */
.filter-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 18px 20px;
  margin-bottom: 24px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
}

.filter-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-pill {
  padding: 7px 14px;
  border: 1px solid var(--cc-border-strong);
  border-radius: 999px;
  background-color: var(--cc-surface);
  color: var(--cc-heading);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.filter-pill:hover {
  background-color: var(--cc-bg);
}

.filter-pill--active {
  border-color: var(--cc-primary);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
}

.filter-pill--active:hover {
  background-color: var(--cc-primary);
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

/* Booking table -------------------------------------------------------- */
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

.bookings-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.bookings-table th {
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

.bookings-table td {
  font-size: 0.875rem;
  color: var(--cc-text);
  padding: 16px 24px;
  border-bottom: 1px solid var(--cc-border);
}

.booking-id {
  color: var(--cc-heading);
  font-weight: 700;
}

.status-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: #e7f0fa;
  color: var(--cc-secondary);
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pill--confirmed {
  background-color: #e0f4ef;
  color: #157347;
}

.actions-cell {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-link {
  padding: 0;
  border: none;
  background: none;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
}

.action-link--confirm {
  color: var(--cc-primary);
}

.action-link--confirm:hover {
  text-decoration: underline;
}

.action-link--view {
  color: var(--cc-text);
}

.action-link--view:hover {
  text-decoration: underline;
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
  width: 32px;
  height: 32px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-text);
  font-size: 1rem;
  line-height: 1;
  cursor: not-allowed;
}

.page-btn:disabled {
  opacity: 0.6;
}

/* Responsive --------------------------------------------------------- */
@media (max-width: 560px) {
  .bookings-header__title {
    font-size: 1.4rem;
  }

  .new-booking-btn {
    width: 100%;
    justify-content: center;
  }

  .filter-card {
    padding: 16px;
  }

  .search-box {
    width: 100%;
  }
}
</style>
