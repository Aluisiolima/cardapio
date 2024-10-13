<?php

    include (ROOT."/Database/Conexao.php");
    include (ROOT."/Database/Empresa.php"); 
    require_once(ROOT.'/Database/pedido.php');
    require_once(ROOT.'/Database/venda.php');
    
    $servername = 'localhost' ;
    $username = 'root';
    $password = '';
    $dbname = 'cardapio';
    $port = 3306;
    $charset = 'utf8mb4';


    $conn = new Conexão( $servername, $username, $password, $dbname , $port , $charset);
    $conexao = $conn->connect();
    session_start();
    
?>   