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

      <div class="logo">
        <img src="/img/logo.png" alt="Logo Atelier" />
        <div class="texto">
          <p class="titulo">Atelier</p>
          <p class="sigla">A.Y.</p>
        </div>
      </div>

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


      <ul class="icones">
        <li><a href="#"><img src="/img/user.png" alt="Usuário" /></a></li>
        <li><a href="#"><img src="/img/minha-sacola-de-compras.png" alt="Sacola" /></a></li>
        <li><a href="#"><img src="/img/coracao.png" alt="Favoritos" /></a></li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6vw;
  background: #f5e6de;
  display: flex;
  align-items: center;
  z-index: 999;
  padding: 2vw;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  width: 5vw;
  height: 5vw;
  margin: 8.5vw 0 0 4vw;
}

.texto {
  margin-top: 9.5vw;
  display: flex;
  flex-direction: column;
}

.titulo {
  font-size: 1rem;
}

.sigla {
  font-size: 0.8rem;
}

.icones {
  display: flex;
  list-style: none;
  gap: 2vw;
  margin: 3vw 4vw 0 0;
}

.icones li img {
  width: 2vw;
  height: auto;
}

div a.globo img {
  width: 2vw;
  height: auto;
  margin-top: 6.5vw;
  margin-left: 20vw;
}

.submenu {
  position: absolute;
  top: 4.3vw;
  left: 44%;
  transform: translateX(-50%);
  background: white;
  border-radius: 1vw;
  text-shadow: 0 1vw 2vw rgba(0, 0, 0, 0.2);
  padding: 1.5vw 2vw;
  z-index: 1000;
}
.submenu li {
  padding: 0.5vw 2vw;
  font-size: 1rem;
}
.submenu li a {
  color: #311111;
  text-decoration: none;
}
.submenu li a:hover {
  font-weight: bold;
  background: #f1f1f1;
}

.search-container {
  position: relative;
  width: 20vw;
  display: flex;
  align-items: center;
  margin-top: 5vw;
}

.search-container img{
  max-width: 1vw;
}

.search-input {
  width: 100%;
  padding: 1vw 0;
  border: none;
  border-bottom: 0.1vw solid #84453d;
  background: transparent;
  outline: none;
  font-size: 1rem;
  color: #84453d;
}
.search-input::placeholder {
  color: rgba(132, 69, 61, 0.6);
}

.icon-lupa {
  object-fit: contain;
  margin-left: 1vw;
}

.results-list {
  position: absolute;
  top: 110%;
  right: 0.8vw;
  width: 100%;
  background: #fff;
  border-radius: 1vw;
  box-shadow: 0 2vw 4vw rgba(0, 0, 0, 0.1);
  padding: 1vw 0;
  border: 0.1vw solid rgba(132, 69, 61, 0.1);
  z-index: 1000;
}

.results-list ul{
  list-style: none;
  margin: 0;
  padding: 0;
}

.results-list li{
  list-style: none;
}

.result-item {
  display: flex;
  cursor: pointer;
  transition: all 0.2s ease;
}

.result-item:hover, .result-item.ativo {
  background-color: #f5e9e0;
  padding-left: 20px;
}

.item-icon {
  margin-right: 1vw;
  opacity: 0.7;
}
</style>
