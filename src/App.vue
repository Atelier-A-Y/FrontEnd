<script setup>
import Teste from './components/Teste.vue'
</script>

<template>
  <Teste />
  <main class="content">
     <RouterView />
  </main>
</template>

<style>
.content {
  margin-top: 10vw; 
  padding: 20px;
}
</style>