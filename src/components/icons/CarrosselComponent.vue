<script setup lang="ts">
import { ref } from 'vue'

const slides = [
  {
   img: '/img/noiva1.png',
   marca1: 'ATELIER',
   marca2: 'A.Y.',
   texto: 'CASAMENTO',
   subtexto: 'NEW EUROPE COLLECTION',
   classeMarca1: 'marca1-noiva',
   classeMarca2: 'marca2-noiva',
   classeTexto: 'texto-noiva',
   classeSubtexto: 'subtexto-noiva',
  },
  {
   img: '/img/formanda1.png',
   marca1: 'ATELIER',
   marca2: 'A.Y.',
   texto: 'FORMATURA',
   subtexto: '50% DE DESCONTO',
   classeMarca1: 'marca1-formanda',
   classeMarca2: 'marca2-formanda',
   classeTexto: 'texto-formanda',
   classeSubtexto: 'subtexto-formanda',
  }
]

const index = ref(0)

function nextSlide() {
  index.value = (index.value + 1) % slides.length
}

function prevSlide() {
  index.value = (index.value - 1 + slides.length) % slides.length
}

setInterval(nextSlide, 4000)
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <main>
    <div class="carrossel-principal">
  <img
    v-for="(slide, i) in slides"
    :key="i"
    :src="slide.img"
    :class="{ active: i === index }"
  />

  <h2>
    <div class="marca1" :class="slides[index].classeMarca1">
      {{ slides[index].marca1 }}
    </div>
    <div class="marca2" :class="slides[index].classeMarca2">
      {{ slides[index].marca2 }}
    </div>
    <div class="texto" :class="slides[index].classeTexto">
      {{ slides[index].texto }}
    </div>
    <div class="subtexto" :class="slides[index].classeSubtexto">
      {{ slides[index].subtexto }}
    </div>
  </h2>
  <button @click="prevSlide">❮</button>
  <button @click="nextSlide">❯</button>
</div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Antic+Didone&display=swap');

/*==============================
          CASAMENTO
==============================*/

.marca1-noiva{
  position: absolute;
  bottom: 64%;
  right: 68%;
  color: rgb(255, 255, 255);
  font-size: 2rem;
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 3.5px 0px 5px #f9bc8a;
}

.marca2-noiva{
  position: absolute;
  bottom: 60%;
  right: 71%;
  color: white;
  font-size: 1.7rem;
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 3.5px 0px 5px #f9bc8a;
}

.texto-noiva {
  position: absolute;
  bottom: 42%;
  right: 50%;
  color: rgb(255, 244, 232);
  font-size: 6rem;
  z-index: 2;
  font-family: "Lexend Deca", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  letter-spacing: 4px;
  text-shadow: 0px 4px 20px #f8ceac;
}

.subtexto-noiva{
  position: absolute;
  bottom: 40%;
  right: 58%;
  color: #e7d3c3;
  font-size: 2rem;
  z-index: 2;
  font-family: "Nanum Myeongjo", serif;
  font-weight: 400;
  font-style: normal;
}

/*==============================
          FORMATURA
==============================*/

.marca1-formanda{
  position: absolute;
  bottom: 64%;
  right: 67%;
  color: rgb(255, 255, 255);
  font-size: 2rem;
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 3.5px 0px 5px #8a8af9;
}

.marca2-formanda{
  position: absolute;
  bottom: 60%;
  right: 70%;
  color: white;
  font-size: 1.7rem;
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 3.5px 0px 5px #8a8af9;
}

.texto-formanda {
  position: absolute;
  bottom: 42%;
  right: 50%;
  color: #ffffff;
  font-size: 6rem;
  z-index: 2;
  font-family: 'Antic Didone', serif;
  letter-spacing: 8px;
  text-shadow: 0px 4px 20px #2736a5;
}

.subtexto-formanda{
  position: absolute;
  bottom: 40%;
  right: 62%;
  color: #2e366e;
  font-size: 2rem;
  z-index: 2;
  font-family: "Nanum Myeongjo", serif;
  font-weight: 400;
  font-style: normal;
}

/*=========================
          GERAL
=========================*/

.carrossel-principal {
  position: absolute;
  width: 198vh;
  max-width: 100%;
  height: 90vh;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carrossel-principal::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(117, 67, 36, 0.317);
  z-index: 1;
}

img {
  position: absolute;
  width: 195vh;
  height: 95vh;
  object-position: center -1vh;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 0;
}

img.active {
  opacity: 1;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
}

button:first-of-type { left: 10px; }
button:last-of-type { right: 10px; }

.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
