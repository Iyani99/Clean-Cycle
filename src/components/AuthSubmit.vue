<script setup>
/**
 * Full-width primary submit button for the customer auth forms, with the
 * trailing arrow from Figma. Identical on Login ("Log In") and Signup ("Sign Up").
 */
defineProps({
  label: { type: String, required: true },
})
</script>

<template>
  <button type="submit" class="auth-submit">
    {{ label }}
    <svg
      class="auth-submit__arrow"
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
</template>

<style scoped>
.auth-submit {
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

.auth-submit:hover {
  background-color: #002d6d;
}

.auth-submit__arrow {
  flex-shrink: 0;
}
</style>
