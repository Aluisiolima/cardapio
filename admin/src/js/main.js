
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


// // Executa a função ao carregar a página
// verificarTamanhoTela();

// // Adiciona um listener para redimensionamento da tela
// window.addEventListener('resize', verificarTamanhoTela);
