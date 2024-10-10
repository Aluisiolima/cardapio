<?php

    include (ROOT."/Database/Conexao.php");
    include (ROOT."/Class/Cardapio.php"); 
    require_once(ROOT.'/Database/pedido.php');
    require_once(ROOT.'/Database/venda.php');
    
    $servername = 'localhost' ;
    $username = 'root';
    $password = 'usbw';
    $dbname = 'cardapio';
    $port = 3307;
    $charset = 'utf8mb4';


    $conn = new Conexão( $servername, $username, $password, $dbname , $port , $charset);
    $conexao = $conn->connect();
    session_start();
    
?>   