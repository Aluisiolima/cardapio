<?php

    include (ROOT."/Database/Conexao.php");

    $servername = 'localhost' ;
    $username = 'root';
    $password = '';
    $dbname = 'cardapio';
    $port = 3306;
    $charset = 'utf8mb4';


    $conn = new Conexão( $servername, $username, $password, $dbname , $port , $charset);
    $conexao = $conn->connect();
?>   