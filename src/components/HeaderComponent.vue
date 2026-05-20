<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const showDropdown = ref(false);
const pesquisa = ref("");
const indexAtivo = ref(-1);

const router = useRouter();

const navegacao = ref([
  { id: "1", nome: "Casamento", rota: "/casamento" },
  { id: "2", nome: "Formatura", rota: "/" },
  { id: "3", nome: "Festa", rota: "/" },
  { id: "4", nome: "Madrinha", rota: "/" },
  { id: "5", nome: "Baile", rota: "/" },
  { id: "6", nome: "Noiva", rota: "/" },
]);

const resultados = computed(() => {
  const termo = pesquisa.value.trim().toLowerCase();
  if (!termo) return [];
  return navegacao.value.filter((o) =>
    o.nome.toLowerCase().includes(termo)
  );
});

function abrirNavegacao(item: any) {
  if (!item) return;
  router.push(item.rota);
  pesquisa.value = "";
  indexAtivo.value = -1;
}

function navegar(e: KeyboardEvent) {
  if (!resultados.value.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    indexAtivo.value = (indexAtivo.value + 1) % resultados.value.length;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    indexAtivo.value =
      (indexAtivo.value - 1 + resultados.value.length) %
      resultados.value.length;
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (indexAtivo.value >= 0) {
      abrirNavegacao(resultados.value[indexAtivo.value]);
    } else {
      abrirNavegacao(resultados.value[0]);
    }
  }
}
</script>

<template>
  <header>
    <div class="header">
      <!-- Logo -->
      <div class="logo">
        <img src="/img/logo.png" alt="Logo Atelier" />
        <div class="texto">
          <p class="titulo">Atelier</p>
          <p class="sigla">A.Y.</p>
        </div>
      </div>

      <!-- Dropdown do globo -->
      <div class="dropdown" @click="showDropdown = !showDropdown">
        <a href="#" class="globo">
          <img src="/img/globo.jpg" alt="Globo" />
        </a>
        <div v-if="showDropdown" class="submenu">
          <ul class="cima">
            <li><RouterLink to="/home">África</RouterLink></li>
            <li><RouterLink to="/">América</RouterLink></li>
            <li><RouterLink to="/">Ásia</RouterLink></li>
          </ul>
          <ul class="baixo">
            <li><RouterLink to="/">Europa</RouterLink></li>
            <li><RouterLink to="/">Oceania</RouterLink></li>
          </ul>
        </div>
      </div>

      <!-- Busca -->
      <div class="search-container">
        <input
          type="text"
          v-model="pesquisa"
          placeholder="Buscar..."
          @keydown="navegar"
          class="search-input"
        />
        <img src="/img/lupa.png" alt="Pesquisar" class="icon-lupa" />

        <div class="results-list" v-if="resultados.length">
          <ul>
            <li
              v-for="(item, index) in resultados"
              :key="item.id"
              :class="{ ativo: index === indexAtivo }"
              @click="abrirNavegacao(item)"
            >
              <span class="item-icon">
                <img src="/img/lupa.png" alt="Lupa" />
              </span>
              <span class="item-text">{{ item.nome }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Ícones -->
      <ul class="icones">
        <li><a href="#"><img src="/img/user.png" alt="Usuário" /></a></li>
        <li><a href="#"><img src="/img/minha-sacola-de-compras.png" alt="Sacola" /></a></li>
        <li><a href="#"><img src="/img/coracao.png" alt="Favoritos" /></a></li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* Header fixo e menor */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #f5e6de;
  display: flex;
  align-items: center;
  z-index: 999;
  padding: 0 2vw;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo img {
  width: 60px;
  height: auto;
  margin: 0;
}
.texto {
  margin-top: 0.5vw;
}
.titulo {
  font-size: 1.3rem;
}
.sigla {
  font-size: 1.1rem;
  margin-top: -0.3vw;
  margin-left: 0.5vw;
}

/* Ícones */
.icones {
  display: flex;
  list-style: none;
  gap: 15px;
}
.icones li img {
  width: 30px;
  height: auto;
}

/* Main */
main {
  padding-top: 80px;
}

/* Dropdown do globo */
div a.globo img {
  width: 40px;
  height: auto;
}
.submenu {
  position: absolute;
  top: 5vw;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 6px;
  min-width: 180px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 8px 20px;
  z-index: 1000;
}
.cima, .baixo {
  display: flex;
}
.submenu li {
  padding: 8px 15px;
  margin-left: 1vw;
}
.submenu li a {
  color: #311111;
  text-decoration: none;
}
.submenu li a:hover {
  font-weight: bold;
  background: #f1f1f1;
}

/* Busca */
.search-container {
  position: relative;
  width: 250px;
  display: flex;
  align-items: center;
}
.search-input {
  width: 100%;
  padding: 8px 5px;
  border: none;
  border-bottom: 1px solid #84453d;
  background: transparent;
  outline: none;
  font-size: 1rem;
  color: #84453d;
}
.search-input::placeholder {
  color: rgba(132, 69, 61, 0.6);
}
.icon-lupa {
  width: 20px;
  height: auto;
  margin-left: 5px;
}
.results-list {
  position: absolute;
  top: 120%;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  border: 1px solid rgba(132, 69, 61, 0.1);
  z-index: 1000;
}
.result-item {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.result-item:hover, .result-item.ativo {
  background-color: #f5e9e0;
  padding-left: 20px;
}
.item-icon {
  margin-right: 10px;
  opacity: 0.7;
}
</style>
