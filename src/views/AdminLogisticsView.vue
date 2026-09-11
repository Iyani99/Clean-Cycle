<script setup>
import AdminLayout from '../components/AdminLayout.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Logistics Management - Admin.
 *
 * Frontend-only prototype. Riders/routes are a local static array — there is
 * no backend, no real rider tracking, no route calculation, no maps/GPS, and
 * no live updates despite the "Live Routing Operations" heading (the
 * screenshot itself only shows a static table). "Auto-Assign Routes" and
 * "Update" are intentionally inert — no approved Figma frame exists showing
 * what either should do.
 *
 * Note: the screenshot's three summary cards read Active Riders 1 / On Route
 * 1 / Available 1, while the one visible rider row is "IN TRANSIT" — a
 * pre-existing Figma/mock-data inconsistency (the same pattern already seen
 * on Payment Management's ₱0.00 vs ₱80.00 pending mismatch), reproduced as-is
 * rather than reconciled.
 */
const riders = [
  {
    initials: 'JS',
    name: 'Jayrence Salado',
    contact: '09121212131',
    bookingId: '#CC-001',
    address: '123 Kanya kanya na St, Sta Barbara, Baliwag',
    status: 'In Transit',
  },
]
</script>

<template>
  <AdminLayout>
    <header class="logistics-header">
      <div>
        <h1 class="logistics-header__title">Logistics Management</h1>
        <p class="logistics-header__subtitle">Manage active riders and delivery routes.</p>
      </div>
      <button type="button" class="auto-assign-btn">
        <AppIcon name="route" :size="16" />
        Auto-Assign Routes
      </button>
    </header>

    <div class="summary-grid">
      <article class="summary-card summary-card--decorated">
        <div class="summary-card__head">
          <span class="summary-card__label">Active Riders</span>
          <span class="summary-card__icon summary-card__icon--riders">
            <AppIcon name="motorcycle" :size="16" />
          </span>
        </div>
        <div class="summary-card__value">1</div>
      </article>

      <article class="summary-card">
        <div class="summary-card__head">
          <span class="summary-card__label">On Route</span>
          <span class="summary-card__icon summary-card__icon--route">
            <AppIcon name="map" :size="16" />
          </span>
        </div>
        <div class="summary-card__value">1</div>
      </article>

      <article class="summary-card">
        <div class="summary-card__head">
          <span class="summary-card__label">Available</span>
          <span class="summary-card__icon summary-card__icon--available">
            <AppIcon name="check-circle" :size="16" />
          </span>
        </div>
        <div class="summary-card__value">1</div>
      </article>
    </div>

    <section class="table-card" aria-label="Live routing operations">
      <div class="table-card__head">
        <h2 class="table-card__title">Live Routing Operations</h2>
        <label class="area-select">
          <select>
            <option>Select Area</option>
          </select>
          <AppIcon name="arrow-right" :size="14" class="area-select__chevron" />
        </label>
      </div>

      <div class="table-card__scroll">
        <table class="logistics-table">
          <thead>
            <tr>
              <th>RIDER DETAILS</th>
              <th>CONTACT #</th>
              <th>BOOKING ID</th>
              <th>PICKUP ADDRESS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rider in riders" :key="rider.bookingId">
              <td>
                <span class="rider-name">
                  <span class="rider-avatar">{{ rider.initials }}</span>
                  {{ rider.name }}
                </span>
              </td>
              <td>{{ rider.contact }}</td>
              <td><span class="booking-id">{{ rider.bookingId }}</span></td>
              <td class="rider-address">{{ rider.address }}</td>
              <td>
                <span class="status-pill">{{ rider.status.toUpperCase() }}</span>
              </td>
              <td>
                <button type="button" class="update-btn">Update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="table-card__footer">
        <span class="table-card__count">
          Showing {{ riders.length > 0 ? 1 : 0 }} to {{ riders.length }} of {{ riders.length }}
          active riders
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
.logistics-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.logistics-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
  margin-bottom: 6px;
}

.logistics-header__subtitle {
  font-size: 0.9375rem;
  color: var(--cc-text);
}

.auto-assign-btn {
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

.auto-assign-btn:hover {
  background-color: #002d6d;
}

/* Summary cards --------------------------------------------------------- */
.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.summary-card {
  position: relative;
  padding: 20px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  overflow: hidden;
}

.summary-card--decorated::after {
  content: '';
  position: absolute;
  right: -30px;
  bottom: -40px;
  width: 110px;
  height: 110px;
  border-radius: 999px;
  background-color: #e7f0fa;
  z-index: 0;
}

.summary-card__head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.summary-card__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--cc-text);
}

.summary-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 999px;
}

.summary-card__icon--riders {
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
}

.summary-card__icon--route {
  background-color: #e7f0fa;
  color: var(--cc-secondary);
}

.summary-card__icon--available {
  background-color: #157347;
  color: var(--cc-text-on-dark);
}

.summary-card__value {
  position: relative;
  z-index: 1;
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--cc-heading);
  line-height: 1.1;
}

/* Live Routing Operations card ------------------------------------------ */
.table-card {
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  overflow: hidden;
}

.table-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 20px 24px;
  border-bottom: 1px solid var(--cc-border);
}

.table-card__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.area-select {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.area-select select {
  appearance: none;
  padding: 9px 34px 9px 14px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-heading);
  background-color: var(--cc-surface);
  cursor: pointer;
}

.area-select__chevron {
  position: absolute;
  right: 12px;
  transform: rotate(90deg);
  color: var(--cc-text);
  pointer-events: none;
}

.table-card__scroll {
  overflow-x: auto;
  min-height: 300px;
}

.logistics-table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
}

.logistics-table th {
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

.logistics-table td {
  font-size: 0.875rem;
  color: var(--cc-text);
  padding: 16px 24px;
  border-bottom: 1px solid var(--cc-border);
}

.rider-name {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--cc-heading);
  font-weight: 600;
}

.rider-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background-color: #eef0f2;
  color: var(--cc-heading);
  font-size: 0.75rem;
  font-weight: 700;
}

.booking-id {
  color: var(--cc-heading);
  font-weight: 700;
}

.rider-address {
  white-space: normal;
  min-width: 200px;
}

.status-pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background-color: #e7f0fa;
  color: var(--cc-secondary);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.update-btn {
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

.update-btn:hover {
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
@media (max-width: 1024px) {
  .summary-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .summary-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 560px) {
  .logistics-header__title {
    font-size: 1.4rem;
  }

  .auto-assign-btn {
    width: 100%;
    justify-content: center;
  }

  .table-card__head {
    padding: 16px;
  }

  .area-select select {
    width: 100%;
  }
}
</style>
