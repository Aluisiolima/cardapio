<?php
    include "../../config.php";
    require "../../Database/database.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        if (isset($_POST['operacao'])) {
        
            if ($_POST['operacao'] == 'edit') {
                $id = $_POST['id'];
                $nome = $_POST['nome_produto'];
                $valor = $_POST['valor'];
                $img = $_POST['img'];
                $tipo = $_POST['tipo'];

                echo edit_product($conexao,$id,$nome,$tipo,$valor,$img);

            }elseif ($_POST['operacao'] == 'del'){
                $id = $_POST['id'];
                echo excluir_product($conexao,$id);

            }elseif ($_POST['operacao'] == 'add'){
                $nome = $_POST['nome_produto'];
                $valor = $_POST['valor'];
                $img = $_POST['img'];
                $tipo = $_POST['tipo'];

                echo add_product($conexao,$nome,$tipo,$valor,$img);
            }else{
                $action = $_POST['action'];
                $id = $_POST['id'];

                echo geraFormProduct($conexao,$id,$action);
            }

        } else {
            echo "Erro: operação não especificada";
        }
    } 
    
    function  geraFormProduct($conexao,$id,$action){
        $result = Produtos::pegarUnicoProduto($conexao,$id);
        
        if($result > 0){
            if ($action == 'edit') {
                return "
                    <div class='form_op'>
                        <div class='btn_close'>
                            <button onclick='telaOpen()'>
                                <i class='bi bi-x-square'></i>
                            </button>
                        </div>
    
                        <form method='post' id='form' class='edita'>
                            <fieldset class='dados'>
                                <legend>dados entrega</legend>
                                <input name='operacao' value='edit' hidden>
                                <input name='id' value='{$result['id_produto']}' hidden>
                                <input name='action' value='edit' hidden>
                                <input name='nome_produto' value='{$result['nome_produto']}' >
                                <input name='valor' value='{$result['valor']}' >
                                <input name='tipo' value='{$result['tipo']}' >
                                <input name='img' value='{$result['img_produto']}'>
                    
                            </fieldset>
                            <input type='submit' value='enviar'>
                        </form>
                        <div id='mensagem'>
                    
                        </div>
                    </div>
                ";
            }elseif ($action == 'del'){
                return "
                    <div class='form_op'>
                        <div class='btn_close'>
                            <button onclick='telaOpen()'>
                                <i class='bi bi-x-square'></i>
                            </button>
                        </div>
    
                        <form method='post' id='form' class='delete'>
                            <fieldset class='dados'>
                                <legend>dados entrega</legend>
                                <input name='operacao' value='del' hidden>
                                <input name='id' value='{$result['id_produto']}' hidden>
                                <input name='action' value='del' hidden>
                                <input name='nome_produto' value='{$result['nome_produto']}' readonly>
                                <input name='valor' value='{$result['valor']}' readonly>
                                <input name='tipo' value='{$result['tipo']}' readonly>
                                <input name='img' value='{$result['img_produto']}' readonly>
    
                            </fieldset>
                            <input type='submit' value='deleta'>
                        </form>
    
                        <div id='mensagem'>
                    
                        </div>
                    </div>
                ";
            }
        }else{
            return '<h1>este produto nao existe!!</h1>';
        }

    }
    function edit_product($conexao,$id,$nome,$tipo,$valor,$img)
    {
        try{
            if(Produtos::pegarUnicoProduto($conexao,$id) > 0){
                return Produtos::editProdutos($conexao,$id,$nome,$valor,$tipo,$img);
            }

        }catch (PDOException $e){
            echo $e."error";
        }
        
    }
    function excluir_product($conexao,$id)
    {
        try{
            if(Produtos::pegarUnicoProduto($conexao,$id)['status'] == 'ativo'){
                return Produtos::desativaProduto($conexao,$id);
            }else{
                return 'este produto ja esta desativado!!!';
            }

        }catch (PDOException $e){
            echo $e."error";
        }
        
    }
    function add_product($conexao,$nome,$tipo,$valor,$img)
    {

        try{
            $id_empressa = $_SESSION['date_user']['id_empressa'];

            
            return Produtos::addProduto($conexao,$id_empressa,$nome,$tipo,$valor,$img);
            

        }catch (PDOException $e){
            echo $e."error";
        }
        
    }
?>
