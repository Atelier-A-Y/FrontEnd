<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ColorPicker from '../components/ColorPicker.vue'

const router = useRouter()

const API_URL = 'https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br'

// Produto
const produto = ref({
  categoria: '',
  continente: '',
  nome: '',
  tamanho: '',
  cor: '',
  corNome: '',
  preco: '',
  descricao: '',
})

// Imagem
const imagem = ref(null)
const previewImagem = ref(null)

// Categorias, continentes e tamanhos vindos do banco
const categorias = ref([])
const continentes = ref([])
const tamanhos = ref([])

// Selecionar imagem
function selecionarImagem(event) {
  imagem.value = event.target.files[0]

  if (imagem.value) {
    previewImagem.value = URL.createObjectURL(imagem.value)
  }
}

// Buscar categorias do banco
async function carregarCategorias() {
  try {
    const resposta = await fetch(`${API_URL}/api/categorias/`)

    if (!resposta.ok) {
      throw new Error('Erro ao buscar categorias')
    }

    const dados = await resposta.json()

    categorias.value = dados.results || dados

    console.log('Categorias:', categorias.value)
  } catch (erro) {
    console.error('Erro ao carregar categorias:', erro)
  }
}

// Buscar continentes do banco
async function carregarContinentes() {
  try {
    const resposta = await fetch(`${API_URL}/api/continentes/`)

    if (!resposta.ok) {
      throw new Error('Erro ao buscar continentes')
    }

    const dados = await resposta.json()

    continentes.value = dados.results || dados

    console.log('Continentes:', continentes.value)
  } catch (erro) {
    console.error('Erro ao carregar continentes:', erro)
  }
}

// Buscar tamanhos do banco
async function carregarTamanhos() {
  try {
    const resposta = await fetch(`${API_URL}/api/tamanhos/`)

    if (!resposta.ok) {
      throw new Error('Erro ao buscar tamanhos')
    }

    const dados = await resposta.json()

    tamanhos.value = dados.results || dados

    console.log('Tamanhos:', tamanhos.value)
  } catch (erro) {
    console.error('Erro ao carregar tamanhos:', erro)
  }
}

// Salvar produto
async function salvarProduto() {
  try {
    let attachmentKey = null

    // Upload da imagem
    if (imagem.value) {
      const formData = new FormData()

      formData.append('file', imagem.value)

      const upload = await fetch(`${API_URL}/api/media/images/`, {
        method: 'POST',
        body: formData,
      })

      if (!upload.ok) {
        throw new Error('Erro ao enviar imagem')
      }

      const dadosImagem = await upload.json()

      attachmentKey = dadosImagem.attachment_key
    }

    // Cadastrar roupa
    const resposta = await fetch(`${API_URL}/api/roupas/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: produto.value.nome,
        categoria: produto.value.categoria,
        continente: produto.value.continente,
        tamanho: produto.value.tamanho,
        cor: produto.value.corNome,
        cor_hex: produto.value.cor,
        preco: produto.value.preco.toFixed(2).replace('.', ','),
        descricao: produto.value.descricao,
        foto_attachment_key: attachmentKey,
      }),
    })

    const dados = await resposta.json()

    console.log('Resposta do backend:', dados)

    if (!resposta.ok) {
      throw new Error('Erro ao salvar produto')
    }

    alert('Produto cadastrado com sucesso!')

    router.push('/produtos')
  } catch (erro) {
    console.error('Erro:', erro)
    alert('Erro ao cadastrar produto')
  }
}

// Carregar categorias e continentes quando a página abrir
onMounted(async () => {
  await carregarCategorias()
  await carregarContinentes()
  await carregarTamanhos()
})
</script>

<template>
  <main>
    <h1>Adicionar Produto</h1>

    <section class="fundo-prod">
      <form class="form-container" @submit.prevent="salvarProduto">
        <div class="conteudo-formulario">
          <!-- IMAGEM -->
          <div class="lado-imagem">
            <div class="input-group">
              <input type="file" accept="image/*" @change="selecionarImagem" />
            </div>

            <div v-if="previewImagem" class="preview-container">
              <img :src="previewImagem" alt="Pré-visualização" class="preview-imagem" />
            </div>
          </div>

          <!-- CAMPOS -->
          <div class="lado-campos">
            <!-- NOME -->
            <div class="input-group">
              <input type="text" maxlength="100" placeholder="Nome" v-model="produto.nome" />
            </div>

            <!-- CATEGORIA -->
            <div class="input-group">
              <label>Categoria:</label>

              <select v-model="produto.categoria">
                <option disabled value="">Selecione uma categoria</option>

                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                  {{ categoria.nome }}
                </option>
              </select>
            </div>

            <!-- CONTINENTE -->
            <div class="input-group">
              <label>Continente:</label>

              <select v-model="produto.continente">
                <option disabled value="">Selecione um continente</option>

                <option
                  v-for="continente in continentes"
                  :key="continente.id"
                  :value="continente.id"
                >
                  {{ continente.nome }}
                </option>
              </select>
            </div>

            <!-- TAMANHO -->
            <div class="input-group">
              <label>Tamanho:</label>

              <select v-model="produto.tamanho">
                <option disabled value="">Selecione um tamanho</option>

                <option v-for="tamanho in tamanhos" :key="tamanho.id" :value="tamanho.id">
                  {{ tamanho.nome }}
                </option>
              </select>
            </div>

            <!-- COR -->
            <div class="input-group">
              <color-picker
                v-model:pureColor="produto.cor"
                @update:colorName="produto.corNome = $event"
              />
            </div>

            <!-- PREÇO -->
            <div class="input-group">
              <input type="number" step="0.01" placeholder="Preço" v-model="produto.preco" />
            </div>

            <!-- DESCRIÇÃO -->
            <div class="input-group">
              <textarea placeholder="Descrição" v-model="produto.descricao"></textarea>
            </div>
          </div>
        </div>

        <!-- BOTÕES -->
        <div class="buttons">
          <button type="reset">Limpar</button>

          <button type="submit">Salvar</button>
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
