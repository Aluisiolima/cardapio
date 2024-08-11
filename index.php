<?php 
    include('config.php'); 
    include (ROOT."/Database/database.php"); 
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $conn ?></title>

    <!--CSSs-->
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/nav.css">
    <link rel="stylesheet" href="./css/stylesfooter.css">
    <link rel="stylesheet" href="./css/telaDeDetalhes.css">
    <link rel="stylesheet" href="./css/home.css">
    <link rel="stylesheet" href="./css/cardapio.css">
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
   <?php include "./components/footer.php"; ?>
</div>

</body>
    <!--SCRIPTs-->
    <script src="./js/produtos.js" defer></script>
    <script src="./js/cabercario.js" defer></script>
    <script src="./js/carinho.js" defer></script>
    <!-- arquivo main.js e responsavel por quase tudo que ocorre no site -->
    <script src='./js/main.js' defer></script>
   
</html>