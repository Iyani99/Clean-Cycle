<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'
import logoIcon from '../assets/images/logo-icon.png'
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
  <main class="login-page">
    <div class="login-page__glow" aria-hidden="true"></div>

    <div class="login-page__back">
      <BaseButton to="/" variant="primary">Back to Home Page</BaseButton>
    </div>

    <section class="login-card">
      <RouterLink to="/" class="login-card__logo" aria-label="Clean-Cycle home">
        <img :src="logoIcon" alt="" class="login-card__logo-icon" width="92" height="62" />
        <span class="login-card__wordmark">
          <span class="login-card__wordmark--clean">CLEAN</span><span>-</span><span
            class="login-card__wordmark--cycle"
            >CYCLE</span
          >
        </span>
      </RouterLink>

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
        <div class="login-form__group">
          <label class="login-form__label" for="login-email">Email Address</label>
          <div class="login-form__field">
            <img :src="emailIcon" alt="" class="login-form__icon" width="15" height="12" />
            <input
              id="login-email"
              v-model="email"
              class="login-form__input"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="leevague@gmail.com"
              required
            />
          </div>
        </div>

        <div class="login-form__group">
          <label class="login-form__label" for="login-password">Password</label>
          <div class="login-form__field">
            <img :src="keyIcon" alt="" class="login-form__icon" width="17" height="9" />
            <input
              id="login-password"
              v-model="password"
              class="login-form__input"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <!-- No password-recovery flow exists in this prototype. -->
        <button type="button" class="login-form__forgot">Forgot Password?</button>

        <div class="login-form__actions">
          <button type="submit" class="login-form__submit">
            Log In
            <svg
              class="login-form__arrow"
              viewBox="0 0 9.33333 9.33333"
              width="10"
              height="10"
              aria-hidden="true"
            >
              <path
                d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25V5.25"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </form>

      <p class="login-card__footer">
        Don't have an account?
        <RouterLink to="/signup" class="login-card__footer-link">Sign Up</RouterLink>
      </p>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 16px;
  background-color: var(--cc-bg);
  overflow: hidden;
}

/* Soft blurred blue-to-teal blob behind the card (Figma decorative element). */
.login-page__glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 800px;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  background-image: linear-gradient(45deg, #d9e2ff 0%, #89f5e7 100%);
  filter: blur(32px);
  opacity: 0.12;
  pointer-events: none;
}

.login-page__back {
  position: absolute;
  top: 19px;
  right: 15px;
  z-index: 2;
}

/* Card ----------------------------------------------------------------- */
.login-card {
  position: relative;
  z-index: 1;
  width: 448px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 41px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
  box-shadow: var(--cc-shadow-header);
}

.login-card__logo {
  align-self: center;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
}

.login-card__logo-icon {
  /* The source PNG has tall transparent padding; a wide box + cover crops it
     so the mark reads at the size shown in Figma. */
  width: 92px;
  height: 62px;
  object-fit: cover;
}

.login-card__wordmark {
  font-family: var(--cc-font-brand);
  font-weight: 900;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: var(--cc-primary);
}

.login-card__wordmark--clean {
  color: var(--cc-secondary);
}

.login-card__wordmark--cycle {
  color: var(--cc-tertiary);
}

/* Customer / Admin toggle -------------------------------------------- */
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

.login-form__group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.login-form__label {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.6px;
  color: var(--cc-heading);
}

.login-form__field {
  position: relative;
  display: flex;
  align-items: center;
}

.login-form__icon {
  position: absolute;
  left: 13px;
  pointer-events: none;
}

.login-form__input {
  width: 100%;
  padding: 10px 17px 11px 41px;
  font-family: var(--cc-font-sans);
  font-size: 0.875rem;
  line-height: normal;
  color: var(--cc-text);
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
}

.login-form__input::placeholder {
  color: var(--cc-border-strong);
}

.login-form__input:focus {
  outline: none;
  border-color: var(--cc-primary);
  box-shadow: 0 0 0 3px rgba(0, 60, 144, 0.12);
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

.login-form__actions {
  padding-top: 8px;
}

.login-form__submit {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-family: var(--cc-font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.6px;
  color: var(--cc-text-on-dark);
  background-color: var(--cc-primary);
  border: none;
  border-radius: var(--cc-radius-sm);
  box-shadow: var(--cc-shadow-header);
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.login-form__submit:hover {
  background-color: #002d6d;
}

.login-form__arrow {
  flex-shrink: 0;
}

/* Footer ---------------------------------------------------------- */
.login-card__footer {
  text-align: center;
  font-size: 0.875rem;
  line-height: 20px;
  color: var(--cc-text);
}

.login-card__footer-link {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.6px;
  color: var(--cc-primary);
}

.login-card__footer-link:hover {
  text-decoration: underline;
}

/* Responsive ---------------------------------------------------- */
@media (max-width: 480px) {
  .login-page {
    padding: 40px 16px;
  }

  .login-card {
    padding: 28px 22px;
  }

  .login-page__back {
    top: 12px;
    right: 12px;
  }
}
</style>
