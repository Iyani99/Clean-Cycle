<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <div class="navbar__brand">
      <RouterLink to="/" class="navbar__logo">Clean-Cycle</RouterLink>
    </div>

    <nav class="navbar__links">
      <RouterLink to="/" class="navbar__link">Home</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.navbar__logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1d4ed8;
  text-decoration: none;
}

.navbar__links {
  display: flex;
  gap: 1.5rem;
}

.navbar__link {
  color: #334155;
  text-decoration: none;
  font-weight: 500;
}

.navbar__link:hover,
.navbar__link.router-link-exact-active {
  color: #1d4ed8;
}

@media (max-width: 480px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}
</style>
