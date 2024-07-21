
//home do cabecario
const home = document.getElementById('home');
//cardapio do cabecario
const cardapio = document.getElementById('cardapio');
//container home
const home_page = document.querySelector(".container_home");
//container cardapio
const cardapio_page = document.querySelector(".container_cardapio");

function homeAtive(){
    loadContent('home');
    home.style.textDecoration = "underline";
    cardapio.style.textDecoration = "none";

}
function cardapioAtive(){
    carregaCardapio();
    cardapio.style.textDecoration = "underline";
    home.style.textDecoration = "none";
}