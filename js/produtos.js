const produtos_escolhidos = [];
let local = true;
const ids = [];

function enviarDadosProdutos() {
    
    const jsonString = JSON.stringify(ids);
    document.getElementById('ids').value = jsonString;

    // Verifica o valor antes do envio
    console.log('Valor do campo oculto:', jsonString); // Para depuração

    return true; // Permite o envio do formulário
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