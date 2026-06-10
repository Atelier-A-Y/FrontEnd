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

async function salvarProduto() {
  try {
    const resposta = await fetch(
      'http://localhost:8000/api/roupas/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: produto.value.nome,
          tamanho: produto.value.tamanho,
          cor: produto.value.cor,
          preco: produto.value.preco,
          descricao: produto.value.descricao
        })
      }
    )

    if (!resposta.ok) {
      throw new Error('Erro ao salvar')
    }

    const dados = await resposta.json()

    console.log(dados)

    alert('Produto cadastrado com sucesso!')

    router.push('/produtos')

  } catch (erro) {
    console.error(erro)
    alert('Erro ao cadastrar produto')
  }
}

</script>

<template>

   <main>
    <h1>Adicionar Produto</h1>

    <section class="fundo">
      <form class="form-container" @submit.prevent="salvarProduto">
       <!-- <div class="input-group">
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
        </div>-->

        <div class="input-group">
          <input type="text" maxlength="100" placeholder="Nome" v-model="produto.nome" />
        </div>

        <div class="input-group">
          <input type="text" maxlength="100" placeholder="Tamanho" v-model="produto.tamanho" />
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
