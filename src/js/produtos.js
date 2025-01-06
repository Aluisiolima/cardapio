const produtos_escolhidos = [];
let local = true;
const ids = [];

function enviarDadosProdutos() {
    
    const jsonIDs = JSON.stringify(ids);
    const jsonProduct = JSON.stringify(retirarImgsListaProdutos());
    document.getElementById("ids").value = jsonIDs;
    document.getElementById("product").value = jsonProduct;

    return true; 
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

async function carregaCardsProdutos(id){
    document.getElementById("container_load").style.display = "flex";
    const produtos = await fetchApi(null,"GET",`${link_api}/pegarProdutos/${id}`);
    if (!produtos.error && produtos.data.length !== 0){
        let tipoAtual = "";
        const container = document.getElementById("produtos");
        produtos.data.forEach(data => {
            if (tipoAtual !== data.tipo){
                tipoAtual = data.tipo;
                container.innerHTML += `<div class="title_tipo" id="${tipoAtual}"><h3>${tipoAtual}:</h3></div>`
            }
            // render("./components/card_produto.html",data,"produtos");
            container.innerHTML += `<div class="card" >
                                        <img src="${data.path}" alt="imagem" onerror="NotFoundImg("{{tipo}}", this)">
                                        <p class="detalhes">${data.nome_produto}</p>
                                        <p class="detalhes">R$ ${data.valor}</p>
                                        <button onclick="getDetalhes('${data.id_produto}')" class="buttoncompra">compra</button>
                                    </div>`

        });
    }
    document.getElementById("container_load").style.display = "none";
}

async function getDetalhes(id) {
    document.getElementById("container_load").style.display = "flex";
    const produto = await fetchApi(null,"GET",`${link_api}/pegarProduto/unico/${id}`);
    document.getElementById("container_detalhes").style.display = "flex"
    if(!produto.error && produto.data.length !== 0){
        produto.data.forEach(data => {
            render("./components/card_detalhes.html",data,"container_detalhes");
        })
    }
    document.getElementById("container_load").style.display = "none";
}