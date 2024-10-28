
/**
 * essa e funcao responsavel por te levar pra o carinho e carregar os script dele
 */
function carregaCarinho() {
    loadContent('carinho');
    
    setTimeout(()=>{
        const script = document.createElement('script');

        script.src = "./src/js/carinho.js";

        document.body.appendChild(script);
        
    },100);
}

async function getDetalhes(id) {
    const detalhes = document.getElementById('container_detalhes');
    const content_load = document.getElementById('container_load');
    content_load.style.display = 'flex';

    try {
        const response = await fetch('./components/detalheProduto.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ id: id }), // Usando URLSearchParams para codificar os dados
        });

        if (response.ok) { // Verifica se a resposta é 2xx
            const responseData = await response.text(); // Lê a resposta como texto
            detalhes.innerHTML = responseData;
            detalhes.style.display = 'flex';
            content_load.style.display = 'none';
            document.body.style.overflow = 'hidden';
        } else {
            console.error('Request failed. Status:', response.status);
            detalhes.innerHTML = 'Erro na solicitação.';
        }
    } catch (error) {
        console.error('Request error:', error);
        detalhes.innerHTML = 'Erro na solicitação.';
    }
}


function fechaDetalhes(){
    const detalhes = document.getElementById('container_detalhes');
    detalhes.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function addCarinho(){
    //alteracoes de tela [ animacoes ]
    const tela_detalhes = document.getElementById('container_detalhes');
    const detalhes = document.getElementById('tela_detalhe');
    detalhes.classList.add("animate");
    detalhes.addEventListener("animationend", ()=>{
        detalhes.classList.remove("animate");
        detalhes.style.display = "none";
        tela_detalhes.style.display = "none";
        document.body.style.overflow = 'auto';
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
    
}

/**
 * esta funcao manda para o ./config/loadContent.php que ler o para content e retorna a pagina que vc que vc dever ser direcionado
 * @param {any} content este parametro e a pagina que vc quer e ir 
 */   
async function loadContent(content) {
    const content_resposta = document.getElementById('content-area');
    const content_load = document.getElementById('container_load');

    content_load.style.display = 'flex';
    content_resposta.style.display = 'none';

    try {
        const response = await fetch('./config/loadContent.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'content=' + encodeURIComponent(content)
        });

        if (response.ok) {
            const data = await response.text();
            content_resposta.innerHTML = data;
        } else {
            content_resposta.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        }
    } catch (error) {
        content_resposta.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
    } finally {
        content_resposta.style.display = 'block';
        content_load.style.display = 'none';
    }
}

async function cards(tipo) {
    await cardapioAtive();
    window.location.href = `#${tipo}`; 
}

setInterval(updateCarrinho, 1000);
homeAtive();