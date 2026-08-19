<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import api from "../api/api";

const route = useRoute();
const router = useRouter();
const favorito = ref(false)
const produto = ref<any>(null);
const authStore = useAuthStore();

async function alterarFav(id: number) {
  try {
    const resposta = await api.get("/favoritos/");

    const favoritos = resposta.data.results || resposta.data;

    console.log("FAVORITOS:", favoritos);

    const favoritoExistente = favoritos.find(
      (item: any) => item.roupa?.id === id
    );

    console.log("FAVORITO EXISTENTE:", favoritoExistente);

    if (favoritoExistente) {
      await api.delete(`/favoritos/${favoritoExistente.id}/`);

      favorito.value = false;

      console.log("FAVORITO REMOVIDO!");

    } else {
      await api.post("/favoritos/", {
        roupa: id
      });

      favorito.value = true;

      console.log("FAVORITO ADICIONADO!");
    }

  } catch (erro: any) {
    console.error("ERRO AO ALTERAR FAVORITO:", erro);

    if (erro.response) {
      console.log("STATUS:", erro.response.status);
      console.log("DADOS:", erro.response.data);
    }
  }
}

async function verificarFavorito(id: number) {
  try {
    const resposta = await api.get("/favoritos/");

    const favoritos = resposta.data.results || resposta.data;

    favorito.value = favoritos.some(
      (item: any) => item.roupa?.id === id
    );

    console.log("FAVORITO ESTÁ ATIVO?", favorito.value);

  } catch (erro) {
    console.error("Erro ao verificar favorito:", erro);
  }
}

async function adicionarCarrinho() {
  try {
    await api.post(
      "https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/carrinho/",
      {
        roupa: produto.value.id,
        quantidade: 1,
      }
    );

    router.push("/carrinho");

  } catch (error: any) {
    console.error("Erro ao adicionar ao carrinho:", error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Resposta completa:", error.response.data);
      console.log("Erro usuario:", error.response.data.usuario);
      console.log("Mensagem:", error.response.data.usuario?.[0]);
    }
  }
}

async function carregarProduto() {
  const id = route.params.id;

  const response = await api.get(
    `https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/roupas/${id}/`
  );

  produto.value = response.data;
}

function voltarProd() {
  router.push("/produtos");
}

onMounted(async () => {
  await carregarProduto();

  if (produto.value) {
    await verificarFavorito(produto.value.id);
  }
});
</script>

<template>
  <button class="voltar" @click="voltarProd"><img src="/public/img/flecha.png" alt="flecha"></button>

  <div v-if="produto" class="container">
    <div class="informacoes">

      <div class="img-prod">
        <img
          v-if="produto.foto"
          :src="produto.foto.url"
          :alt="produto.nome"
        />
      </div>

      <div class="infos">

        <h1>{{ produto.nome }}</h1>

        <h2>R$ {{ produto.preco }}</h2>

        <div class="detalhes">
          <p><strong>Tamanho:</strong> {{ produto.tamanho.nome }}</p>
          <p><strong>Cor:</strong> {{ produto.cor }}</p>
        </div>

        <div class="acoes">

          <button class="btn-carrinho" @click="adicionarCarrinho">
            Adicionar ao Carrinho
          </button>

         <button
            class="btn-favorito"
            @click="alterarFav(produto.id)"
          >
            <img
              :src="
                favorito
                  ? '/img/coracao-cheio.png'
                  : '/img/coracao-solido.png'
              "
              alt="Favorito"
            />
          </button>

        </div>

        <div class="descricao">
          <h3>Descrição</h3>

          <p>{{ produto.descricao }}</p>
        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* ---------------- BOTÃO VOLTAR ---------------- */

.voltar {
  width: 3vw;
  height: 2vw;
  margin: 6rem 0 2rem 5%;
  cursor: pointer;
  transition: 0.3s;
}

.voltar:hover {
  transform: translateX(-10px);
}

/* ---------------- CONTAINER ---------------- */

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

/* ---------------- IMAGEM ---------------- */

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
/* ---------------- INFOS ---------------- */

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

/* ---------------- BOTÕES ---------------- */

.acoes {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 3rem 0;
}

.btn-carrinho {
  min-width: 260px;
  padding: 16px 160px;
  background: #311111;
  color: #f5e9e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: .3s;
}

.btn-carrinho:hover {
  background-color: #5a1f1f;
  transform: scale(1.05);
}

.btn-carrinho:active {
  background-color: #7a2d2d;
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

/* ---------------- DESCRIÇÃO ---------------- */

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

/* ---------------- RESPONSIVO ---------------- */

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
</style>
