<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FiltragemComponent from '../components/FiltragemComponent.vue'

const router = useRouter()
const route = useRoute()

const produtos = ref([])
const categorias = ref([])

const filtros = ref({
  categorias: [],
  cor: '',
  precoMinimo: '',
  precoMaximo: '',
})

const pesquisa = computed(() => String(route.query.search || ''))

const carregando = ref(true)
const erro = ref('')

const API_URL =
  'https://backend-atelier-a-y.class.fabricadesoftware.ifc.edu.br/api'

// Carrega os produtos usando os filtros aceitos pelo Django
async function carregarProdutos() {
  carregando.value = true
  erro.value = ''

  try {
    const params = new URLSearchParams()

    // Pesquisa pelo nome da roupa
    if (pesquisa.value.trim()) {
      params.set('search', pesquisa.value.trim())
    }

    // Filtra por várias categorias selecionadas
    if (filtros.value.categorias.length > 0) {
      params.set('categorias', filtros.value.categorias.join(','))
    }

    // Filtra pela cor selecionada
    if (filtros.value.cor !== '') {
      params.set('cor', filtros.value.cor)
    }

    const queryString = params.toString()

    const url = queryString
      ? `${API_URL}/roupas/?${queryString}`
      : `${API_URL}/roupas/`

    const resposta = await fetch(url)

    if (!resposta.ok) {
      throw new Error(`Erro ao buscar produtos: ${resposta.status}`)
    }

    const dados = await resposta.json()

    produtos.value = Array.isArray(dados)
      ? dados
      : dados.results || []
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
    erro.value = 'Não foi possível carregar os produtos.'
    produtos.value = []
  } finally {
    carregando.value = false
  }
}

// Recarrega os produtos quando a pesquisa da URL mudar
watch(
  () => route.query.search,
  () => carregarProdutos(),
)

// Carrega as categorias cadastradas no backend
async function carregarCategorias() {
  try {
    const resposta = await fetch(`${API_URL}/categorias/`)

    if (!resposta.ok) {
      throw new Error(`Erro ao buscar categorias: ${resposta.status}`)
    }

    const dados = await resposta.json()

    categorias.value = Array.isArray(dados)
      ? dados
      : dados.results || []
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
  }
}

// Obtém as cores dos produtos carregados
const cores = computed(() => {
  const coresEncontradas = produtos.value
    .map((produto) => produto.cor)
    .filter((cor) => typeof cor === 'string' && cor.trim() !== '')

  return [...new Set(coresEncontradas)]
})

// Aplica os limites de preço no frontend
const produtosFiltrados = computed(() => {
  return produtos.value.filter((produto) => {
    const preco = Number(produto.preco)

    const precoMinimoCorreto =
      filtros.value.precoMinimo === '' ||
      preco >= Number(filtros.value.precoMinimo)

    const precoMaximoCorreto =
      filtros.value.precoMaximo === '' ||
      preco <= Number(filtros.value.precoMaximo)

    return precoMinimoCorreto && precoMaximoCorreto
  })
})

// Recebe os filtros selecionados na barra lateral
async function receberFiltros(novosFiltros) {
  filtros.value = {
    categorias: novosFiltros.categorias ?? [],
    cor: novosFiltros.cor ?? '',
    precoMinimo: novosFiltros.precoMinimo ?? '',
    precoMaximo: novosFiltros.precoMaximo ?? '',
  }

  await carregarProdutos()
}

// Abre a página de detalhes do produto
function abrirProdutos(id) {
  router.push(`/info_prod/${id}`)
}

// Formata o preço em reais
function formatarPreco(preco) {
  const valor = Number(preco)

  if (!Number.isFinite(valor)) {
    return '0,00'
  }

  return valor.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

onMounted(() => {
  carregarProdutos()
  carregarCategorias()
})
</script>

<template>
  <main class="produtos">
    <h1>Produtos</h1>

    <div class="barra-acoes">
     <FiltragemComponent
  :categorias="categorias"
  :cores="cores"
  :total-produtos="produtosFiltrados.length"
  @filtrar="receberFiltros"
/>
    </div>

    <p v-if="carregando" class="mensagem">Carregando produtos...</p>

    <p v-else-if="erro" class="mensagem erro">
      {{ erro }}
    </p>

    <template v-else>
      <p class="contador">
        {{ produtosFiltrados.length }}
        {{ produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados' }}
      </p>

      <section v-if="produtosFiltrados.length > 0" class="container-produtos">
        <article
          v-for="item in produtosFiltrados"
          :key="item.id"
          class="card-produto"
          @click="abrirProdutos(item.id)"
        >
          <img
            v-if="item.foto"
            :src="typeof item.foto === 'object' ? item.foto.url : item.foto"
            :alt="item.nome"
            class="imagem-produto"
          />

          <div v-else class="imagem-sem-foto">Sem imagem</div>

          <div class="informacoes-produto">
            <h2>{{ item.nome }}</h2>

            <p class="preco">R$ {{ formatarPreco(item.preco) }}</p>

            <p v-if="item.cor" class="cor-produto">Cor: {{ item.cor }}</p>
          </div>
        </article>
      </section>

      <section v-else class="sem-produtos">
        <h2>Nenhum produto encontrado.</h2>
        <p>Tente alterar ou limpar os filtros.</p>
      </section>
    </template>
  </main>
</template>

<style scoped>
.produtos {
  width: 100%;
  min-height: 60vh;
  padding: 30px 5%;
  box-sizing: border-box;
  color: #351414;
}

.produtos h1 {
  margin-bottom: 25px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
}

.barra-acoes {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.contador {
  margin: 15px 0;
  color: #705858;
  font-size: 0.95rem;
}

.container-produtos {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 25px;
}

.card-produto {
  min-width: 0;
  overflow: hidden;
  background: #f6e9df;
  border-radius: 8px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card-produto:hover {
  transform: translateY(-4px);
  box-shadow: 0 5px 15px rgb(53 20 20 / 12%);
}

.imagem-produto,
.imagem-sem-foto {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.imagem-sem-foto {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e7d5c8;
  color: #705858;
}

.informacoes-produto {
  padding: 15px;
}

.informacoes-produto h2 {
  margin: 0 0 10px;
  font-size: 1.1rem;
  font-weight: 500;
  overflow-wrap: anywhere;
}

.preco {
  margin: 0 0 8px;
  font-size: 1rem;
  font-weight: 700;
}

.cor-produto {
  margin: 0;
  color: #705858;
  font-size: 0.9rem;
}

.mensagem,
.sem-produtos {
  padding: 30px 10px;
  text-align: center;
}

.erro {
  color: #a32323;
}

.sem-produtos h2 {
  font-size: 1.3rem;
  font-weight: 500;
}

@media (max-width: 1000px) {
  .container-produtos {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .container-produtos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 15px;
  }

  .imagem-produto,
  .imagem-sem-foto {
    height: 210px;
  }

  .produtos {
    padding: 25px 4%;
  }
}

@media (max-width: 420px) {
  .container-produtos {
    grid-template-columns: 1fr;
  }

  .imagem-produto,
  .imagem-sem-foto {
    height: 280px;
  }
}
</style>
