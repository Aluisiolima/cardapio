
//home do cabecario
const home = document.getElementById('home');
//cardapio do cabecario
const cardapio = document.getElementById('cardapio');
//container home
const home_page = document.querySelector(".container_home");
//container cardapio
const cardapio_page = document.querySelector(".container_cardapio");

function homeAtive(){
    window.location.href = "/home.html"
    home.style.textDecoration = "underline";

}
function cardapioAtive(){
    window.location.href = "/cardapio.html"
    cardapio.style.textDecoration = "underline";
}