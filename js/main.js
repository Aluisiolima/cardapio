



/**
 * essa e funcao responsavel por te levar pra o carinho e carregar os script dele
 */
function carregaCarinho() {
    loadContent('carinho');
    
    setTimeout(()=>{
        var script = document.createElement('script');

        script.src = "./js/carinho.js";

        document.body.appendChild(script);

    },50);
}


function getDetalhes(id) {
    const resultDiv = document.getElementById('container_detalhes');
    const cardapio = document.getElementById('cardapio_page');
    const content_load = document.getElementById('container_load');
    cardapio.style.display = 'none';
    content_load.style.display = 'flex'

    const xhr = new XMLHttpRequest();
    xhr.open('POST', './components/detalheProduto.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) { 
            resultDiv.innerHTML = xhr.responseText;
            resultDiv.style.display = 'flex';
            content_load.style.display = 'none'
            
        } else {
            console.error('Request failed. Status:', xhr.status);
            document.getElementById('container_detalhes').innerHTML = 'Erro na solicitação.';
        }
    };
    xhr.onerror = function() {
        console.error('Request error.');
        document.getElementById('container_detalhes').innerHTML = 'Erro na solicitação.';
    };
    xhr.send('id=' + encodeURIComponent(id));
}


/**
 * esta funcao manda para o ./config/loadContent.php que ler o para content e retorna a pagina que vc que vc dever ser direcionado
 * @param {any} content este parametro e a pagina que vc quer e ir 
 */   
function loadContent(content) {
    const content_resposta = document.getElementById('content-area');
    const content_load = document.getElementById('container_load');
    
    content_load.style.display = 'flex';
    content_resposta.style.display = 'none';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', './config/loadContent.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            content_resposta.innerHTML = xhr.responseText;
            content_resposta.style.display = 'block';
            content_load.style.display = 'none';
        } else {
            content_resposta.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
            content_resposta.style.display = 'block';
            content_load.style.display = 'none';
        }
    };

    xhr.onerror = function () {
        content_resposta.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        content_resposta.style.display = 'block';
        content_load.style.display = 'none';
    };

    xhr.send('content=' + encodeURIComponent(content));
}

homeAtive();
