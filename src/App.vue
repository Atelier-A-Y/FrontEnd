<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<style>
main {
  margin-top: 6vw;
}
</style>
