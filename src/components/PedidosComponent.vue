<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  pedidos: any[]
  carregandoPedidos: boolean
}>()

function formatarPreco(preco: number) {
  if (!preco) return 'R$ 0,00'
  return Number(preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<template>
  <div class="pedidos-container-section">
    <div class="title">
      <img src="/img/caminhao.png" alt="">
      <h2>Pedidos</h2>
    </div>

    <p v-if="carregandoPedidos" class="empty-message">
      Carregando seus pedidos...
    </p>

    <p v-else-if="pedidos.length === 0" class="empty-message">
      Você ainda não possui pedidos.
    </p>

    <div v-else class="pedidos-lista">
      <div
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="pedido-card clicavel"
        @click="router.push(`/pedido/${pedido.id}`)"
      >
        <div class="pedido-info-wrapper">
          <div class="pedido-icon">
            <img src="/img/caminhao.png" alt="">
          </div>

          <div class="pedido-info">
            <div class="titulo">
              <h3>Pedido #{{ pedido.id }}</h3>
              <span class="status">{{ pedido.status }}</span>
            </div>
            <p class="preco-total" v-if="pedido.preco_total !== undefined">
              <strong>Total: </strong> {{ formatarPreco(pedido.preco_total) }}
            </p>
          </div>
        </div>

        <div class="roupas-envolvidas" v-if="pedido.produtos && pedido.produtos.length > 0">
          <div 
            v-for="roupa in pedido.produtos.slice(0, 5)" 
            :key="roupa.id" 
            class="item-roupa"
          >
            <img 
              v-if="roupa.foto && roupa.foto.url" 
              :src="roupa.foto.url" 
              :alt="roupa.nome" 
            />
            <div v-else class="sem-foto" />
            <span class="roupa-nome" :title="roupa.nome">{{ roupa.nome }}</span>
          </div>

          <div 
            v-if="pedido.produtos.length > 5" 
            class="item-roupa item-extra"
            :title="`Mais ${pedido.produtos.length - 5} peça(s) neste pedido`"
          >
            <div class="extra-box">
              +{{ pedido.produtos.length - 5 }}
            </div>
            <span class="roupa-nome">mais</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.title img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.title h2 {
  margin: 0;
  font-size: 24px;
  color: #311111;
}

.empty-message {
  margin: 0;
  line-height: 1.6;
  color: #311111;
}

.pedidos-lista {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.pedido-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 24px;
  border: 1px solid #cbb4a7;
  border-radius: 12px;
  background: #FFFAF6;
}

.pedido-card.clicavel {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.pedido-card.clicavel:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(49, 17, 17, 0.08);
}

.pedido-info-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pedido-icon {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: #E8D5CA;
}

.pedido-icon img {
  width: 26px;
  height: 26px;
  object-fit: contain;
}

.pedido-info h3 {
  margin: 0 0 4px;
  font-size: 18px;
  color: #311111;
}

.pedido-info p {
  margin: 0 0 4px;
  color: #311111;
}

.preco-total {
  margin-top: 6px !important;
  font-size: 15px;
  color: #311111;
}

.roupas-envolvidas {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.item-roupa {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 72px;
}

.item-roupa img, 
.sem-foto, 
.extra-box {
  width: 72px;
  height: 88px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #cbb4a7;
  background: #fff;
  box-shadow: 0 2px 6px rgba(49, 17, 17, 0.06);
}

.sem-foto {
  background: #e8d5ca;
}

.extra-box {
  display: grid;
  place-items: center;
  background: #F5E9E0;
  color: #311111;
  font-weight: 700;
  font-size: 18px;
  border: 1px dashed #9e7b6b;
}

.roupa-nome {
  font-size: 12px;
  font-weight: 500;
  color: #311111;
  margin-top: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 72px;
}

.status {
  background:  #B18A7E;
  color: #fdfdfd;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  margin-left: 1vw;
  margin-bottom: 0.5vw;
}

.titulo {
  display: flex;
}

@media (max-width: 768px) {

  .pedido-card {
    padding: 14px;
    gap: 12px;
  }

  .pedido-info h3 {
    font-size: 15px;
    flex-shrink: 0;
  }

  .pedido-info span {
    font-size: 10px;
  }

  .status {
    border-radius: 20px;
    text-align: center;
    flex-shrink: 0;
    margin: 0 0 0 25px;
    padding: 6px 12px;
  }

  .roupas-envolvidas {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    gap: 10px;
    padding-top: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .roupas-envolvidas::-webkit-scrollbar {
    display: none;
  }

  .item-roupa {
    width: 64px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item-roupa img, 
  .sem-foto, 
  .extra-box {
    width: 64px;
    height: 78px;
    object-fit: cover;
    border-radius: 10px;
  }

  .roupa-nome {
    max-width: 64px;
    font-size: 11px;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
}

</style>