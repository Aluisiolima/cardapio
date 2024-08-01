<?php
    $nome = "";
    $bairro = "";
    $rua = "";
    $Ncasa = "";
    $type_pagamento = "";
    $mesa = "";
    $Nmesa = "";
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $nome = htmlspecialchars($_POST["nome"]);
        $bairro = htmlspecialchars($_POST["bairro"] ?? "") ;
        $rua = htmlspecialchars($_POST["rua"] ?? "") ;
        $Ncasa = htmlspecialchars($_POST["Ncasa"] ?? "") ;
        $type_pagamento = htmlspecialchars($_POST["type_pagamento"]);
        $mesa = htmlspecialchars($_POST["mesa"] ?? "") ;
        $Nmesa = htmlspecialchars($_POST["Nmesa"] ?? "") ;

        echo "$nome $bairro $rua $Ncasa $type_pagamento $mesa $Nmesa ";
    }
?>