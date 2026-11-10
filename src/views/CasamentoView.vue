<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import api from '../api/api'
import { useRouter } from 'vue-router'

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
const router = useRouter();

function abrirProdutos(id){
  router.push(`/info_prod/${id}`)
}

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
    console.log('Produto recebido:', vestidos.value[0])
    console.log('Foto recebida:', vestidos.value[0]?.foto)

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

    <div class="lista-vestidos">

      <div
        v-for="vestido in vestidos"
        :key="vestido.id"
        class="card-vestido"
        @click="abrirProdutos(vestido.id)"
      >

        <img
          :src="vestido.foto?.url"
          :alt="vestido.nome"
        />

        <h3>{{ vestido.nome }}</h3>

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

/* CARROSSEL PRINCIPAL */

.carrossel-principal {
  position: relative;
  width: 100%;
  height: 90vh;
  overflow: hidden;
}

.carrossel-principal img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.8s ease;
  z-index: 0;
}

.carrossel-principal img.active {
  opacity: 1;
}

.carrossel-principal button {
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

.carrossel-principal button:first-of-type {
  left: 25px;
}

.carrossel-principal button:last-of-type {
  right: 25px;
}

/* SEÇÃO DE PRODUTOS */

.produtos {
  width: 100%;
  padding: 65px 7%;
  box-sizing: border-box;
  color: #311111;
  background: #fbf7f3;
}

/* GRADE */

.lista-vestidos {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 35px 28px;
  width: 100%;
}

/* CARTÕES */

.card-vestido {
  min-width: 0;
  background: #F5E6DE;
  overflow: hidden;
  border: 1px solid #eee3da;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  border-radius: 0.7vw;
}

.card-vestido:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(49, 17, 17, 0.10);
}

/* IMAGENS */

.card-vestido img {
  position: static;
  display: block;
  width: 100%;
  height: 440px;
  object-fit: cover;
  object-position: center;
  opacity: 1;
  transform: scale(1);
  transition: transform 0.6s ease;
}

.card-vestido:hover img {
  transform: scale(1.035);
}

/* INFORMAÇÕES */

.card-vestido h3 {
  font-family: 'Bodoni Moda', serif;
  font-size: 1.35rem;
  font-weight: 500;
  color: #311111;
  margin: 0;
  padding: 20px 20px 8px;
}

.card-vestido p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #806e65;
  padding: 0 20px;
  margin: 0 0 15px;
}

.card-vestido span {
  display: block;
  padding: 0 20px 22px;
  color: #59352d;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .carrossel-principal {
    height: 65vw;
  }

  .carrossel-principal img {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: none;
    object-fit: cover;
  }

  .carrossel-principal button {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }

  .carrossel-principal button:first-of-type {
    left: 12px;
  }

  .carrossel-principal button:last-of-type {
    right: 12px;
  }

  .produtos {
    padding: 38px 4%;
  }

  .lista-vestidos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px 12px;
  }

  .card-vestido {
    border-radius: 5px;
  }

  .card-vestido img {
    height: 260px;
  }

  .card-vestido h3 {
    font-size: 1.05rem;
    padding: 13px 10px 6px;
  }

  .card-vestido p {
    font-size: 0.78rem;
    padding: 0 10px;
    margin-bottom: 10px;
  }

  .card-vestido span {
    font-size: 0.9rem;
    padding: 0 10px 14px;
  }
}
</style>

