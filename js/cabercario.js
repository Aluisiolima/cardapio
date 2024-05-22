
//home do cabecario
const home = document.getElementById('home');
//cardapio do cabecario
const cardapio = document.getElementById('cardapio');
//container home
const home_page = document.querySelector(".container_home");
//container cardapio
const cardapio_page = document.querySelector(".container_cardapio");

function homeAtive(){
    home_page.style.display = "flex";
    home.style.textDecoration = "underline";
    cardapio_page.style.display = "none";
    cardapio.style.textDecoration = "none";
}
function cardapioAtive(){
    home_page.style.display = "none";
    home.style.textDecoration = "none";
    cardapio.style.textDecoration = "underline";
    cardapio_page.style.display = "flex";
}