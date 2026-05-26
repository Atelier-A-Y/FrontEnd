<template>
<main>
<div class="bnt-grandes">
  <router-link to="/casamento" class="madrinhas">
    <img src="/img/modelo8.png" alt="madrinha">
    <div class="titulo-madri">
      <h1>MADRINHAS</h1>
    </div>
  </router-link>

  <router-link to="/praia" class="praia">
    <img src="/img/praiana.png" alt="praiana">
  </router-link>
</div>
</main>
</template>

<style scoped>

main{
  margin-top: -8vw;
}

.bnt-grandes {
  display: flex;
}

.madrinhas,
.praia {
  width: 45%;
  margin-left: 9vw;
  position: relative;
  cursor: pointer;
  display: block;
}

.madrinhas:hover,
.praia:hover {
  transform: scale(1.02);
  transition: 0.3s;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

/*===========================
          MADRINHAS
============================*/

.madrinhas img{
  width: 100%;
  border-radius: 1.4vw;
}

.titulo-madri {
  position: absolute;
  inset: 0;
  border-radius: 1.4vw;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 55%,
    rgba(217, 217, 217, 0.5) 75%,
    rgb(201, 180, 171) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;

}

.titulo-madri h1{
  color: white;
  font-family: "Kaisei Decol", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 3.2vw;
  -webkit-text-stroke: 1px rgb(237, 236, 236);
}

/*===========================
          PRAIANA
============================*/

.praia{
  margin-right: 8vw;
}

.praia img{
  width: 100%;
  background-color: #F9EBE7;
  padding: 1vw;
  border-radius: 1.4vw;
}
</style>
