<script setup>
import { ref } from "vue";
import api from "../api/api";
import { useRouter } from "vue-router";

const API_URL = 'https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br'

const produto = ref({
  categoria: [], // Alterado para Array para suportar múltiplas seleções
  nome: '',
  tamanho: '',
  cor: '',
  corNome: '',
  preco: '',
  descricao: '',
})

const imagem = ref(null)
const previewImagem = ref(null)

const categorias = ref([])
const tamanhos = ref([])

function selecionarImagem(event) {
  imagem.value = event.target.files[0]

  if (imagem.value) {
    previewImagem.value = URL.createObjectURL(imagem.value)
  }
}

async function carregarCategorias() {
  try {
    const resposta = await axios.get(`${API_URL}/api/categorias/`)
    categorias.value = resposta.data.results || resposta.data
    console.log('Categorias:', categorias.value)
  } catch (erro) {
    console.error('Erro detalhado ao carregar categorias:', erro.response || erro.message)
  }
}

async function carregarTamanhos() {
  try {
    const resposta = await axios.get(`${API_URL}/api/tamanhos/`)
    tamanhos.value = resposta.data.results || resposta.data
    console.log('Tamanhos:', tamanhos.value)
  } catch (erro) {
    console.error('Erro detalhado ao carregar tamanhos:', erro.response || erro.message)
  }
}

async function salvarProduto() {
  try {
    let attachmentKey = null

    if (imagem.value) {
      const formData = new FormData()
      formData.append('file', imagem.value)

      const upload = await api.post(
        '/media/images/',
        {
          method: 'POST',
          body: formData
        }
      )

      const dadosImagem = await upload.json()

      const dadosImagem = upload.data
      attachmentKey = dadosImagem.attachment_key
    }

   const resposta = await api.post(
  '/roupas/',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: produto.value.nome,
      categoria: produto.value.categoria, // Envia o array com as IDs das categorias selecionadas
      tamanho: produto.value.tamanho,
      cor: produto.value.corNome,
      cor_hex: produto.value.cor,
      preco: precoNumerico.toFixed(2),
      descricao: produto.value.descricao,
      foto_attachment_key: attachmentKey,
    })

    console.log('Resposta do backend:', resposta.data)

    alert('Produto cadastrado com sucesso!')

    router.push('/produtos')
  } catch (erro) {
    console.error('Erro:', erro.response || erro)
    const mensagemErro = erro.response?.data?.message || 'Erro ao cadastrar produto'
    alert(mensagemErro)
  }
}

onMounted(async () => {
  await carregarCategorias()
  await carregarTamanhos()
})
</script>

<template>
  <main>
    <h1>Adicionar Produto</h1>

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

    <section class="fundo-prod">
      <form class="form-container" @submit.prevent="salvarProduto">
        <div class="conteudo-formulario">
          <div class="lado-imagem">
            <div class="input-group">
              <input type="file" accept="image/*" @change="selecionarImagem" />
            </div>

            <div v-if="previewImagem" class="preview-container">
              <img :src="previewImagem" alt="Pré-visualização" class="preview-imagem" />
            </div>
          </div>

          <div class="lado-campos">
            <div class="input-group">
              <input type="text" maxlength="100" placeholder="Nome" v-model="produto.nome" />
            </div>

            <div class="input-group">
              <label>Categorias (Segure Ctrl / Cmd para selecionar mais de uma):</label>

              <!-- Adicionado o atributo 'multiple' -->
              <select v-model="produto.categoria" multiple class="select-multiplo">
                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                  {{ categoria.nome }}
                </option>
              </select>
            </div>

            <div class="input-group">
              <label>Tamanho:</label>

              <select v-model="produto.tamanho">
                <option disabled value="">Selecione um tamanho</option>

                <option v-for="tamanho in tamanhos" :key="tamanho.id" :value="tamanho.id">
                  {{ tamanho.nome }}
                </option>
              </select>
            </div>

            <div class="input-group">
              <color-picker
                v-model:pureColor="produto.cor"
                @update:colorName="produto.corNome = $event"
              />
              <input
                type="text"
                maxlength="7"
                placeholder="Hex"
                v-model="produto.cor"
                class="hex"
              />
            </div>

            <div class="input-group">
              <input type="number" step="0.01" placeholder="Preço" v-model="produto.preco" />
            </div>

            <div class="input-group">
              <textarea placeholder="Descrição" v-model="produto.descricao"></textarea>
            </div>
          </div>
        </div>

        <div class="buttons">
          <button type="reset">Limpar</button>

          <button type="submit">Salvar</button>
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

.hex {
  margin-top: 1rem;
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

/* Estilo ajustado para visualização do select múltiplo */
.select-multiplo {
  height: 120px;
  padding: 0.5rem;
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
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(49, 17, 17, 0.15);
}

.buttons button {
  padding: 0.8rem 2rem;
  border-radius: 0.7rem;
  transition: 0.3s;
  border: 0.1vw solid #311111;
  cursor: pointer;
  color: #311111;
}

.buttons button:hover {
  background: #311111;
  color: #f5e9e0;
}
</style>
