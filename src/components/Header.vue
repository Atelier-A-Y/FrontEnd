<script setup>

</script>

<template>

    <header class="header">

        <ul class="esquerdo">

        <li class="logo">
        
        <img src="/public/img/Captura de tela 2026-03-04 210312 1 (1) 1@2x (1).png" width="85" height="85" alt="">

        </li>

        <ul class="texto">
        
        <li class="titulo">
        
        Atelier

        </li>

        <li class="sigla">
        
            A.Y.
        
        </li>
        
        </ul>

        </ul>

        <ul class="direito">
        
            <li class="globo">
            
            <button></button>
            
            </li>
        
        </ul>

    </header>

</template>

<style scoped>

.header{
  position: fixed;
  background: #F5E9E0;
  width: 100%;
  padding-left: 2.5vw;
}

.logo{

margin-top: 0.9vw;

}

.esquerdo{

display: flex;
list-style-type: none;

}

.texto{

list-style-type: none;
margin-top: 1.3vw;
margin-bottom: 1vw;
color: #84453d;
font-family: 'Playfair Display', serif;
margin-left: -2vw;

}

.titulo{

font-size: 2rem;
color: #84453d;
font-family: 'Libre Bodoni', serif;
font-weight: 100;
letter-spacing: 0.1rem;
list-style-type: none;

}

.sigla{

font-size: 1.2rem;
color: #84453d;
font-family: 'Libre Bodoni', serif;
font-weight: 100;
letter-spacing: 0.11em;
list-style-type: none;
margin-top: -1vw;
padding-left: 1.8vw;

}

.direito{

list-style-type: none;

}

</style>
