<script setup lang="ts">
import { ref } from 'vue'

const slides = [
  { img: '/img/modelo2.png', nome: 'Vestido Marsala' },
  { img: '/img/modelo3.png', nome: 'Elegance Red' },
  { img: '/img/modelo4.png', nome: 'Midnight Blue' },
  { img: '/img/modelo5.png', nome: 'African Gold' },
  { img: '/img/modelo6.png', nome: 'Lavender Night' },
  { img: '/img/modelo7.png', nome: 'Classic Black' },
  { img: '/img/modelo17.png', nome: 'Golden Shine' },
  { img: '/img/modelo18.png', nome: 'Royal Green' },
  { img: '/img/modelo12.png', nome: 'White Pearl' }
]

const index = ref(2)

function nextSlide() {
  index.value = (index.value + 1) % slides.length
}

function prevSlide() {
  index.value =
    (index.value - 1 + slides.length) % slides.length
}

function getOffset(i: number) {
  const total = slides.length

  let diff = i - index.value

  if (diff > total / 2) {
    diff -= total
  }

  if (diff < -total / 2) {
    diff += total
  }

  return diff * 300
}

const hover = ref(false)
const hoverItem = ref<any>(null)

const mouseX = ref(0)
const mouseY = ref(0)

function showHover(item: any) {
  hover.value = true
  hoverItem.value = item
}

function hideHover() {
  hover.value = false
}

function moveHover(e: MouseEvent) {

  const cardWidth = 320

  if (window.innerWidth - e.clientX < cardWidth) {
    mouseX.value = e.clientX - 120
  } else {
    mouseX.value = e.clientX + 40
  }

  mouseY.value = e.clientY
}
</script>

<template>
  <main class="mini-carro">
    <div class="carrossel-container">

      <button class="voltar" @click="prevSlide">
        ❮
      </button>

      <div class="carrossel">
        <div class="carrossel-track">

          <div
            v-for="(slide, i) in slides"
            :key="i"
            class="card"
            :class="{ active: i === index }"
            :style="{
              transform: `
                translate(-50%, -50%)
                translateX(${getOffset(i)}px)
              `,
              opacity: i === index ? 1 : 0.45,
              zIndex: i === index ? 5 : 1
            }"
          >
            <img
              :src="slide.img"
              @mouseenter="showHover(slide)"
              @mouseleave="hideHover"
              @mousemove="moveHover"
            />
          </div>

        </div>
      </div>

      <button class="seguir" @click="nextSlide">
        ❯
      </button>

      <!-- HOVER PREMIUM -->
      <Transition name="fade">
        <div
          v-if="hover"
          class="hover-card"
          :style="{
            left: mouseX + 'px',
            top: mouseY + 'px'
          }"
        >
          <img :src="hoverItem.img" />

          <div class="hover-info">
            <h2>{{ hoverItem.nome }}</h2>
            <p>Nova coleção 2026</p>
          </div>
        </div>
      </Transition>

    </div>
  </main>
</template>

<style scoped>

.mini-carro {
  background: #E6D6C5;
  margin: 4vw 0;
}

.carrossel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carrossel {
  position: relative;
  width: 100%;
  height: 30vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carrossel-track {
  position: relative;
  width: 100%;
  height: 100%;
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 14vw;
  height: 24vw;

  border-radius: 1.3vw;
  overflow: hidden;

  transition:
    opacity .35s ease;
}

.card.active {
  width: 16vw;
  height: 26vw;
  opacity: 1;
  z-index: 5;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
}

/* HOVER */

.hover-card {
  position: fixed;
  width: 12vw;
  min-width: 240px;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(18px);

  border: 1px solid rgba(255,255,255,0.2);

  border-radius: 1.5vw;

  overflow: hidden;

  pointer-events: none;

  z-index: 999;

  box-shadow:
    0 10px 40px rgba(0,0,0,0.2);

  animation: floatIn .25s ease;
}

.hover-card img {
  width: 100%;
  height: 14vw;
  min-height: 280px;
  object-fit: cover;
}

.hover-info {
  padding: 1vw;
}

.hover-info h2 {
  font-size: 1.1vw;
  color: #000000;
  margin-bottom: .3vw;
}

.hover-info p {
  font-size: .8vw;
  color: rgba(0, 0, 0, 0.8);
}

/* BOTÕES */

.voltar,
.seguir {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  z-index: 10;
}

.voltar {
  left: 1vw;
}

.seguir {
  right: 1vw;
}

/* DEGRADÊ */

.carrossel-container::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 10vw;
  height: 100%;
  background: linear-gradient(to right,
      #E6D6C5,
      transparent);
  z-index: 2;
}

.carrossel-container::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 15vw;
  height: 100%;
  background: linear-gradient(to left,
      #E6D6C5,
      transparent);
  z-index: 2;
}

/* ANIMAÇÕES */

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes floatIn {
  from {
    opacity: 0;
    transform: scale(.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
