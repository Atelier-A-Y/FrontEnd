<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  categorias: {
    type: Array,
    default: () => [],
  },
  cores: {
    type: Array,
    default: () => [],
  },
  totalProdutos: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["filtrar"]);

const painelAberto = ref(false);
const categoriasSelecionadas = ref([]);
const corSelecionada = ref("");
const precoMinimo = ref("");
const precoMaximo = ref("");

const quantidadeFiltros = computed(() => {
  return [
    categoriasSelecionadas.value,
    corSelecionada.value,
    precoMinimo.value,
    precoMaximo.value,
  ].filter((valor) => valor !== "").length;
});

function aplicarFiltros() {
  emit("filtrar", {
    // O backend filtra pelo nome da categoria.
    categorias: categoriasSelecionadas.value,
    cor: corSelecionada.value,
    precoMinimo:
      precoMinimo.value === "" ? "" : Number(precoMinimo.value),
    precoMaximo:
      precoMaximo.value === "" ? "" : Number(precoMaximo.value),
  });

  painelAberto.value = false;
}

function limparFiltros() {
  categoriasSelecionadas.value = [];
  corSelecionada.value = "";
  precoMinimo.value = "";
  precoMaximo.value = "";

  aplicarFiltros();
}

function obterNomeCor(cor) {
  return typeof cor === "object" ? cor.nome : cor;
}

function obterHexCor(cor) {
  return typeof cor === "object" ? cor.hex : cor;
}
</script>

<template>
  <div class="filtragem">
    <button
      type="button"
      class="botao-filtros"
      :aria-expanded="painelAberto"
      @click="painelAberto = true"
    >
      <span class="icone-filtro">☷</span>
      Filtrar

      <span v-if="quantidadeFiltros" class="contador">
        {{ quantidadeFiltros }}
      </span>
    </button>

    <Transition name="fundo">
      <div
        v-if="painelAberto"
        class="fundo-painel"
        @click="painelAberto = false"
      ></div>
    </Transition>

    <Transition name="deslizar">
      <aside v-if="painelAberto" class="painel-filtros">
        <header class="cabecalho-filtros">
          <h2>Filtros</h2>

          <button
            type="button"
            class="botao-fechar"
            aria-label="Fechar filtros"
            @click="painelAberto = false"
          >
            ×
          </button>
        </header>

        <!-- Categoria -->
        <section class="grupo-filtro">
          <label for="categoria-filtro">Categoria</label>

          <select
            id="categoria-filtro"
            v-model="categoriaSelecionada"
          >
            <option value="">Todas as categorias</option>

            <option
              v-for="categoria in categorias"
              :key="categoria.id"
              :value="categoria.nome"
            >
              {{ categoria.nome }}
            </option>
          </select>
        </section>

        <!-- Preço -->
        <section class="grupo-filtro">
          <h3>Faixa de preço</h3>

          <label for="preco-minimo">Preço mínimo (R$)</label>
          <input
            id="preco-minimo"
            v-model="precoMinimo"
            type="number"
            min="0"
            step="0.01"
            placeholder="Ex.: 100"
          />

          <label for="preco-maximo">Preço máximo (R$)</label>
          <input
            id="preco-maximo"
            v-model="precoMaximo"
            type="number"
            min="0"
            step="0.01"
            placeholder="Ex.: 1650"
          />

          <p class="dica">
            Deixe vazio para não limitar o preço.
          </p>
        </section>

        <!-- Cor -->
        <section class="grupo-filtro">
          <h3>Cor</h3>

          <div v-if="cores.length" class="lista-cores">
            <button
              v-for="cor in cores"
              :key="obterNomeCor(cor)"
              type="button"
              class="opcao-cor"
              :class="{
                selecionada:
                  corSelecionada === obterNomeCor(cor),
              }"
              :aria-pressed="
                corSelecionada === obterNomeCor(cor)
              "
              @click="
                corSelecionada =
                  corSelecionada === obterNomeCor(cor)
                    ? ''
                    : obterNomeCor(cor)
              "
            >
              <span
                class="amostra-cor"
                :style="{
                  backgroundColor: obterHexCor(cor),
                }"
              ></span>

              <span>{{ obterNomeCor(cor) }}</span>
            </button>
          </div>

          <p v-else class="dica">
            Nenhuma cor disponível.
          </p>
        </section>

        <!-- Ações -->
        <footer class="acoes-filtros">
          <button
            type="button"
            class="botao-limpar"
            @click="limparFiltros"
          >
            Limpar filtros
          </button>

          <button
            type="button"
            class="botao-aplicar"
            @click="aplicarFiltros"
          >
            Ver {{ totalProdutos }} produtos
          </button>
        </footer>
      </aside>
    </Transition>
  </div>
</template>

<style scoped>
.filtragem {
  display: inline-block;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

.botao-filtros {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.1rem;
  border: 1px solid #d9c6b9;
  border-radius: 0.7rem;
  background: #f5e9e0;
  color: #311111;
}

.botao-filtros:hover,
.botao-limpar:hover {
  background: #ead8ca;
}

.icone-filtro {
  font-size: 1.4rem;
}

.contador {
  display: grid;
  place-items: center;
  min-width: 1.4rem;
  height: 1.4rem;
  padding: 0 0.3rem;
  border-radius: 50%;
  background: #311111;
  color: white;
  font-size: 0.8rem;
}

.fundo-painel {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(25, 15, 12, 0.45);
}

.painel-filtros {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-sizing: border-box;
  width: min(360px, 90vw);
  height: 100vh;
  height: 100dvh;
  padding: 1.5rem;
  overflow-y: auto;
  background: #fffaf6;
  color: #311111;
  box-shadow: 5px 0 25px rgba(0, 0, 0, 0.15);
}

.cabecalho-filtros {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2d2c6;
}

.cabecalho-filtros h2 {
  margin: 0;
  font-size: 1.6rem;
}

.botao-fechar {
  border: none;
  background: transparent;
  color: #311111;
  font-size: 2rem;
}

.grupo-filtro {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding-bottom: 1.3rem;
  border-bottom: 1px solid #e9ded5;
}

.grupo-filtro h3,
.grupo-filtro > label:first-child {
  margin: 0 0 0.25rem;
  font-size: 1.05rem;
  font-weight: 700;
}

.grupo-filtro select,
.grupo-filtro input {
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d9c6b9;
  border-radius: 0.5rem;
  background: white;
  color: #311111;
}

.dica {
  margin: 0;
  color: #78675e;
  font-size: 0.85rem;
}

.lista-cores {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
}

.opcao-cor {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
  padding: 0.6rem;
  border: 1px solid #e2d2c6;
  border-radius: 0.5rem;
  background: white;
  color: #311111;
  text-align: left;
  overflow-wrap: anywhere;
}

.opcao-cor.selecionada {
  border: 2px solid #795548;
  background: #f5e9e0;
}

.amostra-cor {
  display: inline-block;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border: 1px solid #c9bdb4;
  border-radius: 50%;
}

.acoes-filtros {
  position: sticky;
  bottom: -1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: auto;
  padding: 0.5rem 0 0.25rem;
  background: #fffaf6;
}

.botao-limpar,
.botao-aplicar {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #311111;
  border-radius: 0.6rem;
}

.botao-limpar {
  background: transparent;
  color: #311111;
}

.botao-aplicar {
  background: #311111;
  color: white;
}

.botao-aplicar:hover {
  background: #512b2b;
}

.deslizar-enter-active,
.deslizar-leave-active,
.fundo-enter-active,
.fundo-leave-active {
  transition: all 0.25s ease;
}

.deslizar-enter-from,
.deslizar-leave-to {
  transform: translateX(-100%);
}

.fundo-enter-from,
.fundo-leave-to {
  opacity: 0;
}
</style>