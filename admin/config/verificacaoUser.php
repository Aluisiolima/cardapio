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

        $sql = "SELECT * from user_adm WHERE codigo = :codigo AND senha = :senha AND id_empressa = :id_empressa";

        $stmt = $conexao->prepare($sql);

     
        $stmt->bindValue(':codigo', $codigo);
        $stmt->bindValue(':senha', $senha);
        $stmt->bindValue(':id_empressa', $empressa);
       
        $stmt->execute();

        if(!$stmt->fetchAll() == 0){
            header("Location: ../pages/admin_tela.php");

            exit(); 
        }
        echo "nao tem esse usuario";
        
    }
?>

    
