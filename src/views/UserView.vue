<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProfile, updateProfile } from '../services/user'
import Sidebar from '../components/Sidebar.vue'
import CadastroSection from '../components/CadastroSection.vue'

const loading = ref(false)
const menuAtivo = ref('cadastros')

const form = ref({
  name: '',
  cpf: '',
  telefone: '',
  email: ''
})

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

    <!-- Sidebar isolada -->
    <Sidebar :form="form" v-model:menuAtivo="menuAtivo" />

    <!-- Conteúdo dinâmico de acordo com o menu selecionado -->
    <section
      class="content"
      v-if="menuAtivo === 'pedidos'"
    >
      <h1>Pedidos</h1>
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

@media(max-width:1024px){
  .perfil-container{
    grid-template-columns:1fr;
  }
}
</style>