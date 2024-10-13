
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
