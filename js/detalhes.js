const botaoCompra = document.getElementById('buttonCompra');

botaoCompra.addEventListener("click", mostraDados);

function mostraDados(){
    console.log(this.valor)
}