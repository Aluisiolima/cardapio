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

        $sql = "SELECT e.nome_empressa, e.logo_img, u.id_adm, u.nome, u.cargo, u.codigo, u.senha, u.id_empressa 
                FROM user_adm u
                JOIN empressa e ON e.id_empressa = u.id_empressa
                WHERE u.codigo = :codigo AND u.senha = :senha AND u.id_empressa = :id_empressa";

        $stmt = $conexao->prepare($sql);

     
        $stmt->bindValue(':codigo', $codigo);
        $stmt->bindValue(':senha', $senha);
        $stmt->bindValue(':id_empressa', $empressa);
       
        $stmt->execute();

        $resultado = $stmt->fetch();

        if (!empty($resultado)){
            session_start();
            $_SESSION['date_user'] = $resultado;
            header("Location: ../pages/admin_tela.php");
            exit(); 
        }
        echo "nao tem esse usuario";
        
    }
?>

    
