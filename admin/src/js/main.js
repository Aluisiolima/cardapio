function loadContent(content,area) {
    const content_resposta = area;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../config/loadContent.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            content_resposta.innerHTML = xhr.responseText;
            
        } else {
            content_resposta.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
            
        }
    };

    xhr.onerror = function () {
        content_resposta.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        
    };

    xhr.send('content=' + encodeURIComponent(content));
}


for (let page in pages){
    loadContent(page, pages[page]);
}

const componente = document.querySelector('.componente');

function verificarTamanhoTela() {
  if (window.innerWidth > 768) {
    componente.style.display = 'block'; // Mostra o componente
  } else {
    componente.style.display = 'none'; // Oculta o componente
  }
}

// // Executa a função ao carregar a página
// verificarTamanhoTela();

// // Adiciona um listener para redimensionamento da tela
// window.addEventListener('resize', verificarTamanhoTela);
