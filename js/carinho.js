var local = true;
const tela = document.querySelector(".container_pagamentos");
const telaCarinho = document.querySelector(".container_carinho");
var mesa = document.getElementById("mesa");
var entrega = document.getElementById("entrega");

function mudarValorDaVariavel() {
    entrega.addEventListener("click", ()=>{
      entrega.style.background = "green";
      mesa.style.background = "antiquewhite";
      local = true;
      return local;
    });
    mesa.addEventListener("click", ()=>{
      mesa.style.background = "green";
      entrega.style.background = "antiquewhite";
      local = false;
      return local;
    })
    return local;
}

function telaDeEmtrega(){
    let typeDelivery = local

    switch(typeDelivery){
        case true: 
          tela1(); 
          break;
        case false:
          tela2();
          break;
    }
}

function tela1(){
    telaCarinho.style.display = 'none';

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
function tela2(){
  telaCarinho.style.display = 'none';
  tela.innerHTML= `
    <div class="dados">
      <input type="text" placeholder="nome">
      <input type="text" placeholder="mesa">
      <input type="number" placeholder="numero da mesa">
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