
var local = true;
var tela = document.querySelector(".container_pagamentos");
var telaCarinho = document.querySelector(".container_carinho");
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
<form action="#">
      <fieldset class="dados">
        <legend>dados</legend>
        <input type="text" placeholder="nome">
        <input type="text" placeholder="bairro">
        <input type="text" placeholder="rua">
        <input type="number" placeholder="numero da casa">
      </fieldset>
        <details class="produtos_escolhidos">
          <summary>
            produstos <i class="bi bi-caret-down-fill"></i>
          </summary>
        
        </details>
      <fieldset class="formas_De_Pagamento">
        <legend>formas de pagamento</legend>
        <label class="meios_de_pagamento">
          <img src="./img/pix.svg" alt="pix" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="pix">
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/cartao.svg" alt="cartao" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="cartao">
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/dinheiro.svg" alt="dinheiro" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="dinheiro">
        </label>
      </fieldset>
      <div class="finaliza_pedido">
        <p>valor =</p>
        <input type="submit" valeu="comprar">
      </div>
    </form>
  `
}
function tela2(){
telaCarinho.style.display = 'none';
tela.innerHTML= `
  <form action="#">
      <fieldset class="dados">
        <legend>dados entrega</legend>
        <input type="text" placeholder="nome">
        <input type="text" placeholder="mesa">
        <input type="number" placeholder="numero da mesa">
      </fieldset>
      
      <details class="produtos_escolhidos">
        <summary>
          produstos <i class="bi bi-caret-down-fill"></i>
        </summary>
      </details>
    
      <fieldset class="formas_De_Pagamento">
        <legend>formas de pagamento</legend>
        <label class="meios_de_pagamento">
          <img src="./img/pix.svg" alt="pix" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="pix">
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/cartao.svg" alt="cartao" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="cartao">
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/dinheiro.svg" alt="dinheiro" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="dinheiro">
        </label>
      </fieldset>
      <div class="finaliza_pedido">
        <p>valor =</p>
        <input type="submit" valeu="comprar">
      </div>
    </form>
  `
}
mudarValorDaVariavel();

   