<template>
  <main>
    <div class="bnt-pequenos">

      <router-link to="/terno" class="card">
        <img src="/img/modelo15.png" alt="terno">

        <div class="overlay">
          <h1>TERNOS<br>FEMININOS</h1>
        </div>
      </router-link>

      <router-link to="/casual" class="card-reverso">
        <img src="/img/modelo16.png" alt="curto">

        <div class="overlay-reverso">
          <h1>VESTIDOS <br> CURTOS</h1>
        </div>
      </router-link>

    </div>
  </main>
</template>

<style scoped>

main{
  margin-bottom: 4vw;
}

.bnt-pequenos{
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5vw;
  margin-top: 2vw;
}

.card{
  width: 35%;
  height: 14vw;
  position: relative;
  overflow: hidden;
  border-radius: 0.5vw;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1b0f0f;
}

.card img{
  position: absolute;
  right: 15.06VW;
  top: 0vw;
  width: 57%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s;
}

.card:hover img{
  transform: scale(1.03);
}

.overlay{
  position: absolute;
  inset: 0;
  display: flex;
  align-items: end;
  justify-content: center;
  padding-bottom: 2.5vw;
  background: linear-gradient(
    to right,
    rgba(26, 17, 17, 0.39) 26%,
    rgb(26, 17, 17) 45%,
    rgb(26, 17, 17) 100%
  );
}

.overlay h1{
  text-align: right;
  z-index: 2;
  color: white;
  font-size: 2.5vw;
  line-height: 1.3;
  letter-spacing: 1px;
  margin-left: 15vw;
  margin-bottom: 1vw;
  font-family: "Kaisei Decol", serif;
  font-weight: 400;
  font-style: normal;
}

/*==============================
          REVERSO
==============================*/

.card-reverso{
  width: 35%;
  height: 14vw;
  position: relative;
  overflow: hidden;
  border-radius: 0.5vw;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1b0f0f;
}

.card-reverso img{
  position: absolute;
  left: 19.06VW;
  top: 0vw;
  width: 50%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s;
}

.card-reverso:hover img{
  transform: scale(1.03);
}

.overlay-reverso{
  position: absolute;
  inset: 0;
  display: flex;
  align-items: end;
  justify-content: center;
  padding-bottom: 2.5vw;
  background: linear-gradient(
    to left,
    rgba(26, 17, 17, 0.39) 26%,
    rgb(26, 17, 17) 45%,
    rgb(26, 17, 17) 100%
  );
}

.overlay-reverso h1{
  text-align: left;
  z-index: 2;
  color: white;
  font-size: 2.5vw;
  line-height: 1.3;
  letter-spacing: 1px;
  margin-right: 16vw;
  margin-bottom: 1vw;
  font-family: "Kaisei Decol", serif;
  font-weight: 400;
  font-style: normal;
}
</style>
