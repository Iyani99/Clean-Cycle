<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <!-- Some screens (e.g. Login) have their own layout and hide the public navbar. -->
  <AppNavbar v-if="!$route.meta.hideNavbar" />
  <RouterView />
</template>
