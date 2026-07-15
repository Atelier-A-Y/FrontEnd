<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api/api";

const carrinho = ref<any[]>([]);

async function carregarCarrinho() {
  try {
    const resposta = await api.get("/carrinho/");

    carrinho.value = resposta.data;
  } catch (erro) {
    console.error("Erro ao carregar carrinho:", erro);
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

      <h1>Carrinho</h1>

      <div
        class="card-produto"
        v-for="item in carrinho"
        :key="item.id"
      >

        <img
          v-if="item.roupa.foto"
          :src="item.roupa.foto.url"
          :alt="item.roupa.nome"
          class="imagem-produto"
        >

        <h2>{{ item.roupa.nome }}</h2>

        <p>
          Quantidade:
          {{ item.quantidade }}
        </p>

        <p>
          R$
          {{ Number(item.roupa.preco).toFixed(2).replace(".", ",") }}
        </p>

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
.sem-produtos {
  background-color: #f5e9e0;
  border: #311111 solid 0.8px;
  border-radius: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 30px;
  margin: 4vw 13vw 0vw 13vw;
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
p{
  color: black;
  justify-content: center;
  font-size: 1.2rem;
  padding-bottom: 1.2vw;
  padding-top: 1vw;
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
</style>
