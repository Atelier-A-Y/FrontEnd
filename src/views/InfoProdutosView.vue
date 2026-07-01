<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../api/api'

const route = useRoute()

const produto = ref<any>(null)

async function carregarProduto() {

    const id = route.params.id

    const response = await api.get(`/produtos/${id}/`)

    produto.value = response.data
}

onMounted(carregarProduto)
</script>

<template>

<div v-if="produto">

    <img :src="produto.imagem">

    <h1>{{ produto.nome }}</h1>

    <h2>R$ {{ produto.preco }}</h2>

    <p>{{ produto.descricao }}</p>

    <p>Categoria: {{ produto.categoria }}</p>

    <p>Tamanho: {{ produto.tamanho }}</p>

    <p>Cor: {{ produto.cor }}</p>

</div>

</template>
