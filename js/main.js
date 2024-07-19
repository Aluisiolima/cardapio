

function carregaCardapio(){

    loadContent('cardapio');
    
    setTimeout(()=>{
        cardPizzas();
        cardBebidas();
        cardHamburgues();
    },50);

}

function carregaCarinho() {
    loadContent('carinho');
    
    setTimeout(()=>{
        var script = document.createElement('script');

        script.src = "./js/carinho.js";

        document.body.appendChild(script);

    },50);
}
    


