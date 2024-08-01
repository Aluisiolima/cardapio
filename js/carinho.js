//variaveis importantes
var local = true;
var tela = document.querySelector(".container_pagamentos");
var telaCarinho = document.querySelector(".container_carinho");
var mesa = document.getElementById("mesa");
var entrega = document.getElementById("entrega");
var cardProduto = document.getElementById("produtos_carinho");
var addProduto = document.getElementById("mais1");
var removeProduto = document.getElementById("menos1");

function geraCardsProduct(){
  
  for (let i = 0; i < produtos_escolhidos.length; i++) {
    var nome = produtos_escolhidos[i][0];
    var valor = produtos_escolhidos[i][1];
    var quantidade = produtos_escolhidos[i][2];
    var img = produtos_escolhidos[i][3];
    
   
  
    cardProduto.innerHTML += `
              <div class="card_produto">
                <div class="card_img">
                    <img src="${img}" alt="pizza_padrao">
                </div>
                <div class="card_nome">${nome}</div>
                <div class="card_quantidade">${quantidade}</div>
                <div class="card_valor">R$${valor}</div>
              </div>  
    `

   var produtos = "";

   produtos += `<div class="card_produto">
                <div class="card_img">
                    <img src="${img}" alt="pizza_padrao">
                </div>
                <div class="card_nome">${nome}</div>
                <div class="card_quantidade">${quantidade}</div>
                <div class="card_valor">R$${valor}</div>
              </div>`  ;

  }
  
  valorTotal();

  return produtos;
}

function valorTotal() {
  var valor_total = 0;

  for (let i = 0; i < produtos_escolhidos.length; i++) {
    valor_total += parseFloat(produtos_escolhidos[i][1]);
  }
  document.getElementById("valortotal").textContent = valor_total.toFixed(2);

  return valor_total.toFixed(2);
}

function mais1(){

  var quantidade = document.getElementById("quantidade");
  var valorProduto = document.getElementById("value");
  var quantidadeValor = parseInt(quantidade.textContent);
  var valor_produto_sem_alteracoes = valorProduto.getAttribute('product-value');

  if(quantidadeValor>=0){
    quantidadeValor += 1;
    quantidade.textContent = quantidadeValor;
    valorProduto.textContent = (valor_produto_sem_alteracoes*quantidadeValor).toFixed(2);
}

}
function menos1(){
  var quantidade = document.getElementById("quantidade");
  var valorProduto = document.getElementById("value");
  var valorAtual = valorProduto.textContent ;
  var quantidadeValor = parseInt(quantidade.textContent);
  var valor_produto_sem_alteracoes = valorProduto.getAttribute('product-value');

  if(quantidadeValor <= 1){
    quantidade.textContent = quantidadeValor;
  }else if(quantidadeValor >=1){
    quantidadeValor -= 1;
    quantidade.textContent = quantidadeValor;
    valorProduto.textContent = (valorAtual - valor_produto_sem_alteracoes).toFixed(2);
  }
}


/**
 * function que mudar o estado se vc estar ou nao no estabelecimento
 * receber a variavel local e que um bool que por padrao e true dizendo que o cliente nao esta no estabelicimento
 * @returns local
 */
function mudarValorDaVariavel(){
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
/**
 * responsavel por imprimi na tela quais tipos de informacoes sao enterressante que o cliente der para a entrega do produto
 */
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
/**
 * imprimi a tela caso o cliente esteja na sua casa e queira um delivery 
 */
function tela1(){
  telaCarinho.style.display = 'none';

  tela.innerHTML= `
<form action="./Database/pedido.php" method="post">
      <fieldset class="dados">
        <legend>dados</legend>
        <input type="text" placeholder="nome" name="nome">
        <input type="text" placeholder="bairro" name="bairro">
        <input type="text" placeholder="rua" name="rua">
        <input type="number" placeholder="numero da casa" name="Ncasa">
      </fieldset>
        <details class="produtos_escolhidos">
          <summary>
            produstos <i class="bi bi-caret-down-fill"></i>
          </summary>
          ${geraCardsProduct()}
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
        <p>valor = ${valorTotal()}</p>
        <input type="submit" valeu="comprar">
      </div>
    </form>
  `
}
/**
 * imprimi a tela caso o cliente esteja no estabelicimento  
 */
function tela2(){
telaCarinho.style.display = 'none';
tela.innerHTML= `
  <form action="./Database/pedido.php" method="post">
      <fieldset class="dados">
        <legend>dados entrega</legend>
        <input type="text" placeholder="nome" name="nome">
        <input type="text" placeholder="mesa" name="mesa">
        <input type="number" placeholder="numero da mesa" name="Nmesa">
      </fieldset>
      
      <details class="produtos_escolhidos">
        <summary>
          produstos <i class="bi bi-caret-down-fill"></i>
        </summary>
        ${geraCardsProduct()}
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
        <p>valor =${valorTotal()}</p>
        <input type="submit" valeu="comprar">
      </div>
    </form>
  `
}
mudarValorDaVariavel();
geraCardsProduct();

   