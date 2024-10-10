<?php

if (isset($_POST['content'])) {
    $content = $_POST['content'];

    if ($content === 'nav') {
        include("./components/nav.php"); 
    } else {
        echo '<p>Conteúdo não encontrado.</p>';
    }
} 
?>