<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api/api";

const route = useRoute();
const router = useRouter();
const favorito = ref(false)

const produto = ref<any>(null);

function alterarFav() {
  favorito.value = !favorito.value;

  const favoritos = JSON.parse(localStorage.getItem("favoritos") || "[]");

  if (favorito.value) {
    favoritos.push(produto.value.id);
  } else {
    const index = favoritos.indexOf(produto.value.id);

    if (index > -1) {
      favoritos.splice(index, 1);
    }
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

async function carregarProduto() {
  const id = route.params.id;

  const response = await api.get(
    `https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/roupas/${id}/`
  );

  produto.value = response.data;
}

onMounted(carregarProduto);
</script>

<template>
  <main class="produtos">
    <section class="container-produtos" v-if="produto">
    <h1>Carrinho</h1>
      <div class="card-produto" v-for="item in produto" :key="item.id">

        <img
          v-if="item.foto"
          :src="item.foto.url"
          :alt="item.nome"
          class="imagem-produto"
        />

        <h2>{{ item.nome }}</h2>

        <p>
          <strong>Preço:</strong>

          R$
          {{ Number(item.preco).toFixed(2).replace(".", ",") }}
        </p>
      </div>
    </section>

    <section v-else class="sem-produtos">
      <ul>
        <li class="icone">
            <img src="/img/carrinho.png" alt="carrinho">
        </li>

      <li class="titulo">
        <h1>Carrinho Vazio</h1>
      </li>

      <li class="texto">
        <p>Que tal olhar nossos produtos e receber seu pedido na porta de casa?</p>
      </li>

      <li>
        <button class="botao"><router-link to="/" class="link">Voltar às Compras</router-link></button>
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

/* ---------------- BOTÃO VOLTAR ----------------

.voltar {
  margin: 5.5rem 0 2rem 5%;
  padding: 0.8rem 1.8rem;
  background: #311111;
  color: #f5e9e0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s;
}

.voltar:hover {
  transform: scale(1.05);
}



.container {
  max-width: 1400px;
  margin: auto;
  padding: 0 3rem 5rem;
}

.informacoes {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 5rem;
  margin-left: 4rem;
}



.img-prod {
  flex: 1;
  max-width: 520px;
}

.img-prod img {
  width: 100%;
  height: 650px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}


.infos {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: "Lexend Deca", sans-serif;
}

.infos h1 {
  color: #311111;
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.infos h2 {
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 2rem;
}

.detalhes {
  display: flex;
  flex-direction: column;
  gap: .8rem;
}

.detalhes p {
  font-size: 1.1rem;
  color: #444;
}



.acoes {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 3rem 0;
}

.btn-comprar {
  min-width: 260px;
  padding: 16px 180px;
  background: #311111;
  color: #f5e9e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: .3s;
}

.btn-comprar:hover {
  transform: scale(1.05);
}

.btn-favorito {
  width: 30px;
  height: 30px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .3s;
}

.btn-favorito:hover {
  transform: scale(1.05);
}



.descricao {
  margin-top: 1rem;
}

.descricao h3 {
  color: #311111;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.descricao p {
  font-size: 1.05rem;
  color: #555;
  line-height: 1.8;
  text-align: justify;
}

---------------- RESPONSIVO ----------------

@media (max-width: 900px) {

  .container {
    padding: 0 1.5rem 3rem;
  }

  .informacoes {
    flex-direction: column;
    gap: 2rem;
  }

  .img-prod {
    max-width: 100%;
  }

  .img-prod img {
    height: auto;
  }

  .infos h1 {
    font-size: 2rem;
  }

  .infos h2 {
    font-size: 1.6rem;
  }

  .acoes {
    flex-wrap: wrap;
  }

  .btn-comprar {
    flex: 1;
    min-width: 220px;
  }

}
  */
</style>
