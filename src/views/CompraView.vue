<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import api from "../api/api";

const router = useRouter();
const carrinho = ref<any[]>([]);
const endereco = ref("");
const carregando = ref(false);
const mensagemSucesso = ref("");

async function carregarCarrinho() {
  try {
    const resposta = await api.get("/carrinho/");
    carrinho.value = resposta.data.results || resposta.data || [];

    if (carrinho.value.length === 0) {
      router.push("/carrinho");
    }
  } catch (erro) {
    console.error("Erro ao carregar itens:", erro);
  }
}

const totalCompra = computed(() => {
  return carrinho.value.reduce((total, item) => {
    const preco = Number(item.roupa_detalhes?.preco || item.preco || 0);
    const quantidade = Number(item.quantidade || 1);
    return total + preco * quantidade;
  }, 0);
});

async function concluirCompra() {
  if (!endereco.value.trim()) {
    alert("Por favor, informe o endereço de entrega.");
    return;
  }

  carregando.value = true;

  try {
    // Extrai os IDs das roupas do carrinho
    const produtosIds = carrinho.value.map(
      (item) => item.roupa_id || item.roupa?.id || item.roupa_detalhes?.id || item.id
    );

    // Mandamos tanto 'produtos' quanto 'produtos_ids' para garantir que o Django receba
    const dadosEnvio = {
      endereco: endereco.value,
      produtos: produtosIds,
      produtos_ids: produtosIds,
      status: "Pedido a caminho",
    };

    console.log("ENVIANDO PARA O BACKEND:", dadosEnvio);

    // 1. Cria a Compra no back-end
    await api.post("/compras/", dadosEnvio);

    // 2. Remove os itens do carrinho no back-end
    await Promise.all(
      carrinho.value.map((item) => api.delete(`/carrinho/${item.id}/`))
    );

    mensagemSucesso.value = "Seu pedido foi registrado com sucesso!";
  } catch (erro: any) {
    console.error("Erro ao concluir compra:", erro);
    // Se o erro for de validação do Django, exibe o motivo no alerta
    if (erro.response && erro.response.data) {
      console.log("Detalhes do erro do Django:", erro.response.data);
      alert("Erro ao salvar: " + JSON.stringify(erro.response.data));
    } else {
      alert("Não foi possível concluir a compra. Tente novamente.");
    }
  } finally {
    carregando.value = false;
  }
}

onMounted(carregarCarrinho);
</script>

<template>
  <main class="compra-container">
    <!-- ALERTA DE SUCESSO -->
    <div v-if="mensagemSucesso" class="alerta-overlay">
      <div class="alerta-sucesso">
        <div class="icone-sucesso"><span>✓</span></div>
        <h2>Compra concluída!</h2>
        <p>{{ mensagemSucesso }}</p>
        <button @click="router.push('/user')">Ver meus pedidos</button>
      </div>
    </div>

    <button class="voltar" @click="router.push('/produtos')">
      <img src="/public/img/flecha.png" alt="flecha">
      <span>Continuar Comprando</span>
    </button>

    <h1>Finalizar Compra</h1>

    <div class="compra-grid">
      <!-- COLUNA ESQUERDA: ENDEREÇO -->
      <section class="card-secao">
        <h2>Endereço de Entrega</h2>
        <div class="campo">
          <label for="endereco">Rua e Número</label>
          <input
            id="endereco"
            v-model="endereco"
            type="text"
            placeholder="Ex: Rua Luiz Maski, 848"
            maxlength="32"
          />
          <small class="aviso-char">Atenção: Máximo de 32 caracteres.</small>
        </div>

        <button
          class="botao-confirmar"
          @click="concluirCompra"
          :disabled="carregando"
        >
          {{ carregando ? "Processando..." : "Confirmar e Finalizar Pedido" }}
        </button>
      </section>

      <!-- COLUNA DIREITA: RESUMO COM OS PRODUTOS -->
      <section class="card-secao resumo">
        <h2>Resumo do Pedido</h2>

        <div class="lista-resumo">
          <div v-for="item in carrinho" :key="item.id" class="item-resumo">
            <img
              v-if="item.roupa_detalhes?.foto"
              :src="item.roupa_detalhes.foto.url"
              :alt="item.roupa_detalhes.nome"
            />
            <div v-else class="sem-foto" />

            <div class="item-detalhes">
              <strong>{{ item.roupa_detalhes?.nome }}</strong>
              <span>Qtd: {{ item.quantidade }}</span>
            </div>

            <span class="item-preco">
              R$ {{ (Number(item.roupa_detalhes?.preco || 0) * item.quantidade).toFixed(2).replace(".", ",") }}
            </span>
          </div>
        </div>

        <hr />

        <div class="total-final">
          <span>Total:</span>
          <strong>R$ {{ totalCompra.toFixed(2).replace(".", ",") }}</strong>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.compra-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
  color: #311111;
}

.voltar {
  display: flex;
  align-items: center;
  gap: 0.8vw;
  width: fit-content;
  margin: 8vw 0 2vw -6vw;
  cursor: pointer;
  transition: 0.3s;
  background: transparent;
  border: none;
  padding: 0;
}

.voltar img {
  width: 2vw;
  height: 2vw;
  object-fit: contain;
}

.voltar span {
  margin: 0;
  white-space: nowrap;
  font-size: 18px;
  color: #311111;
  font-weight: 500;
}

.voltar:hover {
  transform: translateX(-10px);
}

h1 {
  margin-bottom: 25px;
  font-size: 28px;
}

.compra-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  align-items: start;
}

.card-secao {
  background-color: #f5e9e0;
  border: 1px solid #dfcec4;
  border-radius: 12px;
  padding: 24px;
}

.card-secao h2 {
  margin: 0 0 20px;
  font-size: 20px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.campo label {
  font-weight: 600;
  font-size: 15px;
}

.campo input {
  height: 46px;
  padding: 0 14px;
  border: 1px solid #cbb4a7;
  border-radius: 8px;
  background: #fffaf6;
  font-size: 15px;
  color: #311111;
}

.aviso-char {
  color: #765d53;
  font-size: 12px;
}

.botao-confirmar {
  width: 100%;
  height: 48px;
  background-color: #311111;
  color: #f5e9e0;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.botao-confirmar:hover {
  background-color: #5a1f1f;
}

.lista-resumo {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 350px;
  overflow-y: auto;
  margin-bottom: 18px;
}

.item-resumo {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fffaf6;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #dfcec4;
}

.item-resumo img, .sem-foto {
  width: 50px;
  height: 62px;
  object-fit: cover;
  border-radius: 6px;
  background: #fff;
}

.item-detalhes {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.item-detalhes span {
  color: #765d53;
  font-size: 12px;
  margin-top: 4px;
}

.item-preco {
  font-weight: 600;
  font-size: 14px;
  color: #277c00;
}

hr {
  border: 0;
  border-top: 1px solid #cbb4a7;
  margin: 16px 0;
}

.total-final {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
}

.total-final strong {
  color: #277c00;
  font-size: 22px;
}

/* ALERTA */
.alerta-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
}

.alerta-sucesso {
  background-color: #fffaf6;
  border-radius: 18px;
  max-width: 400px;
  width: 100%;
  padding: 35px 25px;
  text-align: center;
}

.icone-sucesso {
  width: 70px;
  height: 70px;
  background-color: #e1f3df;
  color: #277c00;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 20px;
  font-size: 40px;
  font-weight: bold;
}

.alerta-sucesso button {
  background-color: #311111;
  color: #f5e9e0;
  border: none;
  border-radius: 7px;
  padding: 12px 30px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .compra-grid {
    grid-template-columns: 1fr;
  }

  h1{
    text-align: center;
  }

  .voltar img{
    margin: 1vw 0 0 4vw;
    width: 5vw;
    height: 5vw;
  }

  .voltar span{
    font-size: 14px;
    margin: 5px 0 0 0;
  }
}
</style>