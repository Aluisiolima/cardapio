<?php 
    include('config.php'); 
    require (ROOT."/Database/database.php");
    
    $empressa = $_GET['cardapio'];
    $_SESSION['empresa'] = $empressa;
    $cardapio = new Cardapio($conexao,$empressa);
    $dados_cardapio = $cardapio->SelecionarEmpresa();
    $dados_empressa = $dados_cardapio[0];
    $_SESSION['dados'] = $dados_empressa;
   
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
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/nav.css">
    <link rel="stylesheet" href="./css/stylesfooter.css">
    <link rel="stylesheet" href="./css/telaDeDetalhes.css">
    <link rel="stylesheet" href="./css/home.css">
    <link rel="stylesheet" href="./css/cardapio.css">
    <link rel="stylesheet" href="./css/carinho.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="./css/load.css">
    

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
            <div class="produtos pizzas">pizzas</div>
            <div class="produtos hamburguer">hamburguer</div>
            <div class="produtos bebidas">bebidas</div>
        </div>
   </div>
   <?php include "./components/footer.php"; ?>
</div>

</body>
    <!--SCRIPTs-->
    <script src="./js/produtos.js" ></script>
    <script src="./js/cabercario.js" ></script>
    <script src="./js/carinho.js" ></script>
    <!-- arquivo main.js e responsavel por quase tudo que ocorre no site -->
    <script src='./js/main.js' ></script>
   
</html>