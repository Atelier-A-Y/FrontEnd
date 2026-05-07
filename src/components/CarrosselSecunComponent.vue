<script setup lang="ts">
import { ref } from 'vue'

const slides = [
  { img: '/img/modelo2.png' },
  { img: '/img/modelo3.png' },
  { img: '/img/modelo4.png' },
  { img: '/img/modelo5.png' },
  { img: '/img/modelo6.png' },
  { img: '/img/modelo7.png' },
  { img: '/img/modelo17.png' },
  { img: '/img/modelo18.png' },
  { img: '/img/modelo12.png' }
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

  // LOOP INFINITO
  if (diff > total / 2) {
    diff -= total
  }

  if (diff < -total / 2) {
    diff += total
  }

  return diff * 180
}
</script>

<template>
  <main>
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
  scale: i === index ? '1' : '0.92',
  opacity: i === index ? 1 : 0.45,
  zIndex: i === index ? 5 : 1
}"
  >
    <img :src="slide.img" />
  </div>
</div>
</div>

      <button class="seguir" @click="nextSlide">
        ❯
      </button>

    </div>
  </main>
</template>

<style scoped>
main{
  background: #E6D6C5;
  padding: 2vw 0;
}

.carrossel-container{
  position: relative;
  width: 100%;
  overflow: hidden;
}

/*=========================
        CARROSSEL
=========================*/

.carrossel{
  position: relative;

  width: 100%;
  height: 420px;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}

.carrossel-track{
  position: relative;

  width: 100%;
  height: 100%;
}

/*=========================
          CARD
=========================*/

.card{
  position: absolute;

  top: 50%;
  left: 50%;

  width: 140px;
  height: 230px;

  border-radius: 1.3vw;
  overflow: hidden;

  opacity: 0.45;

  transform:
    translate(-50%, -50%)
    scale(0.92);

  transition: opacity 0.5s ease,
    scale 0.5s ease;

  z-index: 1;
}

/*=========================
      CARD ATIVO
=========================*/

.card.active{
  width: 220px;
  height: 340px;

  opacity: 1;

  transform:
    translate(-50%, -50%)
    scale(1);

  z-index: 5;
}

/*=========================
          IMG
=========================*/

.card img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/*=========================
          SETAS
=========================*/

.voltar, .seguir{
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

.voltar{
  left: 1vw;
}

.seguir{
  right: 1vw;
}

/*=========================
        FADE
=========================*/

.carrossel-container::before{
  content: "";

  position: absolute;
  left: 0;
  top: 0;

  width: 120px;
  height: 100%;

  background: linear-gradient(
    to right,
    #E6D6C5,
    transparent
  );

  z-index: 2;
}

.carrossel-container::after{
  content: "";

  position: absolute;
  right: 0;
  top: 0;

  width: 120px;
  height: 100%;

  background: linear-gradient(
    to left,
    #E6D6C5,
    transparent
  );

  z-index: 2;
}
</style>
