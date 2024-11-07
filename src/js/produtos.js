const produtos_escolhidos = [];
let local = true;
const ids = [];

function enviarDadosProdutos() {
    
    const jsonIDs = JSON.stringify(ids);
    const jsonProduct = JSON.stringify(retirarImgsListaProdutos());
    document.getElementById('ids').value = jsonIDs;
    document.getElementById('product').value = jsonProduct;

    return true; 
}

function updateCarrinho(){
    if(produtos_escolhidos == 0){
        return;
    }
    
    const numerador = document.getElementById('Ncompras');
    numerador.style.background = "#66c13f";
    let numero = produtos_escolhidos.length;
    numerador.innerText = numero;
}