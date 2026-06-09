<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProfile, updateProfile } from '../services/user'

const loading = ref(false)
const menuAtivo = ref('cadastros')
const modalSenha = ref(false)
const senhaAtual = ref('')
const novaSenha = ref('')
const confirmarSenha = ref('')

const form = ref({
  name: '',
  cpf: '',
  telefone: '',
  email: ''
})

async function carregarUsuario() {
  try {
    const data = await getProfile()

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
      telefone: form.value.telefone
    })

    alert('Dados atualizados com sucesso!')
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
          <h3>{{ form.name }}</h3>

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

              <input
                v-model="senhaAtual"
                type="password"
                placeholder="Senha atual"
              />
              <input
                v-model="novaSenha"
                type="password"
                placeholder="Nova senha"
           >
              <input
                v-model="confirmarSenha"
                type="password"
                placeholder="Confirmar senha"
              />

              <button>Salvar</button>
              <button @click="modalSenha = false">Cancelar</button>
            </div>
          </div>

          <button class="logout">
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
          <img src="/img/caminhao.png" alt="caminhao.png">

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
            <img src="/img/user-solido.png" alt="user.png">

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
            <img src="/img/bolsa-solido.png" alt="bolsa.png">

            <div>
              <h4>Salvos</h4>
              <p>Veja seus itens salvos.</p>
            </div>
          </div>

          <div
              class="menu-card"
              :class="{ active: menuAtivo === 'favoritos' }"
              @click="menuAtivo = 'favoritos'"
            >
            <img src="/img/coracao-solido.png" alt="coracao.png">

            <div>
              <h4>Favoritos</h4>
              <p>Veja seus itens favoritos.</p>
            </div>
          </div>

      </nav>

    </aside>

    <section
      class="content"
      v-if="menuAtivo === 'pedidos'"
    >
      <h1>Pedidos</h1>
    </section>

   <section
      class="content"
      v-if="menuAtivo === 'cadastros'"
    >
      <div class="title">
        <img src="/img/user-solido.png" alt="user.png">
        <h1>Cadastro</h1>
      </div>

      <div class="cards-grid">

        <div class="form-card">

          <h2>Dados Pessoais</h2>

          <div class="form-grid">

            <div class="field full">
              <label>Nome Completo*</label>
              <input
              v-model="form.name"
                type="text"
                placeholder="Ex: Julia Gabriela da Silva"
              >
            </div>

            <div class="field">
              <label>CPF*</label>
              <input
              v-model="form.cpf"
                type="text"
                placeholder="Ex: 000.000.000-00"
              >
            </div>

            <div class="field">
              <label>RG</label>
              <input
                type="text"
                placeholder="Mínimo de 6 caracteres"
              >
            </div>

            <div class="field">
              <label>Gênero</label>

              <select>
                <option>---</option>
                <option value="1">Feminino</option>
                <option value="2">Masculino</option>
                <option value="3">Outro</option>
                <option value="4">Prefiro Não Informar</option>
              </select>
            </div>

            <div class="field">
              <label>Data de Nascimento</label>
              <input
                type="text"
                placeholder="09/07/1995"
              >
            </div>

            <div class="field">
              <label>Telefone Celular*</label>
              <input
              v-model="form.telefone"
                type="text"
                placeholder="(DD) + Número"
              >
            </div>

            <div class="field">
              <label>Email</label>
              <input
              v-model="form.email"
                type="email"
                placeholder="julia@gmail.com"
              >
            </div>

            <button
                class="save-btn"
                @click="salvar"
                :disabled="loading"
              >
                {{ loading ? 'Salvando...' : '✓ Salvar Alterações' }}
            </button>
          </div>
        </div>
        </div>
    </section>

    <section
      class="content"
      v-if="menuAtivo === 'salvos'"
    >
      <h1>Salvos</h1>
    </section>

    <section
      class="content"
      v-if="menuAtivo === 'favoritos'"
    >
      <h1>Favoritos</h1>
    </section>

  </main>
</template>

<style scoped>

*{
  box-sizing:border-box;
}

img{
  width: 1.5vw;
  height: 1.5vw;
}

.perfil-container{
  max-width:90vw;
  margin:3vw auto;
  display:grid;
  grid-template-columns:20vw 1fr;
  gap:3vw;
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

  padding: 2rem;

  border-radius: 12px;

  width: 400px;
  max-width: 90%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-content input{
  height: 45px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.sidebar{
  display:flex;
  flex-direction:column;
  gap:2vw;
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
}

.welcome-card h3{
  margin:0.5vw 0;
  font-size:1.5vw;
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

.content{
  background:#F5E9E0;
  border-radius:0.5vw;
  padding:2vw;
}

.title{
  display:flex;
  align-items:center;
  gap:1vw;
  margin-bottom:2vw;
}

.cards-grid{
  display:grid;
  grid-template-columns:1fr 20vw;
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

.email-box{
  display:flex;
  justify-content:space-between;
  align-items:center;

  margin:1.5vw 0;
}

.change-password{
  width:100%;
  height:2.5vw;

  border:0.1vw solid #311111;
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

@media(max-width:1024px){

  .perfil-container{
    grid-template-columns:1fr;
  }

  .cards-grid{
    grid-template-columns:1fr;
  }

}

@media(max-width:768px){

  .form-grid{
    grid-template-columns:1fr;
  }

  .full,
  .save-btn{
    grid-column:span 1;
  }

}

</style>
