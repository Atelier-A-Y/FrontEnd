<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const nome = ref('');
const email = ref('');
const senha = ref('')

async function cadastrar(){
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/registro/', {
      name: nome.value,
      email: email.value,
      password: senha.value,
    })

    console.log(response.data)

    alert('Cadastro realizado com sucesso!')

    // opcional: redirecionar para login
    window.location.href = '/login'

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data)
      alert('Erro ao cadastrar')
    } else {
      console.error(error)
      alert('Erro inesperado')
    }
  }
}
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <form @submit.prevent="cadastrar">
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

        <div class="logo">
        <img src="/css/logo.png" alt="logo.png" width="76" height="77">
        <p class="nome1">ATELIER</p>
        <p class="nome2">A.Y</p>
      </div>

        <div class="campo">
        <input
            id="nome"
            type="text"
            v-model="nome"
            placeholder="Digite seu nome..."
          />
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
            id="password"
            type="password"
            v-model="senha"
            placeholder="Digite sua senha..."
          />
        </div>

        <button type="submit">Entrar</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.logo{
  text-align: center;
  padding-bottom: 10px;
}

.nome1{
  color: rgb(110, 29, 19);
  font-size: 15px;
  font-family: "Bodoni Moda", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.nome2{
  color: rgb(110, 29, 19);
  font-size: 12px;
  font-family: "Bodoni Moda", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
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
  background-color: #F5E9E0;
  width: 90%;
  padding: 40px 30px;
  max-width: 380px;
  border-radius: 20px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 15px;
  opacity: 0;
  animation: entrada 0.3s ease forwards;
  animation-delay: 0.3s;
  box-shadow: 0 4px 2px 0 #1e1e1e7c;
}

@keyframes entrada {
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    filter: blur(0);
  }
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
}

input {
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
}

input:focus {
  box-shadow: 0 0 0 2px rgba(110, 29, 19, 0.15);
}

button {
  background-color: #F5E9E0;
  color: #311111;
  border-radius: 8px;
  width: auto;
  align-self: center;
  padding: 10px 25px;
  font-weight: 500;
  transition: 0.2s;
  cursor: pointer;
}

button:hover {
  background-color: #311111;
  color: #F5E9E0;
  border-color: #F5E9E0;
}

p {
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}

.cadastro-link{
  text-align: center;
}

.cadastro-link p{
  color: #595858;
  font-size: 13px;
  padding: 10px 0 0 0;
}

.cadastro-link a{
  color: #311111;
  text-decoration: none;
}
</style>
