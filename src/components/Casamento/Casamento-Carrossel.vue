```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import api from '../../api/api'

const slides = [
  {
    desktop: '/img/noiva2.png',
    mobile: '/img/noiva2_mobile.jpeg',
  },
  {
    desktop: '/img/noiva3.png',
    mobile: '/img/noiva3_mobile.jpeg',
  },
  {
    desktop: '/img/noiva4.png',
    mobile: '/img/noiva4_mobile.jpeg',
  }
]

const index = ref(0)
const isMobile = ref(window.innerWidth <= 768)
const vestidos = ref<any[]>([])

async function buscarVestidos() {
  try {
    const resposta = await api.get(
      '/roupas/',
      {
        params: {
    'categoria__nome__iexact': 'casamento'
  }
      }
    )

    console.log('STATUS:', resposta.status)
    console.log('DADOS RECEBIDOS:', resposta.data)

    vestidos.value = resposta.data.results || resposta.data

    console.log('QUANTIDADE:', vestidos.value.length)
    console.log('PRIMEIRO VESTIDO:', vestidos.value[0])

  } catch (erro) {
    console.error('ERRO:', erro)
  }
}

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

onMounted(buscarVestidos)
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
  <section class="produtos">

    <h1>Vestidos de Casamento</h1>

    <div class="lista-vestidos">

      <div
        v-for="vestido in vestidos"
        :key="vestido.id"
        class="card-vestido"
      >

        <img
          :src="vestido.foto?.url"
          :alt="vestido.nome"
        />

        <h3>{{ vestido.nome }}</h3>

        <p>{{ vestido.descricao }}</p>

        <span>
          R$ {{ vestido.preco }}
        </span>

      </div>

    </div>

  </section>
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

