<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import FiltragemComponent from '../components/FiltragemComponent.vue'

const router = useRouter()
const route = useRoute()

const produtos = ref([])
const categorias = ref([])
const todasAsCoresFixas = ref([]) // Guarda todas as cores de forma fixa

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

// Carrega os produtos aplicando os filtros na API
async function carregarProdutos() {
  carregando.value = true
  erro.value = ''

const carregarProdutos = async () => {
  try {
    const params = new URLSearchParams()

    if (pesquisa.value.trim()) {
      params.set('search', pesquisa.value.trim())
    }

    if (filtros.value.categorias && filtros.value.categorias.length > 0) {
      params.set('categorias', filtros.value.categorias.join(','))
    }

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

    // Se ainda não temos a lista fixa de cores preenchida, pegamos da primeira carga geral
    if (todasAsCoresFixas.value.length === 0 && produtos.value.length > 0) {
      const coresEncontradas = produtos.value
        .map((produto) => produto.cor)
        .filter((cor) => typeof cor === 'string' && cor.trim() !== '')
      todasAsCoresFixas.value = [...new Set(coresEncontradas)]
    }
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

// Carrega as categorias cadastradas no backend (com a barra correta no final)
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

// Retorna sempre a lista completa de cores para o componente de filtro não encolher
const coresDisponiveis = computed(() => {
  if (todasAsCoresFixas.value.length > 0) {
    return todasAsCoresFixas.value
  }
  // Fallback caso carregue filtrado de primeira
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

const favoritosMobile = ref<number[]>([])

async function carregarFavoritosMobile() {
  try {
    const respostaMobile = await api.get('/favoritos/')
    const listaMobile = respostaMobile.data.results || respostaMobile.data

    favoritosMobile.value = listaMobile
      .map((item: any) => {
        if (typeof item.roupa === 'number') {
          return item.roupa
        }

        if (item.roupa?.id) {
          return item.roupa.id
        }

        return null
      })
      .filter((id: any) => id !== null)

    console.log('IDs DOS FAVORITOS:', favoritosMobile.value)
  } catch (erro: any) {
    console.error('ERRO AO CARREGAR FAVORITOS:', erro)

    if (erro.response) {
      console.log('STATUS:', erro.response.status)
      console.log('DADOS:', erro.response.data)
    }
  }
}

async function alterarFavMobile(id: number) {
  console.log('ID DA ROUPA SELECIONADA:', id)

  if (!id) {
    console.error('Essa roupa não possui ID')
    return
  }

  try {
    const respostaMobile = await api.get('/favoritos/')
    const listaMobile = respostaMobile.data.results || respostaMobile.data

    console.log('FAVORITOS DO USUÁRIO:', listaMobile)

    const favoritoExistenteMobile = listaMobile.find((item: any) => {
      if (typeof item.roupa === 'number') {
        return item.roupa === id
      }
      return item.roupa?.id === id
    })

    if (favoritoExistenteMobile) {
      console.log('REMOVENDO FAVORITO:', favoritoExistenteMobile.id)

      await api.delete(`/favoritos/${favoritoExistenteMobile.id}/`)

      favoritosMobile.value = favoritosMobile.value.filter(
        (favoritoMobileId) => favoritoMobileId !== id,
      )
      console.log('FAVORITO REMOVIDO')
    } else {
      console.log('ADICIONANDO ROUPA:', id)

      await api.post('/favoritos/', {
        roupa: id,
      })

      favoritosMobile.value.push(id)

      console.log('FAVORITO ADICIONADO!')
    }
  } catch (erro: any) {
    console.error('ERRO AO ALTERAR FAVORITO:', erro)

    if (erro.response) {
      console.log('STATUS:', erro.response.status)
      console.log('DADOS:', erro.response.data)
    }
  }
}

function ehFavoritoMobile(id: number) {
  return favoritosMobile.value.includes(id)
}

onMounted(() => {
  carregarProdutos()
  carregarCategorias()
  carregarFavoritosMobile()
})
</script>

<template>
  <main class="produtos">
    <h1>Produtos</h1>

    <div class="barra-acoes">
    <FiltragemComponent
      :categorias="categorias"
      :cores="coresDisponiveis"
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
          v-for="item in produtos"
          :key="item.id"
          @click="abrirProdutos(item.id)"
        >
          <img v-if="item.foto" :src="item.foto.url" :alt="item.nome" class="imagem-produto" />

          <h2>{{ item.nome }}</h2>

          <p>
            <strong>Preço:</strong>

            R$
            {{ Number(item.preco).toFixed(2).replace('.', ',') }}
          </p>
        </div>
      </section>

      <section v-else class="sem-produtos">
        <h2>Nenhum produto cadastrado.</h2>
      </section>
    </section>

    <section class="produtos-mobile">
      <h1>Produtos</h1>

      <section class="container-produtos-mobile" v-if="produtos.length > 0">
        <div
          class="card-produto-mobile"
          v-for="item in produtos"
          :key="item.id"
          @click="abrirProdutos(item.id)"
        >
          <img
            v-if="item.foto"
            :src="typeof item.foto === 'object' ? item.foto.url : item.foto"
            :alt="item.nome"
            class="imagem-produto-mobile"
          />
          <div v-else class="imagem-sem-foto">Sem imagem</div>

          <div class="informacoes-produto">
            <h2>{{ item.nome }}</h2>

            <p class="preco">R$ {{ formatarPreco(item.preco) }}</p>

            <p v-if="item.cor" class="cor-produto">Cor: {{ item.cor }}</p>
          </div>
        </article>
      
      </section>

      <section v-else class="sem-produtos-mobile">
        <h2>Nenhum produto cadastrado.</h2>
      </section>
    </section>
  </main>
</template>

<style scoped>
.produtos-mobile {
  display: none;
}

.produtos {
  padding: 1rem;
  margin-top: 5vw;
  min-height: 100vh;
  display: block;
}

.produtos h1 {
  margin-bottom: 25px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
}

.produtos h1::after {
  content: '';
  width: 8vw;
  height: 0.3vw;
  background: #311111;
  border-radius: 10px;

  position: absolute;
  left: 50%;
  bottom: -1vw;

.contador {
  margin: 15px 0;
  color: #705858;
  font-size: 0.95rem;
}

.container-produtos {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(18vw, 1fr));

  gap: 2rem;

  max-width: 100vw;
  margin: 0 auto;
}

.card-produto {
  background-color: #f5e9e0;

  border-radius: 1.2rem;

  padding: 1.2rem;

  border: 0.1vw solid rgba(49, 17, 17, 0.15);

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

@media (max-width: 768px) {
  .produtos {
    display: none;
  }

  .produtos-mobile {
    padding: 1rem 0rem;
    margin-top: 1vw;
    display: block;
  }

  .produtos-mobile h1 {
    text-align: center;
    color: #311111;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    position: relative;
  }

  .produtos-mobile h1::after {
    content: '';
    width: 18vw;
    height: 0.3vw;
    background: #311111;
    border-radius: 10px;

    position: absolute;
    left: 50%;
    bottom: -1vw;

    transform: translateX(-50%);
  }

  .container-produtos-mobile {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 2rem 1.5rem;
    width: 100%;
    margin: 0 auto;
  }

  .card-produto-mobile {
    background-color: #f5e9e0;

    border-radius: 0.5rem;

    width: 100%;
    padding: 0;

    border: none;

    overflow: hidden;

    box-shadow: 0 0.3vw 1vw rgba(0, 0, 0, 0.08);
  }

  .imagem-produto-mobile {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .card-produto-mobile h2 {
    color: #311111;

    font-size: 1rem;

    margin: 0 2.5vw 2.5vw 2.5vw;
    font-weight: 600;
  }

  .card-produto-mobile p {
    font-size: 0.7rem;
    line-height: 1;
    margin: 0 0.45rem 1.5rem;
    color: #311111;
  }

  .favorito-card-mobile {
    background: transparent;
    border: none;

    padding: 0;
    margin: 0 0 1vw 2vw;

    width: 9vw;
    height: 9vw;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    flex-shrink: 0;
  }

  .favorito-card-mobile img {
    width: 8vw;
    height: 8vw;

    object-fit: contain;
    display: block;
  }
}

  .sem-produtos-mobile {
    margin-top: 2rem;
  }

  .sem-produtos-mobile h2 {
    font-size: 1rem;
  }
}
</style>
