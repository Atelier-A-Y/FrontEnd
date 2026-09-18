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
const menuAtivo = ref(false);
const continentesAtivo = ref(false);

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
  <div :class="{ scrolled: headerAtivo }" class="topo">

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
        <RouterLink to="/produtos"><img
          :src="headerAtivo
            ? '/img/lupa-solido.png'
            : '/img/lupa.png'"
          alt="Pesquisar"
          class="icon-lupa"
        />
        </RouterLink>

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
          <a href="/carrinho">
            <img
              :src="headerAtivo
                ? '/img/bolsa-solido.png'
                : '/img/bolsa.png'"
              alt="Sacola"
            />
          </a>
        </li>

        <li>
          <RouterLink to="/favoritos">
            <img
              :src="headerAtivo
                ? '/img/coracao-solido.png'
                : '/img/coracao.png'"
              alt="Favoritos"
            />
          </RouterLink>
        </li>
      </ul>
  </div>


  <div :class="{ scrolled: headerAtivo }" class="topo-mobile">
  <div>
    <div @click="menuAtivo = !menuAtivo">
          <img
            :src="menuAtivo
              ? (headerAtivo
                  ? '/img/x-solido.png'
                  : '/img/x.png')
              : (headerAtivo
                  ? '/img/menu-aberto-solido.png'
                  : '/img/menu-aberto.png')"
            class="menu-mobile"
          />
      </div>

      <div v-if="menuAtivo" class="aba-menu">
        <ul class="icones-mobile">
          <li>
            <a @click.prevent="abrirUsuario">
              <img src="/img/user-solido.png" alt="user-solido.png"> Usuário
            </a>
          </li>

          <li>
            <a href="/carrinho">
              <img src="/img/bolsa-solido.png" alt="bolsa-solido.png"> Carrinho
            </a>
          </li>

          <li>
            <a href="/favoritos">
              <img src="/img/coracao-solido.png" alt="coracao-solido.png"> Favoritos
            </a>
          </li>

          <div
            class="dropdown-mobile"
            @click="continentesAtivo = !continentesAtivo"
          >
            <a href="#" class="globo-mobile">
              <img src="/img/globo-solido.png" alt="globo-solido.png"> Continentes

              <span
                class="seta-continentes"
                :class="{ aberta: continentesAtivo }"
              >
                ▼
              </span>
            </a>

            <div v-if="continentesAtivo" class="submenu-mobile">

              <ul class="cima-mobile">
                <li><RouterLink to="/">África</RouterLink></li>
                <li><RouterLink to="/">América</RouterLink></li>
                <li><RouterLink to="/">Ásia</RouterLink></li>
              </ul>

              <ul class="baixo-mobile">
                <li><RouterLink to="/">Europa</RouterLink></li>
                <li><RouterLink to="/">Oceania</RouterLink></li>
              </ul>

            </div>
          </div>
        </ul>
      </div>
    </div>
    <div @click="irParaHome" class="texto-mobile">
      <p class="titulo-mobile">ATELIER <span class="sigla-mobile">A.Y.</span></p>
    </div>

    <div class="search-container-mobile">

  <!-- LUPA DO HEADER -->
  <button
    class="botao-lupa-mobile"
    @click="showDropdown = !showDropdown"
  >
    <img
      :src="headerAtivo
        ? '/img/lupa-solido.png'
        : '/img/lupa.png'"
      alt="Pesquisar"
      class="icon-lupa-mobile"
    />
  </button>


  <!-- PAINEL DE PESQUISA -->
  <div
    v-if="showDropdown"
    class="painel-pesquisa-mobile"
  >

    <!-- BARRA DE PESQUISA -->
    <div class="barra-pesquisa-mobile">

      <img  class="lupa-barra-mobile" src="/img/lupa-solido.png" alt="lupa.png">

      <input
        type="text"
        v-model="pesquisa"
        placeholder="Buscar..."
        @keydown="navegar"
        class="search-input-mobile"
        autofocus
      />

      <!-- FECHAR -->
      <button
        class="fechar-pesquisa-mobile"
        @click="showDropdown = false"
      >
        <img src="/img/x-solido.png" alt="fechar">
      </button>

    </div>


    <!-- RESULTADOS -->
    <div
      class="results-list-mobile"
      v-if="resultados.length"
    >

      <ul>

        <li
          v-for="(item, index) in resultados"
          :key="item.id"
          :class="{ ativo: index === indexAtivo }"
          @click="abrirNavegacao(item)"
          class="result-item-mobile"
        >

          <span class="item-icon-mobile">
            <img
              src="/img/lupa-solido.png"
              alt="Lupa"
            />
          </span>

          <span class="item-text-mobile">
            {{ item.nome }}
          </span>

        </li>

      </ul>

    </div>

  </div>

</div>
  </div>
</template>

<style scoped>
.topo{
  display: block;
}

.topo-mobile{
  display: none;
}

.topo {
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

.topo.scrolled {
  background: rgba(245, 230, 222, 0.95);
  backdrop-filter: blur(10px);
  box-shadow:
    0 0.2vw 1vw rgba(0, 0, 0, 0.08);
}

.logo {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}

.logo img {
  width: 60px;
  height: 80px;
}

.texto {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.titulo {
  font-size: 12px;
  color: white;
  margin: 0;
}

.sigla {
  font-size: 10px;
  color: white;
  margin: 0;
  align-self: center;
}

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

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 320px;
  max-width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px 35px 8px 0;
  border: none;
  border-bottom: 1px solid white;
  background: transparent;
  font-size: 16px;
  color: white;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.icon-lupa {
  width: 1.5vw;
  height: 1.5vw;
}

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

.topo.scrolled .titulo,
.topo.scrolled .sigla,
.topo.scrolled .menu li a {
  color: #311111;
}

.topo.scrolled .search-input {
  color: #311111;

  border-bottom:
    0.1vw solid #84453d;
}

.topo.scrolled .search-input::placeholder {
  color: rgba(49, 17, 17, 0.5);
}

/*========================================
                MOBILE
=========================================*/

@media (max-width: 600px) {
  .topo{
    display: none;
  }

  .topo-mobile{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vw;
    padding: 0 8vw;
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
      box-sizing: border-box;
  }

  .topo-mobile.scrolled {
    background: rgba(245, 230, 222, 0.95);
    backdrop-filter: blur(10px);
    box-shadow:
      0 0.2vw 1vw rgba(0, 0, 0, 0.08);
  }

  .menu-mobile{
    width: 5vw;
    align-items: center;
  }

  .aba-menu{
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    padding: 6vw 8vw 0 8vw;
    box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.15);
    z-index: 100;
    animation: entrarMenu 0.3s ease;
  }

  @keyframes entrarMenu {
    from{
      transform: translateX(-100%);
    }

    to{
      transform: translateX(0);
    }
  }

  .icones-mobile img{
    width: 7vw;
  }

  .icones-mobile li a {
    display: flex;
    align-items: center;
    gap: 4vw;
    color: #311111;
    font-size: 4vw;
    font-family: "Inria Serif", serif;
    font-weight: 300;
    font-style: normal;
  }

  .icones-mobile li {
    margin-bottom: 7vw;
  }

  .dropdown-mobile {
    position: relative;
    margin-bottom: 7vw;
  }

  .globo-mobile {
    display: flex;
    align-items: center;
    gap: 4vw;
    color: #311111;
    font-size: 4vw;
    font-family: "Inria Serif", serif;
    font-weight: 300;
  }

  .globo-mobile img {
    width: 7vw;
  }

  .seta-continentes {
    font-size: 3vw;
    margin-left: auto;
    transition: transform 0.3s ease;
  }

  .seta-continentes.aberta {
      transform: rotate(180deg);
  }

  .submenu-mobile {
    margin-top: 6vw;
    margin-left: 2vw;
  }

  .submenu-mobile li {
    margin-bottom: 4vw;
    padding-right: 5vw;
  }

  .cima-mobile {
    display: flex;
  }

  .baixo-mobile {
    display: flex;
  }

  .texto-mobile {
    text-align: center;
    margin-left: 20vw;
    font-family: "Inria Serif", serif;
    font-weight: 300;
    font-style: normal;
  }

  .titulo-mobile {
    font-size: 4.5vw;
    color: white;
    margin: 0;
    white-space: nowrap;
    letter-spacing: 2px;
  }

  .sigla-mobile {
    font-size: 3vw;
    color: white;
    margin-left: 1.5vw;
  }

  /* ========================================
        PESQUISA MOBILE
======================================== */

  .search-container-mobile {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 5vw;
    height: 100%;
  }


  /* ========================================
          LUPA DO HEADER
  ======================================== */

  .botao-lupa-mobile {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5vw;
      height: 5vw;
      padding: 0 0 0 40vw;
      border: none;
      background: transparent;
      cursor: pointer;
  }

  .icon-lupa-mobile {
      display: block;
      width: 4vw;
      height: 4vw;
  }

  /* ========================================
          PAINEL DE PESQUISA
  ======================================== */

  .painel-pesquisa-mobile {
      position: fixed;
      top: 10vw;
      left: 0;
      width: 100vw;
      height: calc(100vh - 10vw);
      background: white;
      z-index: 98;
      overflow-y: auto;
  }

  /* ========================================
          BARRA DE PESQUISA
  ======================================== */

  .barra-pesquisa-mobile {
      width: 100%;
      height: 14vw;
      padding: 0 5vw;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background: #F5E9E0;
  }

  /* LUPA DENTRO DA BARRA */

  .lupa-barra-mobile {
      width: 4.5vw;
      height: 4.5vw;
      flex-shrink: 0;
      margin-right: 3vw;
  }

  /* INPUT */

  .search-input-mobile {
      flex: 1;
      min-width: 0;
      height: 100%;
      padding: 0;
      border: none;
      outline: none;
      background: transparent;
      font-size: 4vw;
  }

  .search-input-mobile::placeholder {
      color: #777;
  }


  /* ========================================
          BOTÃO X
  ======================================== */

  .fechar-pesquisa-mobile {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 8vw;
      height: 8vw;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      flex-shrink: 0;
  }

  .fechar-pesquisa-mobile img {
      width: 5vw;
      height: 5vw;
  }


  /* ========================================
          RESULTADOS
  ======================================== */

  .results-list-mobile {
      width: 100%;
      background: white;
  }

  .results-list-mobile ul {
      list-style: none;
      margin: 0;
      padding: 0;
  }

  .result-item-mobile {
      display: flex;
      align-items: center;
      gap: 3vw;
      padding: 4vw 5vw;
      cursor: pointer;
      transition: background 0.2s ease;
  }

  .result-item-mobile:hover,
  .result-item-mobile.ativo {
      background: #f5e9e0;
  }

  .item-icon-mobile img {
      width: 4vw;
      height: 4vw;
  }

  .item-text-mobile {
      color: #311111;
      font-size: 4vw;
      font-family: "Inria Serif", serif;
  }

  .topo-mobile.scrolled .titulo-mobile,
  .topo-mobile.scrolled .sigla-mobile{
    color: #311111;
  }
}

</style>
