<template>
<main>
<section class="bnt-g-desktop">
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
</section>
<section class="bnt-g-mobile">
  <h1>Categorias</h1>
  <div class="bnt-pequenos">
    <div class="bnt-superiores">
      <a href="/casamento"><img src="/img/bride.png" alt="bride"></a>
      <a href="/"><img src="/img/education.png" alt="education"></a>
      <a href="/praia"><img src="/img/sunbed.png" alt="sunbed"></a>
    </div>
    <div class="bnt-inferiores">
      <a href="/"><img src="/img/confetti.png" alt="confetti"></a>
      <a href="/"><img src="/img/suit.png" alt="suit"></a>
      <a href="/"><img src="/img/wear.png" alt="wear"></a>
    </div>
  </div>
</section>
</main>
</template>

<style scoped>
.bnt-g-desktop{
  display: flex;
}

.bnt-g-mobile{
  display: none;
}

main{
  margin-top: -9vw;
  margin-bottom: 2vw;
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

.bnt-grandes img {
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


@media (max-width: 600px){
  main{
    margin-top: -30vw;
  }

  .bnt-g-desktop{
    display: none;
  }

  .bnt-g-mobile{
    display: block;
    background-color: #F9EBE7;
    padding-bottom: 8vw;
  }

  .bnt-g-mobile h1{
    font-size: 5vw;
    margin-left: 5vw;
    padding-top: 5vw;
    color: #311111;
  }

  .bnt-pequenos {
        display: flex;
        flex-direction: column;
        gap: 8vw;
    }

    .bnt-superiores,
    .bnt-inferiores {
        display: flex;
        justify-content: center;
        margin: 5vw 0 0 0;
        padding: 0;
        gap: 8vw;
    }

    .bnt-g-mobile a {
        width: 18vw;
        height: 18vw;
        border-radius: 50%;
        background-color: #F3DDCB;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .bnt-g-mobile img {
        width: 10vw;
        height: 10vw;
        object-fit: contain;
    }
}
</style>