<script setup lang="ts">
import { ref } from 'vue'

const slides = [
  {
   img: '/img/noiva2.png',
  },
  {
   img: '/img/noiva3.png',
  },
  {
    img: '/img/noiva4.png',
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
main{
  margin: 0;
  padding: 0;
}

.carrossel-principal {
  position: relative;
  width: 100vw;
  height: 80vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

img{
  position: absolute;
  top: 50%;
  left:50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
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
