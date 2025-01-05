

function homeAtive(){
    const home = document.getElementById("home");
    const cardapio = document.getElementById("cardapio");
    home.style.textDecoration = "underline";
    cardapio.style.textDecoration = "none"; 
    document.getElementById("container-area").innerHTML = "";
    produtosMain[0].forEach(data => {
        render("./components/card_home.html", data, "container-area");
    });
}

async function cardapioAtive(id) {
    const home = document.getElementById("home");
    const cardapio = document.getElementById("cardapio");
    home.style.textDecoration = "none";
    cardapio.style.textDecoration = "underline"; 
    document.getElementById("container-area").innerHTML = "";
    await render("./components/cardapio-menu.html",null,"container-area");
    await carregaCardsProdutos(id);
}


