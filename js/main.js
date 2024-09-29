
/**
 * essa e funcao responsavel por te levar pra o carinho e carregar os script dele
 */
function carregaCarinho() {
    loadContent('carinho');
    
    setTimeout(()=>{
        const script = document.createElement('script');

        script.src = "./js/carinho.js";

        document.body.appendChild(script);
        
    },100);
}


function getDetalhes(id) {
    const detalhes = document.getElementById('container_detalhes');
    const content_load = document.getElementById('container_load');
    content_load.style.display = 'flex'

    const xhr = new XMLHttpRequest();
    xhr.open('POST', './components/detalheProduto.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) { 
            detalhes.innerHTML = xhr.responseText;
            detalhes.style.display = 'flex';
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

function fechaDetalhes(){
    const detalhes = document.getElementById('container_detalhes');
    detalhes.style.display = 'none';
}

function addCarinho(){
    //alteracoes de tela [ animacoes ]
    const detalhes = document.getElementById('tela_detalhe');
    detalhes.classList.add("animate");
    detalhes.addEventListener("animationend", ()=>{
        detalhes.classList.remove("animate");
        detalhes.style.display = "none";
    })

    const id = document.getElementById("imgProduct").alt;
    const nomeProduto = document.getElementById("nameProduct").textContent;
    const quantidade = document.getElementById("quantidade").textContent;
    const imgProduto = document.getElementById("imgProduct").src;
    const valorProduto = document.getElementById("value").textContent;

    // logica de implementa o produto no carrinho
    const listProduto = [String(quantidade),String(nomeProduto),String(valorProduto),String(imgProduto)]
    produtos_escolhidos.push(listProduto);
    const dir = {id : id, quantidade : quantidade};
    ids.push(dir);
    console.log(ids);
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

    const xhr = new XMLHttpRequest();
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