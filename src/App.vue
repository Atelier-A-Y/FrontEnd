<script setup lang="ts">
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';


</script>

<template>
<header-component />

    <router-view />

<footer-component />
</template>

<style scoped>
main {
  background-color: white;
}
</style>
