<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AuthLayout from '../components/AuthLayout.vue'
import AuthField from '../components/AuthField.vue'
import AuthSubmit from '../components/AuthSubmit.vue'
import emailIcon from '../assets/icons/email.svg'
import keyIcon from '../assets/icons/key.svg'

/**
 * Customer Login screen (Figma frame "Login Page - Customer", node 117:5).
 *
 * Front-end prototype only: there is no real authentication, no API call, and
 * no stored session. The form just reproduces the approved Login UI and keeps
 * the field values in local component state.
 */
const email = ref('')
const password = ref('')

function onSubmit() {
  // A real login would verify the credentials and send the customer to their
  // dashboard once that screen exists. For this prototype we intentionally do
  // nothing beyond the browser's built-in "required" field check.
}
</script>

<template>
  <AuthLayout>
    <!--
      Customer / Admin selector. The Admin Login is a separate approved Figma
      screen that has not been built yet, so the Admin option is shown for
      visual fidelity but is not wired to a route.
    -->
    <div class="auth-toggle" role="group" aria-label="Account type">
      <button
        type="button"
        class="auth-toggle__option auth-toggle__option--active"
        aria-pressed="true"
      >
        Customer
      </button>
      <button
        type="button"
        class="auth-toggle__option auth-toggle__option--admin"
        aria-pressed="false"
      >
        Admin
      </button>
    </div>

    <form class="login-form" @submit.prevent="onSubmit">
      <AuthField
        id="login-email"
        v-model="email"
        label="Email Address"
        type="email"
        inputmode="email"
        autocomplete="email"
        placeholder="sample_email@gmail.com"
        :icon="emailIcon"
        :icon-width="15"
        :icon-height="12"
        required
      />
      <AuthField
        id="login-password"
        v-model="password"
        label="Password"
        type="password"
        autocomplete="current-password"
        placeholder="••••••••"
        :icon="keyIcon"
        :icon-width="17"
        :icon-height="9"
        required
      />

      <!-- No password-recovery flow exists in this prototype. -->
      <button type="button" class="login-form__forgot">Forgot Password?</button>

      <AuthSubmit label="Log In" class="login-form__submit" />
    </form>

    <p class="login-footer">
      Don't have an account?
      <RouterLink to="/signup" class="login-footer__link">Sign Up</RouterLink>
    </p>
  </AuthLayout>
</template>

<style scoped>
/* Customer / Admin toggle (Login only) ------------------------------- */
.auth-toggle {
  position: relative;
  display: flex;
  height: 40px;
  margin-bottom: 32px;
  background-color: var(--cc-primary);
  border: 1px solid #5e5e5e;
  border-radius: var(--cc-radius-sm);
}

.auth-toggle__option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--cc-font-sans);
  font-size: 0.875rem;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
}

.auth-toggle__option--active {
  color: var(--cc-text-on-dark);
  font-weight: 600;
}

.auth-toggle__option--admin {
  margin: -1px;
  background-color: var(--cc-surface);
  color: #000000;
  font-weight: 500;
  border: 1px solid #5e5e5e;
  border-radius: 10px;
}

/* Form -------------------------------------------------------------- */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.login-form__forgot {
  align-self: flex-start;
  padding: 0;
  font-family: var(--cc-font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.6px;
  color: var(--cc-primary);
  background: none;
  border: none;
  cursor: pointer;
}

.login-form__forgot:hover {
  text-decoration: underline;
}

.login-form__submit {
  margin-top: 8px;
}

/* Footer ---------------------------------------------------------- */
.login-footer {
  text-align: center;
  font-size: 0.875rem;
  line-height: 20px;
  color: var(--cc-text);
}

.login-footer__link {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.6px;
  color: var(--cc-primary);
}

.login-footer__link:hover {
  text-decoration: underline;
}
</style>
