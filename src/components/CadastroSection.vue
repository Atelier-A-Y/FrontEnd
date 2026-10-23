<script setup lang="ts">
defineProps<{
  form: {
    name: string
    cpf: string
    telefone: string
    email: string
  }
  loading: boolean
}>()

const emit = defineEmits(['salvar'])
</script>

<template>
  <section class="content">
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
            <label>Data de Nascimento</label>
            <input
              type="text"
              placeholder="Ex: 09/07/1995"
            >
          </div>

          <div class="field">
            <label>Telefone Celular*</label>
            <input
            v-model="form.telefone"
              type="text"
              placeholder="Ex: (DD) + Número"
            >
          </div>

          <div class="field">
            <label>Email</label>
            <input
            v-model="form.email"
              type="email"
              placeholder="Ex: julia@gmail.com"
            >
          </div>

          <button
              class="save-btn"
              @click="emit('salvar')"
              :disabled="loading"
            >
              {{ loading ? 'Salvando...' : '✓ Salvar Alterações' }}
          </button>
        </div>
      </div>
      </div>
  </section>
</template>

<style scoped>
/* Estilos originais pertinentes à seção de cadastro */
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

@media(max-width:1024px){
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