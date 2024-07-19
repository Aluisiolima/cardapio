var botaoCompra = document.querySelectorAll("#buttonCompra");

function cardPizzas() {

    for (let i = 0; i < pizzas.length; i++) {
        const element = pizzas[i];
        
        const produtos = document.querySelector(".cardapio_produtos_lanche")
        const div = document.createElement("div");
        div.classList.add("card_pizzas");
        div.id = `${element.tipo}${i}`
        div.innerHTML = `
       
        <img src='../img/pizza_padrao.svg' alt="${element.nome}" >
        <p class="detalhes">${element.nome}</p>
        <p class="detalhes">R$ ${element.valor.toFixed(2)}</p>
        <button onclick="loadContent('detalhes')" id="buttoncompra">compra</button>
        
        `
        produtos.appendChild(div);
}
}


function cardBebidas() {

    for (let i = 0; i < bebidas.length; i++) {
        const element = bebidas[i];
        
        const produtos = document.querySelector(".cardapio_produtos_acompanhamento")
        const div = document.createElement("div");
        div.classList.add("card_bebida");
        div.id = `${element.tipo}${i}`
        div.innerHTML = `
       
        <img src='../img/bebida_padrao.svg' alt="${element.nome}">
        <p class="detalhes">${element.nome}</p>
        <p class="detalhes">R$ ${element.valor.toFixed(2)}</p>
        <button onclick="loadContent('detalhes')" id="buttoncompra">compra</button>
        
        `
        produtos.appendChild(div);
}
}


function cardHamburgues() {

    for (let i = 0; i < hamburgues.length; i++) {
        const element = hamburgues[i];
        
        const produtos = document.querySelector(".cardapio_produtos_lanche")
        const div = document.createElement("div");
        div.classList.add("card_hamburgues");
        div.id = `${element.tipo}${i}`
        div.innerHTML = `
       
        <img src='../img/hamburguer_padrao.svg' alt="${element.nome}" >
        <p class="detalhes">${element.nome}</p>
        <p class="detalhes">R$ ${element.valor.toFixed(2)}</p>
        <button onclick="loadContent('detalhes')" id="buttoncompra">compra</button>
        
        `
        produtos.appendChild(div);
}
}


