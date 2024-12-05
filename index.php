<?php 
    include('config.php'); 
    require (ROOT."/Database/database.php");
    
    $empressa = $_GET['cardapio'];
    $_SESSION['empresa'] = $empressa;
    $cardapio = new Empresa($conexao,$empressa);
    $dados_cardapio = $cardapio->SelecionarEmpresa();
    $dados_empressa = $dados_cardapio[0];
    $_SESSION['dados'] = $dados_empressa;

    $tipo1 = $dados_cardapio[1][0]['tipo'];
    $tipo2 =  $dados_cardapio[1][1]['tipo'];
    $tipo3 = $dados_cardapio[1][2]['tipo'];

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="cardapio,hamburgueria,lanche">
    <meta name="description" content="um cardapio de laches,lanche e delicias, alto longa,piaui">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $dados_empressa['nome_empressa']  ?></title>

    <!--CSSs-->
    <link rel="stylesheet" href="./src/css/reset.css">
    <link rel="stylesheet" href="./src/css/nav.css">
    <link rel="stylesheet" href="./src/css/stylesfooter.css">
    <link rel="stylesheet" href="./src/css/telaDeDetalhes.css">
    <link rel="stylesheet" href="./src/css/home.css">
    <link rel="stylesheet" href="./src/css/cardapio.css">
    <link rel="stylesheet" href="./src/css/carinho.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="./src/css/load.css">
    

</head>
<body>
<div class="container">
   <?php include "./components/nav.php"; ?>
   <div id="container_load">
        <div class="load"></div>
        <p>carregando...</p>
   </div>
   <div id="content-area" >
   
   </div>
   <div id="homeCont">
        <div class="container_home">
            <div class="produtos <?php echo $tipo1?>" onclick="cards('<?php echo $tipo1?>')"> <?php echo $tipo1?></div>
            <div class="produtos <?php echo $tipo2?>" onclick="cards('<?php echo $tipo2?> ')"><?php echo $tipo2?></div>
            <div class="produtos <?php echo $tipo3?>" onclick="cards('<?php echo $tipo3?>')"><?php echo $tipo3?></div>
        </div>
   </div>
   <?php include "./components/footer.php"; ?>
</div>

</body>
    <!--SCRIPTs-->
    <script src="./src/js/produtos.js" defer></script>
    <script src="./src/js/cabercario.js" defer></script>
    <script src="./src/js/carinho.js" defer></script>
    <!-- arquivo main.js e responsavel por quase tudo que ocorre no site -->
    <script src='./src/js/main.js' defer></script>
   
</html>