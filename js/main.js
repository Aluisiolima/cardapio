



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
