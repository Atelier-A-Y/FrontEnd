<script setup>
import { ref, computed } from "vue";

const keyword = ref("");

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

const onInput = () => {};
</script>

<template>
  <header class="header">
    <div>
      <div class="logo">
        <img src="/public/img/logo.png" width="85" height="85" alt="img-logo" />
        <div class="texto">
          <p class="titulo">Atelier</p>
           <p class="sigla">A.Y.</p>
        </div>
      </div>

      <ul class="icones">
        <li>
          <a href="#" class="globo">
            <img src="/public/img/globo.jpg" alt="img-globo" width="40" height="40"
          /></a>
        </li>
        <li class="user">
          <a href="#">
            <img src="/public/img/user.png" alt="usuário" width="40" height="40"
          /></a>
        </li>
      </ul>

      <div class="search-container">
        <input
          type="text"
          v-model="keyword"
          placeholder="O que você procura?"
          class="search-input"
        />

        <ul v-if="filteredResults.length > 0" class="results-list">
          <li
            v-for="(result, index) in filteredResults"
            :key="index"
            @click="selectResult(result)"
            class="result-item"
          >
            <span class="item-icon">✨</span>
            <span class="item-text">{{ result }}</span>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  background: #f5e6de;
  width: 100%;
  padding-left: 2.5vw;
}

div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  margin-top: 0.9vw;
}

div.texto {
  margin-top: 1.3vw;
  margin-bottom: 1vw;
  color: #84453d;
  font-family: "Playfair Display", serif;
  margin-left: -2vw;
  display: flex;
}

.titulo {
  font-size: 1.6rem;
  color: #84453d;
  font-family: "Libre Bodoni", serif;
  font-weight: 100;
}

.sigla {
  font-size: 1.2rem;
  color: #84453d;
  font-family: "Libre Bodoni", serif;
  font-weight: 100;
  letter-spacing: 0.11em;
  list-style-type: none;
  margin-top: -1vw;
  padding-left: 1.8vw;
}

.icones {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
}

.globo {
  background-color: transparent;
  border: none;
  text-decoration: none;
  outline: none;
  box-shadow: none;
}

.search-container {
  position: absolute;
  right: 80px;
  top: 30px;
  width: 250px;
  font-family: "Libre Bodoni", serif;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #84453d;
  border-radius: 20px;
  background: transparent;
  color: #84453d;
  outline: none;
}

.search-input::placeholder {
  color: rgba(132, 69, 61, 0.6);
}

.results-list {
  position: absolute;
  width: 100%;
  margin-top: 5px;
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
