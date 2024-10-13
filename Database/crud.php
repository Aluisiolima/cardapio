<?php
    include("../config.php");
    require_once(ROOT.'/Database/database.php');


    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $nome = htmlspecialchars($_POST["nome"]);
        $type_pagamento = htmlspecialchars($_POST["type_pagamento"]);
        $entrega =  isset($_POST["entrega"]) ? htmlspecialchars($_POST["entrega"])  : null;
        $bairro = isset($_POST["bairro"]) ? htmlspecialchars($_POST["bairro"]) : null;
        $rua = isset($_POST["rua"]) ? htmlspecialchars($_POST["rua"]) : null;
        $Ncasa =  isset($_POST["Ncasa"]) ? htmlspecialchars($_POST["Ncasa"]) : null;
        $mesa =  isset($_POST["mesa"]) ? htmlspecialchars($_POST["mesa"])  : null;
        $Nmesa = isset($_POST["Nmesa"]) ? htmlspecialchars($_POST["Nmesa"] ) : null;
        $produtos = explode(",", htmlspecialchars($_POST["produtos"]));
        $ids = json_decode($_POST["ids"], true);
        $valor = htmlspecialchars($_POST["valor"]);
        
    }

    $pedido = new Pedido($conexao,$nome,$type_pagamento,$entrega,$bairro,$rua,$Ncasa,$mesa,$Nmesa);
    $venda = new Venda($conexao,$ids,$pedido->InsertPedido(),$_SESSION['empresa']);

    if($venda->InsertVenda()){
        include(ROOT."/Database/Whatsapp.php");
        session_unset();
        session_destroy();
    }else{
        echo '<h1>ERRO CONTATE O SURPOTE</h1>';
    }
    
?>