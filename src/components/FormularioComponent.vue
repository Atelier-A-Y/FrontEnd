<script setup lang="ts">
import { ref } from 'vue'

const email = ref('');
const senha = ref('')

function entrar(){
  console.log({ Email: email.value, Senha: senha.value})
}
</script>

<template>
  <form @submit.prevent="entrar">
    <div class="fundo">

    <img src="/public/css/modelo2.png" alt="bg modelo2">
    <img src="/public/css/modelo3.png" alt="bg modelo3">
    <img src="/public/css/modelo5.png" alt="bg modelo5">
    <img src="/public/css/modelo8.png" alt="bg modelo8">
    <img src="/public/css/modelo10.png" alt="bg modelo10">
    <img src="/public/css/modelo11.png" alt="bg modelo11">
    <img src="/public/css/modelo12.png" alt="bg modelo12">
    <img src="/public/css/modelo13.png" alt="bg modelo13">

      <div class="formulario">
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

.fundo {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #cfc5bc;
}

.bg {
  position: absolute;
  object-fit: cover;
}

.modelo2 {
  width: 300px;
  top: -50px;
  left: -80px;
}

.modelo3 {
  width: 350px;
  top: 100px;
  right: -100px;
}

.modelo5 {
  width: 280px;
  bottom: -60px;
  left: 100px;
}

.modelo8 {
  width: 320px;
  bottom: 0;
  right: 50px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
}

.formulario{
  background-color: #F5E9E0;
  padding: 20vw;
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
