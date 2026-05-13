<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const showDropdown = ref(false);
const router = useRouter();
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
  return navegacao.value.filter((o) => o.nome.toLowerCase().includes(termo));
});

function abrirNavegacao(item) {
  if (!item) return;
  router.push(item.rota);
  pesquisa.value = "";
  indexAtivo.value = -1;
}

function navegar(e) {
  if (resultados.value.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    indexAtivo.value = (indexAtivo.value + 1) % resultados.value.length;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    indexAtivo.value = (indexAtivo.value - 1 + resultados.value.length) % resultados.value.length;
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
        <img src="/img/logo.png" width="85" height="85" alt="img-logo" />
        <div class="texto">
          <p class="titulo">Atelier</p>
          <p class="sigla">A.Y.</p>
        </div>
      </div>

      <div class="dropdown" @click="showDropdown = !showDropdown">
        <a href="#" class="globo">
          <img src="/img/globo.jpg" alt="img-globo" width="40" height="40" />
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

      <div class="search-container">
        <input
          type="text"
          v-model="pesquisa"
          placeholder="Buscar..."
          @keydown="navegar"
          class="search-input"
        /><img src="/img/lupa.png" alt="pesquisa" width="38" height="38" />

        <div class="results-list" v-if="resultados.length">
          <ul>
            <li
              v-for="(item, index) in resultados"
              :key="item.id"
              :class="{ ativo: index === indexAtivo }"
              @click="abrirNavegacao(item)"
              class="result-item"
            >
              <span class="item-icon">
                <img src="/img/lupa.png" alt="lupinha" width="20" height="20" />
              </span>
              <span class="item-text">{{ item.nome }}</span>
            </li>
          </ul>
        </div>
      </div>

      <ul class="icones">
        <li class="user">
          <a href="#"><img src="/img/user.png" alt="usuário" width="41" height="41" /></a>
        </li>
        <li>
          <a href="#"><img src="/img/minha-sacola-de-compras.png" alt="sacola" width="39" height="39" /></a>
        </li>
        <li>
          <a href="#"><img src="/img/coracao.png" alt="favoritos" width="39" height="39" /></a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  background: #f5e6de;
  width: 100%;
  padding: 0 2.5vw;
  z-index: 999;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
}

.logo img {
  margin-top: 0.7vw;
  margin-bottom: 0.7vw;
}

.texto {
  margin-top: 1.2vw;
}

.titulo {
  font-size: 1.7rem;
  color: #84453d;
  font-family: "Playfair Display", serif;
  font-weight: 100;
}

.sigla {
  font-size: 1.5rem;
  color: #84453d;
  font-family: "Playfair Display", serif;
  font-weight: 100;
  margin-top: -0.5vw;
  margin-left: 0.9vw;
}

.icones {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  margin-right: 6vw;
}

.icones li a {
  margin-right: 2vw;
}

div a.globo {
  margin-left: 28vw;
  margin-right: -2vw;
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
  display: flex;
  margin: 0 -10vw 0 -6vw;
  right: 80px;
  top: 30px;
  width: 350px;
  font-family: "Libre Bodoni", serif;
}

.search-input {
  width: 100%;
  padding: 10px 5px;
  border: none;
  border-bottom: 1px solid #84453d;
  background: transparent;
  color: #84453d;
  outline: none;
  font-size: 1.1rem;
}

.search-input::placeholder {
  color: rgba(132, 69, 61, 0.6);
}

.results-list {
  position: absolute;
  width: 16%;
  margin-top: 3vw;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 5px 0;
  z-index: 1000;
  overflow: hidden;
  border: 1px solid rgba(132, 69, 61, 0.1);
}

.result-item {
  padding: 12px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  color: #84453d;
  font-size: 0.9rem;
}

.result-item:hover {
  background-color: #f5e9e0;
  padding-left: 20px;
}

.item-icon {
  margin-right: 10px;
  font-size: 0.8rem;
  opacity: 0.7;
}
</style>
