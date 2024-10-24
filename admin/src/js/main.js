

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
  for (let i = 0; i < componentes.length; i++) {
    const element = componentes[i];
    const container = document.getElementById(element);

    if(componente == element){
      container.style.display = 'flex';

    }else{
      container.style.display = 'none';
    
    }
  }
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
}

async function del(id){
  await pegarProdutoUnico(id,'del');
  operacao();
  telaOpen();
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

trocarCompainer('produtos');

