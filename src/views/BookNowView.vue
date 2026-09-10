<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CustomerNavbar from '../components/CustomerNavbar.vue'
import AppIcon from '../components/AppIcon.vue'
import BookingSection from '../components/BookingSection.vue'

/**
 * Book now - Customer (Figma frame "Book now - Customer").
 *
 * Frontend-only prototype. Every field below is plain Vue local state. There
 * is no backend, no booking persistence, no real payment. "Confirm Booking"
 * shows a local confirmation message and a link on to the Payment page; it does
 * not create or send anything.
 *
 * Service names / prices are shown exactly as the Book Now screenshot labels
 * them ("₱85.00 / Kg", "₱70.00 / Item"). The Services screen phrases the second
 * unit as "starting per item" — a minor copy difference, kept per screen.
 */
const services = [
  { key: 'wash-fold', name: 'Wash & Fold', price: '₱85.00 / Kg' },
  { key: 'dry-cleaning', name: 'Dry Cleaning', price: '₱70.00 / Item' },
]

const logisticsOptions = [
  { key: 'pickup-delivery', label: 'Pick-up & Delivery', icon: 'truck' },
  { key: 'dropoff', label: 'Drop-off Only', icon: 'store' },
  { key: 'pickup', label: 'Pick-up Only', icon: 'walk' },
]

const paymentOptions = [
  { key: 'cod', label: 'Cash on Delivery (COD)', icon: 'cash' },
  { key: 'online', label: 'Online Payment', icon: 'card' },
]

// Local-only selections / form state.
const selectedServices = reactive({ 'wash-fold': false, 'dry-cleaning': false })
const logistics = ref('')
const payment = ref('')
const form = reactive({
  date: '',
  time: '',
  fullName: 'Jerson Tomas',
  phone: '+63 917 123 4567',
  address: '123 Kanya kanya na St, Sta Barbara, Baliwag Bulacan',
  instructions: '',
})
const submitted = ref(false)

function confirmBooking() {
  // Frontend prototype: no request is sent, nothing is stored.
  submitted.value = true
}
</script>

<template>
  <CustomerNavbar />

  <main class="book">
    <div class="book__inner">
      <header class="book__intro">
        <h1 class="book__title">Book a Service</h1>
        <p class="book__lead">Follow the steps below to schedule your booking.</p>
      </header>

      <form class="book__form" @submit.prevent="confirmBooking">
        <BookingSection :step="1" title="Select Services">
          <div class="grid-2">
            <label
              v-for="service in services"
              :key="service.key"
              class="pick"
              :class="{ 'pick--on': selectedServices[service.key] }"
            >
              <span class="pick__text">
                <span class="pick__name">{{ service.name }}</span>
                <span class="pick__price">{{ service.price }}</span>
              </span>
              <input
                v-model="selectedServices[service.key]"
                type="checkbox"
                class="pick__box"
              />
            </label>
          </div>
        </BookingSection>

        <BookingSection :step="2" title="Logistics">
          <div class="grid-3">
            <label
              v-for="option in logisticsOptions"
              :key="option.key"
              class="opt"
              :class="{ 'opt--on': logistics === option.key }"
            >
              <input
                v-model="logistics"
                type="radio"
                name="logistics"
                class="opt__input"
                :value="option.key"
              />
              <AppIcon :name="option.icon" :size="24" />
              <span class="opt__label">{{ option.label }}</span>
            </label>
          </div>
        </BookingSection>

        <BookingSection :step="3" title="Scheduling">
          <div class="grid-2">
            <label class="field">
              <span class="field__label">Preferred Date</span>
              <input v-model="form.date" type="date" class="field__control" />
            </label>
            <label class="field">
              <span class="field__label">Preferred Time</span>
              <input v-model="form.time" type="time" class="field__control" />
            </label>
          </div>
        </BookingSection>

        <BookingSection :step="4" title="Contact Information">
          <div class="stack">
            <div class="grid-2">
              <label class="field">
                <span class="field__label">Full Name</span>
                <input v-model="form.fullName" type="text" class="field__control" />
              </label>
              <label class="field">
                <span class="field__label">Phone Number</span>
                <input v-model="form.phone" type="tel" class="field__control" />
              </label>
            </div>
            <label class="field">
              <span class="field__label">Address</span>
              <input v-model="form.address" type="text" class="field__control" />
            </label>
            <label class="field">
              <span class="field__label">Special Instructions (Optional)</span>
              <textarea
                v-model="form.instructions"
                class="field__control field__control--area"
                rows="4"
                placeholder="Any specific details for pickup/delivery or handling?"
              ></textarea>
            </label>
          </div>
        </BookingSection>

        <BookingSection :step="5" title="Payment Method">
          <div class="grid-2">
            <label
              v-for="option in paymentOptions"
              :key="option.key"
              class="opt opt--lg"
              :class="{ 'opt--on': payment === option.key }"
            >
              <input
                v-model="payment"
                type="radio"
                name="payment"
                class="opt__input"
                :value="option.key"
              />
              <AppIcon :name="option.icon" :size="26" />
              <span class="opt__label">{{ option.label }}</span>
            </label>
          </div>
        </BookingSection>

        <template v-if="submitted">
          <p class="book__done" role="status">
            Booking confirmed! D'Cassini Laundry will contact you shortly to confirm
            your schedule and pickup details.
          </p>
          <RouterLink to="/payment" class="book__confirm book__confirm--link">
            Proceed to Payment
          </RouterLink>
        </template>

        <button v-else type="submit" class="book__confirm">Confirm Booking</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
.book {
  background-color: var(--cc-bg);
  min-height: calc(100vh - 74px);
}

.book__inner {
  max-width: 768px;
  margin: 0 auto;
  padding: 32px 24px 56px;
}

/* Intro card ------------------------------------------------------- */
.book__intro {
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  padding: 28px;
  margin-bottom: 20px;
}

.book__title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--cc-heading);
  margin-bottom: 8px;
}

.book__lead {
  font-size: 0.9375rem;
  color: var(--cc-text);
}

.book__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Layout helpers ------------------------------------------------- */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Section 1 — selectable service cards ------------------------- */
.pick {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
  cursor: pointer;
}

.pick--on {
  border-color: var(--cc-primary);
  background-color: #eef4fb;
}

.pick__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pick__name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--cc-heading);
}

.pick__price {
  font-size: 0.8125rem;
  color: var(--cc-text);
}

.pick__box {
  appearance: none;
  -webkit-appearance: none;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1px solid var(--cc-border-strong);
  border-radius: 4px;
  background-color: var(--cc-surface);
  display: grid;
  place-content: center;
  cursor: pointer;
}

.pick__box::after {
  content: '';
  width: 10px;
  height: 10px;
  transform: scale(0);
  transition: transform 0.12s ease;
  background-color: var(--cc-primary);
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.pick__box:checked {
  border-color: var(--cc-primary);
}

.pick__box:checked::after {
  transform: scale(1);
}

.pick__box:focus-visible {
  outline: 2px solid rgba(0, 60, 144, 0.35);
  outline-offset: 2px;
}

/* Sections 2 + 5 — selectable option cards -------------------- */
.opt {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 18px 12px;
  text-align: center;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
  color: var(--cc-text);
  cursor: pointer;
}

.opt--lg {
  padding: 26px 16px;
  gap: 10px;
}

.opt__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.opt__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-heading);
}

.opt--on {
  border-color: var(--cc-primary);
  background-color: #eef4fb;
  color: var(--cc-primary);
}

.opt--on .opt__label {
  color: var(--cc-primary);
}

.opt:focus-within {
  outline: 2px solid rgba(0, 60, 144, 0.35);
  outline-offset: 2px;
}

/* Sections 3 + 4 — form fields ------------------------------- */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field__label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-heading);
}

.field__control {
  width: 100%;
  font: inherit;
  font-size: 0.875rem;
  color: var(--cc-heading);
  padding: 10px 12px;
  border: 1px solid var(--cc-border);
  border-radius: 6px;
  background-color: var(--cc-surface);
}

.field__control::placeholder {
  color: #8b8f9a;
}

.field__control:focus {
  outline: none;
  border-color: var(--cc-primary);
  box-shadow: 0 0 0 2px rgba(0, 60, 144, 0.15);
}

.field__control--area {
  min-height: 96px;
  line-height: 1.5;
  resize: vertical;
}

/* Confirmation + submit ------------------------------------- */
.book__done {
  padding: 14px 16px;
  border: 1px solid var(--cc-primary);
  border-radius: var(--cc-radius-sm);
  background-color: #eef4fb;
  color: var(--cc-heading);
  font-size: 0.875rem;
  line-height: 1.5;
}

.book__confirm {
  width: 100%;
  padding: 15px 24px;
  border: none;
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  cursor: pointer;
}

.book__confirm:hover {
  background-color: #002d6d;
}

.book__confirm--link {
  display: block;
  margin-top: 16px;
  text-align: center;
  text-decoration: none;
}

/* Responsive ------------------------------------------------ */
@media (max-width: 720px) {
  .book__inner {
    padding: 24px 16px 48px;
  }

  .book__intro {
    padding: 22px;
  }

  .book__title {
    font-size: 1.7rem;
  }

  .grid-2,
  .grid-3 {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
