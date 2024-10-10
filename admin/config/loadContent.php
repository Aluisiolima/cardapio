<?php

if (isset($_POST['content'])) {
    $content = $_POST['content'];

    if ($content === 'navAdmin') {
        include("./components/navAdmin.php"); 
    } else {
        echo '<p>Conteúdo não encontrado.</p>';
    }
}else {
    echo "<p>Deu algum erro da requisicao do componente</p>";
}
?>