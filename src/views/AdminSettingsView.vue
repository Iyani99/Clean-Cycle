<script setup>
import { onBeforeUnmount, reactive, ref } from 'vue'
import AdminLayout from '../components/AdminLayout.vue'
import AppIcon from '../components/AppIcon.vue'

/**
 * Settings - Admin.
 *
 * Frontend-only prototype. Every value below is local Vue state — there is no
 * backend, no account persistence, no real password change, no real 2FA or
 * session management, and no file upload beyond reading the chosen file's name
 * for local feedback (same pattern as the Customer Settings screen).
 *
 * "Change Password", "View Sessions" and "Contact Support" are intentionally
 * inert: the approved frame shows no password form, sessions list, or support
 * destination for them to open. The branch select lists only the one branch the
 * frame proves. The avatar is the shared user glyph (no photo asset exists in
 * the project).
 */
const profile = reactive({
  fullName: 'Andrey Delacruz',
  email: 'maybitawkahitwala@gmail.com',
  phone: '09123456789',
  branch: "D' Cassini Laundry Shop",
})
const branches = ["D' Cassini Laundry Shop"]

const twoFactor = ref(true)
const notifications = reactive({ email: true, sms: false })

const uploadedFileName = ref('')
const fileInput = ref(null)
function triggerUpload() {
  fileInput.value?.click()
}
function onFileChange(event) {
  // Local-only: the chosen file's name is shown for feedback. Nothing is
  // uploaded or stored anywhere.
  uploadedFileName.value = event.target.files?.[0]?.name ?? ''
}
function removePhoto() {
  uploadedFileName.value = ''
  if (fileInput.value) fileInput.value.value = ''
}

// "Save Changes" shows a short local confirmation next to the button, then
// clears it, so the default frame is unchanged. Nothing is sent or stored.
const saved = ref(false)
let savedTimer
function saveChanges() {
  saved.value = true
  clearTimeout(savedTimer)
  savedTimer = setTimeout(() => {
    saved.value = false
  }, 3000)
}
onBeforeUnmount(() => clearTimeout(savedTimer))
</script>

<template>
  <AdminLayout>
    <header class="settings-header">
      <h1 class="settings-header__title">Admin Settings</h1>
      <p class="settings-header__subtitle">
        Manage your account preferences, security, and notifications.
      </p>
    </header>

    <div class="settings-grid">
      <form class="settings-main" @submit.prevent="saveChanges">
        <section class="card" aria-labelledby="personal-title">
          <h2 id="personal-title" class="card__title">Personal Information</h2>

          <div class="avatar-row">
            <span class="avatar">
              <AppIcon name="user" :size="32" />
            </span>
            <div class="avatar-side">
              <div class="avatar-actions">
                <button type="button" class="upload-btn" @click="triggerUpload">
                  Upload Profile
                </button>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="visually-hidden"
                  tabindex="-1"
                  @change="onFileChange"
                />
                <button type="button" class="remove-btn" @click="removePhoto">Remove</button>
              </div>
              <p v-if="uploadedFileName" class="avatar-note">Selected: {{ uploadedFileName }}</p>
            </div>
          </div>

          <div class="field-grid">
            <label class="field">
              <span class="field__label">Full Name</span>
              <input v-model="profile.fullName" type="text" class="field__control" />
            </label>
            <label class="field">
              <span class="field__label">Email Address</span>
              <input v-model="profile.email" type="email" class="field__control" />
            </label>
            <label class="field">
              <span class="field__label">Phone Number</span>
              <input v-model="profile.phone" type="tel" class="field__control" />
            </label>
            <label class="field">
              <span class="field__label">Assigned Branch</span>
              <select v-model="profile.branch" class="field__control">
                <option v-for="branch in branches" :key="branch" :value="branch">
                  {{ branch }}
                </option>
              </select>
            </label>
          </div>
        </section>

        <section class="card" aria-labelledby="security-title">
          <h2 id="security-title" class="card__title">Security</h2>

          <div class="setting-list">
            <div class="setting-row">
              <div class="setting-row__text">
                <span class="setting-row__label">Password</span>
                <span class="setting-row__desc">Last changed 2 months ago</span>
              </div>
              <button type="button" class="outline-btn">Change Password</button>
            </div>

            <div class="setting-row">
              <div class="setting-row__text">
                <span class="setting-row__label">Two-Factor Authentication (2FA)</span>
                <span class="setting-row__desc">Add an extra layer of security to your account.</span>
              </div>
              <input
                v-model="twoFactor"
                type="checkbox"
                role="switch"
                class="switch"
                aria-label="Two-Factor Authentication (2FA)"
              />
            </div>

            <div class="setting-row">
              <div class="setting-row__text">
                <span class="setting-row__label">Active Sessions</span>
                <span class="setting-row__desc">Manage devices logged into this account.</span>
              </div>
              <button type="button" class="text-link">
                View Sessions
                <AppIcon name="arrow-right" :size="14" />
              </button>
            </div>
          </div>
        </section>

        <section class="card" aria-labelledby="notifications-title">
          <h2 id="notifications-title" class="card__title">Notifications</h2>

          <div class="setting-list">
            <div class="setting-row">
              <div class="setting-row__text">
                <span class="setting-row__label">Email Notifications</span>
                <span class="setting-row__desc">
                  Receive daily summaries and critical alerts via email.
                </span>
              </div>
              <input
                v-model="notifications.email"
                type="checkbox"
                role="switch"
                class="switch"
                aria-label="Email Notifications"
              />
            </div>

            <div class="setting-row">
              <div class="setting-row__text">
                <span class="setting-row__label">SMS Alerts</span>
                <span class="setting-row__desc">
                  Get instant text messages for urgent operational issues.
                </span>
              </div>
              <input
                v-model="notifications.sms"
                type="checkbox"
                role="switch"
                class="switch"
                aria-label="SMS Alerts"
              />
            </div>
          </div>
        </section>

        <div class="save-row">
          <p v-if="saved" class="save-row__note" role="status">Changes saved.</p>
          <button type="submit" class="save-btn">Save Changes</button>
        </div>
      </form>

      <aside class="settings-aside" aria-label="Security tip and help">
        <section class="aside-card">
          <h2 class="aside-card__title aside-card__title--tip">
            <AppIcon name="info" :size="18" />
            Security Tip
          </h2>
          <p class="aside-card__text">
            We recommend updating your password every 90 days and ensuring 2FA is always active
            for admin accounts.
          </p>
        </section>

        <section class="aside-card">
          <h2 class="aside-card__title aside-card__title--help">
            <AppIcon name="headset" :size="18" />
            Need Help?
          </h2>
          <p class="aside-card__text">
            If you are experiencing issues with your admin access, contact IT support immediately.
          </p>
          <button type="button" class="aside-link">Contact Support</button>
        </section>
      </aside>
    </div>
  </AdminLayout>
</template>

<style scoped>
/* Header ------------------------------------------------------------- */
.settings-header {
  margin-bottom: 32px;
}

.settings-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--cc-heading);
  margin-bottom: 6px;
}

.settings-header__subtitle {
  font-size: 0.8125rem;
  color: var(--cc-text);
}

/* Two-column layout: form cards on the left, tip/help on the right ---- */
.settings-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 24px;
  align-items: start;
}

.settings-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.settings-aside {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Cards --------------------------------------------------------------- */
.card {
  padding: 22px 24px 24px;
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
}

.card__title {
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--cc-heading);
  padding-bottom: 7px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--cc-border);
}

/* Personal information ------------------------------------------------ */
.avatar-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 999px;
  border: 2px solid var(--cc-border);
  background-color: var(--cc-secondary);
  color: var(--cc-text-on-dark);
}

.avatar-side {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.avatar-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.avatar-note {
  font-size: 0.75rem;
  color: var(--cc-text);
  overflow-wrap: anywhere;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.upload-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background-color: var(--cc-secondary);
  color: var(--cc-text-on-dark);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  cursor: pointer;
}

.upload-btn:hover {
  background-color: #23659a;
}

.remove-btn {
  padding: 4px 0;
  border: none;
  background: none;
  color: var(--cc-heading);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
}

.remove-btn:hover {
  text-decoration: underline;
}

.field-grid {
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
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--cc-heading);
}

.field__control {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--cc-border-strong);
  border-radius: 6px;
  background-color: var(--cc-surface);
  color: var(--cc-heading);
  font: inherit;
  font-size: 0.875rem;
}

.field__control:focus {
  outline: none;
  border-color: var(--cc-primary);
  box-shadow: 0 0 0 2px rgba(0, 60, 144, 0.15);
}

/* Security / Notifications rows --------------------------------------- */
.setting-list {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.setting-row {
  display: flex;
  min-height: 38px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px 16px;
}

.setting-row__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1 1 220px;
  min-width: 0;
  line-height: 1.35;
}

.setting-row__label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--cc-heading);
}

.setting-row__desc {
  font-size: 0.75rem;
  color: var(--cc-text);
}

.outline-btn {
  flex-shrink: 0;
  min-width: 137px;
  padding: 7px 14px;
  border: 1px solid var(--cc-primary);
  border-radius: 4px;
  background-color: var(--cc-surface);
  color: var(--cc-primary);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  cursor: pointer;
}

.outline-btn:hover {
  background-color: #e7f0fa;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 4px 0;
  border: none;
  background: none;
  color: var(--cc-text);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
}

.text-link:hover {
  color: var(--cc-heading);
}

/* Toggle switch (a real checkbox underneath, so it is keyboard accessible) */
.switch {
  appearance: none;
  position: relative;
  flex-shrink: 0;
  width: 42px;
  height: 24px;
  margin: 0;
  border-radius: 999px;
  background-color: #d9dde2;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transition: transform 0.15s ease;
}

.switch:checked {
  background-color: var(--cc-primary);
}

.switch:checked::after {
  transform: translateX(18px);
}

.switch:focus-visible {
  outline: 2px solid var(--cc-tertiary);
  outline-offset: 2px;
}

/* Save Changes -------------------------------------------------------- */
.save-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 8px;
}

.save-row__note {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #157347;
}

.save-btn {
  min-width: 160px;
  padding: 8px 24px;
  border: none;
  border-radius: 4px;
  background-color: var(--cc-primary);
  color: var(--cc-text-on-dark);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #002d6d;
}

/* Right column: tip + help -------------------------------------------- */
.aside-card {
  padding: 24px 24px 26px;
  background-color: #f1f3f5;
  border: 1px solid var(--cc-border);
  border-radius: var(--cc-radius-sm);
}

.aside-card__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 10px;
}

.aside-card__title--tip {
  color: var(--cc-primary);
}

.aside-card__title--help {
  color: #0b6355;
}

.aside-card__text {
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--cc-text);
}

.aside-link {
  margin-top: 14px;
  padding: 0;
  border: none;
  background: none;
  color: var(--cc-primary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.aside-link:hover {
  text-decoration: underline;
}

/* Responsive --------------------------------------------------------- */
@media (max-width: 1100px) {
  .settings-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .settings-aside {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }
}

@media (max-width: 640px) {
  .settings-aside {
    grid-template-columns: minmax(0, 1fr);
  }

  .field-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 560px) {
  .settings-header {
    margin-bottom: 24px;
  }

  .settings-header__title {
    font-size: 1.4rem;
  }

  .card,
  .aside-card {
    padding: 18px 16px 20px;
  }

  /* Full-width button with the confirmation beneath it, so the button never moves. */
  .save-row {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 10px;
  }

  .save-row__note {
    text-align: center;
  }
}
</style>
