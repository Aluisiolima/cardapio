<?php 
    include "../../config.php";
    include ROOT.'/Database/database.php';
    
    if (empty($_SESSION['date_user'])) {
        header("Location: ../index.php");
        exit();
    }
    
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>admin</title>
    <link rel="stylesheet" href="../src/css/reset.css">
    <link rel="stylesheet" href="../src/css/navAdmin.css">
    <link rel="stylesheet" href="../src/css/init.css">
    <link rel="stylesheet" href="../src/css/produtos.css">
    <link rel="stylesheet" href="../src/css/vendas.css">
    <link rel="stylesheet" href="../src/css/funcionario.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

</head>
<body>
    
    <nav id="navid">
        <?php include('../components/navAdmin.php') ?>
    </nav>

    <div class="menu" id="menu">
        <?php include('../components/menu.php') ?>
    </div>

    <div id="init" id="init" >
        <?php include('../components/init.php') ?>
    </div>

    <div class="produtos" id="produtos" style="display:none;">
        <?php 
            include('../components/tela_produtos.php');
            produtos($conexao);
        ?>
    </div>

    <div class="funcionario" id="funcionario" style="display:none;">
        <?php include('../components/funcionarios.php') ?> 
    </div>

    <div class="vendas_historico" id="vendas_historico" style="display:none;">
        <?php include('../components/vendas-historico.php') ?> 
    </div>

</body>

<script src="../src/js/pages.js" defer></script>
<script src="../src/js/main.js" defer></script>
</html>