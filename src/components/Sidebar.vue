<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { changePassword } from '../services/user'

defineProps<{
  form: {
    name: string
    cpf: string
    telefone: string
    email: string
  }
  menuAtivo: string
}>()

const emit = defineEmits(['update:menuAtivo'])

const modalSenha = ref(false)
const senhaAtual = ref('')
const novaSenha = ref('')
const confirmarSenha = ref('')
const mostrarSenhaAtual = ref(false)
const mostrarNovaSenha = ref(false)
const mostrarConfirmarSenha = ref(false)
const router = useRouter()
const authStore = useAuthStore()

function sair() {
  const confirmar = confirm(
    'Deseja realmente sair da sua conta?'
  )

  if (!confirmar) return

  authStore.logout()
  router.push('/login')
}

async function alterarSenha() {
  if (!senhaAtual.value || !novaSenha.value || !confirmarSenha.value) {
    alert('Preencha todos os campos.')
    return
  }

  if (novaSenha.value !== confirmarSenha.value) {
    alert('As senhas não coincidem.')
    return
  }

  try {
    // chamada para sua API
    await changePassword({
      current_password: senhaAtual.value,
      new_password: novaSenha.value
    })

    alert('Senha alterada com sucesso!')

    senhaAtual.value = ''
    novaSenha.value = ''
    confirmarSenha.value = ''

    modalSenha.value = false
  } catch (error) {
    console.error(error)
    alert('Erro ao alterar senha.')
  }
}
</script>

<template>
  <aside class="sidebar">

    <div class="welcome-card">
      <div class="icon">
        <img src="/img/user-solido.png" alt="user.png">
      </div>

      <div>
        <p>Bem-vindo,</p>
        <h1>{{ form.name }}</h1>

        <div class="email-box">

          <span>
            {{form.email}}
          </span>

        </div>

        <button
          class="change-password"
          @click="modalSenha = true"
        >
          Alterar Senha
        </button>

        <div v-if="modalSenha" class="modal">
          <div class="modal-content">
            <h2>Alterar Senha</h2>

            <div class="senha-field">
              <input
                v-model="senhaAtual"
                :type="mostrarSenhaAtual ? 'text' : 'password'"
                placeholder="Senha atual"
              >

              <button
                type="button"
                @click="mostrarSenhaAtual = !mostrarSenhaAtual"
              >
                <img
                  :src="mostrarSenhaAtual
                    ? '/img/olho-fechado.png'
                    : '/img/olho-aberto.png'"
                  alt="Mostrar senha"
                >
              </button>
            </div>

            <div class="senha-field">
              <input
                v-model="novaSenha"
                :type="mostrarNovaSenha ? 'text' : 'password'"
                placeholder="Nova senha"
              >

              <button
                type="button"
                @click="mostrarNovaSenha = !mostrarNovaSenha"
              >
                <img
                  :src="mostrarNovaSenha
                    ? '/img/olho-fechado.png'
                    : '/img/olho-aberto.png'"
                  alt="Mostrar senha"
                >
              </button>
            </div>

            <div class="senha-field">
              <input
              v-model="confirmarSenha"
              :type="mostrarConfirmarSenha ? 'text' : 'password'"
              placeholder="Confirmar senha"
              >

              <button
                type="button"
                @click="mostrarConfirmarSenha = !mostrarConfirmarSenha"
              >
                <img
                  :src="mostrarConfirmarSenha
                    ? '/img/olho-fechado.png'
                    : '/img/olho-aberto.png'"
                  alt="Mostrar senha"
                >
              </button>
            </div>

            <button @click="alterarSenha" class="bnt-senha">Salvar</button>
            <button @click="modalSenha = false" class="bnt-senha">Cancelar</button>
          </div>
        </div>

        <button
          class="logout"
          @click="sair"
        >
          Sair da conta
        </button>
      </div>

      </div>

    <nav>

          <div
            class="menu-card"
            :class="{ active: menuAtivo === 'pedidos' }"
            @click="emit('update:menuAtivo', 'pedidos')"
          >
        <img
          :src="menuAtivo === 'pedidos'
            ? '/img/caminhao-branco.png'
            : '/img/caminhao.png'"
          alt="caminhao"
        />

        <div>
          <h4>Pedidos</h4>
          <p>Confira o andamento dos seus pedidos.</p>
        </div>
      </div>

        <div
            class="menu-card"
            :class="{ active: menuAtivo === 'cadastros' }"
            @click="emit('update:menuAtivo', 'cadastros')"
          >
         <img
          :src="menuAtivo === 'cadastros'
            ? '/img/user.png'
            : '/img/user-solido.png'"
          alt="user"
        />

          <div>
            <h4>Cadastro</h4>
            <p>Altere seus dados cadastrais, e-mail e senha.</p>
          </div>
        </div>

        <div
            class="menu-card"
            :class="{ active: menuAtivo === 'salvos' }"
            @click="emit('update:menuAtivo', 'salvos')"
          >
          <img
          :src="menuAtivo === 'salvos'
            ? '/img/bolsa.png'
            : '/img/bolsa-solido.png'"
          alt="bolsa"
        />

          <div>
            <h4>Salvos</h4>
            <p>Veja seus itens salvos.</p>
          </div>
        </div>

        <div
            class="menu-card"
            :class="{ active: menuAtivo === 'favoritos' }"
            @click="emit('update:menuAtivo', 'favoritos')"
          >
          <img
          :src="menuAtivo === 'favoritos'
            ? '/img/coracao.png'
            : '/img/coracao-solido.png'"
          alt="coracao"
        />

          <div>
            <h4>Favoritos</h4>
            <p>Veja seus itens favoritos.</p>
          </div>
        </div>

    </nav>

  </aside>
</template>

<style scoped>
/* Correção do tamanho e proporção do ícone de utilizador no welcome-card */
.welcome-card .icon img {
  width: 5vw;
  height: 5vw;
  min-width: 40px;
  min-height: 40px;
  object-fit: contain;
}

/* Restante dos estilos originais da sidebar */
.senha-field {
  position: relative;
}

.senha-field input {
  width: 100%;
  padding-right: 50px;
}

.senha-field button {
  position: absolute;
  right: 1vw;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
}

.bnt-senha{
  width:50%;
  height:2.5vw;
  transform: translateX(50%);
  border:0.1vw solid #31111192;
  border-radius:0.5vw;
  background:#F5E9E0;
  color:#311111;
  cursor:pointer;
}

.bnt-senha:hover{
  background-color: #311111;
  color: #F5E9E0;
  transition:.3s;
}

.modal{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content{
  background: white;
  padding: 2vw;
  border-radius: 1vw;
  width: 30vw;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.modal-content h2{
  color: #311111;
  text-align: center;
}

.modal-content input{
  height: 5vw;
  padding: 0 5vw;
  background:#F5E9E0;
  border:0.1vw solid #31111152;
  border-radius: 1vw;
}

.sidebar{
  display:flex;
  flex-direction:column;
  gap:0.5vw;
}

.welcome-card h1{
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.3vw 0;
  overflow-wrap: break-word;
  word-break: break-word;
}

.welcome-card,
.menu-card{
  background:#F5E9E0;
  border:0.1vw solid #31111152;
  border-radius:0.5vw;
}

.welcome-card{
  display:flex;
  gap:2vw;
  padding:1.1vw;
  align-items: center;
}

.welcome-card h3{
  margin:0.5vw 0;
  font-size:1.5vw;
  overflow-wrap: break-word;
  word-break: break-word;
}

.logout{
  border:none;
  background:none;
  color:#960c19;
  cursor:pointer;
  padding:0;
}

.menu-card{
  display:flex;
  margin-top: 0.5vw;
  gap:1vw;
  padding:1.5vw;
  cursor:pointer;
  transition:.3s;
  position:relative;
  align-items: center;
}

.menu-card img {
  width: 1.5vw;
  height: 1.5vw;
  object-fit: contain;
}

.menu-card:hover{
  transform:translateX(0.5vw);
}

.menu-card h4{
  margin:0 0 0.5vw;
}

.menu-card p{
  margin:0;
  font-size:0.9vw;
}

.menu-card.active{
  background:#311111;
  color:white;
}

.menu-card.active::after{
  content:"";
  position:absolute;
  right:-1vw;
  top:50%;
  transform:translateY(-50%);
  border-top:1vw solid transparent;
  border-bottom:1vw solid transparent;
  border-left:1vw solid #311111;
}

.email-box {
  width: 100%;
}

.email-box span {
  margin-bottom: 0.5vw;
  display: block;
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-word;
}

.change-password{
  width:100%;
  height:2.5vw;
  border:0.1vw solid #31111192;
  border-radius:0.5vw;
  background:#F5E9E0;
  color:#311111;
  cursor:pointer;
  margin-bottom: 0.5vw;
}

.change-password:hover{
  background-color: #311111;
  color: #F5E9E0;
  transition:.3s;
}
</style>