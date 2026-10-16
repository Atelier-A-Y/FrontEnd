
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

<section class="barra-paginas">
    <div>
      <ul>
        <li>
          <a href="/produtos"><img src="/img/dress.png" alt="vestido"></a>
        </li>

        <li>
          <a href="/user"><img src="/img/user-solido.png" alt="user"></a>
        </li>

        <li class="home">
          <a href="/"><img src="/img/home.png" alt="home"></a>
        </li>

        <li>
          <a href="/carrinho"><img src="/img/bolsa-solido.png" alt="bolsa"></a>
        </li>

        <li>
          <a href="/favoritos"><img src="/img/coracao-solido.png" alt="coracao"></a>
        </li>
      </ul>
    </div>
</section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&display=swap');
main {
  background-color: white;
  margin: 6vw;
  padding: 0.3vw 0vw 0vw 0vw;
}

.barra-paginas{
    display: none;
  }

  @media(max-width: 768px){
    .barra-paginas{
      display: block;
      background-color: #F5E9E0;
      position: fixed;
      z-index: 999;
      bottom: 0;
      right: 0;
      left: 0;
    }

    .barra-paginas ul{
      display: flex;
      padding: 3.5vw 6vw;
      justify-content: space-between;
    }

    .barra-paginas li{
      width: 13vw;
      height: 13vw;
      border-radius: 50%;
      background: linear-gradient(
      to bottom,
      rgba(207, 177, 146, 0) 0%,
      rgba(255, 247, 239, 0.349) 1%,
      rgba(236, 200, 177, 0.767) 80%
    );
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .barra-paginas .home{
      width: 13vw;
      height: 13vw;
      border-radius: 50%;
      background-color: #d6b498;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .home img{
      width: 9vw;
    }

    li img{
      width: 8vw;
    }
  }
</style>

