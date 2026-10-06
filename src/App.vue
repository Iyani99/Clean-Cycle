<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import CustomerNavbar from './components/CustomerNavbar.vue'
</script>

<template>
  <!-- Some screens (e.g. Login) have their own layout and hide the public navbar. -->
  <AppNavbar v-if="!$route.meta.hideNavbar" />
  <CustomerNavbar v-if="$route.meta.customerNav" />
  <RouterView v-slot="{ Component, route }">
    <div v-if="route.meta.customerNav" class="customer-route">
      <Transition name="customer-route-page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </div>
    <component :is="Component" v-else />
  </RouterView>
</template>

<style>
.customer-route {
  flex: 1;
  min-height: calc(100vh - 74px);
  background-color: var(--cc-bg);
}

.customer-route-page-enter-active {
  transition: opacity 115ms ease, transform 115ms ease;
}

.customer-route-page-leave-active {
  transition: opacity 65ms ease;
}

.customer-route-page-enter-from {
  opacity: 0.75;
  transform: translateY(3px);
}

.customer-route-page-leave-to {
  opacity: 0.75;
}

@media (prefers-reduced-motion: reduce) {
  .customer-route-page-enter-active,
  .customer-route-page-leave-active {
    transition: none;
  }

  .customer-route-page-enter-from {
    transform: none;
  }
}
</style>
