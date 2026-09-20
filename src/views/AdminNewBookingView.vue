<script setup>
import { computed, nextTick, onBeforeUnmount, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AdminLayout from '../components/AdminLayout.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Add New Booking - Admin (Figma frame "Add New Record", reached from
 * "+ New Booking").
 *
 * Frontend-only prototype. Every field is local Vue state — no customer lookup,
 * no booking is saved, and the Estimated Cost card is static because the frame
 * defines no pricing rules. "Create Booking" only validates the fields marked *
 * in the frame and shows a short local confirmation.
 *
 * Reproduced as drawn: the weight label says "(lbs)" while the control shows
 * "Kg", and the cost card's Total reads "₱0" (no decimals) — a Figma
 * inconsistency, not normalized. The Time Slot select has no options because
 * the frame shows none; the approved slots are unknown.
 */
const serviceTypes = ['Wash and Dry', 'Dry Cleaning']

const transportOptions = [
  {
    key: 'dropoff',
    label: 'Customer Drop-off / Pick-up',
    note: 'In-store service. No logistics fee.',
    icon: 'store',
  },
  {
    key: 'delivery',
    label: 'Delivery Only',
    note: 'Customer drops off, we deliver back.',
    icon: 'truck',
  },
  {
    key: 'full',
    label: 'Full Service (Pickup & Delivery)',
    note: 'We collect and return the items.',
    icon: 'spin',
  },
]

const form = reactive({
  search: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  service: '',
  weight: '',
  transport: 'dropoff', // the frame shows the first option selected
  date: '',
  slot: '',
})

// Required per the frame (marked *): First Name, Last Name, Phone Number and
// Transport Option (always set, it has a default). Service Type is not marked.
// Email is optional, but if something is typed the browser's own email rule
// must accept it.
const emailInput = ref(null)
const emailInvalid = computed(() => {
  const value = form.email.trim()
  return value !== '' && emailInput.value?.validity.valid === false
})

const errors = computed(() => ({
  firstName: form.firstName.trim() ? '' : 'Enter the first name.',
  lastName: form.lastName.trim() ? '' : 'Enter the last name.',
  phone: form.phone.trim() ? '' : 'Enter the phone number.',
  email: emailInvalid.value ? 'Enter a valid email address.' : '',
}))

// Messages only appear after a failed "Create Booking" and clear live as the
// form is corrected.
const attempted = ref(false)
const showError = (key) => attempted.value && errors.value[key]
const invalid = (key) => (showError(key) ? 'true' : null)

const created = ref(false)
let createdTimer

function createBooking() {
  attempted.value = true
  if (Object.values(errors.value).some(Boolean)) {
    created.value = false
    nextTick(() => document.querySelector('.new-booking [aria-invalid="true"]')?.focus())
    return
  }
  // Frontend prototype: nothing is sent or stored. The note shows briefly.
  created.value = true
  clearTimeout(createdTimer)
  createdTimer = setTimeout(() => {
    created.value = false
  }, 3000)
}
onBeforeUnmount(() => clearTimeout(createdTimer))
</script>

<template>
  <AdminLayout :show-new-booking="false">
    <header class="page-header">
      <div>
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <RouterLink to="/admin/bookings" class="breadcrumb__link">Bookings</RouterLink>
          <span aria-hidden="true">&gt;</span>
          <span class="breadcrumb__current" aria-current="page">New Record</span>
        </nav>
        <h1 class="page-header__title">Add New Booking</h1>
      </div>
      <button type="button" class="help-btn" aria-label="Help">
        <AppIcon name="help-circle" :size="20" />
      </button>
    </header>

    <form class="new-booking" novalidate @submit.prevent="createBooking">
      <section class="card" aria-labelledby="customer-title">
        <h2 id="customer-title" class="card__title">
          <span class="card__icon"><AppIcon name="user" :size="16" /></span>
          Customer Information
        </h2>

        <label class="field">
          <span class="field__label">Search Existing Customer</span>
          <span class="search-control">
            <AppIcon name="search" :size="18" />
            <input
              v-model="form.search"
              type="text"
              placeholder="Search by name, phone, or email..."
              @keydown.enter.prevent
            />
          </span>
        </label>

        <div class="divider"><span>OR ENTER NEW</span></div>

        <div class="field-grid">
          <label class="field">
            <span class="field__label">First Name *</span>
            <input
              v-model="form.firstName"
              type="text"
              class="control"
              autocomplete="given-name"
              :aria-invalid="invalid('firstName')"
              :aria-describedby="showError('firstName') ? 'first-name-error' : null"
            />
            <span v-if="showError('firstName')" id="first-name-error" class="field__error" role="alert">
              {{ errors.firstName }}
            </span>
          </label>
          <label class="field">
            <span class="field__label">Last Name *</span>
            <input
              v-model="form.lastName"
              type="text"
              class="control"
              autocomplete="family-name"
              :aria-invalid="invalid('lastName')"
              :aria-describedby="showError('lastName') ? 'last-name-error' : null"
            />
            <span v-if="showError('lastName')" id="last-name-error" class="field__error" role="alert">
              {{ errors.lastName }}
            </span>
          </label>
          <label class="field">
            <span class="field__label">Phone Number *</span>
            <input
              v-model="form.phone"
              type="tel"
              class="control"
              autocomplete="tel"
              :aria-invalid="invalid('phone')"
              :aria-describedby="showError('phone') ? 'phone-error' : null"
            />
            <span v-if="showError('phone')" id="phone-error" class="field__error" role="alert">
              {{ errors.phone }}
            </span>
          </label>
          <label class="field">
            <span class="field__label">Email Address</span>
            <input
              ref="emailInput"
              v-model="form.email"
              type="email"
              class="control"
              autocomplete="email"
              :aria-invalid="invalid('email')"
              :aria-describedby="showError('email') ? 'email-error' : null"
            />
            <span v-if="showError('email')" id="email-error" class="field__error" role="alert">
              {{ errors.email }}
            </span>
          </label>
          <label class="field field--wide">
            <span class="field__label">Street Address</span>
            <textarea
              v-model="form.address"
              class="control control--area"
              rows="2"
              autocomplete="street-address"
            ></textarea>
          </label>
        </div>
      </section>

      <section class="card" aria-labelledby="service-title">
        <h2 id="service-title" class="card__title">
          <span class="card__icon"><AppIcon name="basket" :size="16" /></span>
          Service Details
        </h2>

        <div class="service-layout">
          <div class="service-main">
            <fieldset class="field">
              <legend class="field__label field__label--strong">Service Type</legend>
              <div class="service-options">
                <label
                  v-for="service in serviceTypes"
                  :key="service"
                  class="service-opt"
                  :class="{ 'service-opt--on': form.service === service }"
                >
                  <input
                    v-model="form.service"
                    type="radio"
                    name="service-type"
                    class="visually-hidden"
                    :value="service"
                  />
                  {{ service }}
                </label>
              </div>
            </fieldset>

            <label class="field weight-field">
              <span class="field__label">Estimated Weight (lbs)</span>
              <span class="weight-control">
                <input v-model="form.weight" type="number" min="0" step="0.1" placeholder="0.0" />
                <span class="weight-control__unit">Kg</span>
              </span>
            </label>
          </div>

          <aside class="cost" aria-label="Estimated cost">
            <h3 class="cost__title">ESTIMATED COST</h3>
            <dl class="cost__rows">
              <div class="cost__row"><dt>Subtotal</dt><dd>₱0.00</dd></div>
              <div class="cost__row"><dt>Logistics Fee</dt><dd>₱0.00</dd></div>
              <div class="cost__row"><dt>Tax (8%)</dt><dd>₱0.00</dd></div>
            </dl>
            <div class="cost__total">
              <span>Total</span>
              <span class="cost__total-amount">₱0</span>
            </div>
          </aside>
        </div>
      </section>

      <section class="card" aria-labelledby="logistics-title">
        <h2 id="logistics-title" class="card__title">
          <span class="card__icon"><AppIcon name="truck" :size="16" /></span>
          Logistics &amp; Scheduling
        </h2>

        <div class="logistics-layout">
          <fieldset class="field logistics-transport">
            <legend class="field__label">Transport Option *</legend>
            <div class="transport-list">
              <label
                v-for="option in transportOptions"
                :key="option.key"
                class="transport-opt"
                :class="{ 'transport-opt--on': form.transport === option.key }"
              >
                <input v-model="form.transport" type="radio" name="transport" :value="option.key" />
                <span class="transport-opt__text">
                  <span class="transport-opt__label">{{ option.label }}</span>
                  <span class="transport-opt__note">{{ option.note }}</span>
                </span>
                <AppIcon :name="option.icon" :size="18" />
              </label>
            </div>
          </fieldset>

          <div class="logistics-schedule">
            <fieldset class="field">
              <legend class="field__label">Schedule Details</legend>
              <div class="schedule-grid">
                <label class="field">
                  <span class="field__label field__label--small">Date</span>
                  <input v-model="form.date" type="date" class="control" />
                </label>
                <label class="field">
                  <span class="field__label field__label--small">Time Slot</span>
                  <select v-model="form.slot" class="control">
                    <option value="" disabled>Select slot...</option>
                  </select>
                </label>
              </div>
            </fieldset>

            <div class="actions">
              <p v-if="created" class="actions__note" role="status">Booking created.</p>
              <div class="actions__buttons">
                <RouterLink to="/admin/bookings" class="btn btn--outline">Cancel</RouterLink>
                <button type="submit" class="btn btn--primary">
                  <AppIcon name="check-circle" :size="14" />
                  Create Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  </AdminLayout>
</template>

<style scoped>
/* Header ----------------------------------------------------------------- */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  font-size: 0.75rem;
  color: var(--cc-text);
}

.breadcrumb__link:hover {
  text-decoration: underline;
}

.breadcrumb__current {
  color: var(--cc-primary);
}

.page-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.help-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 999px;
  background: none;
  color: var(--cc-heading);
  cursor: pointer;
}

.help-btn:hover {
  background-color: var(--cc-border);
}

/* Cards ------------------------------------------------------------------ */
.new-booking {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  padding: 24px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
}

.card__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background-color: #e7f0fa;
  color: var(--cc-primary);
}

/* Fields ----------------------------------------------------------------- */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  border: none;
}

.field__label {
  padding: 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--cc-text);
}

.field__label--strong {
  margin-bottom: 2px;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.field__label--small {
  font-size: 0.6875rem;
}

.field__error {
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--cc-error);
}

.control,
.search-control,
.weight-control {
  width: 100%;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  font: inherit;
  font-size: 0.8125rem;
  color: var(--cc-heading);
}

.control {
  height: 40px;
  padding: 0 12px;
}

.control--area {
  height: auto;
  min-height: 64px;
  padding: 10px 12px;
  resize: vertical;
}

.control[aria-invalid='true'] {
  border-color: var(--cc-error);
}

.control:focus,
.search-control:focus-within,
.weight-control:focus-within {
  outline: 2px solid var(--cc-secondary);
  outline-offset: 1px;
}

.search-control {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  color: var(--cc-text);
}

.search-control input,
.weight-control input {
  border: none;
  outline: none;
  background: none;
  font: inherit;
  color: var(--cc-heading);
}

.search-control input {
  flex: 1;
  min-width: 0;
}

::placeholder {
  color: #8b8f9a;
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  color: var(--cc-text);
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--cc-border);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 20px;
}

.field--wide {
  grid-column: 1 / -1;
}

/* Service Details ---------------------------------------------------------- */
.service-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 24px;
}

.service-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 2 1 320px;
  min-width: 0;
}

.service-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.service-opt {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--cc-heading);
  text-align: center;
  cursor: pointer;
}

.service-opt:hover {
  background-color: var(--cc-bg);
}

.service-opt:focus-within {
  outline: 2px solid var(--cc-secondary);
  outline-offset: 1px;
}

.service-opt--on,
.service-opt--on:hover {
  border-color: var(--cc-primary);
  background-color: #e7f0fa;
  color: var(--cc-primary);
  font-weight: 700;
}

.weight-field {
  width: calc(50% - 6px);
  min-width: 160px;
}

.weight-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 40px;
  padding: 0 12px;
  background-color: var(--cc-bg);
}

.weight-control input {
  width: 4ch;
  text-align: right;
  appearance: textfield;
  -moz-appearance: textfield;
}

.weight-control input::-webkit-outer-spin-button,
.weight-control input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}

.weight-control__unit {
  color: #8b8f9a;
}

.cost {
  flex: 1 1 200px;
  min-width: 0;
  padding: 16px;
  background-color: #eff1f3;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
}

.cost__title {
  margin-bottom: 14px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.6px;
  color: var(--cc-text);
}

.cost__rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--cc-border-strong);
}

.cost__row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 0.8125rem;
  color: var(--cc-heading);
}

.cost__total {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  padding-top: 14px;
  font-size: 0.9375rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.cost__total-amount {
  font-size: 1.25rem;
}

/* Logistics & Scheduling --------------------------------------------------- */
.logistics-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 26px;
}

.logistics-transport,
.logistics-schedule {
  flex: 1 1 280px;
  min-width: 0;
}

.transport-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.transport-opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-text);
  cursor: pointer;
}

.transport-opt input {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--cc-primary);
}

.transport-opt--on {
  border-color: var(--cc-primary);
  background-color: #eef4fb;
}

.transport-opt__text {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.transport-opt__label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--cc-heading);
}

.transport-opt__note {
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--cc-text);
}

.logistics-schedule {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 6px;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  margin-top: auto;
}

.actions__note {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-primary);
}

.actions__buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 24px;
  border-radius: var(--cc-radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.btn--outline {
  border: 1px solid var(--cc-border-strong);
  background-color: var(--cc-surface);
  color: var(--cc-primary);
}

.btn--outline:hover {
  background-color: var(--cc-bg);
}

.btn--primary {
  border: none;
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
}

.btn--primary:hover {
  background-color: #002d6d;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Responsive --------------------------------------------------------------- */
@media (max-width: 640px) {
  .page-header__title {
    font-size: 1.4rem;
  }

  .card {
    padding: 18px 16px;
  }

  .field-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .service-options {
    grid-template-columns: minmax(0, 1fr);
  }

  .weight-field {
    width: 100%;
  }

  .actions,
  .actions__buttons {
    align-items: stretch;
    width: 100%;
  }

  .btn {
    flex: 1;
  }
}
</style>
