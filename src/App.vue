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
<header-component />

    <router-view />


<footer-component />

</template>

<style scoped>
main {
  background-color: white;
}
</style>

