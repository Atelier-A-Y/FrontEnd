<script setup lang="ts">
import { ref } from 'vue'

const carousel = ref<HTMLElement | null>(null)

const items = [
  '/img/modelo3.png',
  '/img/modelo7.png',
  '/img/modelo12.png',
  '/img/modelo17.png',
  '/img/modelo18.png'
]

const activeIndex = ref(2)

function scrollToIndex(index: number) {
  const el = carousel.value?.children[index] as HTMLElement

  if (!el) return

  el.scrollIntoView({
    behavior: 'smooth',
    inline: 'center'
  })

  activeIndex.value = index
}

function scrollLeft() {
  const next = Math.max(0, activeIndex.value - 1)
  scrollToIndex(next)
}

function scrollRight() {
  const next = Math.min(items.length - 1, activeIndex.value + 1)
  scrollToIndex(next)
}
</script>

<template>
  <main>
    <div class="carousel-container">
  <button class="arrow left" @click="scrollLeft">‹</button>

  <div class="carousel" ref="carousel">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="card"
      :class="{ active: index === activeIndex }"
    >
      <img :src="item" alt="look">
    </div>
  </div>

  <button class="arrow right" @click="scrollRight">›</button>
</div>
  </main>
</template>

<style scoped>
.carousel-container {
  position: relative;
}

/* fade esquerda */
.carousel-container::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 120px;
  height: 100%;
  background: linear-gradient(to right, #eae4dc, transparent);
  z-index: 2;
}

/* fade direita */
.carousel-container::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 120px;
  height: 100%;
  background: linear-gradient(to left, #eae4dc, transparent);
  z-index: 2;
}

/* área scroll */
.carousel {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 40px 120px;
}

.carousel::-webkit-scrollbar {
  display: none;
}

.card {
  flex: 0 0 auto;
  width: 180px;
  height: 260px;
  border-radius: 20px;
  overflow: hidden;

  scroll-snap-align: center;

  transition: all 0.4s ease;
  opacity: 0.4;
  transform: scale(0.9);
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ITEM CENTRAL */
.card.active {
  width: 260px;
  height: 360px;
  opacity: 1;
  transform: scale(1);
}

/* setas */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 40px;
  cursor: pointer;
  color: #999;
  z-index: 2;
}

.arrow.left {
  left: 10px;
}

.arrow.right {
  right: 10px;
}
</style>
