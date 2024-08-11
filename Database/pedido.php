
<?php
    include("../config.php");

    include(ROOT."/Database/database.php");

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
    function Data()
    {
        date_default_timezone_set('America/Sao_Paulo'); // Ajuste conforme sua região

        // Obtém a data e hora atual em formato separado
        $dia = date('d');     // Dia do mês
        $mes = date('m');     // Mês
        $ano = date('Y');     // Ano
        $hora = date('H');    // Hora
        $minuto = date('i');  // Minuto
        
        return "$dia/$mes/$ano $hora:$minuto";
    }
try {

    $listProduto = listProduto($produtos);
    $horario = Data();

    // Prepara a consulta SQL
    $sql = "INSERT INTO pedido (nome, valor, produtos, type_pagamento, bairro, rua, entrega, numero_casa, mesa, numero_mesa, data)
            VALUES (:nome, :valor, :produtos, :type_pagamento, :bairro, :rua, :entrega, :Ncasa, :mesa, :Nmesa, :data)";

    // Prepara a instrução
    $stmt = $conexao->prepare($sql);

    // Bind dos parâmetros
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':valor', $valor);
    $stmt->bindParam(':produtos', $listProduto);
    $stmt->bindParam(':type_pagamento', $type_pagamento);
    $stmt->bindParam(':bairro', $bairro);
    $stmt->bindParam(':rua', $rua);
    $stmt->bindParam(':entrega', $entrega);
    $stmt->bindParam(':Ncasa', $Ncasa);
    $stmt->bindParam(':mesa', $mesa);
    $stmt->bindParam(':Nmesa', $Nmesa);
    $stmt->bindParam(':data', $horario);


    // Executa a consulta
    $stmt->execute();
    
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}finally{
    // Fecha a conexão
    $conexao = null;
}

function educacao()
{
    date_default_timezone_set('America/Sao_Paulo');

    $hora = date('H');

    if ($hora >= 6 && $hora < 12) {
        return "bom dia";
    }else if ($hora >= 12 && $hora < 18) {
        return "boa tarde";
    }else if($hora >= 18 || $hora < 6){
        return "boa noite";
    }
 
}

    function listProduto($produtos)
    {
        $lista = "";
        $count = 0;
        $virgula = "";

        foreach($produtos as $p){
            if ($count > 0 && $count == 2) {
                $virgula = ', ';
                $count = 0;
            }else{
                $virgula = "";
                $count++;
            }
            $lista  .= " $p$virgula ";
            
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

   $menssagem = "ola ".educacao()."! meu nome e {$nome} e gostaria compra os produtos:".listProduto($produtos)." no valor de : {$valor} irei pagar em : {$type_pagamento}  ".localDePedido($mesa,$entrega,$Nmesa,$bairro, $rua,$Ncasa)."

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
   
    
