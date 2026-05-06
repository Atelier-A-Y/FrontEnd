<template>

<main>

<h1>Adicionar Produto</h1>

<section class="fundo">

<form class="form-container">

  <div class="input-group">
    <input type="text" maxlength="100" placeholder="Categoria">
  </div>

  <div class="input-group">
    <input type="text" maxlength="100" placeholder="Continente">
  </div>

  <div class="input-group">
    <input type="text" maxlength="100" placeholder="Nome">
  </div>

  <div class="input-group">
    <input type="text" maxlength="10" placeholder="Tamanho">
  </div>

  <div class="input-group">
    <input type="text" maxlength="30" placeholder="Cor">
  </div>

  <div class="input-group">
    <input type="number" step="0.01" placeholder="Preço">
  </div>

  <div class="input-group">
    <textarea placeholder="Descrição"></textarea>
  </div>

  <div class="buttons">
    <button type="reset">Excluir</button>
    <button type="submit">Salvar</button>
  </div>

</form>

</section>

</main>

</template>

<style scoped>

h1{

color: #311111;
font-weight: bold;
margin-top: 3vw;
margin-bottom: 3vw;
text-align: center;

}

.fundo{

background-color: #F5E9E0;
border: #311111 solid 0.8px;
border-radius: 1.7rem;
display: flex;
justify-content: center;
align-items: center;
padding: 40px 30px 40px 30px;
margin: 0vw 13vw 1.2vw 13vw;

}

.form-container {
  width: 350px;
}

 .input-group {
  margin-bottom: 15px;
}

input,
textarea,
button {
  font-family: Arial, sans-serif;
}

  input, textarea {
    width: 100%;
    padding: 12px 15px;
    border: none;
    border-radius: 12px;
    background-color: #fefefe;
    font-size: 14px;
    outline: none;
    transition: 0.2s;
  }

  input:focus, textarea:focus {
    background-color: #e7e7e7;
  }

  textarea {
    resize: none;
    height: 80px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  button {
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid #5a3d36;
    background-color: transparent;
    cursor: pointer;
    font-size: 14px;
  }

  button:hover {
    background-color: #e7e7e7;
  }

</style>
