<script setup>
import { ref, onMounted } from "vue";

const produtos = ref([]);

async function carregarProdutos() {
  try {
    const resposta = await fetch("http://localhost:8000/api/roupas/");

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
  <main>
    <h1>Produtos</h1>

    <section class="container-produtos" v-if="produtos.length > 0">
      <div class="card-produto" v-for="item in produtos" :key="item.id">
        <h2>{{ item.nome }}</h2>

        <img
          v-if="item.foto"
          :src="item.foto.file"
          :alt="item.nome"
          class="imagem-produto"
        />
        <!--<p>

          <strong>Categoria:</strong>

          {{ item.categoria }}

        </p>

        <p>

          <strong>Continente:</strong>

          {{ item.continente }}

        </p>-->

        <p>
          <strong>Tamanho:</strong>

          {{ item.tamanho }}
        </p>

        <p>
          <strong>Cor:</strong>

          {{ item.cor }}
        </p>

        <p>
          <strong>Preço:</strong>

          R$
          {{ Number(item.preco).toFixed(2).replace(".", ",") }}
        </p>

        <p>
          <strong>Descrição:</strong>

          {{ item.descricao }}
        </p>

        <!--<button @click="excluirProduto(index)">
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
main {
  padding: 30px;
}

h1 {
  text-align: center;
  color: #311111;
  margin-bottom: 30px;
}

.container-produtos {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  gap: 20px;
}

.card-produto {
  background-color: #f5e9e0;

  border-radius: 1.2rem;

  padding: 20px;

  border: 1px solid #31111133;
}

.card-produto h2 {
  margin-bottom: 15px;

  color: #311111;
}

.card-produto p {
  margin-bottom: 10px;
}

button {
  margin-top: 15px;

  padding: 10px 15px;

  border: none;

  border-radius: 10px;

  cursor: pointer;

  background-color: #311111;

  color: white;
}

button:hover {
  opacity: 0.9;
}

.sem-produtos {
  text-align: center;

  margin-top: 50px;

  color: #555;
}
.imagem-produto {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
}
</style>
