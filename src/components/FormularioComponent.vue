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

    <img src="/css/modelo2.png" class="bg modelo2">
    <img src="/css/modelo3.png" class="bg modelo3">
    <img src="/css/modelo5.png" class="bg modelo5">
    <img src="/css/modelo8.png" class="bg modelo8">
    <img src="/css/modelo10.png" class="bg modelo10">
    <img src="/css/modelo11.png" class="bg modelo11">
    <img src="/css/modelo12.png" class="bg modelo12">
    <img src="/css/modelo13.png" class="bg modelo13">

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

/* topo esquerda */
.modelo2 {
  width: 260px;
  top: -23.27px;
  left: 643.62px;
}

/* topo direita */
.modelo3 {
  width: 450px;
  top: -140.85px;
  right: -80px;
}

/* meio esquerda */
.modelo5 {
  width: 700px;
  top: -400px;
  left: 530px;
}

/* meio direita */
.modelo8 {
  width: 260px;
  top: 220px;
  right: -60px;
}

/* baixo esquerda */
.modelo10 {
  width: 280px;
  bottom: -40px;
  left: 40px;
}

/* baixo direita */
.modelo11 {
  width: 260px;
  bottom: -20px;
  right: 20px;
}

/* fundo espalhado */
.modelo12 {
  width: 220px;
  bottom: 100px;
  left: 200px;
}

/* outro fundo */
.modelo13 {
  width: 220px;
  top: 120px;
  right: 200px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 2;
}

.formulario{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #F5E9E0;
  padding: 40px;
  border-radius: 20px;
  width: 350px;
  z-index: 3;
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
