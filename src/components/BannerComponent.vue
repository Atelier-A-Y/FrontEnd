<template>
  <main>
    <div class="banner">
    <img src="/img/formanda_banner.png" alt="banner">

    <div class="overlay">
      <div class="texto">
        <span class="topo1">ATELIER</span>
        <span class="topo2">A.Y.</span>
        <h2>50% OFF<br>PARA<br>FORMANDOS</h2>
      </div>
    </div>
  </div>
  </main>
</template>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.banner img {
  width: 70%;
  display: block;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.39) 30%,
    rgb(0, 0, 0) 55%,
    rgb(0, 0, 0) 100%
  );

  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.texto {
  color: white;
  text-align: left;
  margin-right: 15vw;
}

.topo1 {
  font-size: 0.8vw;
  letter-spacing: 0.1vw;
  display: block;
  margin-bottom: 0.5vw;
}

.topo2 {
  font-size: 0.8vw;
  letter-spacing: 0.1vw;
  display: block;
  margin-bottom: 0.5vw;
}

.texto h2 {
  font-family: "Kaisei Decol", serif;
  font-size: 5vw;
  font-weight: 400;
  line-height: 1.2;
}
</style>
