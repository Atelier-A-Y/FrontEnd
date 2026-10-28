<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { getProfile, updateProfile, changePassword } from '../services/user'
import CadastroSection from '../components/CadastroSection.vue'
import CarrinhoComponent from '../components/CarrinhoComponent.vue'
import FavoritosComponent from '../components/FavoritosComponent.vue'

type Perfil = {
  name: string
  cpf: string
  telefone: string
  email: string
}

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const menuAtivo = ref('cadastros')
const modalSenha = ref(false)

const senhaAtual = ref('')
const novaSenha = ref('')
const confirmarSenha = ref('')
const mostrarSenhaAtual = ref(false)
const mostrarNovaSenha = ref(false)
const mostrarConfirmarSenha = ref(false)

const form = ref<Perfil>({
  name: '',
  cpf: '',
  telefone: '',
  email: ''
})

async function carregarUsuario() {
  try {
    const resposta: any = await getProfile()
    // Aceita tanto serviços que retornam response.data quanto os que já retornam os dados.
    const usuario = resposta?.data?.user ?? resposta?.data ?? resposta?.user ?? resposta

    if (usuario && typeof usuario === 'object') {
      form.value = {
        name: usuario.name ?? usuario.nome ?? '',
        cpf: usuario.cpf ?? '',
        telefone: usuario.telefone ?? usuario.phone ?? '',
        email: usuario.email ?? ''
      }
    }
  } catch (error) {
    console.error('Erro ao carregar os dados do usuário:', error)
  }
}

async function salvar() {
  loading.value = true
  try {
    await updateProfile({
      name: form.value.name,
      cpf: form.value.cpf,
      telefone: form.value.telefone,
      email: form.value.email
    })
    alert('Dados atualizados com sucesso!')
    await carregarUsuario()
  } catch (error) {
    console.error('Erro ao atualizar os dados:', error)
    alert('Não foi possível atualizar seus dados. Confira as informações e tente novamente.')
  } finally {
    loading.value = false
  }
}

function sair() {
  if (!confirm('Deseja realmente sair da sua conta?')) return
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
    console.error('Erro ao alterar senha:', error)
    alert('Erro ao alterar senha. Confira se a senha atual está correta.')
  }
}

onMounted(carregarUsuario)
</script>

<template>
  <main class="perfil-container">
    <aside class="sidebar">
      <div class="welcome-card">
        <div class="icon">
          <img src="/img/user-solido.png" alt="Ícone do usuário">
        </div>

        <div class="welcome-info">
          <p class="welcome-label">Bem-vindo,</p>
          <h1>{{ form.name || 'Usuário' }}</h1>

          <div class="email-box">
            <span>{{ form.email }}</span>
          </div>

          <button class="change-password" type="button" @click="modalSenha = true">
            Alterar senha
          </button>

          <button class="logout" type="button" @click="sair">
            Sair da conta
          </button>
        </div>
      </div>

      <nav class="profile-nav" aria-label="Menu da conta">
        <button
          class="menu-card"
          :class="{ active: menuAtivo === 'pedidos' }"
          type="button"
          @click="menuAtivo = 'pedidos'"
        >
          <img
            :src="menuAtivo === 'pedidos' ? '/img/caminhao-branco.png' : '/img/caminhao.png'"
            alt=""
          >
          <span>
            <strong>Pedidos</strong>
            <small>Confira o andamento dos seus pedidos.</small>
          </span>
        </button>

        <button
          class="menu-card"
          :class="{ active: menuAtivo === 'cadastros' }"
          type="button"
          @click="menuAtivo = 'cadastros'"
        >
          <img
            :src="menuAtivo === 'cadastros' ? '/img/user.png' : '/img/user-solido.png'"
            alt=""
          >
          <span>
            <strong>Cadastro</strong>
            <small>Altere seus dados cadastrais e e-mail.</small>
          </span>
        </button>

        <button
          class="menu-card"
          :class="{ active: menuAtivo === 'salvos' }"
          type="button"
          @click="menuAtivo = 'salvos'"
        >
          <img
            :src="menuAtivo === 'salvos' ? '/img/bolsa.png' : '/img/bolsa-solido.png'"
            alt=""
          >
          <span>
            <strong>Carrinho</strong>
            <small>Veja os produtos adicionados ao carrinho.</small>
          </span>
        </button>

        <button
          class="menu-card"
          :class="{ active: menuAtivo === 'favoritos' }"
          type="button"
          @click="menuAtivo = 'favoritos'"
        >
          <img
            :src="menuAtivo === 'favoritos' ? '/img/coracao.png' : '/img/coracao-solido.png'"
            alt=""
          >
          <span>
            <strong>Favoritos</strong>
            <small>Veja seus itens favoritos.</small>
          </span>
        </button>
      </nav>
    </aside>

    <section v-if="menuAtivo === 'pedidos'" class="content">
      <div class="title">
        <img src="/img/caminhao.png" alt="">
        <h2>Pedidos</h2>
      </div>
      <p class="empty-message">Seus pedidos aparecerão aqui.</p>
    </section>

    <section v-else-if="menuAtivo === 'cadastros'" class="content">
      <CadastroSection
        :form="form"
        :loading="loading"
        @salvar="salvar"
      />
    </section>

    <section v-else-if="menuAtivo === 'salvos'" class="content">
      <div class="title">
        <img src="/img/bolsa-solido.png" alt="">
        <h2>Carrinho</h2>
      </div>
      <CarrinhoComponent />
    </section>

    <section v-else-if="menuAtivo === 'favoritos'" class="content">
      <div class="title">
        <img src="/img/coracao-solido.png" alt="">
        <h2>Favoritos</h2>
      </div>
      <FavoritosComponent />
    </section>

    <div v-if="modalSenha" class="modal" @click.self="modalSenha = false">
      <form class="modal-content" @submit.prevent="alterarSenha">
        <h2>Alterar senha</h2>

        <label class="senha-field">
          <input
            v-model="senhaAtual"
            :type="mostrarSenhaAtual ? 'text' : 'password'"
            placeholder="Senha atual"
            autocomplete="current-password"
          >
          <button type="button" :aria-label="mostrarSenhaAtual ? 'Ocultar senha atual' : 'Mostrar senha atual'" @click="mostrarSenhaAtual = !mostrarSenhaAtual">
            <img :src="mostrarSenhaAtual ? '/img/olho-fechado.png' : '/img/olho-aberto.png'" alt="">
          </button>
        </label>

        <label class="senha-field">
          <input
            v-model="novaSenha"
            :type="mostrarNovaSenha ? 'text' : 'password'"
            placeholder="Nova senha"
            autocomplete="new-password"
          >
          <button type="button" :aria-label="mostrarNovaSenha ? 'Ocultar nova senha' : 'Mostrar nova senha'" @click="mostrarNovaSenha = !mostrarNovaSenha">
            <img :src="mostrarNovaSenha ? '/img/olho-fechado.png' : '/img/olho-aberto.png'" alt="">
          </button>
        </label>

        <label class="senha-field">
          <input
            v-model="confirmarSenha"
            :type="mostrarConfirmarSenha ? 'text' : 'password'"
            placeholder="Confirmar nova senha"
            autocomplete="new-password"
          >
          <button type="button" :aria-label="mostrarConfirmarSenha ? 'Ocultar confirmação' : 'Mostrar confirmação'" @click="mostrarConfirmarSenha = !mostrarConfirmarSenha">
            <img :src="mostrarConfirmarSenha ? '/img/olho-fechado.png' : '/img/olho-aberto.png'" alt="">
          </button>
        </label>

        <button class="bnt-senha primary" type="submit">Salvar</button>
        <button class="bnt-senha" type="button" @click="modalSenha = false">Cancelar</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.perfil-container {
  width: min(1200px, 92%);
  margin: 6vw auto;
  display: grid;
  grid-template-columns: minmax(260px, 300px) minmax(0, 1fr);
  align-items: start;
  gap: 28px;
  color: #311111;
}

.sidebar {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.welcome-card,
.menu-card,
.content {
  background: #F5E9E0;
  border: 1px solid #31111135;
  border-radius: 12px;
}

.welcome-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 22px 18px;
  min-width: 0;
}

.welcome-card .icon {
  width: 54px;
  height: 54px;
  flex: 0 0 54px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #E8D5CA;
}

.welcome-card .icon img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.welcome-info {
  flex: 1;
  min-width: 0;
}

.welcome-label {
  margin: 0 0 5px;
  font-size: 14px;
}

.welcome-info h1 {
  margin: 0 0 8px;
  font-size: clamp(19px, 1.6vw, 25px);
  overflow-wrap: anywhere;
}

.email-box {
  width: 100%;
  margin-bottom: 14px;
  font-size: 13px;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.change-password {
  width: 100%;
  min-height: 38px;
  padding: 8px 10px;
  border: 1px solid #311111;
  border-radius: 7px;
  background: #F5E9E0;
  color: #311111;
  cursor: pointer;
  transition: background .2s, color .2s;
}

.change-password:hover {
  background: #311111;
  color: #F5E9E0;
}

.logout {
  display: block;
  margin: 12px auto 0;
  padding: 4px;
  border: 0;
  background: transparent;
  color: #960c19;
  cursor: pointer;
}

.profile-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-card {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;
  color: #311111;
  text-align: left;
  cursor: pointer;
  transition: background .2s, color .2s, transform .2s;
}

.menu-card:hover {
  transform: translateX(3px);
}

.menu-card img {
  width: 27px;
  height: 27px;
  flex: 0 0 27px;
  object-fit: contain;
}

.menu-card span {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.menu-card strong {
  font-size: 15px;
}

.menu-card small {
  font-size: 12px;
  line-height: 1.4;
}

.menu-card.active {
  position: relative;
  background: #311111;
  border-color: #311111;
  color: #fff;
}

.menu-card.active::after {
  content: "";
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid #311111;
}

.content {
  min-width: 0;
  min-height: 300px;
  padding: 28px;
  overflow: hidden;
}

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
}

.empty-message {
  margin: 0;
  line-height: 1.6;
}

.content :deep(.cards-grid) {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 22px;
  width: 100%;
}

.content :deep(.form-card) {
  width: 100%;
  min-width: 0;
  padding: 24px;
  border: 1px solid #cbb4a7;
  border-radius: 12px;
}

.content :deep(.form-card h2) {
  margin: 0 0 18px;
  font-size: 25px;
  line-height: 1.3;
}

.content :deep(.form-grid) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.content :deep(.field) {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.content :deep(.field label) {
  font-size: 17px;
  line-height: 1.35;
}

.content :deep(.field input),
.content :deep(.field select) {
  width: 100%;
  min-width: 0;
  height: 46px;
  padding: 0 12px;
  border: 1px solid #cbb4a7;
  border-radius: 7px;
  background: #fffaf6;
  font-size: 16px;
}

.content :deep(.save-btn) {
  grid-column: 1 / -1;
  width: 100%;
  min-height: 46px;
  padding: 10px 16px;
  border: 0;
  border-radius: 7px;
  background: #29b857;
  color: white;
  font-size: 15px;
  cursor: pointer;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: rgb(0 0 0 / 55%);
}

.modal-content {
  width: min(420px, 100%);
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 26px;
  border-radius: 14px;
  background: #FFFAF6;
  box-shadow: 0 12px 40px rgb(0 0 0 / 20%);
}

.modal-content h2 {
  margin: 0 0 6px;
  color: #311111;
}

.senha-field {
  position: relative;
  display: block;
  width: 100%;
}

.senha-field input {
  width: 100%;
  height: 46px;
  padding: 0 46px 0 13px;
  border: 1px solid #D6BFB1;
  border-radius: 8px;
  background: #fff;
  color: #311111;
  font: inherit;
}

.senha-field button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  padding: 4px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.senha-field button img {
  display: block;
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.bnt-senha {
  min-height: 42px;
  border: 1px solid #311111;
  border-radius: 8px;
  background: transparent;
  color: #311111;
  cursor: pointer;
}

.bnt-senha.primary {
  background: #311111;
  color: #F5E9E0;
}

@media (max-width: 768px) {
  .perfil-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 0 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .sidebar {
    width: 100%;
    gap: 16px;
  }

  .welcome-card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 0 20px 24px;
    border: 0;
    border-radius: 0 0 24px 24px;
    background: #F5E9E0;
    text-align: center;
  }

  .welcome-card::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 125px;
    background: #B18A7E;
    border-radius: 0 0 50% 50% / 0 0 25% 25%;
  }

  .welcome-card .icon {
    width: 100px;
    height: 100px;
    flex: 0 0 100px;
    margin-top: 65px;
    border: 4px solid #F5E9E0;
    border-radius: 50%;
    background: #F5E9E0;
    overflow: hidden;
  }

  .welcome-card .icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .welcome-info {
    position: relative;
    width: 100%;
    min-width: 0;
  }

  .welcome-label {
    margin: 5px 0;
    font-size: 14px;
  }

  .welcome-info h1 {
    margin: 8px 0;
    font-size: 23px;
    overflow-wrap: anywhere;
  }

  .email-box {
    width: 100%;
    margin-bottom: 10px;
    font-size: 13px;
    overflow-wrap: anywhere;
  }

  .change-password {
    width: 170px;
    max-width: 100%;
    min-height: 40px;
    margin: 8px auto;
    font-size: 13px;
    border-radius: 8px;
  }

  .logout {
    margin-top: 8px;
    font-size: 14px;
  }

  .profile-nav {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 16px;
  }

  .menu-card {
    width: 100%;
    margin: 0;
    padding: 16px 14px;
    gap: 14px;
    align-items: center;
    border: 0;
    border-bottom: 1px solid #DCCBC0;
    border-radius: 0;
    background: transparent;
    transform: none;
  }

  .menu-card:hover {
    transform: none;
  }

  .menu-card img {
    width: 23px;
    height: 23px;
    flex-basis: 23px;
  }

  .menu-card strong {
    font-size: 15px;
  }

  .menu-card small {
    font-size: 12px;
  }

  .menu-card.active {
    border-radius: 10px;
    background: #B18A7E;
    color: #fff;
  }

  .menu-card.active::after {
    display: none;
  }

  .content {
    width: calc(100% - 32px);
    min-width: 0;
    min-height: 180px;
    margin: 0 16px;
    padding: 20px 16px;
    border-radius: 16px;
    background: #F5E9E0;
  }

  .title {
    gap: 10px;
    margin-bottom: 20px;
  }

  .title img {
    width: 24px;
    height: 24px;
  }

  .title h2 {
    font-size: 22px;
  }

  .content :deep(.cards-grid) {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .content :deep(.form-card) {
    width: 100%;
    padding: 20px 16px;
    border-radius: 12px;
  }

  .content :deep(.form-card h2) {
    margin-bottom: 18px;
    font-size: 23px;
  }

  .content :deep(.form-grid) {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .content :deep(.field) {
    gap: 7px;
  }

  .content :deep(.field label) {
    font-size: 17px;
    line-height: 1.4;
  }

  .content :deep(.field input),
  .content :deep(.field select) {
    width: 100%;
    height: 46px;
    padding: 0 12px;
    font-size: 16px;
    border-radius: 8px;
  }

  .content :deep(.save-btn) {
    grid-column: auto;
    width: 100%;
    min-height: 46px;
    font-size: 15px;
  }

  .modal-content {
    width: 100%;
    max-width: 420px;
    padding: 22px 18px;
    gap: 14px;
    border-radius: 16px;
  }
}

@media (max-width: 768px) {
  .perfil-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 0 30px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .sidebar {
    width: 100%;
    min-width: 0;
    gap: 16px;
  }

  /* CABEÇALHO DO USUÁRIO */
  .welcome-card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    width: 100%;
    padding: 0 20px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border: none;
    border-radius: 0 0 24px 24px;
    background: #F5E9E0;
    text-align: center;
  }

  .welcome-card::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 125px;
    background: #af8072;
    border-radius: 0 0 50% 50% / 0 0 25% 25%;
  }

  .welcome-card .icon {
    width: 100px;
    height: 100px;
    flex: 0 0 100px;
    margin-top: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 4px solid #F5E9E0;
    border-radius: 50%;
    background: #F5E9E0;
  }

  .welcome-card .icon img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .welcome-info {
    position: relative;
    width: 100%;
    min-width: 0;
  }

  .welcome-label {
    margin: 5px 0;
    font-size: 14px;
  }

  .welcome-info h1 {
    margin: 8px 0;
    font-size: 23px;
    overflow-wrap: anywhere;
  }

  .email-box {
    width: 100%;
    margin-bottom: 10px;
    font-size: 13px;
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .change-password {
    display: block;
    width: 170px;
    max-width: 100%;
    min-height: 40px;
    margin: 10px auto;
    font-size: 13px;
    border-radius: 8px;
  }

  .logout {
    display: block;
    margin: 10px auto 0;
    font-size: 14px;
  }

  /* MENU */
  .profile-nav,
  .sidebar nav {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 16px;
  }

  .menu-card {
    position: relative;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 16px 14px;
    display: flex;
    align-items: center;
    gap: 14px;
    border: 0;
    border-bottom: 1px solid #DCCBC0;
    border-radius: 0;
    background: transparent;
    color: #311111;
    text-align: left;
    transform: none;
  }

  .menu-card:hover {
    transform: none;
  }

  .menu-card img {
    width: 23px;
    height: 23px;
    flex: 0 0 23px;
    object-fit: contain;
  }

  /* O template atual usa strong e small */
  .menu-card span {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .menu-card strong {
    margin: 0;
    font-size: 15px;
  }

  .menu-card small {
    margin: 0;
    font-size: 12px;
    line-height: 1.4;
  }

  .menu-card.active {
    border: 0;
    border-radius: 10px;
    background: #af8072;
    color: #fffdfd;
  }

  .menu-card.active::after {
    display: none;
  }

  /* CONTEÚDO PRINCIPAL */
  .content {
    width: calc(100% - 30px);
    min-width: 0;
    min-height: 180px;
    margin: 0 12px;
    padding: 5px 10px;
    font-size: 0.7rem;
    overflow: hidden;
    border: 0;
    border-radius: 0;
    background: #F5E9E0;
    box-shadow: none;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 2vw 5vw;
  }

  .title img {
    width: 34px;
    height: 34px;
    object-fit: contain;
  }

  .title h2 {
    margin: 0;
    font-size: 22px;
  }

  .content :deep(.title h2) {
    font-size: 20px;
  }

  .content :deep(.title img) {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  /* FORMULÁRIO DENTRO DO COMPONENTE FILHO */
  .content :deep(.cards-grid) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    width: 100%;
  }

  .content :deep(.form-card) {
    width: 100%;
    min-width: 0;
    padding: 18px 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .content :deep(.form-card h2) {
    margin: 0 0 16px;
    font-size: 18px;
    line-height: 1.35;
  }

  .content :deep(.form-grid) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    width: 100%;
  }

  .content :deep(.field) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }

  .content :deep(.field label) {
    font-size: 15px;
    line-height: 1.4;
  }

  .content :deep(.field input),
  .content :deep(.field select) {
    width: 100%;
    min-width: 0;
    height: 44px;
    padding: 0 12px;
    border: 1px solid #D6BFB1;
    border-radius: 8px;
    background: #FFFAF6;
    font-size: 14px;
    box-sizing: border-box;
  }

  .content :deep(.full) {
    grid-column: auto;
  }

  .content :deep(.save-btn) {
    grid-column: auto;
    width: 100%;
    min-height: 46px;
    padding: 10px 14px;
    border: 0;
    border-radius: 8px;
    color: #F5E9E0;
    font-size: 16px;
  }

  /* MODAL DE ALTERAÇÃO DE SENHA */
  .modal-content {
    width: calc(100% - 32px);
    max-width: 420px;
    padding: 22px 18px;
    gap: 14px;
    border-radius: 16px;
    box-sizing: border-box;
  }

  .modal-content input {
    width: 100%;
    height: 46px;
    padding: 0 42px 0 12px;
    font-size: 16px;
    border-radius: 8px;
    box-sizing: border-box;
  }

  .senha-field button {
    right: 10px;
  }

  .senha-field button img {
    width: 20px;
    height: 20px;
  }

  .bnt-senha {
    width: 100%;
    min-height: 42px;
    transform: none;
    border-radius: 8px;
    font-size: 14px;
  }
}

</style>