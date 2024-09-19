<?php
include('../config.php');
if (isset($_POST['content'])) {
    $content = $_POST['content'];

    if ($content === 'home') {
        include(ROOT."/components/home.php"); 
    } elseif ($content == 'cardapio') {
        include(ROOT."/components/cardapio.php"); 
    } elseif ($content == 'detalhes') {
        include(ROOT."/components/detalheProduto.php"); 
    } elseif ($content == 'carinho') {
        include(ROOT."/components/carinho.php"); 
    } else {
        echo '<p>Conteúdo não encontrado.</p>';
    }
} else {
    echo '<p>Parâmetro não especificado.</p>';
}
?>