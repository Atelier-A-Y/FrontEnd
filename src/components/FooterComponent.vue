<template>
    <footer>
        <div>
            <section>
                <h1>Central de Ajuda</h1>
                <p>Seg. a Sex. das 8:00 às 16:00</p>
                <p><span><img src="/img/telefone.png" alt="telefone" width="15" height="15"></span>(47) 7680-6642</p>
                <p><span class="fa-brands fa-whatsapp"></span>(47) 94577-9812</p>
            </section>
            <section>
                <h1>Redes Sociais</h1>
                <p><span class="fa-brands fa-instagram"></span><a href="https://www.instagram.com/_a.y.atelier_/">@_a.y.atelier_</a></p>
                <p><span class="fa-brands fa-x-twitter"></span>@a.y__atelier</p>
            </section>
        </div>
        <p class="endereço"> 17.296.164/0002-55 | Rua Luiz Maski, 848, Bloco 2 | Itoupavazinha - 89096-650 - Blumenau -
            SC</p>
    </footer>
</template>

<style scoped>
footer {
  width: 100%;
  background: #f5e9e0;
  margin-top: 4vw;
}

footer > div {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  padding: 50px 80px;
}

footer section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

footer h1 {
  font-size: 2.3rem;
  letter-spacing: 2px;

  color: #311111;
  margin-bottom: 10px;

  font-family: "Julius Sans One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

footer p {
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 1rem;
  color: #311111;

  font-family: "Julius Sans One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

footer a {
  color: #311111;
  text-decoration: none;

  transition: 0.3s;
}

footer a:hover {
  opacity: 0.7;
}

footer span {
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
}

.endereço {
  width: 100%;
  background: #311111;

  color: #f5e9e0;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  padding: 16px 20px;

  font-size: 0.9rem;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  footer > div {
    flex-direction: column;
    gap: 40px;

    padding: 40px 30px;
  }

  footer h1 {
    font-size: 1.7rem;
  }

  footer p {
    font-size: 0.95rem;
  }

  .endereço {
    font-size: 0.75rem;
    line-height: 1.5;
    padding: 15px;
  }
}
</style>
