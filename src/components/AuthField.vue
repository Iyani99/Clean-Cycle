<script setup>
/**
 * One labelled text field for the customer auth forms.
 * Optional left icon (used by Login's email / password rows; Signup has none).
 * Optional `error` shows an inline message under the field and marks it invalid.
 */
defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  inputmode: { type: String, default: null },
  required: { type: Boolean, default: false },
  error: { type: String, default: '' },
  icon: { type: String, default: '' },
  iconWidth: { type: [String, Number], default: 16 },
  iconHeight: { type: [String, Number], default: 16 },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="auth-field">
    <label class="auth-field__label" :for="id">{{ label }}</label>
    <div class="auth-field__control" :class="{ 'auth-field__control--with-icon': icon }">
      <img
        v-if="icon"
        :src="icon"
        alt=""
        class="auth-field__icon"
        :width="iconWidth"
        :height="iconHeight"
      />
      <input
        :id="id"
        class="auth-field__input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :inputmode="inputmode"
        :required="required"
        :aria-invalid="error ? 'true' : null"
        :aria-describedby="error ? `${id}-error` : null"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <p v-if="error" :id="`${id}-error`" class="auth-field__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.auth-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.auth-field__label {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.6px;
  color: var(--cc-heading);
}

.auth-field__control {
  position: relative;
  display: flex;
  align-items: center;
}

.auth-field__icon {
  position: absolute;
  left: 13px;
  pointer-events: none;
}

.auth-field__input {
  width: 100%;
  padding: 10px 17px 11px;
  font-family: var(--cc-font-sans);
  font-size: 0.875rem;
  line-height: normal;
  color: var(--cc-text);
  background-color: var(--cc-surface);
  border: 1px solid var(--cc-border-strong);
  border-radius: var(--cc-radius-sm);
}

.auth-field__control--with-icon .auth-field__input {
  padding-left: 41px;
}

.auth-field__input::placeholder {
  color: var(--cc-border-strong);
}

.auth-field__input[aria-invalid='true'] {
  border-color: var(--cc-error);
}

.auth-field__input:focus {
  outline: none;
  border-color: var(--cc-primary);
  box-shadow: 0 0 0 3px rgba(0, 60, 144, 0.12);
}

.auth-field__error {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  color: var(--cc-error);
}
</style>
