<script setup>
import { onBeforeUnmount, reactive, ref, watch } from 'vue'
import AuthLayout from '../components/AuthLayout.vue'
import AuthField from '../components/AuthField.vue'
import AuthSubmit from '../components/AuthSubmit.vue'

/**
 * Create Admin Account (Figma frame "Admin - SignUp Page", reinterpreted).
 *
 * Public Admin self-registration is deliberately not offered, so the approved
 * Admin Signup layout is used as an internal screen reached from Admin
 * Settings. Wording differs from the frame on purpose: a heading + helper line,
 * "Create Admin Account" on the button, "Back to Admin Settings" top-right, and
 * no "Already have an account?" link.
 *
 * Front-end prototype only: no account is created, nothing is stored or sent,
 * and the page is not protected (there is no real auth to protect it with).
 * Validation mirrors Customer Signup (whitespace-only values, password match)
 * and adds a nonblank/valid email check, using inline messages only.
 */
const fullName = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const errors = reactive({ fullName: '', phone: '', email: '', password: '', confirmPassword: '' })

// Clear an error as soon as the field it belongs to is edited.
watch(fullName, () => (errors.fullName = ''))
watch(phone, () => (errors.phone = ''))
watch(email, () => (errors.email = ''))
watch(password, () => (errors.password = ''))
watch([password, confirmPassword], () => (errors.confirmPassword = ''))

const created = ref(false)
let createdTimer

function onSubmit() {
  errors.fullName = fullName.value.trim() ? '' : 'Please enter the full name.'
  errors.phone = phone.value.trim() ? '' : 'Please enter the phone number.'
  // The browser's own email rule decides validity; the form has `novalidate`
  // so the message is shown inline instead of as a browser pop-up.
  errors.email = !email.value.trim()
    ? 'Please enter the email address.'
    : document.getElementById('admin-email')?.validity.valid === false
      ? 'Please enter a valid email address.'
      : ''
  errors.password = password.value ? '' : 'Please enter a password.'
  errors.confirmPassword = !confirmPassword.value
    ? 'Please confirm the password.'
    : password.value === confirmPassword.value
      ? ''
      : 'Passwords do not match.'

  const firstInvalid = [
    ['fullName', 'admin-name'],
    ['phone', 'admin-phone'],
    ['email', 'admin-email'],
    ['password', 'admin-password'],
    ['confirmPassword', 'admin-confirm'],
  ].find(([key]) => errors[key])
  if (firstInvalid) {
    created.value = false
    document.getElementById(firstInvalid[1])?.focus()
    return
  }

  // Prototype-only: nothing is created or stored. A short note shows, then clears.
  created.value = true
  clearTimeout(createdTimer)
  createdTimer = setTimeout(() => {
    created.value = false
  }, 3000)
}
onBeforeUnmount(() => clearTimeout(createdTimer))
</script>

<template>
  <AuthLayout
    back-to="/admin/settings"
    back-label="Back to Admin Settings"
    logo-to="/admin/settings"
    logo-aria-label="Clean-Cycle Admin Settings"
  >
    <header class="create-header">
      <h1 class="create-header__title">Create Admin Account</h1>
      <p class="create-header__text">
        Create an account for another administrator who can access the Clean-Cycle admin system.
      </p>
    </header>

    <form class="create-form" novalidate @submit.prevent="onSubmit">
      <AuthField
        id="admin-name"
        v-model="fullName"
        label="Full Name"
        autocomplete="off"
        placeholder="Juan Dela Cruz"
        required
        :error="errors.fullName"
      />
      <AuthField
        id="admin-phone"
        v-model="phone"
        label="Phone Number"
        type="tel"
        inputmode="tel"
        autocomplete="off"
        placeholder="0912 345 6789"
        required
        :error="errors.phone"
      />
      <AuthField
        id="admin-email"
        v-model="email"
        label="Email"
        type="email"
        inputmode="email"
        autocomplete="off"
        placeholder="sample_email@gmail.com"
        required
        :error="errors.email"
      />
      <AuthField
        id="admin-password"
        v-model="password"
        label="Password"
        type="password"
        autocomplete="new-password"
        placeholder="Password"
        required
        :error="errors.password"
      />
      <AuthField
        id="admin-confirm"
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        autocomplete="new-password"
        placeholder="Confirm Password"
        required
        :error="errors.confirmPassword"
      />

      <AuthSubmit label="Create Admin Account" class="create-form__submit" />
      <p v-if="created" class="create-form__note" role="status">Admin account created.</p>
    </form>
  </AuthLayout>
</template>

<style scoped>
.create-header {
  margin-bottom: 20px;
  text-align: center;
}

.create-header__title {
  margin-bottom: 4px;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--cc-heading);
}

.create-header__text {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--cc-text);
}

.create-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.create-form__submit {
  margin-top: 12px;
}

.create-form__note {
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-primary);
}
</style>
