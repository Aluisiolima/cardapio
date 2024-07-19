<?php
if (isset($_POST['content'])) {
    $content = $_POST['content'];

    if ($content === 'home') {
        include "../components/home.php"; 
    } elseif ($content == 'cardapio') {
        include "../components/cardapio.php"; 
    } elseif ($content == 'detalhes') {
        include "../components/detalheProduto.php"; 
    } elseif ($content == 'carinho') {
        include "../components/carinho.php"; 
    } else {
        echo '<p>Conteúdo não encontrado.</p>';
    }
} else {
    echo '<p>Parâmetro não especificado.</p>';
}
