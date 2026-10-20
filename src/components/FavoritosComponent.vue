<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api/api";

const favorito = ref<any[]>([])

async function carregarFavoritos() {
  try {
    const resposta = await api.get("/favoritos/")

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

async function alterarFav(id: number) {
  try{
    await api.delete(`/favoritos/${id}/`)

    favorito.value = favorito.value.filter(
    item => item.id !== id
  )
  }
  catch (erro){
    console.error("Erro ao remover favorito:", erro)
  }
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
      v-if="item.roupa?.foto"
      :src="item.roupa.foto.url"
      :alt="item.roupa.nome"
      class="imagem-produto"
    >

    <div class="infos">
      <h2>
      {{ item.roupa.nome }}
    </h2>

      <p>
        R$
        {{
          Number(item.roupa.preco || 0)
            .toFixed(2)
            .replace(".", ",")
        }}
      </p>
    </div>

    <button
      class="remover-favorito"
      @click="alterarFav(item.id)"
    >
      <img src="/img/delete.png" alt="delete.png">
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
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 30px;
  margin: 4vw 9vw 4vw 9vw;
}

.icone img{
  width: 15vw;
  height: 15vw;
}

ul{
  list-style-type: none;
}

.titulo{
  justify-content: center;
  color: #311111;
  font-weight: bold;
  margin-bottom: 0.7rem;
  padding-top: 1vw;
  font-size: 1rem;
}

.texto{
  font-size: 0.88rem;
}

.remover-favorito img{
  width: 1.5vw;
  height: 1.5vw;
  margin-right: 3vw;
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


/* ============================= */
/*       FAVORITOS MOBILE        */
/* ============================= */

@media (max-width: 768px) {

  /* Container principal */
  .produtos {
    width: 100%;
    min-height: 100vh;
    padding: 20px 14px 35px;
    box-sizing: border-box;
  }

  .container-produtos {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  /* Card de cada favorito */
  .card-produto {
    display: grid;
    grid-template-columns: 95px minmax(0, 1fr) 30px;
    align-items: center;
    gap: 12px;

    width: 100%;
    box-sizing: border-box;

    padding: 12px;
    margin: 0 0 14px;

    background-color: #f5e9e0;
    border: 1px solid #dfcec4;
    border-radius: 12px;

    transition: none;
  }

  .card-produto:hover {
    transform: none;
    box-shadow: none;
  }

  /* Imagem da roupa */
  .imagem-produto {
    width: 95px;
    height: 125px;

    object-fit: cover;
    object-position: center;

    display: block;
    border-radius: 8px;
  }

  /* Nome e preço */
  .infos {
    min-width: 0;
    text-align: left;
    overflow-wrap: anywhere;
  }

  .infos h2 {
    margin: 0 0 10px;

    color: #311111;
    font-size: 16px;
    line-height: 1.35;
    font-weight: 600;
  }

  .infos p {
    margin: 0;

    color: #277c00;
    font-size: 15px;
    font-weight: 600;
  }

  /* Botão para remover dos favoritos */
  .remover-favorito {
    width: 30px;
    height: 36px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 5px;
    border: none;
    background: transparent;
    border-radius: 6px;

    cursor: pointer;
    flex-shrink: 0;
  }

  .remover-favorito img {
    width: 20px;
    height: 20px;

    margin: 0;
    object-fit: contain;
  }

  /* Mensagem de favoritos vazios */
  .sem-produtos {
    width: 100%;
    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 25px 0;
    padding: 50px 18px;

    background-color: #f5e9e0;
    border: 1px solid #311111;
    border-radius: 18px;
  }

  .sem-produtos ul {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .sem-produtos .icone img {
    width: 90px;
    height: 90px;
    object-fit: contain;
  }

  .sem-produtos .titulo {
    padding-top: 15px;
    margin-bottom: 8px;

    color: #311111;
    font-size: 16px;
    text-align: center;
  }

  .sem-produtos .titulo h1 {
    margin: 0;
    font-size: 24px;
  }

  .sem-produtos .texto {
    color: #5f5757;
    font-size: 14px;
    text-align: center;
  }

  .sem-produtos .texto p {
    margin: 0;
  }

  /* Botão voltar às compras */
  .botao {
    width: 100%;
    max-width: 220px;
    min-height: 42px;
    height: auto;

    display: block;
    box-sizing: border-box;

    margin: 20px auto 0;
    padding: 10px;

    background-color: #311111;
    border: none;
    border-radius: 5px;

    color: #f5e9e0;
    cursor: pointer;
  }

  .botao:hover {
    background-color: #311111;
    transform: none;
  }

  .link {
    color: #f5e9e0;
    font-size: 14px;
    text-decoration: none;
  }

  /* Centralização dos elementos da mensagem vazia */
  .sem-produtos li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
