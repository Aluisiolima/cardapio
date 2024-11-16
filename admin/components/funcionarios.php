<?php
    $id_empressa = $_SESSION['date_user']['id_empressa'];
    $dados_adm = Adm::pegaAdm($conexao,$id_empressa);
    foreach($dados_adm as $adm)
    {
        echo "
            <div class='card_funcionario'>
                <h3>{$adm['nome']}</h3> 
                <h3>{$adm['cargo']} </h3>
            </div>
            
        ";
    }
    echo "
        <div class='form_funcionario' id='formFuncionario'>
            <form method='post' action='../config/addUser.php'>
                <input type='text' name='nome' placeholder='nome funcionario' required> 
                <input type='text'  name='codigo' placeholder='codigo dele' required> 
                <input type='text'  name='senha' placeholder='senha' required> 
                <input type='text'  name='cargo' placeholder='cargo' required> 
                <input type='text' name='empresa' value='{$id_empressa}' hidden> 
                <input type='submit'>
            </form>
        </div>
        <div class='btn_op_funcionario'>
            <button onclick='openForm()'>+</button>
        </div>
    ";
?>
