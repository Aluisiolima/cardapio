function NotFoundImg(tipo, img) {
    const tiposImgs = {
        pizza:"./img/default/Pizza_padrao.svg",
        hamburguer:"./img/default/Hambúrguer_padrao.svg",
        bebida:"./img/default/Bebida_padrao.svg",
        default:"./img/default/Pizza_padrao.svg"
    }

    img.src = tiposImgs[tipo] || tiposImgs.default;
}

function fechaDetalhes(){
    document.getElementById("container_detalhes").style.display = "none";
    document.getElementById("container_detalhes").innerHTML = "";
}

function addCarinho() {
    const detalhes = document.getElementById("tela_detalhe");
    detalhes.classList.add("animate");

    const id = document.getElementById("imgProduct").alt;
    const nomeProduto = document.getElementById("nameProduct").textContent;
    const quantidade = document.getElementById("quantidade").textContent;
    const imgProduto = document.getElementById("imgProduct").src;
    const valorProduto = document.getElementById("value").textContent;

    // logica de implementa o produto no carrinho
    const listProduto = {
        "id" : Number(id),
        "quantidade" : Number(quantidade),
        "nome" : String(nomeProduto),
        "valor" : String(valorProduto),
        "img" : String(imgProduto)
    };

    produtos_escolhidos.push(listProduto);
    const dir = {id : Number(id), quantidade : Number(quantidade)};
    ids.push(dir);

    detalhes.addEventListener("animationend", ()=> {
        detalhes.classList.remove("animate");
        detalhes.style.display = "none";
        updateCarrinho();
        fechaDetalhes();
    });
}

function updateCarrinho(){
    if(produtos_escolhidos == 0){
        return;
    }
    
    const numerador = document.getElementById("Ncompras");
    numerador.style.background = "#66c13f";
    let numero = produtos_escolhidos.length;
    numerador.innerText = numero;
}