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

<style>
@import url('https://fonts.googleapis.com/css2?family=Klee+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Julius+Sans+One&family=Klee+One&display=swap');

footer {
    background-color: #F5E9E0;
    text-align: center;
    width: 100%;
    padding-top: 2vw;
}

div {
    display: flex;
    color: rgb(5, 5, 5);
    margin-bottom: 50px;
    justify-content: space-around;
    font-family: 'Klee One', cursive;
}

div h1 {
    font-family: 'Julius Sans One', sans-serif;
    font-size: 2.5rem;
}

div p {
    text-align: center;
    font-size: 1.2rem;
}

span {
    padding: 0 6px 0 0;
}

a {
    color: rgb(5, 5, 5);
    text-decoration: none;
}

.endereço {
    background: #311111;
    color: white;
    text-align: center;
    padding: 2vw;
}
</style>