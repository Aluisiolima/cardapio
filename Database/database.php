<?php

    include (ROOT."/Database/Conexao.php");

    $servername = 'roundhouse.proxy.rlwy.net' ;
    $username = 'root';
    $password = 'zKDMtRKZOsnoOrTHnqCVCbczOqOkhWMj';
    $dbname = 'railway';
    $port = 19884;
    $charset = 'utf8mb4';


    $conn = new Conexão( $servername, $username, $password, $dbname , $port , $charset);
    $conexao = $conn->connect();
?>   