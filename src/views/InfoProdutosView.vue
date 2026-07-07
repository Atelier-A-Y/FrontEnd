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

<div v-if="produto">

<div class="informacoes">
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

    <div class="acoes">
  <button class="btn-comprar">
    Comprar
  </button>

  <button class="btn-favorito">
    <img
      src="/img/coracao-solido.png"
      alt="Favoritar"
      class="coracao"
    >
  </button>
</div>
  </div>
</div>
  <p class="descricao">Descrição:</p>
  <span class="prod_descr">{{ produto.descricao }}</span>
</div>
</template>

<style scoped>
.informacoes{
  display: flex;
}
.img-prod {
  width: 38%;

  height: 40vw;

  object-fit: cover;

  margin: 6vw 8vw 20vw;

  transition: transform 0.4s ease;
}

.infos{
  margin-top: 10vw;
  margin-left: 4vw;
  font-family: "Lexend Deca", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.infos h1{
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3vw;
  color: #311111;
}

.infos h2{
  font-size: 1.7rem;
  font-weight: 400;
  margin-bottom: 1.5vw;
}

.infos p{
  font-size: 1.1rem;
  padding: 1.5vw 0;
}

.acoes{
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 8vw;
}

.btn-comprar{
  background-color: #311111;
  color: #F5E9E0;
  padding: 1vw 10vw;
  font-size: 1.2rem;
  border-radius: 0.5vw;
  border: none;
  cursor: pointer;
  transition: transform 0.4s ease;
}

.btn-comprar:hover{
  transform: scale(1.05);
}

.btn-favorito{
  width: 3.8vw;
  height: 3.8vw;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.coracao{
  width: 2vw;
  height: 2vw;
}

.descricao{
  margin: 0 0 2vw 5vw;
  font-size: 2rem;
  color: #311111;
  font-weight: 700;
}

span{
  margin: 2vw 0 10vw 8vw;
  font-size: 1.5rem;
}
</style>
