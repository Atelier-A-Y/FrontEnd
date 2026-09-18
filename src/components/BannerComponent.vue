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
  <main>
    <router-link to="/formatura" class="banner">
      <img src="/img/formanda_banner.png" alt="banner">

      <div class="overlay">
        <div class="marca">
          <span class="marca1">ATELIER</span>
          <span class="marca2">A.Y.</span>
        </div>
        <div class="texto">
          <h2>50% OFF<br>PARA<br>FORMANDOS</h2>
        </div>
      </div>
    </router-link>


    <div class="carrossel-container-mobile">

      <button class="voltar-mobile" @click="prevSlide">
        ❮
      </button>

      <div class="carrossel-mobile">
        <div class="carrossel-track-mobile">

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

      <button class="seguir-mobile" @click="nextSlide">
        ❯
      </button>
    </div>
  </main>
</template>

<style scoped>
.carrossel-container{
  display: none;
}

.banner {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: block;
}

.banner img {
  width: 57%;
  display: block;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.39) 30%,
    rgb(0, 0, 0) 48%,
    rgb(0, 0, 0) 100%
  );
    height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.texto {
  color: white;
  text-align: left;
  margin-right: 24vw;
}

.texto h2 {
  font-family: "Playfair", serif;
  font-optical-sizing: auto;
  font-style: normal;
  width: 100;
  font-size: 4.5vw;
  line-height: 1.2;
}

.marca{
  position: absolute;
  left: 92vw;
  bottom: 18vw;
  transform: translateY(-50%);
  color: white;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.marca1 {
  font-size: 1vw;
  letter-spacing: 0.1vw;
  display: block;
}

.marca2 {
  font-size: 0.9vw;
  letter-spacing: 0.1vw;
  display: block;
  margin-left: 1.5vw;
}

@media(max-width: 600px) {
  .banner{
    display: none;
  }

  .carrossel-container-mobile {
    position: relative;
    width: 100%;
    height: 95vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  /* =========================
     ÁREA DO CARROSSEL
  ========================= */

  .carrossel-mobile {
    position: relative;
    width: 100%;
    height: 85vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  /* Área onde os cards ficam */
  .carrossel-track-mobile {
    position: relative;
    width: 100%;
    height: 100%;
  }


  /* =========================
     CARDS
  ========================= */

  .card {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 42vw;
    height: 62vw;

    border-radius: 3vw;
    overflow: hidden;

    transition:
      transform 0.4s ease,
      opacity 0.4s ease,
      width 0.4s ease,
      height 0.4s ease;

    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }


  /* Card central */
  .card.active {
    width: 48vw;
    height: 70vw;

    opacity: 1;
    z-index: 5;
  }


  /* Imagem */
  .card img {
    width: 100%;
    height: 100%;

    object-fit: cover;
    display: block;

    cursor: pointer;
  }


  /* =========================
     BOTÕES
  ========================= */

  .voltar-mobile,
  .seguir-mobile {
    position: absolute;

    top: 50%;
    transform: translateY(-50%);

    width: 12vw;
    height: 12vw;

    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(49, 17, 17, 0.75);
    border: none;
    border-radius: 50%;

    color: white;

    font-size: 7vw;
    line-height: 1;

    cursor: pointer;

    z-index: 20;

    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }


  .voltar-mobile {
    left: 3vw;
  }


  .seguir-mobile {
    right: 3vw;
  }


  /* Efeito ao tocar/clicar */
  .voltar-mobile:active,
  .seguir-mobile:active {
    transform: translateY(-50%) scale(0.9);
  }


  /* =========================
     HOVER
     ========================= */

  .hover-card-mobile {
    display: none;
  }

  .hover-card-mobile img {
    display: none;
  }

  .hover-info-mobile {
    display: none;
  }
}
</style>
