<script setup lang="ts">
import { ref } from 'vue'

const slides = [
  {
   img: '/img/noiva1.png',
  },
  {
   img: '/img/formanda1.png',
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
  <main>
    <div class="carrossel-principal">
  <img
    v-for="(slide, i) in slides"
    :key="i"
    :src="slide.img"
    :class="{ active: i === index }"
  />
  <button @click="prevSlide">❮</button>
  <button @click="nextSlide">❯</button>
</div>
  </main>
</template>

<style scoped>
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
  transform: translate(-50%, -63%);
  z-index: 1;
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 83vh;
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

@media (max-width: 600px){
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
  height: 40vh;
  transform: translate(-50%, -125%);
  background: rgba(117, 67, 36, 0.317);
  z-index: 1;
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 40vh;
  object-fit: cover;
  transform: translate(-50%, -125%);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 0;
}

img.active {
  opacity: 1;
}

button {
  position: absolute;
  top: 20%;
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
}
</style>
