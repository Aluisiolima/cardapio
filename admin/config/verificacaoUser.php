<?php
    include '../../config.php';
    include  ROOT.'/Database/database.php';

    if (!$conexao) {
        exit();
    }

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $senha = $_POST['senha'];
        $codigo = $_POST['codigo'];
        $empressa= $_POST['empressa'];

        $resultado = Adm::verificaUser($conexao,$codigo,$senha,$empressa);

        if (!empty($resultado)){
            $_SESSION['date_user'] = $resultado;
            echo '<meta http-equiv="refresh" content="0;url=../pages/admin_tela.php">';
            exit(); 
        }
        echo "nao tem esse usuario";
        
    }
?>

    
