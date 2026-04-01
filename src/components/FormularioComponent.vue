<script setup lang="ts">
import { ref } from 'vue'

const email = ref('');
const senha = ref('')

function enviarFormulario(){
  console.log({ Email: email.value, Senha: senha.value})
}
</script>

<template>
  <form @submit.prevent="enviarFormulario">

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
        type="text"
        v-model="senha"
        placeholder="Digite sua senha..."
      />
    </div>

    <button type="submit">Entrar</button>
  </form>
</template>

<style scoped>

form{
  max-width: 400px;
  margin: 20px auto;
  padding: 80px;
  border-radius: 10px;
  background-color: #F5E9E0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

input:focus,
textarea:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

textarea {
  min-height: 100px;
  resize: vertical;
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
