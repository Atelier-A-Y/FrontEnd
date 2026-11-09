<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue'

const slides = [
  {
   desktop: '/img/noiva1.png',
   mobile: '/img/noiva1_mobile.jpeg',
  },
  {
   desktop: '/img/formanda1.png',
   mobile: '/img/formanda1_mobile.jpeg',
  }
]

const index = ref(0)
const isMobile = ref(window.innerWidth <= 768)

function verificarTela() {
  isMobile.value = window.innerWidth <= 768
}

function nextSlide() {
  index.value = (index.value + 1) % slides.length
}

function prevSlide() {
  index.value = (index.value - 1 + slides.length) % slides.length
}

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  window.addEventListener('resize', verificarTela)
  interval = setInterval(nextSlide, 4000)
})

onUnmounted(() => {
  window.removeEventListener('resize', verificarTela)
  clearInterval(interval)
})
</script>

<template>
  <main>
    <div class="carrossel-principal">
  <img
        v-for="(slide, i) in slides"
        :key="i"
        :src="isMobile ? slide.mobile : slide.desktop"
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
  height: 110vh;
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

@media (max-width: 768px) {
.carrossel-principal {
    position: relative;
    width: 100%;
    height: 65vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: transparent;
}

.carrossel-principal img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: none;
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 0;
}

.carrossel-principal img.active {
    opacity: 1;
}

.carrossel-principal button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
}

.carrossel-principal button:first-of-type {
    left: 10px;
}

.carrossel-principal button:last-of-type {
    right: 10px;
}
}
</style>
