<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log('Usuário:', response.data)

  } catch (error) {
    console.error(error)
    alert('Você precisa estar logado')
    window.location.href = '/'
  }
})

function logout() {
  localStorage.removeItem('token')
  window.location.href = '/'
}
</script>

<template>
  <div class="container">
    <h1>Bem-vindo!</h1>
    <p>Você está logado 🎉</p>

    <button @click="logout">Sair</button>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

button {
  background-color: #F5E6DE;
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
  color: #F5E6DE;
  border-color: #F5E6DE;
}
</style>
