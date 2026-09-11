<script setup>
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CustomerNavbar from '../components/CustomerNavbar.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Settings/Profile - Customer.
 *
 * Frontend-only prototype. Every value below is local Vue state — there is no
 * backend, no account persistence, no localStorage, no real password change,
 * and no file upload beyond reading the chosen file's name for local feedback.
 */
const profile = reactive({
  fullName: 'Jerson Tomas',
  // Reproduced verbatim from the approved screenshot, including the missing
  // "@" before "gmail.com" — likely a Figma content typo, but not corrected
  // here per instruction; the frame is the source of truth.
  email: 'mythical.bananagmail.com',
  phone: '09123456789',
  password: 'secret12',
  address: '123 Kanya kanya na St, Sta Barbara, Baliwag Bulacan',
})

const profileSaved = ref(false)
function saveProfile() {
  // Frontend prototype: nothing is sent or stored.
  profileSaved.value = true
}

const uploadedFileName = ref('')
const fileInput = ref(null)
function triggerUpload() {
  fileInput.value?.click()
}
function onFileChange(event) {
  // Local-only: we read the chosen file's name for feedback. Nothing is
  // uploaded or stored anywhere.
  uploadedFileName.value = event.target.files?.[0]?.name ?? ''
}

const notifications = reactive({
  email: true,
  sms: true,
})

const language = ref('en-US')
</script>

<template>
  <CustomerNavbar />

  <main class="settings">
    <div class="settings__inner container">
      <h1 class="settings__title">Customer Settings</h1>

      <div class="settings__grid">
        <section class="card settings__profile" aria-label="Profile information">
          <h2 class="card__title">Profile Information</h2>
          <hr class="card__divider" />

          <div class="profile__avatar-row">
            <span class="profile__avatar">
              <AppIcon name="user" :size="32" />
            </span>
            <div class="profile__upload">
              <button type="button" class="btn-outline" @click="triggerUpload">
                Upload Profile
              </button>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="visually-hidden"
                @change="onFileChange"
              />
              <p v-if="uploadedFileName" class="profile__upload-note">
                Selected: {{ uploadedFileName }}
              </p>
            </div>
          </div>

          <form class="profile__form" @submit.prevent="saveProfile">
            <div class="grid-2">
              <label class="field">
                <span class="field__label">Full Name</span>
                <input v-model="profile.fullName" type="text" class="field__control" />
              </label>
              <label class="field">
                <span class="field__label">Email Address</span>
                <input v-model="profile.email" type="email" class="field__control" />
              </label>
            </div>

            <div class="grid-2">
              <label class="field">
                <span class="field__label">Phone Number</span>
                <input v-model="profile.phone" type="tel" class="field__control" />
              </label>
              <label class="field">
                <span class="field__label">Password</span>
                <input v-model="profile.password" type="password" class="field__control" />
              </label>
            </div>

            <div class="profile__row3">
              <label class="field profile__address">
                <span class="field__label">Address</span>
                <textarea
                  v-model="profile.address"
                  class="field__control field__control--area"
                  rows="2"
                ></textarea>
              </label>
              <button type="submit" class="btn-primary profile__save">Save Changes</button>
            </div>

            <p v-if="profileSaved" class="profile__saved-note" role="status">
              Profile changes saved.
            </p>
          </form>
        </section>

        <section class="card settings__notifications" aria-label="Notifications">
          <h2 class="card__title">Notifications</h2>
          <hr class="card__divider" />

          <div class="toggle-row">
            <span class="toggle-row__text">
              <span class="toggle-row__label">Email Notifications</span>
              <span class="toggle-row__hint">Updates and order status</span>
            </span>
            <input
              v-model="notifications.email"
              type="checkbox"
              class="check-box"
              aria-label="Email Notifications"
            />
          </div>

          <div class="toggle-row toggle-row--last">
            <span class="toggle-row__text">
              <span class="toggle-row__label">SMS Alerts</span>
              <span class="toggle-row__hint">Critical alerts only</span>
            </span>
            <input
              v-model="notifications.sms"
              type="checkbox"
              class="check-box"
              aria-label="SMS Alerts"
            />
          </div>
        </section>

        <section class="card settings__security" aria-label="Security and preferences">
          <h2 class="card__title">Security &amp; Preferences</h2>
          <hr class="card__divider" />

          <label class="field">
            <span class="field__label">Language</span>
            <select v-model="language" class="field__control">
              <option value="en-US">English (US)</option>
            </select>
          </label>

          <div class="security__password">
            <span class="field__label">Password</span>
            <!-- Intentionally inert: no password-reset flow exists in this
                 frontend prototype, so no click handler or feedback message
                 is attached (avoids implying an email/backend action). -->
            <button type="button" class="btn-outline">Change Password</button>
          </div>
        </section>

        <RouterLink to="/" class="logout settings__logout">
          <AppIcon name="logout" :size="18" />
          Logout
        </RouterLink>
      </div>

      <footer class="settings__footer">© 2024 Clean-Cycle. All rights reserved.</footer>
    </div>
  </main>
</template>

<style scoped>
.settings {
  background-color: var(--cc-bg);
  min-height: calc(100vh - 74px);
}

.settings__inner {
  padding-top: 32px;
  padding-bottom: 48px;
}

.settings__title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--cc-heading);
  margin-bottom: 24px;
}

/* Grid layout — named areas so mobile order can differ from the desktop
   left/right split (Profile, Notifications, Security, Logout, Footer). */
.settings__grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  grid-template-areas:
    'profile notif'
    'profile sec'
    'logout logout';
  gap: 24px;
}

.settings__profile {
  grid-area: profile;
}

.settings__notifications {
  grid-area: notif;
}

.settings__security {
  grid-area: sec;
}

.settings__logout {
  grid-area: logout;
  justify-self: start;
}

/* Shared card shell (mirrors the Service Tracking / Dashboard cards) ---- */
.card {
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-lg);
  padding: 24px 28px;
}

.card__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--cc-heading);
}

.card__divider {
  border: none;
  border-top: 1px solid var(--cc-border);
  margin: 16px 0 20px;
}

/* Profile avatar + upload ------------------------------------------- */
.profile__avatar-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.profile__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 88px;
  height: 88px;
  border-radius: 999px;
  border: 2px solid var(--cc-border);
  background-color: var(--cc-secondary);
  color: var(--cc-text-on-dark);
}

.profile__upload {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.profile__upload-note {
  font-size: 0.8125rem;
  color: var(--cc-text);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Buttons ------------------------------------------------------------ */
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  border: 1px solid var(--cc-primary);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-primary);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-outline:hover {
  background-color: #eef4fb;
}

.btn-primary {
  padding: 12px 24px;
  border: none;
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #002d6d;
}

/* Profile form -------------------------------------------------------- */
.profile__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

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
  /* Screenshot values render in a muted grey, not the dark heading color. */
  color: var(--cc-text);
  padding: 10px 12px;
  border: 1px solid var(--cc-border);
  border-radius: 6px;
  background-color: var(--cc-surface);
}

.field__control:focus {
  outline: none;
  border-color: var(--cc-primary);
  box-shadow: 0 0 0 2px rgba(0, 60, 144, 0.15);
}

.field__control--area {
  min-height: 64px;
  line-height: 1.5;
  resize: vertical;
}

.profile__row3 {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
}

.profile__address {
  flex: 1;
  min-width: 220px;
}

.profile__save {
  flex-shrink: 0;
}

.profile__saved-note {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--cc-primary);
}

/* Notifications toggle rows ------------------------------------------ */
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--cc-border);
}

.toggle-row--last {
  border-bottom: none;
}

.toggle-row__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toggle-row__label {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--cc-heading);
}

.toggle-row__hint {
  font-size: 0.8125rem;
  color: var(--cc-text);
}

/* Screenshot shows a checked square control (not a toggle switch), so this
   reuses the same custom-checkbox pattern as Book Now's `.pick__box`. */
.check-box {
  appearance: none;
  -webkit-appearance: none;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border: 1px solid var(--cc-border-strong);
  border-radius: 5px;
  background-color: var(--cc-surface);
  display: grid;
  place-content: center;
  cursor: pointer;
}

.check-box::after {
  content: '';
  width: 12px;
  height: 12px;
  transform: scale(0);
  transition: transform 0.12s ease;
  background-color: var(--cc-text-on-dark);
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

.check-box:checked {
  border-color: var(--cc-primary);
  background-color: var(--cc-primary);
}

.check-box:checked::after {
  transform: scale(1);
}

.check-box:focus-visible {
  outline: 2px solid rgba(0, 60, 144, 0.35);
  outline-offset: 2px;
}

/* Security & Preferences ---------------------------------------------- */
.settings__security .field {
  margin-bottom: 20px;
}

.security__password {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

/* Logout ---------------------------------------------------------------- */
.logout {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
  background-color: var(--cc-surface);
  color: var(--cc-primary);
  font-size: 0.875rem;
  font-weight: 600;
}

.logout:hover {
  background-color: #eef4fb;
}

/* Footer ------------------------------------------------------------- */
.settings__footer {
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--cc-border);
  text-align: center;
  font-size: 0.8125rem;
  color: var(--cc-text);
}

/* Responsive ----------------------------------------------------------- */
@media (max-width: 900px) {
  .settings__grid {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      'profile'
      'notif'
      'sec'
      'logout';
  }
}

@media (max-width: 640px) {
  .grid-2 {
    grid-template-columns: minmax(0, 1fr);
  }

  .profile__row3 {
    flex-direction: column;
    align-items: stretch;
  }

  .profile__save {
    width: 100%;
  }

  .card {
    padding: 20px;
  }

  .settings__title {
    font-size: 1.6rem;
  }
}
</style>
