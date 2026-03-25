<script setup lang="ts">
import { ref } from 'vue'

const slides = [
  '/img/foto_noiva1.png',
  '/img/formanda1.png'
]

const index = ref(0)

function nextSlide() {
  index.value = (index.value + 1) % slides.length
}

function prevSlide() {
  index.value = (index.value - 1 + slides.length) % slides.length
}
</script>

<template>
  <main>
    <div class="carrossel-principal">
      <img
        v-for="(img, i) in slides"
        :key="i"
        :src="img"
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
  width: 100%;
  max-width: 600px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

img.active {
  opacity: 1;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

button:first-of-type { left: 10px; }
button:last-of-type { right: 10px; }
</style>
