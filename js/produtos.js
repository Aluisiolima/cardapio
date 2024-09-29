const produtos_escolhidos = [];
let local = true;
const ids = [];

function enviarDadosProdutos() {
    // Cria um array de objetos
    const objetos = [
        { id: 1, valor: "1" },
        { id: 2, valor: "13" }
    ];
    // Converte o array de objetos em uma string JSON
    const jsonString = JSON.stringify(objetos);
    document.getElementById('ids').value = jsonString;

    // Verifica o valor antes do envio
    console.log('Valor do campo oculto:', jsonString); // Para depuração

    return true; // Permite o envio do formulário
}