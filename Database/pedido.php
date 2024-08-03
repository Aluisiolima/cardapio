
<?php
error_reporting(0);

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $nome = htmlspecialchars($_POST["nome"]);
        $valor = htmlspecialchars($_POST["valor"]);
        $produtos = explode(",", htmlspecialchars($_POST["produtos"]));
        $type_pagamento = htmlspecialchars($_POST["type_pagamento"]);
        $bairro = isset($_POST["bairro"]) ? htmlspecialchars($_POST["bairro"]) : null;
        $rua = isset($_POST["rua"]) ? htmlspecialchars($_POST["rua"]) : null;
        $entrega =  isset($_POST["entrega"]) ? htmlspecialchars($_POST["entrega"])  : null;
        $Ncasa =  isset($_POST["Ncasa"]) ? htmlspecialchars($_POST["Ncasa"]) : null;
        $mesa =  isset($_POST["mesa"]) ? htmlspecialchars($_POST["mesa"])  : null;
        $Nmesa = isset($_POST["Nmesa"]) ? htmlspecialchars($_POST["Nmesa"] ) : null;
        

    }
    function listProduto($produtos)
    {
        $lista = "";
        foreach($produtos as $p){
            $lista  .= " $p ";
        }
        return $lista;
    }
    function localDePedido($mesa,$entrega,$Nmesa,$bairro, $rua,$Ncasa)
    {
        if($mesa != null and $entrega == null){
            return "desejo receber o pedido em minha mesa de numero : {$Nmesa}";
        }if ($mesa == null and $entrega != null) 
        {
            return "desejo receber o pedido em minha casa de endereço: bairro: {$bairro} rua: {$rua} numero da casa: {$Ncasa}";
        }
        
    }

   $menssagem = "ola boa noite! meu nome e {$nome} e gostaria compra os produtos:".listProduto($produtos)." no valor de : {$valor} irei pagar em : {$type_pagamento}  ".localDePedido($mesa,$entrega,$Nmesa,$bairro, $rua,$Ncasa)."

   ";
   $NumeroCll = "5586981132378";
    $texto = urldecode($menssagem);
   $whatsapp = "https://wa.me/{$NumeroCll}?text={$texto}";
   $tempo_aguardar = 2;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="<?php echo $tempo_aguardar; ?>;url=<?php echo $whatsapp; ?>">
    <title>pedido finalizado</title>
    <link rel="stylesheet" href="../css/final.css">
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
   
    
