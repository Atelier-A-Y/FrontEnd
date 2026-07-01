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

    <p>{{ produto.descricao }}</p>

    <p>Tamanho: {{ produto.tamanho }}</p>

    <p>Cor: {{ produto.cor }}</p>
  </div>
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
  margin: 8vw 8vw 0 0;
}

.infos h1{
  font-size: 2.8rem;
}

.infos h2{
  font-size: 2rem;
}
</style>
