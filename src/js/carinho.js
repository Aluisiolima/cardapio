

function geraCardsProduct(product){
  const cardProduto = document.getElementById("produtos_carinho");

  const cardsExistentes = document.querySelectorAll('.card_produto');
  cardsExistentes.forEach(card => card.remove());
  
  let produtos = '';
  for (let i = 0; i < product.length; i++) {
    const nome = produtos_escolhidos[i].nome;
    const valor = produtos_escolhidos[i].valor;
    const quantidade = produtos_escolhidos[i].quantidade;
    const img = produtos_escolhidos[i].img;
    const id = produtos_escolhidos[i].id;
    
    
   
  
    cardProduto.innerHTML += `
              <div class="card_produto">
                <div class="card_img">
                    <img src="${img}" alt="pizza_padrao">
                </div>
                <div class="card_nome">${nome}</div>
                <div class="card_quantidade">${quantidade}</div>
                <div class="card_valor">R$${valor}</div>
                <div class='remove' onclick='removeItem(${id})'><i class='bi bi-x-lg'></i></div>
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
  let valor_total = 0;

  for (let i = 0; i < produtos_escolhidos.length; i++) {
    valor_total += parseFloat(produtos_escolhidos[i].valor);
  }
  document.getElementById("valortotal").textContent = valor_total.toFixed(2);

  return valor_total.toFixed(2);
}

function mais1(){
  const quantidade = document.getElementById("quantidade");
  const valorProduto = document.getElementById("value");
  let quantidadeValor = parseInt(quantidade.textContent);
  const valor_produto_sem_alteracoes = valorProduto.getAttribute('product-value');

  if(quantidadeValor>=0){
    quantidadeValor += 1;
    quantidade.textContent = quantidadeValor;
    valorProduto.textContent = (valor_produto_sem_alteracoes*quantidadeValor).toFixed(2);
}

}
function menos1(){
  const quantidade = document.getElementById("quantidade");
  const valorProduto = document.getElementById("value");
  const valorAtual = valorProduto.textContent ;
  let quantidadeValor = parseInt(quantidade.textContent);
  const valor_produto_sem_alteracoes = valorProduto.getAttribute('product-value');

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
    delete produtos_escolhidos[i].img;
  
  }
  return produtos_escolhidos;
}
function removeItem(id){

  const indice = produtos_escolhidos.findIndex(produto => produto.id === id);

  if (indice !== -1) {
      produtos_escolhidos.splice(indice, 1);
  }
  geraCardsProduct(produtos_escolhidos);
}
/**
 * function que mudar o estado se vc estar ou nao no estabelecimento
 * receber a variavel local e que um bool que por padrao e true dizendo que o cliente nao esta no estabelicimento
 * @returns local
 */
function mudarValorDaVariavel(){
 
  const mesa = document.getElementById("mesa");
  const entrega = document.getElementById("entrega");

  if(entrega){
    entrega.addEventListener("click", ()=>{
      entrega.style.background = "green";
      mesa.style.background = "antiquewhite";
      local = true;
      return local;
    });
  }
  if(mesa){
    mesa.addEventListener("click", ()=>{
      mesa.style.background = "green";
      entrega.style.background = "antiquewhite";
      local = false;
      return local;
    });
  }
  
  return local;
}
/**
 * responsavel por imprimi na tela quais tipos de informacoes sao enterressante que o cliente der para a entrega do produto
 */
function telaDeEmtrega(local){
  let typeDelivery = local;
  const tela = document.querySelector(".container_pagamentos");
  const telaCarinho = document.querySelector(".container_carinho");
  const navegacao = document.getElementById("navegacao");
  if(parseFloat(valorTotal()) > 0){
    switch(typeDelivery){
      case true: 
        tela1(telaCarinho,tela); 
        navegacao.style.display ="none";
        break;
      case false:
        tela2(telaCarinho,tela);
        navegacao.style.display ="none";
        break;
    }
  }else{
    alert("por favor faça um pedido!!")
  }
  
}
/**
 * imprimi a tela caso o cliente esteja na sua casa e queira um delivery 
 */
function tela1(telaCarinho,tela){
  
  telaCarinho.style.display = 'none';

  tela.innerHTML= `
<form action="./Database/crud.php" method="post" onsubmit="return enviarDadosProdutos();">
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
          ${geraCardsProduct(produtos_escolhidos)}
        </details>
      <fieldset class="formas_De_Pagamento">
        <legend>formas de pagamento</legend>
        <label class="meios_de_pagamento">
          <img src="./img/form_pagamento/pix.svg" alt="pix" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="pix" required>
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/form_pagamento/cartao.svg" alt="cartao" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="cartao" required>
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/form_pagamento/dinheiro.svg" alt="dinheiro" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="dinheiro" required>
        </label>
      </fieldset>
      <div class="finaliza_pedido">
        <input type="text" name="produtos" id='product' value="" hidden>
        <input type="text" name="valor" value="${valorTotal()}" hidden>
        <input type="text" name="ids"  id="ids" value="" hidden>
        <p>valor = ${valorTotal()}</p>
        <input type="submit" valeu="comprar" >
      </div>
    </form>
  `
}
/**
 * imprimi a tela caso o cliente esteja no estabelicimento  
 */
function tela2(telaCarinho,tela){
telaCarinho.style.display = 'none';
tela.innerHTML= `
  <form action="./Database/crud.php" method="post" onsubmit="return enviarDadosProdutos();">
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
        ${geraCardsProduct(produtos_escolhidos)}
      </details>
    
      <fieldset class="formas_De_Pagamento">
        <legend>formas de pagamento</legend>
        <label class="meios_de_pagamento">
          <img src="./img/form_pagamento/pix.svg" alt="pix" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="pix" required>
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/form_pagamento/cartao.svg" alt="cartao" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="cartao" required>
        </label>
        <label class="meios_de_pagamento">
          <img src="./img/form_pagamento/dinheiro.svg" alt="dinheiro" height="50">
          <input type="radio" name="type_pagamento" id="dinheiro" value="dinheiro" required>
        </label>
      </fieldset>
      <div class="finaliza_pedido">
        <input type="text" name="produtos" id='product' value="" hidden>
        <input type="text" name="valor" value="${valorTotal()}" hidden>
        <input type="text" name="ids" id="ids" value="" hidden>
        <p>valor =${valorTotal()}</p>
        <input type="submit" valeu="comprar">
      </div>
    </form>
  `
}

mudarValorDaVariavel();
geraCardsProduct(produtos_escolhidos);

  