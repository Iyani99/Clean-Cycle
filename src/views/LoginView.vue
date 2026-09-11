<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
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
const route = useRoute()
const router = useRouter()
const email = ref('')
const password = ref('')

// Customer/Admin selector. Purely local UI state — it only decides where
// onSubmit() navigates below, there is no real role or account behind it.
const role = ref('customer')

// Customer-area routes a public "Book Now" style CTA may ask Login to forward to
// after submit. Anything not on this list falls back to the Dashboard, so an
// odd or off-site `?redirect=` value can never send the visitor somewhere unsafe
// or to a blank screen.
const REDIRECT_ALLOWLIST = ['/dashboard', '/services', '/book', '/payment', '/tracking']

function onSubmit() {
  // Prototype-only navigation: no credentials are checked and nothing is stored.
  if (role.value === 'admin') {
    // Admin mode ignores any customer `?redirect=` — a visitor who switched to
    // Admin after arriving via a customer deep link should not land on a
    // customer screen.
    router.push('/admin/dashboard')
    return
  }
  // If the visitor arrived via a link like /login?redirect=/book, continue there;
  // otherwise go to the Customer Dashboard (the normal Login destination).
  const target = route.query.redirect
  router.push(REDIRECT_ALLOWLIST.includes(target) ? target : '/dashboard')
}
</script>

<template>
  <AuthLayout>
    <!--
      Customer / Admin selector. A separate "Admin - Login Page" Figma frame
      exists but hasn't been built — this shared Login screen currently also
      doubles as the Admin entry point, selecting where onSubmit() navigates.
    -->
    <div class="auth-toggle" role="group" aria-label="Account type">
      <button
        type="button"
        class="auth-toggle__option"
        :class="{ 'auth-toggle__option--active': role === 'customer' }"
        :aria-pressed="role === 'customer'"
        @click="role = 'customer'"
      >
        Customer
      </button>
      <button
        type="button"
        class="auth-toggle__option auth-toggle__option--admin"
        :class="{ 'auth-toggle__option--active': role === 'admin' }"
        :aria-pressed="role === 'admin'"
        @click="role = 'admin'"
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

/* Customer has no background of its own (it just sits on the toggle's blue
   bar), so give it a dimmed label when Admin is the one selected instead. */
.auth-toggle__option:not(.auth-toggle__option--admin):not(.auth-toggle__option--active) {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.auth-toggle__option--admin {
  margin: -1px;
  background-color: var(--cc-surface);
  color: #000000;
  font-weight: 500;
  border: 1px solid #5e5e5e;
  border-radius: 10px;
}

.auth-toggle__option--admin.auth-toggle__option--active {
  font-weight: 700;
  border-color: var(--cc-primary);
  box-shadow: inset 0 0 0 1px var(--cc-primary);
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
