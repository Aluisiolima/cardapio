<?php

    function educacao()
    {
        date_default_timezone_set('America/Sao_Paulo');

        $hora = date('H');

        if ($hora >= 6 && $hora < 12) {
            return "bom dia 😃";
        }else if ($hora >= 12 && $hora < 18) {
            return "boa tarde 👍";
        }else if($hora >= 18 || $hora < 6){
            return "boa noite 🌙";
        }
    
    }

    function listProduto($produtos)
    {
        $frase = '';
        foreach ($produtos as $p)
        {
            $frase .= "{$p['quantidade']}  {$p['nome']}  {$p['valor']}, ";
        }
         
        return $frase;
    }

    function localDePedido($mesa,$entrega,$Nmesa,$bairro, $rua,$Ncasa)
    {
        if($mesa != null and $entrega == null){
            return "desejo receber o pedido em minha mesa de numero : {$Nmesa} ";
        }if ($mesa == null and $entrega != null) 
        {
            return "desejo receber o pedido em minha casa de endereço ::  bairro: {$bairro}  rua: {$rua}  numero da casa: {$Ncasa}";
        }
        
    }

   $mensagem = "ola ".educacao()."! meu nome e {$nome} e gostaria compra os produtos:  ".listProduto($produtos). " no valor total de : R$-{$valor} irei pagar em : {$type_pagamento} 💳 ".localDePedido($mesa,$entrega,$Nmesa,$bairro, $rua,$Ncasa)."";

   $NumeroCll =  $_SESSION['dados']['whatsapp'];
   
   $whatsapp = "https://api.whatsapp.com/send/?phone={$NumeroCll}&text=" . $mensagem;
   $tempo_aguardar = 1;
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="<?php echo $tempo_aguardar; ?>;url=<?php echo $whatsapp; ?>">
    <title>pedido finalizado</title>
    <link rel="stylesheet" href="../src/css/final.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body>
    
    <div class="ok">
        <i class="bi bi-check2-circle"></i>
        <P>aguarde mais so mais um pouquinho</P>
    </div>
   
</body>
<Script>
    function compraDenovo(){
        window.location.href = "../index.php"
    }
</Script>
</html>
?>