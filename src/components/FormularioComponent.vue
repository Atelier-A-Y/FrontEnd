<script setup lang="ts">
import { ref } from 'vue'

const email = ref('');
const senha = ref('')

function entrar(){
  console.log({ Email: email.value, Senha: senha.value})
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

        <div class="logo">
        <p class="nome1">ATELIER</p>
        <p class="nome2">A.Y</p>
      </div>

        <div for="email">
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Digite seu email..."
          />
        </div>

        <div for="senha">
          <input
            id="senha"
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


.nome1{
  color: rgb(110, 29, 19);
  font-size: 18px;
  font-family: "Bodoni Moda", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.fundo {
  position: relative;
  width: 1532px;
  height: 780px;
  overflow: hidden;
  background: black;
}

.bg {
  position: absolute;
  object-fit: cover;
  opacity: 0.9;
  z-index: 1;
}

.modelo2 {
  width: 600px;
  top: 300px;
  left: 360px;
}

.modelo3 {
  width: 450px;
  top: -310.85px;
  right: -70px;
}

.modelo5 {
  width: 700px;
  top: -420px;
  left: 570px;
}

.modelo8 {
  width: 700px;
  top: 280px;
  right: -20px;
}

.modelo10 {
  width: 600px;
  bottom: -80px;
  left: 1350px;
}

.modelo11 {
  width: 550px;
  bottom: 350px;
  right: 1300px;
}

.modelo12 {
  width: 550px;
  bottom: 400px;
  left: 150px;
}

.modelo13 {
  width: 650px;
  top: 380px;
  right: 1040px;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  background-color: #F5E9E0;
  padding: 60px;
  border-radius: 20px;
  width: 350px;
  z-index: 3;
  opacity: 0;
  animation: aparecer 0.8s ease forwards;
}

@keyframes aparecer {
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

div {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.2s, box-shadow 0.2s;
}

input:focus{
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

button {
  padding: 10px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #2563eb;
}

p {
  font-size: 13px;
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
