<?php
    include '../../config.php';
    include  ROOT.'/Database/database.php';

    if (!$conexao) {
        echo '<h1>CONTATE O SUPORTE POIS NAO TEM CONEXÃO!!</h1>';
        exit();
    }

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $senha = $_POST['senha'];
        $codigo = $_POST['codigo'];
        $empressa= $_POST['empressa'];

        $resultado = Adm::verificaUser($conexao,$codigo,$senha,$empressa);

        if (!empty($resultado)){
            session_start();
            $_SESSION['date_user'] = $resultado;
            header("Location: ../pages/admin_tela.php");
            exit(); 
        }
        echo "nao tem esse usuario";
        
    }
?>

    
