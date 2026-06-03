<template>
  <main class="perfil-container">

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <div class="welcome-card">
        <div class="icon">
          <i class="fa-regular fa-user"></i>
        </div>

        <div>
          <p>Bem-vindo,</p>
          <h3>Gabriela Heloisa Ramos</h3>

          <button class="logout">
            Sair da conta
          </button>
        </div>
      </div>

      <nav>

        <div class="menu-card">
          <i class="fa-regular fa-cube"></i>

          <div>
            <h4>Pedidos</h4>
            <p>Confira o andamento dos seus pedidos.</p>
          </div>
        </div>

        <div class="menu-card">
          <i class="fa-regular fa-tag"></i>

          <div>
            <h4>Créditos e descontos</h4>
            <p>Confira os cupons disponíveis.</p>
          </div>
        </div>

        <div class="menu-card active">
          <i class="fa-regular fa-user"></i>

          <div>
            <h4>Cadastro</h4>
            <p>Altere seus dados cadastrais, e-mail e senha.</p>
          </div>
        </div>

        <div class="menu-card">
          <i class="fa-regular fa-house"></i>

          <div>
            <h4>Endereços</h4>
            <p>Altere e gerencie seus endereços salvos.</p>
          </div>
        </div>

        <div class="menu-card">
          <i class="fa-regular fa-heart"></i>

          <div>
            <h4>Favoritos</h4>
            <p>Veja seus itens favoritos.</p>
          </div>
        </div>

      </nav>

    </aside>

    <!-- CONTEÚDO -->
    <section class="content">

      <div class="title">
        <i class="fa-regular fa-user"></i>
        <h1>Cadastro</h1>
      </div>

      <div class="cards-grid">

        <!-- FORM -->
        <div class="form-card">

          <h2>Dados Pessoais</h2>

          <div class="form-grid">

            <div class="field full">
              <label>Nome Completo*</label>
              <input
                type="text"
                placeholder="Ex: Julia Gabriela da Silva"
              >
            </div>

            <div class="field">
              <label>CPF*</label>
              <input
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
              <label>Sexo</label>

              <select>
                <option>Sexo</option>
                <option>Feminino</option>
                <option>Masculino</option>
                <option>Outro</option>
                <option>Prefiro Não Informar</option>
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
                type="text"
                placeholder="(DD) + Número"
              >
            </div>

            <div class="field">
              <label>Telefone Secundário</label>
              <input
                type="text"
                placeholder="(DD) + Número"
              >
            </div>

            <button class="save-btn">
              ✓ Salvar Alterações
            </button>

          </div>

        </div>

        <!-- ACESSO -->
        <div class="access-card">

          <h2>Dados de Acesso</h2>

          <div class="email-box">

            <span>
              gabriela.heloisa.ramos.ifc@
            </span>

            <button>
              Copiar
            </button>

          </div>

          <button class="change-password">
            Alterar Senha
          </button>

        </div>

      </div>

    </section>

  </main>
</template>

<style scoped>

*{
  box-sizing:border-box;
}

.perfil-container{
  max-width:1240px;
  margin:40px auto;
  display:grid;
  grid-template-columns:280px 1fr;
  gap:40px;
}

.sidebar{
  display:flex;
  flex-direction:column;
  gap:18px;
}

.welcome-card,
.menu-card{
  background:#fff;
  border:1px solid #e5e5e5;
  border-radius:8px;
}

.welcome-card{
  display:flex;
  gap:18px;
  padding:18px;
}

.welcome-card h3{
  margin:5px 0;
  font-size:20px;
}

.logout{
  border:none;
  background:none;
  color:#ff4d5e;
  cursor:pointer;
  padding:0;
}

.menu-card{
  display:flex;
  gap:16px;
  padding:20px;
  cursor:pointer;
  transition:.3s;
  position:relative;
}

.menu-card:hover{
  transform:translateX(5px);
}

.menu-card h4{
  margin:0 0 6px;
}

.menu-card p{
  margin:0;
  font-size:13px;
}

.menu-card.active{
  background:#222;
  color:white;
}

.menu-card.active::after{
  content:"";
  position:absolute;
  right:-12px;
  top:50%;
  transform:translateY(-50%);

  border-top:12px solid transparent;
  border-bottom:12px solid transparent;
  border-left:12px solid #222;
}

.content{
  background:white;
  border-radius:8px;
  padding:30px;
}

.title{
  display:flex;
  align-items:center;
  gap:15px;
  margin-bottom:30px;
}

.cards-grid{
  display:grid;
  grid-template-columns:1fr 320px;
  gap:35px;
}

.form-card,
.access-card{
  border:1px solid #e2e2e2;
  border-radius:10px;
  padding:25px;
}

.form-card h2,
.access-card h2{
  margin-top:0;
  margin-bottom:25px;
}

.form-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
}

.field{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.full{
  grid-column:span 2;
}

.field input,
.field select{
  height:50px;
  border:1px solid #d7d7d7;
  border-radius:8px;
  padding:0 15px;
  font-size:15px;
}

.save-btn{
  grid-column:span 2;

  height:55px;
  border:none;
  border-radius:8px;

  background:#29b857;
  color:white;

  font-size:18px;
  cursor:pointer;
}

.access-card{
  height:fit-content;
}

.email-box{
  display:flex;
  justify-content:space-between;
  align-items:center;

  margin:20px 0;
}

.email-box button{
  border:none;
  background:none;
  color:#1677ff;
  cursor:pointer;
}

.change-password{
  width:100%;
  height:48px;

  border:1px solid #1677ff;
  border-radius:8px;

  background:white;
  color:#1677ff;

  cursor:pointer;
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
