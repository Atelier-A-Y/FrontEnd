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
  bottom: 73%;
  right: 67%;
  color: rgb(255, 255, 255);
  font-size: clamp(1.5vw, 1.5vw, 1.5vw);
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 0.2vw 0vw 0.2vw #f9bc8a;
}

.marca2-noiva{
  position: absolute;
  bottom: 70%;
  right: 69%;
  color: white;
  font-size: clamp(1.3vw, 1.3vw, 1.3vw);
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 0.2vw 0vw 0.2vw #f9bc8a;
}

.texto-noiva {
  position: absolute;
  bottom: 52%;
  right: 50%;
  color: rgb(255, 244, 232);
  font-size: clamp(6vw, 6vw, 6vw);
  z-index: 2;
  font-family: "Lexend Deca", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  letter-spacing: 0.2vw;
  text-shadow: 0vw 0.2vw 1.5vw #f8ceac;
}

.subtexto-noiva{
  position: absolute;
  bottom: 50%;
  right: 57%;
  color: #e7d3c3;
  font-size: clamp(2vw, 2vw, 2vw);
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
  bottom: 73%;
  right: 67%;
  color: rgb(255, 255, 255);
  font-size: clamp(1.5vw, 1.5vw, 1.5vw);
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 0.2vw 0vw 0.2vw #8a8af9;
}

.marca2-formanda{
  position: absolute;
  bottom: 70%;
  right: 69%;
  color: white;
  font-size: clamp(1.3vw, 1.3vw, 1.3vw);
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 0.2vw 0vw 0.2vw #8a8af9;
}

.texto-formanda {
  position: absolute;
  bottom: 52%;
  right: 50%;
  color: #ffffff;
  font-size: clamp(6vw, 6vw, 6vw);
  z-index: 2;
  font-family: 'Antic Didone', serif;
  letter-spacing: 0.4vw;
  text-shadow: 0vw 0.2vw 1.5vw #2736a5;
}

.subtexto-formanda{
  position: absolute;
  bottom: 50%;
  right: 60%;
  color: #3d4899;
  font-size: clamp(2vw, 2vw, 2vw);
  z-index: 2;
  font-family: "Nanum Myeongjo", serif;
  font-weight: 400;
  font-style: normal;
}

/*=========================
          GERAL
=========================*/

.carrossel-principal {
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carrossel-principal::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 80vh;
  transform: translate(-50%, -63%);
  background: rgba(117, 67, 36, 0.317);
  z-index: 1;
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 80vh;
  object-fit: cover;
  transform: translate(-50%, -63%);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 0;
}

img.active {
  opacity: 1;
}

button {
  position: absolute;
  top: 40%;
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
