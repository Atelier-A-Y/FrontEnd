<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const showDropdown = ref(false);
const router = useRouter(); // Alterado de route para router por convenção
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
  router.push(item.rota); // Agora usa a variável correta
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
/* Estilos Básicos */
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
  height: 100px;
}

.logo { display: flex; align-items: center; }
.titulo { font-size: 1.7rem; color: #84453d; font-family: "Playfair Display", serif; margin: 0; }
.sigla { font-size: 1.5rem; color: #84453d; margin-top: -5px; }

/* Busca */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 350px;
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

.results-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.result-item {
  padding: 12px;
  cursor: pointer;
  list-style: none;
  color: #84453d;
}

.result-item.ativo, .result-item:hover {
  background-color: #f5e9e0;
}

/* Menu e Ícones */
.icones { list-style: none; display: flex; gap: 20px; }
.submenu {
  position: absolute;
  background: white;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}
</style>