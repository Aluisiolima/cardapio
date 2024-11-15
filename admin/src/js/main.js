

function verificarTamanhoTela() {
  const componente = document.querySelector('.componente');
  if (window.innerWidth > 768) {
    componente.style.display = 'block'; // Mostra o componente
  } else {
    componente.style.display = 'none'; // Oculta o componente
  }
}

function menu() {
  const menu = document.getElementById('menu');
  const display = menu.style.display;

  // Toggle the display property
  if (display === "none" || display === "") {
    menu.style.display = 'flex';
  } else {
    menu.style.display = 'none';
  }
}

function trocarCompainer(componente){
  const componentes = ['init','produtos','funcionario','vendas_historico'];
  const menu = document.getElementById('menu');
  for (let i = 0; i < componentes.length; i++) {
    const element = componentes[i];
    const container = document.getElementById(element);

    if(componente == element){
      container.style.display = 'flex';

    }else{
      container.style.display = 'none';
    
    }
  }
  menu.style.display = 'none';
}


async function pegarProdutoUnico(id,action) {
  const params = new URLSearchParams();
  params.append('operacao', 'pegar'); 
  params.append('id',id); 
  params.append('action',action); 

  await fetch('../components/produtos.php', {
      method: 'POST',
      body: params,
  })
  .then(response => response.text())
  .then(data => {
      document.getElementById('operacoes').innerHTML = data;
  })
  .catch(error => console.error('Error:', error));
}

async function edit(id) {
  await pegarProdutoUnico(id,'edit');
  operacao();
  telaOpen();
  const select = document.getElementById('imagem');
  mostrarImagem(select)
}

async function del(id){
  await pegarProdutoUnico(id,'del');
  operacao();
  telaOpen();
  const select = document.getElementById('imagem');
  mostrarImagem(select)
}

async function ativa(id){
  await pegarProdutoUnico(id,'ativa');
  telaOpen();
  setTimeout(telaOpen, 1000)
}

function operacao() {
  const form = document.getElementById('form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(this);

    fetch('../components/produtos.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('mensagem').innerText = data;
        setTimeout(telaOpen, 1000);
    })
    .catch(error => console.error('Erro:', error));
  });

 

}

function telaOpen() {
  const tel = document.getElementById('operacoes');

  if(tel.style.display == 'none' || tel.style.display == ''){
    tel.style.display = 'flex';
  }else{
    tel.style.display = 'none';
  }
}



async function addProduct() {
  await pegarProdutoUnico(null,'add');

  telaOpen();
  operacao();
  const select = document.getElementById('imagem');
  mostrarImagem(select)
}

function mostrarImagem(select) {
    var caminhoImagem = select.value;
    var imgElement = document.getElementById('imagemSelecionada');

    if (caminhoImagem) {
        imgElement.src = `../../${caminhoImagem}`; // Define o src da imagem
        imgElement.style.display = 'block'; // Torna a imagem visível
    } else {
        imgElement.style.display = 'none'; // Esconde a imagem se não houver seleção
    }
}

document.addEventListener('DOMContentLoaded',trocarCompainer('init'));
