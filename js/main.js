

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
    
function loadContent(content) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './config/loadContent.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            document.getElementById('content-area').innerHTML = xhr.responseText;
        } else {
            document.getElementById('content-area').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        }
    };

    xhr.onerror = function () {
        document.getElementById('content-area').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
    };

    xhr.send('content=' + encodeURIComponent(content));
}

homeAtive();