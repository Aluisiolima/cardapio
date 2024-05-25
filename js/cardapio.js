var lista = [
    { nome: "Pizza de Queijo", valor: 30.00, img: "./img/pizza_queijo.jpg" },
    { nome: "Pizza de Calabresa", valor: 35.00, img: "./img/pizza_calabresa.jpg" },
    { nome: "Pizza de Frango", valor: 32.00, img: "./img/pizza_frango.jpg" },
    { nome: "Pizza Portuguesa", valor: 38.00, img: "./img/pizza_portuguesa.jpg" },
    { nome: "Pizza Marguerita", valor: 40.00, img: "./img/pizza_marguerita.jpg" },
    { nome: "Pizza de Pepperoni", valor: 42.00, img: "./img/pizza_pepperoni.jpg" },
    { nome: "Pizza Vegetariana", valor: 36.00, img: "./img/pizza_vegetariana.jpg" },
    { nome: "Pizza de Bacon", valor: 45.00, img: "./img/pizza_bacon.jpg" },
    { nome: "Pizza de Quatro Queijos", valor: 47.00, img: "./img/pizza_quatro_queijos.jpg" },
    { nome: "Pizza de Chocolate", valor: 50.00, img: "./img/pizza_chocolate.jpg" },
    { nome: "Pizza de Alho", valor: 33.00, img: "./img/pizza_alho.jpg" },
    { nome: "Pizza de Presunto", valor: 37.00, img: "./img/pizza_presunto.jpg" },
    { nome: "Pizza de Milho", valor: 31.00, img: "./img/pizza_milho.jpg" },
    { nome: "Pizza de Azeitona", valor: 34.00, img: "./img/pizza_azeitona.jpg" },
    { nome: "Pizza de Palmito", valor: 39.00, img: "./img/pizza_palmito.jpg" },
    { nome: "Pizza de Rúcula", valor: 41.00, img: "./img/pizza_rucula.jpg" },
    { nome: "Pizza de Tomate Seco", valor: 43.00, img: "./img/pizza_tomate_seco.jpg" },
    { nome: "Pizza de Atum", valor: 44.00, img: "./img/pizza_atum.jpg" },
    { nome: "Pizza de Cogumelos", valor: 46.00, img: "./img/pizza_cogumelos.jpg" },
    { nome: "Pizza de Abobrinha", valor: 48.00, img: "./img/pizza_abobrinha.jpg" },
    { nome: "Pizza de Frutos do Mar", valor: 49.00, img: "./img/pizza_frutos_do_mar.jpg" },
    { nome: "Pizza de Carne Seca", valor: 50.00, img: "./img/pizza_carne_seca.jpg" },
    { nome: "Pizza de Pernil", valor: 51.00, img: "./img/pizza_pernil.jpg" }
];

function cardPizzas() {

    for (let i = 0; i < lista.length; i++) {
        const element = lista[i];
        
        const produtos = document.querySelector(".cardapio_produtos")
        const div = document.createElement("div");
        div.classList.add('card_pizzas');

        div.innerHTML = `
        <img src="${element.img}" onerror="this.onerror=null;this.src='./img/pizza_padrao.svg'" >
        <p class="detalhes">${element.nome}</p>
        <p class="detalhes">R$ ${element.valor.toFixed(2)}</p>
        <button id="buttonCompra">compra</button>
        `
        produtos.appendChild(div);
}
}

