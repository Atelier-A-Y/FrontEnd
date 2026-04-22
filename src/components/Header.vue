<script setup>
import { ref, computed } from "vue";

const keyword = ref("");

const showDropdown = ref(false);

const data = ref(["Casamento", "Madrinha", "Baile", "Noiva", "Festa", "Formatura"]);

const filteredResults = computed(() => {
  if (keyword.value === "") return [];

  return data.value.filter((item) =>
    item.toLowerCase().includes(keyword.value.toLowerCase())
  );
});

const selectResult = (result) => {
  keyword.value = result;
};
</script>

<template>
  <header>
    <div class="header">
      <div class="logo">
        <img src="/public/img/logo.png" width="85" height="85" alt="img-logo" />
        <div class="texto">
          <p class="titulo">Atelier</p>
          <p class="sigla">A.Y.</p>
        </div>
      </div>

      <div class="dropdown" @click="showDropdown = !showDropdown">
        <a href="#" class="globo">
          <img src="/public/img/globo.jpg" alt="img-globo" width="40" height="40"
        /></a>
        <div v-if="showDropdown" class="submenu">
          <ul class="cima">
            <li><RouterLink to="/">Àfrica</RouterLink></li>
            <li><RouterLink to="/">América</RouterLink></li>
            <li><RouterLink to="/">Àsia</RouterLink></li>
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
          v-model="keyword"
          placeholder="Buscar..."
          class="search-input"
        />

        <img src="/public/img/lupa.png" alt="pesquisa" width="38" height="38" />

        <ul v-if="filteredResults.length > 0" class="results-list">
          <li
            v-for="(result, index) in filteredResults"
            :key="index"
            @click="selectResult(result)"
            class="result-item"
          >
            <span class="item-icon"
              ><img src="/public/img/lupa.png" alt="lupinha" width="20" height="20"
            /></span>
            <span class="item-text">{{ result }}</span>
          </li>
        </ul>
      </div>

      <ul class="icones">
        <li class="user">
          <a href="#">
            <img src="/public/img/user.png" alt="usuário" width="41" height="41" />
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="/public/img/minha-sacola-de-compras.png"
              alt="sacola-de-compras"
              width="39"
              height="39"
            />
          </a>
        </li>
        <li>
          <a href="#">
            <img
              src="/public/img/coracao.png"
              alt="pag-favoritos"
              width="39"
              height="39"
            />
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  background: #f5e6de;
  width: 100%;
  padding-left: 2.5vw;
  align-items: center;
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
  margin-left: 30vw;
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
