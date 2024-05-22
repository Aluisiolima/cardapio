//home do cabecario
const home =document.getElementById('home');
//cardapio do cabecario
const cardapio = document.getElementById('cardapio');
//container home
const home_page = document.querySelector(".container_home");



function homeAtiva(){
    let estaAtiva = home.getAttribute("ativo") === "true";
    
    if (estaAtiva){
        home.style.textDecoration = "underline";
    }else{
        cardapio.style.textDecoration = "underline";
      
    }
}

document.addEventListener("DOMContentLoaded", homeAtiva());


function cardapioAtivo(){
   let cardapioatv = cardapio.getAttribute("ativo")
   cardapioatv = "true";
   home_page.style.display = "none"
}