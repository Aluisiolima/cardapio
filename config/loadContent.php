<?php
include('../config.php');
if (isset($_POST['content'])) {
    $content = $_POST['content'];

    if ($content == 'cardapio') {
        include(ROOT."/components/cardapio.php");
    } elseif ($content == 'carinho') {
        include(ROOT."/components/carinho.php");
    } else {
        echo '<p>Conteúdo não encontrado.</p>';
    }
} else {
    echo '<p>Parâmetro não especificado.</p>';
}
?>