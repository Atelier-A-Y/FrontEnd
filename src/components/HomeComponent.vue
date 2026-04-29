<template>
<main>
<div class="bnt-grandes">
  <div class="madrinhas">
    <img src="/img/modelo8.png" alt="madrinha">
    <div class="titulo-madri">
      <h1>MADRINHAS</h1>
    </div>
  </div>

  <div class="praia">
    <img src="/img/praiana.png" alt="praiana">
  </div>
</div>
</main>
</template>

<style scoped>
main{
  background-color: white;
  margin-top: -9vw;
}

.bnt-grandes {
  display: flex;
}

.madrinhas,
.praia {
  width: 45%;
  margin-left: 9vw;
  position: relative;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

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
    rgb(223, 199, 189) 100%
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
}

/*===========================
          PRAIANA
============================*/

.praia{
  margin-right: 4vw;
}

.praia img{
  width: 90%;
  background-color: #F9EBE7;
  padding: 1vw;
  border-radius: 1.4vw;
}
</style>
