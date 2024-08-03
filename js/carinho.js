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
  var produtos = "";
  for (let i = 0; i < produtos_escolhidos.length; i++) {
    var nome = produtos_escolhidos[i][1];
    var valor = produtos_escolhidos[i][2];
    var quantidade = produtos_escolhidos[i][0];
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

  

   produtos +=  `<div class="card_produto">
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
    valor_total += parseFloat(produtos_escolhidos[i][2]);
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
function retirarImgsListaProdutos() {
  for (let i = 0; i < produtos_escolhidos.length; i++) {
    produtos_escolhidos[i].pop();
  }
  return produtos_escolhidos;
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
  if(parseFloat(valorTotal()) >= 0){
    switch(typeDelivery){
      case true: 
        tela1(); 
        break;
      case false:
        tela2();
        break;
    }
  }else{
    alert("por favor faça um pedido!!")
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
        <input type="text" placeholder="nome" name="nome" required>
        <input type="text" placeholder="bairro" name="bairro" required>
        <input type="text" placeholder="rua" name="rua" required>
        <input type="number" placeholder="numero da casa" name="Ncasa" required>
        <input type="text"  name="entrega" value="entrega" hidden>
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
          <input type="radio" name="type_pagamento" id="dinheiro" value="pix" required>
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/cartao.svg" alt="cartao" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="cartao" required>
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/dinheiro.svg" alt="dinheiro" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="dinheiro" required>
        </label>
      </fieldset>
      <div class="finaliza_pedido">
        <input type="text" name="produtos" value="${retirarImgsListaProdutos()}" hidden>
        <input type="text" name="valor" value="${valorTotal()}" hidden>
        <p>valor = ${valorTotal()}</p>
        <input type="submit" valeu="comprar" >
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
        <input type="text" placeholder="nome" name="nome" required>
        <input type="text"  name="mesa" value="mesa" hidden>
        <input type="number" placeholder="numero da mesa" name="Nmesa" required>
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
          <input type="radio" name="type_pagamento" id="dinheiro" value="pix" required>
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/cartao.svg" alt="cartao" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="cartao" required>
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/dinheiro.svg" alt="dinheiro" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="dinheiro" required>
        </label>
      </fieldset>
      <div class="finaliza_pedido">
        <input type="text" name="produtos" value="${retirarImgsListaProdutos()}" hidden>
        <input type="text" name="valor" value="${valorTotal()}" hidden>
        <p>valor =${valorTotal()}</p>
        <input type="submit" valeu="comprar">
      </div>
    </form>
  `
}

mudarValorDaVariavel();
geraCardsProduct();

  