<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProfile, updateProfile, changePassword } from '../services/user'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import CarrinhoComponent from '../components/CarrinhoComponent.vue'
import FavoritosComponent from '../components/FavoritosComponent.vue'

const loading = ref(false)
const menuAtivo = ref('cadastros')

const form = ref({
  name: '',
  cpf: '',
  telefone: '',
  email: ''
})

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

async function carregarUsuario() {
  try {
    console.log('TOKEN USER:', localStorage.getItem('token'))

    const data = await getProfile()

    console.log('USUARIO:', data)

    form.value = {
      name: data.name || '',
      cpf: data.cpf || '',
      telefone: data.telefone || '',
      email: data.email || ''
    }
  }
  catch (error) {
    console.error(error)
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
  }
  catch (error) {
    console.error(error)
    alert('Erro ao atualizar dados.')
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  carregarUsuario()
})
</script>

<template>
  <main class="perfil-container">
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
              @click="menuAtivo = 'pedidos'"
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
              @click="menuAtivo = 'cadastros'"
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
              @click="menuAtivo = 'salvos'"
            >
            <img
                :src="menuAtivo === 'salvos'
                  ? '/img/bolsa.png'
                  : '/img/bolsa-solido.png'"
                alt="Carrinho"
              />

              <div>
                <h4>Carrinho</h4>
                <p>Veja os produtos adicionados ao carrinho.</p>
              </div>
          </div>

          <div
              class="menu-card"
              :class="{ active: menuAtivo === 'favoritos' }"
              @click="menuAtivo = 'favoritos'"
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

    <!-- Conteúdo dinâmico de acordo com o menu selecionado -->
    <section
      class="content"
      v-if="menuAtivo === 'pedidos'"
    >
    <div class="title">
    <img src="/img/carrinho.png" alt="carrinho.png">
      <h1>Pedidos</h1>
    </div>
    </section>

    <CadastroSection
      v-if="menuAtivo === 'cadastros'"
      :form="form"
      :loading="loading"
      @salvar="salvar"
    />

    <section
      class="content"
      v-if="menuAtivo === 'salvos'"
    >
      <div class="title">
    <img src="/img/bolsa-solido.png" alt="bolsa.png">
      <h1>Carrinho</h1>
    </div>

    <CarrinhoComponent />
    </section>

    <section
      class="content"
      v-if="menuAtivo === 'favoritos'"
    >
      <div class="title">
    <img src="/img/coracao-solido.png" alt="coracao-solido.png">
      <h1>Favoritos</h1>
    </div>

    <FavoritosComponent />
    </section>
  </main>
</template>

<style scoped>
*{
  box-sizing:border-box;
}

.perfil-container{
  max-width:90vw;
  margin:6vw auto;
  display:grid;
  grid-template-columns:20vw 1fr;
  gap:3vw;
}

.content{
  background:#F5E9E0;
  border-radius:0.5vw;
  padding:2vw;
  padding-left: 5vw;
}

.title{
  display:flex;
  align-items:center;
  gap:1vw;
  margin-bottom:2vw;
}

.title img{
  width: 2.2vw;
  height: 2.2vw;
}

.cards-grid{
  display:grid;
  grid-template-columns:1fr 1vw;
  gap:3vw;
}

.form-card{
  border:0.1vw solid #31111152;
  border-radius:1vw;
  padding:2vw;
}

.form-card h2{
  margin-top:0;
  margin-bottom:2vw;
}

.form-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1vw;
}

.field{
  display:flex;
  flex-direction:column;
  gap:1vw;
}

.full{
  grid-column:span 2;
}

.field input,
.field select{
  height:3.5vw;

  border-radius:0.5vw;
  padding:0 1vw;
  font-size:1vw;
}

.save-btn{
  grid-column:span 2;

  height:4vw;
  border:none;
  border-radius:0.5vw;

  background:#29b857;
  color:white;

  font-size:1.5vw;
  cursor:pointer;
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
}

.change-password:hover{
  background-color: #311111;
  color: #F5E9E0;
  transition:.3s;
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
    gap: 16px;
  }

  .welcome-card {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding: 0 20px 24px;
    border: none;
    border-radius: 0 0 24px 24px;
    background: #F5E9E0;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    text-align: center;
  }

  .welcome-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 125px;
    background: #af8072;
    border-radius: 0 0 50% 50% / 0 0 25% 25%;
    z-index: 0;
  }

  .welcome-card .icon {
    position: relative;
    z-index: 1;
    margin-top: 65px;
    width: 100px;
    height: 100px;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 4px solid #F5E9E0;
    border-radius: 50%;
    background: #F5E9E0;
  }

  .welcome-card .icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .welcome-card > div:not(.icon) {
    position: relative;
    z-index: 1;
    width: 100%;
    min-width: 0;
  }

  .welcome-card p {
    margin: 5px 0;
    font-size: 14px;
  }

  .welcome-card h1 {
    margin: 8px 0;
    font-size: 23px;
    overflow-wrap: anywhere;
  }

  .email-box {
    width: 100%;
    font-size: 13px;
    overflow-wrap: anywhere;
  }

  .change-password {
    width: 170px;
    max-width: 100%;
    height: 40px;
    margin: 10px auto;
    font-size: 13px;
    border-radius: 8px;
  }

  .logout {
    display: block;
    margin: 10px auto 0;
    font-size: 14px;
  }

  .sidebar nav {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0 16px;
  }

  .menu-card {
    width: 100%;
    margin-top: 0;
    padding: 16px 14px;
    gap: 14px;
    align-items: center;
    border: none;
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
    flex-shrink: 0;
    object-fit: contain;
  }

  .menu-card h4 {
    margin: 0 0 4px;
    font-size: 15px;
  }

  .menu-card p {
    margin: 0;
    font-size: 12px;
    line-height: 1.4;
  }

  .menu-card.active::after {
    display: none;
  }

  .menu-card.active {
    background: #af8072;
    color: #fffdfd;
    border-radius: 10px;
  }

  .content {
    width: 100%;
    min-width: 0;
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

  .title h1 {
    margin: 0;
    font-size: 22px;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .form-card {
    min-width: 0;
    padding: 18px 14px;
    border-radius: 12px;
  }

  .form-card h2 {
    margin-bottom: 18px;
    font-size: 18px;
  }

  .form-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .field {
    min-width: 0;
    gap: 8px;
  }

  .full {
    grid-column: auto;
  }

  .field label {
    font-size: 13px;
  }

  .field input,
  .field select {
    width: 100%;
    height: 44px;
    padding: 0 12px;
    font-size: 14px;
    border: 1px solid #D6BFB1;
    border-radius: 8px;
    background: #FFFAF6;
  }

  .save-btn {
    grid-column: auto;
    width: 100%;
    min-height: 46px;
    height: auto;
    font-size: 14px;
    border-radius: 8px;
    background: #311111;
    color: #F5E9E0;
  }

  /* Modal de alteração de senha */
  .modal-content {
    width: calc(100% - 32px);
    max-width: 420px;
    padding: 22px 18px;
    gap: 14px;
    border-radius: 16px;
  }

  .modal-content input {
    width: 100%;
    height: 46px;
    padding: 0 42px 0 12px;
    font-size: 14px;
    border-radius: 8px;
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
    height: 42px;
    transform: none;
    border-radius: 8px;
    font-size: 14px;
  }
}
</style>
