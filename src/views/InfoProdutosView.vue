<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api/api'

const route = useRoute()

const produto = ref<any>(null)

async function carregarProduto() {

    const id = route.params.id

    const response = await api.get(`https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/roupas/${id}/`)

    produto.value = response.data
}

onMounted(carregarProduto)
</script>

<template>

<div v-if="produto" class="informacoes">
  <div class="img-prod">
    <img v-if="produto.foto"
          :src="produto.foto.url"
          :alt="produto.nome">
  </div>
  <div class="infos">
    <h1>{{ produto.nome }}</h1>

    <h2>R$ {{ produto.preco }}</h2>

    <p>Tamanho: {{ produto.tamanho }}</p>

    <p>Cor: {{ produto.cor }}</p>

    <button>Comprar</button>
  </div>
</div>
<div class="icones">
    <img src="/public/img/coracao-solido.png" alt="coracao" class="coracao">
  </div>
</template>

<style scoped>
.informacoes{
  display: flex;
}
.img-prod {
  width: 30%;

  height: 40vw;

  object-fit: cover;

  margin: 6vw 10vw 5vw;

  transition: transform 0.4s ease;
}

.infos{
  margin: 12vw 8vw 0 0;
  font-family: "Lexend Deca", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.infos h1{
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 3vw;
}

.infos h2{
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1.5vw;
}

.infos p{
  font-size: 1.1rem;
  padding: 1.5vw 0;
}

button{
  background-color: #311111;
  color: #F5E9E0;
  padding: 1vw 10vw;
  font-size: 1.2rem;
  border-radius: 0.5vw;
  margin-top: 11vw;
}

.coracao{
  width: 3.5vw;
  height: 3.5vw;
  cursor: pointer;
}
</style>
