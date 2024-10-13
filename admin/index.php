<?php 
    include "../config.php";
    include  ROOT."/Database/database.php";

    $empresas = new Empresa($conexao);
    $list_empresas = $empresas->empresasCadastrada()
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>admin</title>
    <link rel="stylesheet" href="./src/css/reset.css">
    <link rel="stylesheet" href="./src/css/verificacao.css">
</head>
<body>
<?php
    
    include "./components/verificacao.php";
?>
</body>
</html>