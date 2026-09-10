
<script setup lang="ts">
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth.ts'
import { getProfile } from './services/user.ts'

const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.token) return

  try {
    const usuario = await getProfile()

    authStore.setUser(usuario)
  } catch {
    authStore.logout()
  }
})
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<header-component />

    <router-view />

<footer-component />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&display=swap');
main {
  background-color: white;
  margin: 6vw;
  padding: 0.3vw 0vw 0vw 0vw;
}
</style>

