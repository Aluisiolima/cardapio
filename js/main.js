//home do cabecario
const home =document.getElementById('home');
//cardapio do cabecario
const cardapio = document.getElementById('cardapio');
//container home
const home_page = document.querySelector(".container_home");



function homeAtiva(){
    let homeAtv = home.getAttribute("ativo") === "true";
    
    if (homeAtv){
        home.style.textDecoration = "underline";
        home_page.style.display = "flex"
    }else{
        cardapio.style.textDecoration = "underline";
      
    }
}

document.addEventListener("DOMContentLoaded", homeAtiva());


function cardapioAtivo(){
   let cardapioAtv = cardapio.getAttribute("ativo")
   cardapioAtv = "true";
   home_page.style.display = "none"
}