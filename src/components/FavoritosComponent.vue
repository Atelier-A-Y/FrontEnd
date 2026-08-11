<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api/api";

const favorito = ref<any[]>([])

async function carregarFavoritos() {
  try {
    const resposta = await api.get("https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/favoritos/")

    console.log(
      "FAVORITOS JSON:",
      JSON.stringify(resposta.data, null, 2)
    )

    const resultados = resposta.data.results || resposta.data

    console.log(
      "RESULTADOS JSON:",
      JSON.stringify(resultados, null, 2)
    )

    favorito.value = resultados

  } catch (erro) {
    console.error("ERRO FAVORITOS:", erro)
  }
}

function alterarFav(id: number) {
  favorito.value = favorito.value.filter(
    item => item.id !== id
  )

  localStorage.setItem(
    "favoritos",
    JSON.stringify(favorito.value)
  )
}

onMounted(carregarFavoritos)
</script>

<template>
  <main class="produtos">

    <section
  v-if="favorito.length > 0"
  class="container-produtos"
>
  <div
    class="card-produto"
    v-for="item in favorito"
    :key="item.id"
  >

    <img
      v-if="item.foto"
      :src="item.foto.url"
      :alt="item.nome"
      class="imagem-produto"
    >

    <h2>
      {{ item.nome }}
    </h2>

    <div class="infos">
      <p>
        R$
        {{
          Number(item.preco || 0)
            .toFixed(2)
            .replace(".", ",")
        }}
      </p>
    </div>

    <button
      class="remover-favorito"
      @click="alterarFav(item.id)"
    >
      Remover
    </button>

  </div>
</section>

    <section
      v-else
      class="sem-produtos"
    >

      <ul>

        <li class="icone">
          <img src="/img/coracao-solido.png">
        </li>

        <li class="titulo">
          <h1>Favoritos vazio</h1>
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

.container-produtos > h1 {
  color: #311111;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid #d8c6bd;
  padding-bottom: 1rem;
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
   NOME
================================ */

.card-produto h2 {
  color: #311111;
  font-size: 1.45rem;
  font-weight: 600;
  margin: 0 0 1rem;
}

/* ================================
   INFORMAÇÕES
================================ */

.infos{
  text-align: right;
}

.card-produto p {
  color: #555;
  font-size: 1.15rem;
}

.card-produto p:last-child {
  color: #311111;
  font-size: 1.25rem;
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
