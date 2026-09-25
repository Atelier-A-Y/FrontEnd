<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from "../api/api"

/* =========================================================
   ROUPAS
========================================================= */

const slidesMobile = ref<any[]>([])
const indexMobile = ref(0)
const favoritosMobile = ref<number[]>([])

/* =========================================================
   CARREGAR ROUPAS DO BACKEND
========================================================= */

async function carregarRoupasMobile() {
  try {
    const resposta = await api.get("/roupas/")
    slidesMobile.value = resposta.data.results || resposta.data

    console.log("ROUPAS CARREGADAS:", slidesMobile.value)

    if (slidesMobile.value.length > 0) {
      indexMobile.value = Math.min(2, slidesMobile.value.length - 1)
    }

  } catch (erro: any) {

    console.error("ERRO AO CARREGAR ROUPAS:", erro)

    if (erro.response) {
      console.log("STATUS:", erro.response.status)
      console.log("DADOS:", erro.response.data)
    }
  }
}

/* =========================================================
   CARREGAR FAVORITOS
========================================================= */

async function carregarFavoritosMobile() {
  try {
    const respostaMobile = await api.get("/favoritos/")
    const listaMobile = respostaMobile.data.results || respostaMobile.data

    favoritosMobile.value = listaMobile
      .map((item: any) => {
        if (typeof item.roupa === "number"){
          return item.roupa
        }

        if(item.roupa?.id){
          return item.roupa.id
        }

        return null
      })
      .filter((id: any) => id !== null)

    console.log("IDs DOS FAVORITOS:", favoritosMobile.value)

  } catch (erro: any) {
    console.error("ERRO AO CARREGAR FAVORITOS:", erro)

    if(erro.response){
      console.log("STATUS:", erro.response.status)
      console.log("DADOS:", erro.response.data)
    }
  }
}

/* =========================================================
   ALTERAR FAVORITO
========================================================= */

async function alterarFavMobile(id: number) {

  console.log("ID DA ROUPA CLICADA:", id)

  if(!id){
    console.error("Essa roupa não possui ID")
    return
  }
  
  try {
    const respostaMobile = await api.get("/favoritos/")
    const listaMobile = respostaMobile.data.results || respostaMobile.data

    console.log("FAVORITOS DO USUÁRIO:", listaMobile)

    const favoritoExistenteMobile = listaMobile.find((item: any) => {
      if(typeof item.roupa === "number"){
        return item.roupa === id
      }
      return item.roupa?.id === id
    })

    if(favoritoExistenteMobile){
      console.log("REMOVENDO FAVORITO:", favoritoExistenteMobile.id)

      await api.delete(`/favoritos/${favoritoExistenteMobile.id}/`)

      favoritosMobile.value = favoritosMobile.value.filter(
        favoritoMobileId => favoritoMobileId !== id
      )
      console.log("FAVORITO REMOVIDO")
    }
  
    else {
      console.log("ADICIONANDO ROUPA:", id)

      await api.post("/favoritos/", {
        roupa: id
      })

      favoritosMobile.value.push(id)

      console.log("FAVORITO ADICIONADO!")
    }
  } catch (erro: any) {
    console.error("ERRO AO ALTERAR FAVORITO:", erro)

    if (erro.response) {
      console.log("STATUS:", erro.response.status)
      console.log("DADOS:", erro.response.data)
    }
  }
}

/* =========================================================
   VERIFICAR SE É FAVORITO
========================================================= */

function ehFavoritoMobile(id: number) {
  return favoritosMobile.value.includes(id)
}

/* =========================================================
   PRÓXIMO SLIDE
========================================================= */

function nextSlideMobile() {
  if (slidesMobile.value.length === 0) return

  indexMobile.value =
    (indexMobile.value + 1) % slidesMobile.value.length
}

/* =========================================================
   SLIDE ANTERIOR
========================================================= */

function prevSlideMobile() {
  if (slidesMobile.value.length === 0) return

  indexMobile.value =
    (indexMobile.value - 1 + slidesMobile.value.length)
    % slidesMobile.value.length
}

/* =========================================================
   POSIÇÃO DOS CARDS
========================================================= */

function getOffset(i: number) {
  const total = slidesMobile.value.length

  if (total === 0) return 0

  let diff = i - indexMobile.value

  if (diff > total / 2) {
    diff -= total
  }

  if (diff < -total / 2) {
    diff += total
  }

  /*
    Distância entre os cards no mobile.
  */
  return diff * 285
}

/* =========================================================
   HOVER
========================================================= */

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
  }

  else {
    mouseX.value = e.clientX + 40
  }
  mouseY.value = e.clientY
}

/* =========================================================
   IMAGEM DA ROUPA
========================================================= */

function getImagem(slide: any) {
  return (
    slide.foto ||
    slide.imagem ||
    slide.foto_url ||
    slide.image ||
    ''
  )
}

/* =========================================================
   CARREGAMENTO INICIAL
========================================================= */

onMounted(async () => {
  await carregarRoupasMobile()
  await carregarFavoritosMobile()
})
</script>


<template>
  <main>

    <!-- =====================================================
         BANNER DESKTOP
    ====================================================== -->

    <router-link
      to="/formatura"
      class="banner"
    >

      <img
        src="/img/formanda_banner.png"
        alt="banner"
      >


      <div class="overlay">

        <div class="marca">

          <span class="marca1">
            ATELIER
          </span>

          <span class="marca2">
            A.Y.
          </span>

        </div>


        <div class="texto">

          <h2>
            50% OFF
            <br>
            PARA
            <br>
            FORMANDOS
          </h2>

        </div>

      </div>

    </router-link>



    <!-- =====================================================
         CARROSSEL MOBILE
    ====================================================== -->

    <div class="carrossel-container-mobile">
      <button
        class="voltar-mobile"
        @click="prevSlideMobile"
      >
        ❮
      </button>

      <div class="carrossel-mobile">
        <div class="carrossel-track-mobile">
          <div
            v-for="(slide, i) in slidesMobile"
            :key="slide.id"
            class="card"
            :class="{
              active: i === indexMobile
            }"
            :style="{
              transform: `
                translate(-50%, -50%)
                translateX(${getOffset(i)}px)
              `,
              opacity: i === indexMobile ? 1 : 0.45,
              zIndex: i === indexMobile ? 100 : 1
            }"
          >
            <div class="imagem-card">
              <img
                :src="getImagem(slide)"
                :alt="slide.nome"
                @mouseenter="showHover(slide)"
                @mouseleave="hideHover"
                @mousemove="moveHover"
              >
            </div>
            <div class="info-card">
              <div class="dados-card">

                <span class="nome-card">
                  {{ slide.nome }}
                </span>

                <span class="preco-card">
                  R$
                  {{ slide.preco }}
                </span>
                
              </div>

              <button
                class="favorito-card"
                @click.stop="alterarFavMobile(slide.id)"
              >

                <img
                  :src="
                    ehFavoritoMobile(slide.id)
                      ? '/img/coracao-cheio.png'
                      : '/img/coracao-solido.png'
                  "
                  alt="Favoritar"
                >
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        class="seguir-mobile"
        @click="nextSlideMobile"
      >
        ❯
      </button>
    </div>
  </main>
</template>

<style scoped>
.carrossel-container-mobile{
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
  height: 95vw;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  isolation: isolate;
}

  /* =========================
     CARDS
  ========================= */

  .card {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 65vw;
  height: 82vw;

  background: #f5e9e0;

  border-radius: 4vw;
  overflow: hidden;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  transition:
    transform 0.4s ease,
    opacity 0.4s ease,
    width 0.4s ease,
    height 0.4s ease;
  }

  .card.active {
    width: 70vw;
    height: 88vw;

    opacity: 1;
    z-index: 5;
  }


  .imagem-card {
  width: 100%;
  height: 72%;

  overflow: hidden;
}

.imagem-card img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;

  cursor: pointer;
}

.info-card {
  width: 100%;
  height: 25%;

  padding: 3vw 4vw;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: #f5e9e0;
}

.dados-card {
  display: flex;
  flex-direction: column;

  gap: 1vw;
}

.nome-card {
  font-family: "Playfair", serif;

  font-size: 4.5vw;
  font-weight: 500;

  color: #311111;

  line-height: 1.1;
}

.preco-card {
  font-family: "Playfair", serif;

  font-size: 4vw;

  color: #311111;

  line-height: 1.1;
}

.favorito-card {
  background: transparent;
  border: none;

  padding: 0;
  margin: 0;

  width: 9vw;
  height: 9vw;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  flex-shrink: 0;
}

.favorito-card img {
  width: 8vw;
  height: 8vw;

  object-fit: contain;
  display: block;
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
