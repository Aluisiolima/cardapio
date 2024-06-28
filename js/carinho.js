var local = true;

function mudarValorDaVariavel() {
    local!=local;
    return local;
}

function telaDeEmtrega(){
    let typeDelivery = local

    switch(typeDelivery){
        case true:  tela1();
        case false: tela2();
    }
}

function tela1(){
    const tela = document.querySelector(".container_pagamentos");

    tela.innerHTML= `
    <div class="dados">
      <input type="text" placeholder="nome">
      <input type="text" placeholder="bairro">
      <input type="text" placeholder="rua">
      <input type="number" placeholder="numero da casa">
    </div>
    <div class="produtos_escolhidos">

    </div>
    <h4>formas de pagamento</h4>
    <div class="formas_De_Pagamento">
      <div class="meios_de_pagamento">
        <img src="./img/pix.svg" alt="pix" height="50">
      </div>
      <div class="meios_de_pagamento">
        <img src="./img/cartao.svg" alt="pix" height="50">
      </div>
      <div class="meios_de_pagamento">
        <img src="./img/dinheiro.svg" alt="pix" height="50">
      </div>
    </div>
    <div class="finaliza_pedido">
      <p>valor =</p>
      <button>compra</button>
    </div>
    `
}