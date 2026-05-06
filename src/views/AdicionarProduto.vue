<template>

<main>

<h1>Adicionar Produto</h1>

<section class="fundo">

<div class="form-container">

  <!-- VARCHAR -->
  <div class="input-group">
    <input type="text" maxlength="100" placeholder="Categoria">
  </div>

  <div class="input-group">
    <input type="text" maxlength="100" placeholder="Continente">
  </div>

  <div class="input-group">
    <input type="text" maxlength="100" placeholder="Nome">
  </div>

  <!-- VARCHAR menor -->
  <div class="input-group">
    <input type="text" maxlength="10" placeholder="Tamanho">
  </div>

  <div class="input-group">
    <input type="text" maxlength="30" placeholder="Cor">
  </div>

  <!-- DECIMAL -->
  <div class="input-group">
    <input type="number" step="0.01" placeholder="Preço">
  </div>

  <!-- TEXT -->
  <div class="input-group">
    <textarea placeholder="Descrição"></textarea>
  </div>

  <div class="buttons">
    <button type="button">Excluir</button>
    <button type="submit">Salvar</button>
  </div>

</div>

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

}

body {
    font-family: Arial, sans-serif;
  }

  .form-container {
    width: 350px;
    margin: 20px;
  }

  .input-group {
    margin-bottom: 15px;
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
    background-color: #f1f1f1;
  }

</style>
