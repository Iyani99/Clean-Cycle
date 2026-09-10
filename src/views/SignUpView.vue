<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'
import AuthField from '../components/AuthField.vue'
import AuthSubmit from '../components/AuthSubmit.vue'

/**
 * Customer Signup screen (Figma frame "Customer - SignUp Page", node 124:1723).
 *
 * Front-end prototype only: no account is created, nothing is stored, and
 * nothing is sent anywhere. The form just reproduces the approved Signup UI
 * and keeps the field values in local component state.
 */
const fullName = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function onSubmit() {
  // A real signup would create the customer account and continue into the app.
  // This prototype has no backend, so the form intentionally does nothing here
  // beyond the browser's built-in "required" field check.
}
</script>

<template>
  <AuthLayout>
    <form class="signup-form" @submit.prevent="onSubmit">
      <AuthField
        id="signup-name"
        v-model="fullName"
        label="Full Name"
        autocomplete="name"
        placeholder="Juan Dela Cruz"
        required
      />
      <AuthField
        id="signup-phone"
        v-model="phone"
        label="Phone Number"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        placeholder="0912 345 6789"
        required
      />
      <AuthField
        id="signup-email"
        v-model="email"
        label="Email"
        type="email"
        inputmode="email"
        autocomplete="email"
        placeholder="sample_email@gmail.com"
        required
      />
      <AuthField
        id="signup-password"
        v-model="password"
        label="Password"
        type="password"
        autocomplete="new-password"
        placeholder="Password"
        required
      />
      <AuthField
        id="signup-confirm"
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        autocomplete="new-password"
        placeholder="Confirm Password"
        required
      />

      <AuthSubmit label="Sign Up" class="signup-form__submit" />
    </form>

    <p class="signup-footer">
      <RouterLink to="/login" class="signup-footer__link">
        Already have an account? <strong>Sign In</strong>
      </RouterLink>
    </p>
  </AuthLayout>
</template>

<style scoped>
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 4px;
  margin-bottom: 28px;
}

.signup-form__submit {
  margin-top: 12px;
}

.signup-footer {
  text-align: center;
}

.signup-footer__link {
  font-size: 0.875rem;
  line-height: 20px;
  color: var(--cc-text);
  text-decoration: underline;
}

.signup-footer__link strong {
  font-weight: 700;
}

.signup-footer__link:hover {
  color: var(--cc-primary);
}
</style>
