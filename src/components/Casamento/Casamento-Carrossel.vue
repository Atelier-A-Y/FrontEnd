```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const slides = [
  {
    desktop: '/img/noiva2.png',
    mobile: '/img/noiva2_mobile.png',
  },
  {
    desktop: '/img/noiva3.png',
    mobile: '/img/noiva3.png',
  },
  {
    desktop: '/img/noiva4.png',
    mobile: '/img/noiva4_mobile.png',
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
main {
  margin: 0;
  padding: 0;
}

.carrossel-principal {
  position: relative;
  width: 100%;
  height: 80vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
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

button:first-of-type {
  left: 10px;
}

button:last-of-type {
  right: 10px;
}

@media(max-width:768px){
  .carrossel-principal {
    position: relative;
    width: 100%;
    height: 80vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  img {
    position: absolute;
    top: 50%;
    left: 50%;
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

  button:first-of-type {
    left: 10px;
  }

  button:last-of-type {
    right: 10px;
  }
}
</style>

