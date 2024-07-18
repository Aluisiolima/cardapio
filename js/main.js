

function carregaCardapio(){

    loadContent('./components/cardapio.php');
    
    setTimeout(()=>{
        cardPizzas();
        cardBebidas();
        cardHamburgues();
    },50);

}

function carregaCarinho() {
    loadContent('./components/carinho.php');
    setTimeout(()=>{
        mudarValorDaVariavel();
    },200);
}
    


