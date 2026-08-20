<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api/api";

const carrinho = ref<any[]>([]);

async function carregarCarrinho() {
  try {
    const resposta = await api.get(
      "https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/carrinho/"
    );

    console.log("CARRINHO RECEBIDO:", resposta.data);

    carrinho.value = resposta.data.results || [];

    console.log("ITENS DO CARRINHO:", carrinho.value);

  } catch (erro) {
    console.error("Erro ao carregar carrinho:", erro);
  }
}

async function tirarCarrinho(id: number) {
  try{
    await api.delete(`https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/carrinho/${id}/`)

    carrinho.value = carrinho.value.filter(
    item => item.id !== id
  )
  }
  catch (erro){
    console.error("Erro ao remover do carrinho:", erro)
  }
}

async function incrementar(item: any) {
  item.quantidade++;

  try {
    await api.patch(`/carrinho/${item.id}/`, {
      quantidade: item.quantidade
    });
  } catch (erro) {
    console.error("Erro ao aumentar quantidade:", erro);
    item.quantidade--;
  }
}

async function decrementar(item: any) {
  if (item.quantidade > 1) {
    item.quantidade--;

    try {
      await api.patch(`/carrinho/${item.id}/`, {
        quantidade: item.quantidade
      });
    } catch (erro) {
      console.error("Erro ao diminuir quantidade:", erro);
      item.quantidade++;
    }
  }
}

onMounted(carregarCarrinho);
</script>

<template>
  <main class="produtos">

    <section
      v-if="carrinho.length > 0"
      class="container-produtos"
    >

      <div
        class="card-produto"
        v-for="item in carrinho"
        :key="item.id"
      >

        <img
          v-if="item.roupa_detalhes?.foto"
          :src="item.roupa_detalhes.foto.url"
          :alt="item.roupa_detalhes.nome"
          class="imagem-produto"
        >

      <div class="infos">
      <h2>
          {{ item.roupa_detalhes?.nome }}
        </h2>

        <p>
          R$
          {{ Number(item.roupa_detalhes?.preco || 0)
            .toFixed(2)
            .replace(".", ",") }}
        </p>
      </div>

      <div>
      <div class="quantidade">
        <button @click="decrementar(item)"><img src="/img/menos.png" alt="menos.png"></button>
        <p>
          Quantidade:
          {{ item.quantidade }}
        </p>
        <button @click="incrementar(item)"><img src="/img/mais.png" alt="mais.png"></button>
       </div>

        <button
      class="remover-carrinho"
      @click="tirarCarrinho(item.id)"
    >
      <img src="/img/delete.png" alt="delete.png">
    </button>
    </div>
      </div>

    </section>

    <section
      v-else
      class="sem-produtos"
    >

      <ul>

        <li class="icone">
          <img src="/img/carrinho.png">
        </li>

        <li class="titulo">
          <h1>Carrinho vazio</h1>
        </li>

        <li class="texto">
          <p>Que tal olhar nossos produtos?</p>
        </li>

        <li>
          <button class="botao">
            <router-link
              to="/"
              class="link"
            >
              Voltar às compras
            </router-link>
          </button>
        </li>

      </ul>

    </section>

  </main>
</template>

<style scoped>
/* ================================
   CONTAINER PRINCIPAL
================================ */

.container-produtos {
  max-width: 1250px;
  margin: 0 auto;
}

/* ================================
   CARD DO PRODUTO
================================ */

.card-produto {
  display: grid;
  grid-template-columns: 150px 1fr auto;
  align-items: center;
  gap: 2rem;

  background-color: #f5e9e0;
  border: 1px solid #dfcec4;
  border-radius: 12px;

  padding: 1.5rem;
  margin-bottom: 1.2rem;

  transition: 0.3s ease;
}

.card-produto:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(49, 17, 17, 0.08);
}

/* ================================
   IMAGEM
================================ */

.imagem-produto {
  width: 150px;
  height: 190px;

  object-fit: cover;
  border-radius: 8px;

  display: block;
}

/* ================================
   INFORMAÇÕES
================================ */

.infos{
  text-align: left;
}

.infos h2{
  color: #311111;
  font-size: 1.45rem;
  font-weight: 600;
  margin-bottom: 1vw;
}

.infos p{
  font-size: 1.1vw;
  color: #277c00;
  font-weight: 600;
}

.sem-produtos {
  background-color: #f5e9e0;
  border: #311111 solid 0.8px;
  border-radius: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 30px;
  margin: 4vw 13vw 5vw 13vw;
}

ul{
  list-style-type: none;
}

.titulo{
  justify-content: center;
  color: #311111;
  font-weight: bold;
  padding: 0;
  margin-bottom: 0.7rem;
  padding-top: 1vw;
}

.remover-carrinho img{
  width: 1.5vw;
  height: 1.5vw;
  margin-left: 5vw;
}

.botao{
  background-color: #311111;
  border: none;
  border-radius: 3px;
  width: 160px;
  height: 35px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  justify-content: center;
  margin-bottom: 0.8rem;
  color: #f5e9e0;
  transition: 0.3s ease;
}

.botao:hover {
  background-color: #5a1f1f;
  transform: scale(1.05);
}

.botao:active {
  background-color: #7a2d2d;
}

li {
  display: flex;
  justify-content: center;
}

.icone{
  display: flex;
  justify-content: center;
}

img{
  width: 11vw;
  height: 11vw;
}

.quantidade{
  display: flex;
  margin-bottom: 1vw;
}

.quantidade p{
  margin: 0 1vw 0 1vw;
  margin-top: 0.4vw;
  color: rgb(95, 87, 87);
}

.quantidade img{
  width: 1.5vw;
  height: 1.5vw;
}
</style>
