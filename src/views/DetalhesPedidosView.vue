<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api/api'

const route = useRoute()
const router = useRouter()
const pedido = ref<any>(null)
const carregando = ref(true)

function formatarPreco(preco: number) {
  if (!preco) return 'R$ 0,00'
  return Number(preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function carregarDetalhes() {
  try {
    const id = route.params.id
    const resposta = await api.get(`/compras/${id}/`)
    pedido.value = resposta.data
  } catch (error) {
    console.error('Erro ao carregar detalhes do pedido:', error)
    alert('Não foi possível carregar os detalhes do pedido.')
  } finally {
    carregando.value = false
  }
}

function voltarProd() {
  router.back()
}

onMounted(() => {
  carregarDetalhes()
})
</script>

<template>
  <main class="pedido-detalhe-container">
    <button class="voltar" @click="voltarProd"><img src="/public/img/flecha.png" alt="flecha"></button>

    <div v-if="carregando" class="loading">Carregando detalhes...</div>

    <div v-else-if="pedido" class="detalhe-card">
      <div class="header-status">
        <h2>Pedido #{{ pedido.id }}</h2>
        <span class="status">{{ pedido.status || 'Pedido a caminho' }}</span>
      </div>

      <div class="info">
        <div class="info-item">
          <strong>Endereço de Entrega:</strong>
          <p>{{ pedido.endereco || 'Endereço não informado' }}</p>
        </div>

        <div class="info-item">
          <strong>Valor Total:</strong>
          <p class="preco-destaque">{{ formatarPreco(pedido.preco_total) }}</p>
        </div>
      </div>

      <div class="produtos-secao">
        <h3>Produtos da Compra</h3>
        <div class="produtos-grid">
          <div v-for="roupa in pedido.produtos" :key="roupa.id" class="roupa-card-detalhe">
            <img :src="roupa.foto?.url" :alt="roupa.nome" v-if="roupa.foto?.url" />
            <div v-else class="sem-foto" />
            <div class="roupa-info">
              <h4>{{ roupa.nome }}</h4>
              <p>{{ formatarPreco(roupa.preco) }}</p>
              <span v-if="roupa.cor">Cor: {{ roupa.cor }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.pedido-detalhe-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  color: #311111;
}

.voltar {
  width: 3vw;
  height: 2vw;
  margin: 6vw 0 2vw -6vw;
  cursor: pointer;
  transition: 0.3s;
}

.voltar:hover {
  transform: translateX(-10px);
}

.detalhe-card {
  background: #F5E9E0;
  border: 1px solid #cbb4a7;
  border-radius: 16px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d6bfb1;
  padding-bottom: 16px;
}

.header-status h2 {
  margin: 0;
  font-size: 26px;
}

.status {
  background: #B18A7E;
  color: #fff;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  background: #FFFAF6;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e8d5ca;
}

.info-item strong {
  font-size: 14px;
  color: #765d53;
  display: block;
  margin-bottom: 4px;
}

.info-item p {
  margin: 0;
  font-size: 16px;
}

.preco-destaque {
  font-weight: 700;
  color: #29b857;
}

.produtos-secao h3 {
  margin-bottom: 16px;
  font-size: 20px;
}

.produtos-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.roupa-card-detalhe {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #FFFAF6;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e8d5ca;
}

.roupa-card-detalhe img, .sem-foto {
  width: 90px;
  height: 92px;
  object-fit: cover;
  border-radius: 6px;
  background: #fff;
}

.roupa-info h4 {
  margin: 0 0 4px;
  font-size: 16px;
}

.roupa-info p {
  margin: 0 0 4px;
  font-weight: 600;
}

.roupa-info span {
  font-size: 13px;
  color: #765d53;
}

@media (max-width: 768px) {
  .voltar {
    width: 6vw;
    height: 2vw;
    margin: 1vw 0 0 1vw;
  }
}
</style>