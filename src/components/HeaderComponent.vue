<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted
} from "vue";
import { useAuthStore } from '../stores/auth'
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const headerAtivo = ref(false);

function abrirUsuario() {
  if (authStore.token) {
    router.push('/user')
  } else {
    router.push('/login')
  }
}

function handleScroll() {
  headerAtivo.value = window.scrollY > 50;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const showDropdown = ref(false);

const pesquisa = ref("");
const indexAtivo = ref(-1);

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

    indexAtivo.value =
      (indexAtivo.value + 1) % resultados.value.length;

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

function irParaHome(){
  router.push('/')
}
</script>

<template>
  <header :class="{ scrolled: headerAtivo }">

      <div @click="irParaHome" class="logo">
        <img :src="headerAtivo
                ? '/img/logo-solido.png'
                : '/img/logo.png'"
                alt="Logo Atelier" />

        <div class="texto">
          <p class="titulo">ATELIER</p>
          <p class="sigla">A.Y.</p>
        </div>

      </div>

      <!-- GLOBO -->
      <div
        class="dropdown"
        @click="showDropdown = !showDropdown"
      >
        <a href="#" class="globo">
          <img
              :src="headerAtivo
                ? '/img/globo-solido.png'
                : '/img/globo.png'"
              alt="Globo"
            />
        </a>

        <div v-if="showDropdown" class="submenu">

          <ul class="cima">
            <li><RouterLink to="/">África</RouterLink></li>
            <li><RouterLink to="/">América</RouterLink></li>
            <li><RouterLink to="/">Ásia</RouterLink></li>
          </ul>

          <ul class="baixo">
            <li><RouterLink to="/">Europa</RouterLink></li>
            <li><RouterLink to="/">Oceania</RouterLink></li>
          </ul>

        </div>
      </div>

      <!-- BUSCA -->
      <div class="search-container">

        <input
          type="text"
          v-model="pesquisa"
          placeholder="Buscar..."
          @keydown="navegar"
          class="search-input"
        />

        <img
          :src="headerAtivo
            ? '/img/lupa-solido.png'
            : '/img/lupa.png'"
          alt="Pesquisar"
          class="icon-lupa"
        />

        <div
          class="results-list"
          v-if="resultados.length"
        >
          <ul>

            <li
              v-for="(item, index) in resultados"
              :key="item.id"
              :class="{ ativo: index === indexAtivo }"
              @click="abrirNavegacao(item)"
              class="result-item"
            >

              <span class="item-icon">
                <img src="/img/lupa-solido.png" alt="Lupa" />
              </span>

              <span class="item-text">
                {{ item.nome }}
              </span>

            </li>

          </ul>
        </div>

      </div>

      <!-- ÍCONES -->
      <ul class="icones">

        <li>
          <a @click.prevent="abrirUsuario">
            <img
              :src="headerAtivo
                ? '/img/user-solido.png'
                : '/img/user.png'"
              alt="User"
            />
          </a>
        </li>

        <li>
          <a href="#">
            <img
              :src="headerAtivo
                ? '/img/bolsa-solido.png'
                : '/img/bolsa.png'"
              alt="Sacola"
            />
          </a>
        </li>

        <li>
          <a href="#">
            <img
              :src="headerAtivo
                ? '/img/coracao-solido.png'
                : '/img/coracao.png'"
              alt="Favoritos"
            />
          </a>
        </li>

      </ul>

  </header>
</template>

<style scoped>

/* HEADER */

header {
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 6vw;

  padding: 0 2vw;
  display: flex;
  align-items: center;

  z-index: 99;

  background: linear-gradient(
    to top,
    rgba(63, 44, 25, 0) 3%,
    rgba(72, 50, 29, 0.341) 28%,
    rgba(63, 44, 25, 0.654) 100%
  );

  transition:
    background 0.4s ease,
    backdrop-filter 0.4s ease,
    box-shadow 0.4s ease;

  justify-content: space-between;
}

/* HEADER QUANDO DESCE */

header.scrolled {
  background: rgba(245, 230, 222, 0.95);

  backdrop-filter: blur(10px);

  box-shadow:
    0 0.2vw 1vw rgba(0, 0, 0, 0.08);
}

/* LOGO */

.logo {
  display: flex;
  align-items: center;
  gap: 1vw;
}

.logo img {
  width: 4vw;
  height: 5.5vw;
  cursor: pointer;
}

.texto {
  display: flex;
  flex-direction: column;
  font-family: "Playfair", serif;
  font-optical-sizing: auto;
}

.titulo {
  font-size: 0.9rem;
  color: white;
}

.sigla {
  margin-left: 1vw;
  font-size: 0.8rem;
  color: white;
}

/* MENU */

.menu {
  display: flex;
  gap: 2vw;
}

.menu li a {
  text-decoration: none;

  color: white;

  font-size: 0.9rem;

  transition: 0.3s;
}

.menu li a:hover {
  opacity: 0.7;
}

/* DROPDOWN */

.globo img {
  width: 1.8vw;
  margin-left: 35vw;
}

.submenu {
  position: absolute;
  top: 5vw;
  left: 50vw;
  background: white;
  margin: 0;
  padding: 8px 25px 8px 10px;
  border-radius: 6px;
  min-width: 180px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.cima {
  display: flex;
}

.baixo {
  display: flex;
}

.submenu li {
  padding: 8px 25px;
  margin-left: 1vw;
}

.submenu li a {
  color: #311111;
  font-weight: 500;
  display: block;
  text-decoration: none;
}

.submenu li a:hover {
  background: #f1f1f1;
  color: #311111;
  font-weight: bold;
}

/* BUSCA */

.search-container {
  position: relative;

  width: 20vw;

  display: flex;
  align-items: center;

  gap: 1vw;
}

.search-input {
  width: 100%;

  border: none;
  border-bottom: 0.1vw solid white;

  background: transparent;

  padding: 0.5vw 0;

  outline: none;

  color: white;

  font-size: 1rem;

  transition: 0.3s;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.icon-lupa {
  width: 1.5vw;
  height: 1.5vw;
}

/* RESULTADOS */

.results-list {
  position: absolute;

  top: 120%;
  left: 0;

  width: 100%;

  background: white;

  border-radius: 1vw;

  overflow: hidden;

  box-shadow:
    0 1vw 2vw rgba(0, 0, 0, 0.1);
}

.results-list ul {
  list-style: none;

}

.result-item {
  display: flex;
  align-items: center;
  gap: 1vw;
  padding: 1vw;
  cursor: pointer;
  transition: 0.3s;
}

.result-item:hover,
.result-item.ativo {
  background: #f5e9e0;
}

.item-icon img {
  width: 1vw;
}

/* ÍCONES */

.icones {
  display: flex;
  align-items: center;
  gap: 2vw;
  list-style: none;
  cursor: pointer;
}

.icones li img {
  width: 2vw;
}

/* QUANDO O HEADER FICA SÓLIDO */

header.scrolled .titulo,
header.scrolled .sigla,
header.scrolled .menu li a {
  color: #311111;
}

header.scrolled .search-input {
  color: #311111;

  border-bottom:
    0.1vw solid #84453d;
}

header.scrolled .search-input::placeholder {
  color: rgba(49, 17, 17, 0.5);
}

/* RESPONSIVO */

@media (max-width: 768px) {

  header {
    height: 14vw;
    padding: 0 5vw;
  }

  .menu {
    display: none;
  }

  .logo img {
    width: 10vw;
    height: 10vw;
  }

  .search-container {
    width: 30vw;
  }

  .icones li img {
    width: 4vw;
  }
}

</style>
