<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api/api";

const carrinho = ref<any[]>([]);

async function carregarCarrinho() {
  try {
    const resposta = await api.get(
      "/carrinho/"
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
    await api.delete(`/carrinho/${id}/`)

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

function totalCompra(){
  return carrinho.value.reduce((total, item) => {
    const preco = Number(item.roupa_detalhes?.preco || 0)
    const quantidade = Number(item.quantidade || 0)

    return total + preco * quantidade
  }, 0)
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

      <div class="total">
      <span>Total da compra</span>

      <strong>
        R$
        {{ totalCompra().toFixed(2).replace(".", ",") }}
      </strong>

      <button class="botao-finalizar">
      Finalizar compra
    </button>
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
.container-produtos {
  max-width: 1250px;
  margin: 0 auto;
}

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

.imagem-produto {
  width: 150px;
  height: 190px;

  object-fit: cover;
  border-radius: 8px;

  display: block;
}

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
  margin-left: 2vw;
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

.total {
max-width: 1250px;
  margin: 2rem auto 4rem;
  padding: 1.5rem 2rem;

  background-color: #f5e9e0;
  border: 1px solid #dfcec4;
  border-radius: 12px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.total span {
  color: #5f5757;
  font-size: 1rem;
}

.total strong {
  color: #277c00;
  font-size: 1.7rem;
}

.botao-finalizar {
  background-color: #311111;
  color: #f5e9e0;

  border: none;
  border-radius: 5px;

  padding: 12px 25px;

  font-size: 1rem;
  font-weight: bold;

  cursor: pointer;
  transition: 0.3s ease;
}

.botao-finalizar:hover {
  background-color: #5a1f1f;
  transform: scale(1.03);
}


/* ============================= */
/*        CARRINHO MOBILE        */
/* ============================= */

@media (max-width: 768px) {

  .produtos {
    width: 100%;
    min-height: 100vh;
    padding: 20px 14px 35px;
    box-sizing: border-box;
  }

  /* Lista de produtos */
  .container-produtos {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
  }

  /* Card individual */
  .card-produto {
    display: grid;
    grid-template-columns: 95px minmax(0, 1fr);
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

  /* Imagem do produto */
  .imagem-produto {
    width: 95px;
    height: 125px;

    object-fit: cover;
    object-position: center;

    border-radius: 8px;
    display: block;
  }

  /* Informações do produto */
  .infos {
    min-width: 0;
    text-align: left;
    align-self: start;
    padding-top: 5px;
  }

  .infos h2 {
    margin: 0 0 10px;

    color: #311111;
    font-size: 16px;
    line-height: 1.35;
    font-weight: 600;

    overflow-wrap: anywhere;
  }

  .infos p {
    margin: 0;

    color: #277c00;
    font-size: 15px;
    font-weight: 600;
  }

  /* Área dos controles:
     ocupa a segunda coluna, abaixo das informações */
  .card-produto > div:last-child {
    grid-column: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    min-width: 0;
    margin-top: -36px;
    align-self: end;
  }

  /* Quantidade */
  .quantidade {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

    margin: 0;
  }

  .quantidade p {
    min-width: 16px;
    margin: 0;

    color: #5f5757;
    font-size: 15px;
    text-align: center;
  }

  .quantidade button {
    width: 30px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 5px;
    border: 1px solid #dfcec4;
    border-radius: 6px;
    background: transparent;

    cursor: pointer;
  }

  .quantidade img {
    width: 14px;
    height: 14px;
    object-fit: contain;
  }

  /* Remover produto */
  .remover-carrinho {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;
    padding: 7px;

    border: none;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
  }

  .remover-carrinho img {
    width: 20px;
    height: 20px;
    margin: 0;
    object-fit: contain;
  }

  /* Total da compra */
  .total {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    margin: 22px 0 0;
    padding: 22px 18px;

    background-color: #f5e9e0;
    border: 1px solid #dfcec4;
    border-radius: 12px;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .total span {
    color: #5f5757;
    font-size: 15px;
    text-align: left;
  }

  .total strong {
    color: #277c00;
    font-size: 25px;
    text-align: left;
  }

  .botao-finalizar {
    width: 100%;
    min-height: 46px;
    box-sizing: border-box;

    margin-top: 8px;
    padding: 12px 16px;

    background-color: #311111;
    color: #f5e9e0;

    border: none;
    border-radius: 6px;

    font-size: 15px;
    font-weight: bold;

    cursor: pointer;
  }

  .botao-finalizar:hover {
    background-color: #311111;
    transform: none;
  }

  /* Carrinho vazio */
  .sem-produtos {
    width: 100%;
    box-sizing: border-box;

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
    text-align: center;
  }

  .sem-produtos .titulo h1 {
    font-size: 24px;
    margin: 0;
  }

  .sem-produtos .texto p {
    margin: 0;
    color: #5f5757;
    font-size: 14px;
    text-align: center;
  }

  .botao {
    width: 100%;
    max-width: 220px;
    min-height: 42px;
    height: auto;

    margin: 20px auto 0;
    padding: 10px;

    box-sizing: border-box;
  }

  .link {
    color: #f5e9e0;
    text-decoration: none;
    font-size: 14px;
  }
}
</style>
