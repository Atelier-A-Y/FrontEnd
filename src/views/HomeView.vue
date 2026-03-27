<script setup lang="ts">
import { ref } from 'vue'

const slides = [
  {
   img: '/img/noiva1.png',
   marca1: 'ATELIER',
   marca2: 'A.Y.',
   texto: 'CASAMENTO',
   subtexto: 'NEW EUROPE COLLECTION'
  },
  {
   img: '/img/formanda1.png',
   texto: 'FORMATURA'
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
    <div class="marca1">
      {{ slides[index].marca1 }}
    </div>
    <div class="marca2">
      {{ slides[index].marca2 }}
    </div>
    <div class="texto">
      {{ slides[index].texto }}
    </div>
    <div class="subtexto">
      {{ slides[index].subtexto }}
    </div>
  </h2>
  <button @click="prevSlide">❮</button>
  <button @click="nextSlide">❯</button>
</div>
  </main>
</template>

<style scoped>
.carrossel-principal {
  position: absolute;
  width: 100%;
  max-width: 100%;
  height: 100%;
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
  background: rgba(214, 168, 140, 0.479);
  z-index: 1;
}

img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.texto {
  position: absolute;
  bottom: 42%;
  right: 50%;
  color: white;
  font-size: 6rem;
  z-index: 2;
  font-family: "Lexend Deca", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  letter-spacing: 4px;
  text-shadow: 5px 0px 0px #f8ceac;
}

.subtexto{
  position: absolute;
  bottom: 40%;
  right: 58%;
  color: #ffeddf;
  font-size: 2rem;
  z-index: 2;
  font-family: "Nanum Myeongjo", serif;
  font-weight: 400;
  font-style: normal;
}

.marca1{
  position: absolute;
  bottom: 64%;
  right: 68%;
  color: rgb(255, 255, 255);
  font-size: 2rem;
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 3.5px 0px 0px #eec19c;
}

.marca2{
  position: absolute;
  bottom: 60%;
  right: 71%;
  color: white;
  font-size: 1.7rem;
  z-index: 2;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
  text-shadow: 3.5px 0px 0px #eec19c;
}
</style>
