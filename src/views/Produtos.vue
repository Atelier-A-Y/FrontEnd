<script setup>
import { ref, onMounted } from "vue";

const produtos = ref([]);

async function carregarProdutos() {
  try {
    const resposta = await fetch("https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/roupas/");

    const dados = await resposta.json();

    console.log(dados);

    produtos.value = dados.results || dados;
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
  }
}

onMounted(() => {
  carregarProdutos();
});

// excluir produto
/*function excluirProduto(index) {

  produtos.value.splice(index, 1)

  localStorage.setItem(
    "produtos",
    JSON.stringify(produtos.value)
  )

}*/
</script>

<template>
  <main class="produtos">
    <h1>Produtos</h1>

    <section class="container-produtos" v-if="produtos.length > 0">
      <div class="card-produto" v-for="item in produtos" :key="item.id">

        <img
          v-if="item.foto"
          :src="item.foto.url"
          :alt="item.nome"
          class="imagem-produto"
        />

        <h2>{{ item.nome }}</h2>
        <!--<p>

          <strong>Categoria:</strong>

          {{ item.categoria }}

        </p>

        <p>

          <strong>Continente:</strong>

          {{ item.continente }}

        </p>

        <p>
          <strong>Tamanho:</strong>

          {{ item.tamanho }}
        </p>

        <p>
          <strong>Cor:</strong>

          {{ item.cor }}
        </p>-->

        <p>
          <strong>Preço:</strong>

          R$
          {{ Number(item.preco).toFixed(2).replace(".", ",") }}
        </p>

        <!--<p>
          <strong>Descrição:</strong>

          {{ item.descricao }}
        </p>

        <button @click="excluirProduto(index)">
          Excluir
        </button>-->
      </div>
    </section>

    <section v-else class="sem-produtos">
      <h2>Nenhum produto cadastrado.</h2>
    </section>
  </main>
</template>

<style scoped>
.produtos {
  padding: 2rem;
  margin-top: 5vw;
  min-height: 100vh;
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
    minmax(19vw, 1fr)
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

@media (max-width: 1024px) {
  .container-produtos {
    grid-template-columns: repeat(
      auto-fit,
      minmax(250px, 1fr)
    );
  }

  .imagem-produto {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .produtos {
    padding: 1rem;
    margin-top: 5rem;
  }

  .produtos h1 {
    font-size: 2rem;
  }

  .container-produtos {
    gap: 1.2rem;
  }

  .imagem-produto {
    height: 260px;
  }

  .card-produto h2 {
    font-size: 1.1rem;
  }

  .preco {
    font-size: 1.2rem;
  }
}
</style>
