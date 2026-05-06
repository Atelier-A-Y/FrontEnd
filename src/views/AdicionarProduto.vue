<script setup>

import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const produto = ref({

  categoria: "",
  continente: "",
  nome: "",
  tamanho: "",
  cor: "",
  preco: "",
  descricao: ""

})

function salvarProduto() {

  const produtosSalvos =
    JSON.parse(localStorage.getItem("produtos")) || []

  produtosSalvos.push({

    ...produto.value

  })

  localStorage.setItem(
    "produtos",
    JSON.stringify(produtosSalvos)
  )

  router.push('/produtos')

}

</script>

<template>

   <main>
    <h1>Adicionar Produto</h1>

    <section class="fundo">
      <form class="form-container" @submit.prevent="salvarProduto">
        <div class="input-group">
          <label>Categoria:</label>

          <select v-model="produto.categoria">
            <option>Vestidos de Festas</option>
            <option>Vestidos de Madrinhas</option>
            <option>Vestidos de Casamento</option>
            <option>Vestidos de Formatura</option>
            <option>Ternos Femininos</option>
          </select>
        </div>


        <div class="input-group">
          <label>Continente:</label>

          <select v-model="produto.continente">
            <option>América</option>
            <option>África</option>
            <option>Ásia</option>
            <option>Europa</option>
            <option>Oceania</option>
          </select>
        </div>

        <div class="input-group">
          <input type="text" maxlength="100" placeholder="Nome" v-model="produto.nome" />
        </div>

        <div class="input-group">
          <label>Tamanho:</label>

          <select v-model="produto.tamanho">
            <option>PP</option>
            <option>P</option>
            <option>M</option>
            <option>G</option>
            <option>GG</option>
            <option>XG</option>
            <option>XGG</option>
            <option>EG</option>
            <option>EGG</option>
          </select>
        </div>

        <div class="input-group">
          <input type="text" maxlength="30" placeholder="Cor" v-model="produto.cor" />
        </div>

        <div class="input-group">
          <input type="number" step="0.01" placeholder="Preço" v-model="produto.preco" />
        </div>

        <div class="input-group">
          <textarea placeholder="Descrição" v-model="produto.descricao"></textarea>
        </div>

        <div class="buttons">
          <button type="reset">Limpar</button>

          <button type="submit"> Salvar</button>
        </div>
      </form>
    </section>

  </main>

</template>

<style scoped>

h1 {
  color: #311111;
  font-weight: bold;
  margin-top: 3vw;
  margin-bottom: 3vw;
  text-align: center;
}

.fundo {
  background-color: #f5e9e0;
  border: #311111 solid 0.8px;
  border-radius: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  margin: 0vw 13vw 1.2vw 13vw;

}

.form-container {
  width: 350px;
}

.input-group {
  margin-bottom: 15px;
}

input,
textarea,
select,
button {
  font-family: Arial, sans-serif;
}

input,
textarea,
select {
  width: 100%;
  padding: 12px 15px;
  border: none;
  border-radius: 12px;
  background-color: #fefefe;
  font-size: 14px;
  outline: none;
}

textarea {
  resize: none;
  height: 80px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #5a3d36;
  background-color: transparent;
  cursor: pointer;
}

button:hover {
  background-color: #e7e7e7;
}

</style>
