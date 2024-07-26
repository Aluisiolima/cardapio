
//botao que leva ao cardapio
const home = document.getElementById('home');
//botao que leva ao cardapio
const cardapio = document.getElementById('cardapio');

/**
 * essa funcao e responsavel por leva para a home da pagina 
 * ela nao receber parametros mais receber duas variaveis que estam sendo declaradas no cabercario.js 
 * {'home' , 'cardapio'}
 */
function homeAtive(){
    loadContent('home');
    home.style.textDecoration = "underline";
    cardapio.style.textDecoration = "none";

}
/**
 * essa funcao e responsavel por leva para o cardapio 
 * ela nao receber parametros mais receber duas variaveis que estam sendo declaradas no cabercario.js 
 * {'cardapio' , 'home'}
 */
function cardapioAtive(){
    loadContent('cardapio');
    cardapio.style.textDecoration = "underline";
    home.style.textDecoration = "none";
}