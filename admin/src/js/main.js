
const componente = document.querySelector('.componente');

function verificarTamanhoTela() {
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

trocarCompainer('produtos');
// // Executa a função ao carregar a página
// verificarTamanhoTela();

// // Adiciona um listener para redimensionamento da tela
// window.addEventListener('resize', verificarTamanhoTela);
