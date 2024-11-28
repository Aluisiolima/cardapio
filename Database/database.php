<?php
    session_start();
    include (ROOT."/Database/Conexao.php");
    include (ROOT."/Database/Empresa.php"); 
    require_once(ROOT.'/Database/pedido.php');
    require_once(ROOT.'/Database/venda.php');
    require_once(ROOT.'/Database/produtos.php');
    require_once(ROOT.'/Database/Adm.php');

    $conn = new Conexão();
    $conexao = $conn->connect();
    

    
    
?>   