<script setup lang="ts">
import { ref } from 'vue'
import api from '../api/api'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

console.log('TOKEN SALVO:', localStorage.getItem('token'))

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const senha = ref('')
const mostrarSenha = ref(false)

async function entrar() {
  try {
    const response = await api.post(
      '/token/',
      {
        email: email.value,
        password: senha.value
      }
    )

    const token = response.data.access

    console.log('TOKEN RECEBIDO:', token)

    authStore.setToken(token)

    console.log(
      'TOKEN APÓS SALVAR:',
      localStorage.getItem('token')
    )

    router.push('/')
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      alert(error.response?.data?.error || 'Erro no login')
    } else {
      alert('Erro inesperado')
    }
  }
}
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <form @submit.prevent="entrar">
    <div class="fundo">

      <img src="/css/modelo2.png" class="bg modelo2">
      <img src="/css/modelo3.png" class="bg modelo3">
      <img src="/css/modelo5.png" class="bg modelo5">
      <img src="/css/modelo8.png" class="bg modelo8">
      <img src="/css/modelo10.png" class="bg modelo10">
      <img src="/css/modelo11.png" class="bg modelo11">
      <img src="/css/modelo12.png" class="bg modelo12">
      <img src="/css/modelo13.png" class="bg modelo13">

      <div class="overlay"></div>

      <div class="formulario">

        <div class="logo-login">
          <img src="/css/logo-login.png" alt="logo.png">
          <p class="nome1">ATELIER</p>
          <p class="nome2">A.Y</p>
        </div>

        <div class="campo">
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Digite seu email..."
          />
        </div>

        <div class="campo">
          <input
            v-model="senha"
            :type="mostrarSenha ? 'text' : 'password'"
            placeholder="Digite sua senha..."
          >
          <button
            class="olho"
            type="button"
            @click="mostrarSenha = !mostrarSenha"
          >
            <img
              :src="mostrarSenha
                ? '/img/olho-fechado.png'
                : '/img/olho-aberto.png'"
              alt="Mostrar senha"
            >
          </button>
        </div>

        <button class="entrar" type="submit">Entrar</button>

        <div class="cadastro-link">
          <p>Não possui uma conta? Clique <router-link to="/cadastrar">Aqui!</router-link></p>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
/* ================= ESTILOS COMPUTADOR (AJUSTADOS) ================= */

.logo-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.5rem;
}

.logo-login img {
  width: 80px;
  height: 80px;
  margin: 0 0 10px;
  object-fit: contain;
}

.nome1 {
  color: rgb(110, 29, 19);
  font-size: 16px;
  font-family: "Bodoni Moda", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  letter-spacing: 2px;
  margin: 0;
}

.nome2 {
  color: rgb(110, 29, 19);
  font-size: 13px;
  font-family: "Bodoni Moda", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  letter-spacing: 1px;
  margin: 0;
}

.fundo {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: black;
}

.bg {
  position: absolute;
  object-fit: cover;
  max-width: none;
  height: auto;
  opacity: 0.9;
  z-index: 1;
}

.modelo2 {
  width: 40vw;
  top: 35vh;
  right: 37vw;
}

.modelo3 {
  width: 40vw;
  bottom: 73vh;
  left: 71vw;
}

.modelo5 {
  width: 47vw;
  bottom: 46vh;
  left: 36vw;
}

.modelo8 {
  width: 47vw;
  top: 35vh;
  left: 55vw;
}

.modelo10 {
  width: 40vw;
  top: 14vh;
  left: 88vw;
}

.modelo11 {
  width: 40vw;
  bottom: 43vh;
  right: 85vw;
}

.modelo12 {
  width: 37vw;
  bottom: 52vh;
  right: 54.5vw;
}

.modelo13 {
  width: 40vw;
  top: 45vh;
  right: 68vw;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  inset: 0;
  background: rgba(245, 233, 224, 0.6);
  backdrop-filter: blur(0.3px);
  z-index: 2;
}

.formulario {
  align-items: stretch;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #F5E6DE;
  width: 90%;
  padding: 35px 30px;
  max-width: 400px;
  border-radius: 20px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  animation: entrada 0.3s ease forwards;
  animation-delay: 0.3s;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.campo {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(49, 17, 17, 0.15);
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  outline: none;
  transition: all 0.2s ease;
}

input:focus {
  border-color: rgb(110, 29, 19);
  box-shadow: 0 0 0 2px rgba(110, 29, 19, 0.15);
}

.olho {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.olho img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.entrar {
  background-color: #311111;
  color: #F5E6DE;
  border: 1px solid #311111;
  border-radius: 8px;
  width: 100%;
  padding: 12px 25px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  margin-top: 5px;
}

.entrar:hover {
  background-color: #F5E6DE;
  color: #311111;
}

@keyframes entrada {
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    filter: blur(0);
  }
}

.cadastro-link {
  text-align: center;
  margin-top: 5px;
}

.cadastro-link p {
  color: #595858;
  font-size: 13px;
  margin: 0;
}

.cadastro-link a {
  color: #311111;
  font-weight: 600;
  text-decoration: none;
}

.cadastro-link a:hover {
  text-decoration: underline;
}

/* ================= ESTILOS MOBILE (INTOCADOS) ================= */

@media(max-width:768px){
  .logo-login img {
    width: 75px;
    height: 75px;
    margin: 0 0 15px;
  }

  .bg {
    position: absolute;
    object-fit: cover;
    max-width: none;
    height: auto;
    opacity: 0.9;
    z-index: 1;
  }

  .modelo2 {
    width: 50vw;
    top: 0vh;
    right: 65vw;
  }

  .modelo3 {
    width: 55vw;
    bottom: 3vh;
    left: 80vw;
  }

  .modelo5 {
    width: 60vw;
    bottom: -6vh;
    left: 35vw;
  }

  .modelo8 {
    width: 57vw;
    top: -7vh;
    left: 24vw;
  }

  .modelo10 {
    width: 50vw;
    top: -8vh;
    left: 72vw;
  }

  .modelo11 {
    width: 55vw;
    bottom: -6vh;
    right: 56vw;
  }

  .modelo12 {
    width: 50vw;
    bottom: 35vh;
    right: -13vw;
  }

  .modelo13 {
    width: 50vw;
    top: 36vh;
    right: 75vw;
  }
}
</style>