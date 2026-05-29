<template>
  <main>
    <router-link to="/formatura" class="banner">
      <img src="/img/formanda_banner.png" alt="banner">

      <div class="overlay">
        <div class="marca">
          <span class="marca1">ATELIER</span>
          <span class="marca2">A.Y.</span>
        </div>
        <div class="texto">
          <h2>50% OFF<br>PARA<br>FORMANDOS</h2>
        </div>
      </div>
    </router-link>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap');

.banner {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.banner img {
  width: 57%;
  display: block;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.39) 30%,
    rgb(0, 0, 0) 48%,
    rgb(0, 0, 0) 100%
  );
    height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.texto {
  color: white;
  text-align: left;
  margin-right: 24vw;
}

.texto h2 {
  font-family: "Playfair", serif;
  font-optical-sizing: auto;
  font-style: normal;
  width: 100;
  font-size: 4.5vw;
  line-height: 1.2;
}

.marca{
  position: absolute;
  left: 92vw;
  bottom: 18vw;
  transform: translateY(-50%);
  color: white;
  font-family: "Noto Rashi Hebrew", serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.marca1 {
  font-size: 1vw;
  letter-spacing: 0.1vw;
  display: block;
}

.marca2 {
  font-size: 0.9vw;
  letter-spacing: 0.1vw;
  display: block;
  margin-left: 1.5vw;
}
</style>
