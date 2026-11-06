```vue
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import api from "../api/api";
import { useRouter } from "vue-router";

const router = useRouter();

// Dados do produto
const produto = ref({
  categoria: [],
  continente: "",
  nome: "",
  tamanho: "",
  cor: "#311111",
  corNome: "",
  preco: "",
  descricao: "",
});

// Imagem
const imagem = ref(null);
const previewImagem = ref(null);

// Opções carregadas do backend
const categorias = ref([]);
const tamanhos = ref([]);

let urlImagemAnterior = null;

// Selecionar imagem e criar pré-visualização
function selecionarImagem(event) {
  const arquivo = event.target.files?.[0];

  if (!arquivo) return;

  if (urlImagemAnterior) {
    URL.revokeObjectURL(urlImagemAnterior);
  }

  imagem.value = arquivo;
  urlImagemAnterior = URL.createObjectURL(arquivo);
  previewImagem.value = urlImagemAnterior;
}

// Carregar categorias
async function carregarCategorias() {
  try {
    const resposta = await api.get("/categorias/");

    categorias.value = resposta.data.results ?? resposta.data;
  } catch (erro) {
    console.error("Erro ao carregar categorias:", erro.response?.data || erro);
    alert("Não foi possível carregar as categorias.");
  }
}

// Carregar tamanhos
async function carregarTamanhos() {
  try {
    const resposta = await api.get("/tamanhos/");

    tamanhos.value = resposta.data.results ?? resposta.data;
  } catch (erro) {
    console.error("Erro ao carregar tamanhos:", erro.response?.data || erro);
    alert("Não foi possível carregar os tamanhos.");
  }
}

// Limpar o formulário
function limparFormulario() {
  produto.value = {
    categoria: [],
    continente: "",
    nome: "",
    tamanho: "",
    cor: "#311111",
    corNome: "",
    preco: "",
    descricao: "",
  };

  imagem.value = null;
  previewImagem.value = null;

  if (urlImagemAnterior) {
    URL.revokeObjectURL(urlImagemAnterior);
    urlImagemAnterior = null;
  }

  const campoImagem = document.querySelector('input[type="file"]');

  if (campoImagem) {
    campoImagem.value = "";
  }
}

// Cadastrar produto
async function salvarProduto() {
  try {
    if (!produto.value.nome.trim()) {
      alert("Informe o nome do produto.");
      return;
    }

    if (produto.value.categoria.length === 0) {
      alert("Selecione pelo menos uma categoria.");
      return;
    }

    if (!produto.value.tamanho) {
      alert("Selecione um tamanho.");
      return;
    }

    const precoNumerico = Number(produto.value.preco);

    if (
      produto.value.preco === "" ||
      !Number.isFinite(precoNumerico) ||
      precoNumerico < 0
    ) {
      alert("Informe um preço válido.");
      return;
    }

    // Enviar a imagem, se houver
    let attachmentKey = null;

    if (imagem.value) {
      const formData = new FormData();
      formData.append("file", imagem.value);

      const upload = await api.post("/media/images/", formData);

      attachmentKey = upload.data.attachment_key;

      if (!attachmentKey) {
        throw new Error("O servidor não retornou a chave da imagem.");
      }
    }

    // Enviar os dados do produto
    const dadosProduto = {
      nome: produto.value.nome.trim(),
      categoria: produto.value.categoria,
      tamanho: produto.value.tamanho,
      cor: produto.value.corNome || produto.value.cor,
      cor_hex: produto.value.cor,
      preco: precoNumerico.toFixed(2),
      descricao: produto.value.descricao.trim(),
      foto_attachment_key: attachmentKey,
    };

    const resposta = await api.post("/roupas/", dadosProduto);

    console.log("Produto cadastrado:", resposta.data);

    alert("Produto cadastrado com sucesso!");

    limparFormulario();
  } catch (erro) {
    console.error(
      "Erro ao cadastrar produto:",
      erro.response?.data || erro
    );

    const dadosErro = erro.response?.data;

    const mensagemErro =
      typeof dadosErro === "string"
        ? dadosErro
        : dadosErro?.detail ||
          dadosErro?.message ||
          (dadosErro ? JSON.stringify(dadosErro) : null) ||
          erro.message ||
          "Erro ao cadastrar produto.";

    alert(mensagemErro);
  }
}

onMounted(() => {
  carregarCategorias();
  carregarTamanhos();
});

onUnmounted(() => {
  if (urlImagemAnterior) {
    URL.revokeObjectURL(urlImagemAnterior);
  }
});
</script>

<template>
  <main class="pagina-produto">
    <h1>Adicionar Produto</h1>

    <section class="fundo-prod">
      <form
        class="form-container"
        @submit.prevent="salvarProduto"
      >
        <div class="conteudo-formulario">
          <!-- Área da imagem -->
          <div class="lado-imagem">
            <label class="label-imagem">
              Imagem do produto
            </label>

            <div class="input-group">
              <input
                type="file"
                accept="image/*"
                @change="selecionarImagem"
              />
            </div>

            <div
              v-if="previewImagem"
              class="preview-container"
            >
              <img
                :src="previewImagem"
                alt="Pré-visualização do produto"
                class="preview-imagem"
              />
            </div>

            <div
              v-else
              class="preview-vazio"
            >
              <span>Selecione uma imagem</span>
            </div>
          </div>

          <!-- Área dos campos -->
          <div class="lado-campos">
            <div class="input-group">
              <label for="nome">Nome do produto</label>

              <input
                id="nome"
                type="text"
                maxlength="100"
                placeholder="Nome"
                v-model="produto.nome"
                required
              />
            </div>

            <div class="input-group">
              <label for="categoria">
                Categorias
              </label>

              <select
                id="categoria"
                v-model="produto.categoria"
                multiple
                class="select-multiplo"
                required
              >
                <option
                  v-for="categoria in categorias"
                  :key="categoria.id"
                  :value="categoria.id"
                >
                  {{ categoria.nome }}
                </option>
              </select>

              <small>
                Segure Ctrl ou Cmd para selecionar mais de uma.
              </small>
            </div>

            <div class="input-group">
              <label for="tamanho">Tamanho</label>

              <select
                id="tamanho"
                v-model="produto.tamanho"
                required
              >
                <option disabled value="">
                  Selecione um tamanho
                </option>

                <option
                  v-for="tamanho in tamanhos"
                  :key="tamanho.id"
                  :value="tamanho.id"
                >
                  {{ tamanho.nome }}
                </option>
              </select>
            </div>

            <div class="input-group">
              <label>Cor do produto</label>

              <div class="grupo-cor">
                <color-picker
                  v-model:pureColor="produto.cor"
                  @update:colorName="produto.corNome = $event"
                />

                <input
                  type="text"
                  maxlength="7"
                  placeholder="#311111"
                  v-model="produto.cor"
                  class="campo-hex"
                />
              </div>
            </div>

            <div class="input-group">
              <label for="preco">Preço (R$)</label>

              <input
                id="preco"
                type="number"
                min="0"
                step="0.01"
                placeholder="Ex.: 1200.00"
                v-model="produto.preco"
                required
              />
            </div>

            <div class="input-group">
              <label for="descricao">Descrição</label>

              <textarea
                id="descricao"
                placeholder="Descreva o produto..."
                v-model="produto.descricao"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Botões -->
        <div class="buttons">
          <button
            type="button"
            @click="limparFormulario"
            class="btn-limpar"
          >
            Limpar
          </button>

          <button
            type="submit"
            class="btn-salvar"
          >
            Salvar produto
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
.pagina-produto {
  margin-top: 7vw;
  padding-bottom: 3rem;
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
  padding: 2rem;
  margin: 0 10vw 2vw;
}

.form-container {
  width: 100%;
}

.conteudo-formulario {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.lado-imagem {
  width: 35%;
  min-width: 0;
}

.lado-campos {
  flex: 1;
  min-width: 0;
}

.input-group {
  margin-bottom: 1.2rem;
}

.input-group label,
.label-imagem {
  display: block;
  color: #311111;
  font-weight: 600;
  margin-bottom: 0.6rem;
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
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 1rem;
  background-color: #fff;
  font-size: 0.9rem;
  outline: none;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #311111;
}

input[type="file"] {
  padding: 0.7rem;
  font-size: 0.8rem;
}

.select-multiplo {
  height: 120px;
  padding: 0.5rem;
}

.input-group small {
  display: block;
  color: #6b5555;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

textarea {
  resize: vertical;
  min-height: 10rem;
}

.grupo-cor {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.campo-hex {
  flex: 1;
  min-width: 0;
}

.preview-container,
.preview-vazio {
  width: 100%;
  height: 450px;
  margin-top: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(49, 17, 17, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.preview-imagem {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.preview-vazio {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b7770;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(49, 17, 17, 0.15);
}

.buttons button {
  padding: 0.8rem 2rem;
  border-radius: 0.7rem;
  transition: 0.3s;
  border: 1px solid #311111;
  cursor: pointer;
  color: #311111;
  background: transparent;
  font-weight: 600;
}

.buttons button:hover {
  background: #311111;
  color: #f5e9e0;
}

@media (max-width: 768px) {
  .pagina-produto {
    margin-top: 15vw;
    padding: 0 1rem 2rem;
  }

  h1 {
    font-size: 1.6rem;
    margin: 2rem 0 1.5rem;
  }

  .fundo-prod {
    margin: 0;
    padding: 1.2rem;
    border-radius: 1.2rem;
  }

  .conteudo-formulario {
    flex-direction: column;
    gap: 1.5rem;
  }

  .lado-imagem,
  .lado-campos {
    width: 100%;
  }

  .preview-container,
  .preview-vazio {
    height: 320px;
  }

  .buttons {
    gap: 0.8rem;
  }

  .buttons button {
    flex: 1;
    padding: 0.8rem 1rem;
  }
}

@media (max-width: 400px) {
  .preview-container,
  .preview-vazio {
    height: 260px;
  }

  .grupo-cor {
    gap: 0.5rem;
  }
}
</style>

