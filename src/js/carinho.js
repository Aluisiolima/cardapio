
function geraCardsProduct(product){
  document.getElementById("produtos_carinho").innerHTML = "";
  product.forEach(element => {
    render("./components/card_carinho.html",element,"produtos_carinho");
  });
  
  valorTotal();
}

function valorTotal() {
  let valor_total = 0;

  for (let i = 0; i < produtos_escolhidos.length; i++) {
    valor_total += parseFloat(produtos_escolhidos[i].valor);
  }
  document.getElementById("valortotal").textContent = valor_total.toFixed(2);

  return valor_total.toFixed(2);
}

function retirarImgsListaProdutos() {
  for (let i = 0; i < produtos_escolhidos.length; i++) {
    delete produtos_escolhidos[i].img;
  
  }
  return produtos_escolhidos;
}
function removeItem(id){

  const indice = produtos_escolhidos.findIndex(produto => produto.id === Number(id));
  const index = keyProducts.findIndex(item => item.id === Number(id));

  if (index !== -1) {
    keyProducts.splice(index, 1);
  }

  if (indice !== -1) {
      produtos_escolhidos.splice(indice, 1);
  }
  
  geraCardsProduct(produtos_escolhidos);
}

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


function telaDeEmtrega(){
  const navegacao = document.getElementById("navegacao");
  if(parseFloat(valorTotal()) > 0){
    const dates = {
      valor: valorTotal(),
      keys : keyProducts,
    };
    document.getElementById("container-area").innerHTML = "";
    const delivery = mudarValorDaVariavel();
    if(!delivery){
      render("./components/card_finaly_mesa.html",dates,"container-area");
      return;
    }
    render("./components/card_finaly_delivery.html",dates,"container-area"); 
    
  }else{
    alert("por favor faça um pedido!!")
  }
}


  