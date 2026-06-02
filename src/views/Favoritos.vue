<script setup>



</script>

<template>

<main>

<section class="fundo">

<ul>

<li class="icone">

<span class="fa-regular fa-heart"></span>

</li>

<li class="titulo">

<h1>Favoritos Vazio</h1>

</li>

<li class="texto">

<p>Que tal olhar nossos produtos e receber seu pedido na porta de casa?</p>

</li>

<li>

<button class="botao"><a href="" class="link">Voltar às Compras</a></button>

</li>

</ul>

</section>

</main>

</template>

<style scoped>

ul{

list-style-type: none;

}

h1{

justify-content: center;
color: #311111;
font-weight: bold;
padding: 0;
margin-bottom: 0.7rem;

}

p{

color: black;
justify-content: center;
font-size: 1.2rem;

}

.fundo {
  background-color: #f5e9e0;
  border: #311111 solid 0.8px;
  border-radius: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 30px;
  margin: 0vw 13vw 1.2vw 13vw;

}

.botao{

  background-color: #311111;
  border: none;
  border-radius: 3px;
  width: 160px;
  height: 35px;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;
  justify-content: center;
  margin-bottom: 0.8rem;

}

.link{

color: white;
text-decoration: none;

}

.botao:hover {
  background-color: #5a1f1f;
}

.botao:active {
  background-color: #7a2d2d;
}

li {
  display: flex;
  justify-content: center;
}

span{

color: #311111;
font-size: 8rem;
padding-bottom: 1rem;

}

</style>
