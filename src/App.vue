<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <HeaderComponent />

  <main>
    <router-view />
  </main>

  <FooterComponent />
</template>

<style scoped>
main {
  background-color: white;
  padding-top: 120px;
}
</style>
