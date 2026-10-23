<script setup lang="ts">
import FavoritosComponent from '../components/FavoritosComponent.vue';
</script>

<template>
<h1>Favoritos</h1>
<favoritos-component />
</template>

<style scoped>
h1 {
  max-width: 1250px;
  margin: 0 auto;
  color: #311111;
  font-size: 2.5rem;
  font-weight: 600;
  margin-top: 6vw;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #d8c6bd;
  padding-bottom: 1rem;
}

@media(max-width:768px){
  h1 {
  margin: 0 auto;
  color: #311111;
  font-size: 1.7rem;
  font-weight: 600;
  border-bottom: 1px solid #d8c6bd;
  padding-bottom: 1rem;
  margin: 10vw 8vw 7vw 8vw;
}
}
</style>
