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