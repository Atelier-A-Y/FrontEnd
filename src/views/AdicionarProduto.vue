<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

const produto = ref({
  categoria: "",
  continente: "",
  nome: "",
  tamanho: "",
  cor: "",
  preco: "",
  descricao: "",
});

const imagem = ref(null);
const previewImagem = ref(null);

function selecionarImagem(event) {
  imagem.value = event.target.files[0];

  if (imagem.value) {
    previewImagem.value = URL.createObjectURL(imagem.value);
  }
}

async function salvarProduto() {
  try {

    let attachmentKey = null

    if (imagem.value) {

      const formData = new FormData()

      formData.append('file', imagem.value)

      const upload = await fetch(
        'https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/media/images/',
        {
          method: 'POST',
          body: formData
        }
      )

      const dadosImagem = await upload.json()

      attachmentKey = dadosImagem.attachment_key
    }

   const resposta = await fetch(
  'https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api/roupas/',
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
      descricao: produto.value.descricao,
      foto_attachment_key: attachmentKey
    })
  }
)

const dados = await resposta.json()

console.log(dados)

    if (!resposta.ok) {
      throw new Error('Erro ao salvar')
    }

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
<section class="fundo-prod">
  <form class="form-container" @submit.prevent="salvarProduto">

    <div class="conteudo-formulario">

      <div class="lado-imagem">

        <div class="input-group">
          <input
            type="file"
            accept="image/*"
            @change="selecionarImagem"
          />
        </div>

        <div v-if="previewImagem" class="preview-container">
          <img
            :src="previewImagem"
            alt="Pré-visualização"
            class="preview-imagem"
          />
        </div>

      </div>

      <div class="lado-campos">

        <div class="input-group">
          <input
            type="text"
            maxlength="100"
            placeholder="Nome"
            v-model="produto.nome"
          />
        </div>

        <div class="input-group">
          <input
            type="text"
            maxlength="100"
            placeholder="Tamanho"
            v-model="produto.tamanho"
          />
        </div>

        <div class="input-group">
          <input
            type="text"
            maxlength="30"
            placeholder="Cor"
            v-model="produto.cor"
          />
        </div>

        <div class="input-group">
          <input
            type="number"
            step="0.01"
            placeholder="Preço"
            v-model="produto.preco"
          />
        </div>

        <div class="input-group">
          <textarea
            placeholder="Descrição"
            v-model="produto.descricao"
          ></textarea>
        </div>

      </div>

    </div>

    <div class="buttons">
      <button type="reset">
        Limpar
      </button>

      <button type="submit">
        Salvar
      </button>
    </div>

  </form>
</section>
  </main>
</template>

<style scoped>
main {
  margin-top: 7vw;
}

h1 {
  color: #311111;
  font-weight: bold;
  margin: 3vw 0;
  text-align: center;
}

.fundo-prod {
  background-color: #f5e9e0;
  border: 0.8px solid #311111;
  border-radius: 1.7rem;

  padding: 2vw;

  margin: 0 10vw 2vw;
}

.form-container {
  width: 100%;
}

.conteudo-formulario {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.lado-imagem {
  width: 35%;
}

.lado-campos {
  flex: 1;
}

.input-group {
  margin-bottom: 1rem;
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
  padding: 1rem;

  border: none;
  border-radius: 1rem;

  background-color: #fff;

  font-size: 0.9rem;

  outline: none;
}

textarea {
  resize: none;
  height: 10rem;
}

.preview-container {
  width: 100%;
  height: 450px;

  margin-top: 1rem;

  border-radius: 1rem;

  overflow: hidden;

  background: white;

  border: 1px solid rgba(49, 17, 17, 0.2);

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.preview-imagem {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  margin-top: 2rem;

  padding-top: 1.5rem;

  border-top: 1px solid rgba(49, 17, 17, 0.15);
}

.buttons {
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  color: #311111;
  gap: 2rem;
  padding: 0.8rem 2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
}

.buttons button {
  padding: 0.8rem 2rem;
  border-radius: 0.7rem;
  transition: 0.3s;
  border: 0.1vw solid #311111;
}

.buttons button:hover {
  background: #311111;
  color: #f5e9e0;
}

@media (max-width: 768px) {

  .conteudo-formulario {
    flex-direction: column;
  }

  .lado-imagem,
  .lado-campos {
    width: 100%;
  }

  .preview-container {
    height: 300px;
  }

  .buttons {
    justify-content: center;
  }
}
</style>
