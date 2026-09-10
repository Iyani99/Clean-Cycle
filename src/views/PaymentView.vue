<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * Payment Page - Customer (Figma frame "Payment Page - Customer").
 *
 * A plain order-summary card. Frontend-only prototype: the amounts below are
 * static example values with simple display math, there is no cart, no pricing
 * service, no payment processing. "Confirm Booking" shows a local message;
 * "Back" returns to the Book Now screen.
 */
const washKg = 3
const dryItems = 2
const washRate = 85
const dryRate = 70
const logisticsFee = 80

const washSubtotal = washKg * washRate
const drySubtotal = dryItems * dryRate
const estimatedTotal = washSubtotal + drySubtotal + logisticsFee

const peso = (amount) => '₱' + amount.toFixed(2)

const serviceRows = [
  { label: `Wash & Fold (${washKg} Kg)`, value: peso(washSubtotal) },
  { label: `Dry Cleaning (${dryItems} items)`, value: peso(drySubtotal) },
]
const feeRows = [
  { label: 'Logistics Fee', value: peso(logisticsFee) },
  { label: 'Payment Method', value: 'COD' },
]

const confirmed = ref(false)

function confirmBooking() {
  confirmed.value = true
}
</script>

<template>
  <main class="payment">
    <section class="summary" aria-labelledby="summary-title">
      <h1 id="summary-title" class="summary__title">Order Summary</h1>
      <hr class="summary__rule" />

      <div class="summary__group">
        <div v-for="row in serviceRows" :key="row.label" class="srow">
          <span class="srow__label srow__label--strong">{{ row.label }}</span>
          <span class="srow__value">{{ row.value }}</span>
        </div>
      </div>

      <hr class="summary__rule" />

      <div class="summary__group">
        <div v-for="row in feeRows" :key="row.label" class="srow">
          <span class="srow__label srow__label--strong">{{ row.label }}</span>
          <span class="srow__value">{{ row.value }}</span>
        </div>
      </div>

      <hr class="summary__rule" />

      <div class="srow srow--total">
        <span class="srow__label">Estimated Total</span>
        <span class="srow__value srow__value--total">{{ peso(estimatedTotal) }}</span>
      </div>

      <button type="button" class="summary__confirm" @click="confirmBooking">
        Confirm Booking
      </button>

      <p v-if="confirmed" class="summary__confirmed" role="status">
        Your booking has been confirmed.
      </p>

      <p class="summary__note">Payment collected upon completion.</p>

      <RouterLink to="/book" class="summary__back">Back</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.payment {
  background-color: var(--cc-bg);
  min-height: 100vh;
  padding: 96px 24px 64px;
}

.summary {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  padding: 32px;
}

.summary__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--cc-heading);
}

.summary__rule {
  border: none;
  border-top: 1px solid var(--cc-border);
  margin: 16px 0;
}

.summary__group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.srow {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  font-size: 0.9375rem;
  color: var(--cc-heading);
}

.srow__label--strong {
  font-weight: 600;
}

.srow__value {
  flex-shrink: 0;
}

.srow--total {
  align-items: center;
}

.srow__value--total {
  font-size: 1.25rem;
  font-weight: 700;
}

.summary__confirm {
  width: 100%;
  margin-top: 32px;
  padding: 14px 24px;
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

.summary__confirm:hover {
  background-color: #002d6d;
}

.summary__confirmed {
  margin-top: 12px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--cc-primary);
}

.summary__note {
  margin-top: 12px;
  text-align: center;
  font-size: 0.8125rem;
  color: var(--cc-text);
}

.summary__back {
  display: block;
  width: max-content;
  margin: 14px auto 0;
  padding: 8px 22px;
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.summary__back:hover {
  background-color: #002d6d;
}

@media (max-width: 620px) {
  .payment {
    padding: 56px 16px 48px;
  }

  .summary {
    padding: 24px;
  }

  .srow {
    font-size: 0.875rem;
  }

  .srow__value--total {
    font-size: 1.125rem;
  }
}
</style>
