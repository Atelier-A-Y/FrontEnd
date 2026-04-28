<template>
<main>
<div class="bnt-grandes">
  <div class="madrinhas">
    <img src="/img/modelo8.png" alt="madrinha">
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
  width: 70%;
  margin-left: 2vw;
}

img {
  width: 100%;
  height: auto;
  display: block;
}

.madrinhas img{
  width: 95%;
  border-radius: 2vw;
}

.praia{
  margin-right: -5vw;
}

.praia img{
  width: 85%;
  background-color: #F9EBE7;
  padding: 1vw;
  border-radius: 2vw;
}
</style>
