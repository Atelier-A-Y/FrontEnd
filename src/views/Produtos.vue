<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api";

const router = useRouter();

const produtos = ref<any[]>([]);

async function carregarProdutos() {
  try {
    const resposta = await fetch("https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/roupas/");

    const dados = await resposta.json();

    console.log(produtos.value);

    produtos.value = dados.results || dados;
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}

function abrirProdutos(id) {
  router.push(`/info_prod/${id}`)
}

const favoritosMobile = ref<number[]>([])

async function carregarFavoritosMobile() {
  try {
    const respostaMobile = await api.get("/favoritos/")
    const listaMobile = respostaMobile.data.results || respostaMobile.data

    favoritosMobile.value = listaMobile
      .map((item: any) => {
        if (typeof item.roupa === "number"){
          return item.roupa
        }

        if(item.roupa?.id){
          return item.roupa.id
        }

        return null
      })
      .filter((id: any) => id !== null)

    console.log("IDs DOS FAVORITOS:", favoritosMobile.value)

  } catch (erro: any) {
    console.error("ERRO AO CARREGAR FAVORITOS:", erro)

    if(erro.response){
      console.log("STATUS:", erro.response.status)
      console.log("DADOS:", erro.response.data)
    }
  }
}

async function alterarFavMobile(id: number) {

  console.log("ID DA ROUPA SELECIONADA:", id)

  if(!id){
    console.error("Essa roupa não possui ID")
    return
  }
  
  try {
    const respostaMobile = await api.get("/favoritos/")
    const listaMobile = respostaMobile.data.results || respostaMobile.data

    console.log("FAVORITOS DO USUÁRIO:", listaMobile)

    const favoritoExistenteMobile = listaMobile.find((item: any) => {
      if(typeof item.roupa === "number"){
        return item.roupa === id
      }
      return item.roupa?.id === id
    })

    if(favoritoExistenteMobile){
      console.log("REMOVENDO FAVORITO:", favoritoExistenteMobile.id)

      await api.delete(`/favoritos/${favoritoExistenteMobile.id}/`)

      favoritosMobile.value = favoritosMobile.value.filter(
        favoritoMobileId => favoritoMobileId !== id
      )
      console.log("FAVORITO REMOVIDO")
    }
  
    else {
      console.log("ADICIONANDO ROUPA:", id)

      await api.post("/favoritos/", {
        roupa: id
      })

      favoritosMobile.value.push(id)

      console.log("FAVORITO ADICIONADO!")
    }
  } catch (erro: any) {
    console.error("ERRO AO ALTERAR FAVORITO:", erro)

    if (erro.response) {
      console.log("STATUS:", erro.response.status)
      console.log("DADOS:", erro.response.data)
    }
  }
}


function ehFavoritoMobile(id: number) {
  return favoritosMobile.value.includes(id)
}

onMounted(() => {
  carregarProdutos();
  carregarFavoritosMobile()
});
</script>

<template>
  <main>
    <section class="produtos">
    <h1>Produtos</h1>

    <section class="container-produtos" v-if="produtos.length > 0">
      <div class="card-produto" v-for="item in produtos" :key="item.id" @click="abrirProdutos(item.id)">

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
      <h2>Nenhum produto cadastrado.</h2>
    </section>
    </section>


     <section class="produtos-mobile">
      <h1>Produtos</h1>

      <section class="container-produtos-mobile" v-if="produtos.length > 0">
        <div class="card-produto-mobile" v-for="item in produtos" :key="item.id" @click="abrirProdutos(item.id)">

          <img
            v-if="item.foto"
            :src="item.foto.url"
            :alt="item.nome"
            class="imagem-produto-mobile"
          />

          <h2>{{ item.nome }}</h2>

          <p>
            <strong>Preço:</strong>

            R$
            {{ Number(item.preco).toFixed(2).replace(".", ",") }}
          </p>

          <button
                class="favorito-card-mobile"
                @click.stop="alterarFavMobile(item.id)"
              >

                <img
                  :src="
                    ehFavoritoMobile(item.id)
                      ? '/img/coracao-cheio.png'
                      : '/img/coracao-solido.png'
                  "
                  alt="Favoritar"
                >
          </button>
        </div>
      </section>

      <section v-else class="sem-produtos-mobile">
        <h2>Nenhum produto cadastrado.</h2>
      </section>
    </section>
  </main>
</template>

<style scoped>
.produtos-mobile{
  display: none;
}

.produtos {
  padding: 1rem;
  margin-top: 5vw;
  min-height: 100vh;
  display: block;
}

.produtos h1 {
  text-align: center;
  color: #311111;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  position: relative;
}

.produtos h1::after {
  content: "";
  width: 8vw;
  height: 0.3vw;
  background: #311111;
  border-radius: 10px;

  position: absolute;
  left: 50%;
  bottom: -1vw;

  transform: translateX(-50%);
}

.container-produtos {
  display: grid;

  grid-template-columns: repeat(
    auto-fit,
    minmax(18vw, 1fr)
  );

  gap: 2rem;

  max-width: 100vw;
  margin: 0 auto;
}

.card-produto {
  background-color: #F5E9E0;

  border-radius: 1.2rem;

  padding: 1.2rem;

  border: 0.1vw solid rgba(49, 17, 17, 0.15);

  overflow: hidden;

  transition: all 0.3s ease;

  box-shadow: 0 0.3vw 1vw rgba(0, 0, 0, 0.08);
}

.card-produto:hover {
  transform: translateY(-0.4vw);

  box-shadow: 0 1vw 2vw rgba(49, 17, 17, 0.15);
}

.imagem-produto {
  width: 100%;

  height: 25vw;

  object-fit: cover;

  border-radius: 1rem;

  margin-bottom: 1rem;

  transition: transform 0.4s ease;
}

.card-produto:hover .imagem-produto {
  transform: scale(1.05);
}

.card-produto h2 {
  color: #311111;

  font-size: 1.3rem;

  margin-bottom: 0.8rem;

  font-weight: 600;
}

.card-produto p {
  color: #444444;

  margin-bottom: 0.5rem;

  line-height: 1.5;
}

.card-produto strong {
  color: #311111;
}

.preco {
  font-size: 1.4rem;

  font-weight: bold;

  color: #311111;

  margin-top: 1rem;

  padding-top: 1rem;

  border-top: 0.1vw solid rgba(49, 17, 17, 0.15);
}

.sem-produtos {
  text-align: center;

  margin-top: 4rem;

  color: #666;
}

.sem-produtos h2 {
  font-size: 1.5rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .produtos{
    display: none;
  }

  .produtos-mobile {
    padding: 1rem 0rem;
    margin-top: 5vw;
    display: block;
  }

  .produtos-mobile h1 {
    text-align: center;
    color: #311111;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    position: relative;
  }

  .produtos-mobile h1::after {
    content: "";
    width: 18vw;
    height: 0.3vw;
    background: #311111;
    border-radius: 10px;

    position: absolute;
    left: 50%;
    bottom: -1vw;

    transform: translateX(-50%);
  }

  .container-produtos-mobile {
    display: grid;

    grid-template-columns: repeat(
      2,
      minmax(0, 1fr)
    );

    gap: 2rem 1.5rem;
    width: 100%;
    margin: 0 auto;
  }

  .card-produto-mobile {
    background-color: #F5E9E0;

    border-radius: 0.5rem;

    width: 100%;
    padding: 0;

    border: none;

    overflow: hidden;

    box-shadow: 0 0.3vw 1vw rgba(0, 0, 0, 0.08);
  }

  .imagem-produto-mobile {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .card-produto-mobile h2 {
    color: #311111;

    font-size: 1rem;

    margin: 0 0 2.5vw 2.5vw;
    font-weight: 600;
  }

    .card-produto-mobile p {
      font-size: 0.7rem;
      line-height: 1;
      margin: 0 0.45rem 1.5rem;
      color: #311111;
    }

    .favorito-card-mobile {
    background: transparent;
    border: none;

    padding: 0;
    margin: 0;

    width: 9vw;
    height: 9vw;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    flex-shrink: 0;
  }

  .favorito-card-mobile img {
    width: 8vw;
    height: 8vw;

    object-fit: contain;
    display: block;
  }

    .sem-produtos-mobile {
      margin-top: 2rem;
    }

    .sem-produtos-mobile h2 {
      font-size: 1rem;
    }
}
</style>
