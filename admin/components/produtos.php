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

                if($action == "add"){
                    echo geraFormProduct($conexao,null,$action);
                }else{
                    $id = $_POST['id'];
                    echo geraFormProduct($conexao,$id,$action);
                }
                
            }

        } else {
            echo "Erro: operação não especificada";
        }
    } 
    
    function  geraFormProduct($conexao,$id,$action){
        $result = $id ? Produtos::pegarUnicoProduto($conexao,$id) : null;
        
        if($result || $action == 'add'){
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
                                <select name='img' id='imagem' onchange='mostrarImagem(this)' readonly>
                                    <option value='{$result['img_produto']}' >{$result['img_produto']}</option>
                                    ". imgs() ."
                                </select>
                                <br>
                                <img id='imagemSelecionada' src='' alt='Imagem Selecionada' style='display:none; width: 100px; height: auto;'>
                    
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
                                <select name='img' id='imagem' onchange='mostrarImagem(this)' readonly>
                                    <option value='{$result['img_produto']}' >{$result['img_produto']}</option>
                                </select>
                                <br>
                                <img id='imagemSelecionada' src='' alt='Imagem Selecionada' style='display:none; width: 100px; height: auto;'>
                            </fieldset>
                            <input type='submit' value='deleta'>
                        </form>
    
                        <div id='mensagem'>
                    
                        </div>
                    </div>
                ";
            }elseif ($action == 'add') {
                return "<div class='form_op'>
                        <div class='btn_close'>
                            <button onclick='telaOpen()'>
                                <i class='bi bi-x-square'></i>
                            </button>
                        </div>
    
                        <form method='post' id='form' class='edita'>
                            <fieldset class='dados'>
                                <legend>dados entrega</legend>
                                <input name='operacao' value='add' hidden>
                                <input name='action' value='del' hidden>
                                <input name='nome_produto' type='text'  placeholder='nome' required>
                                <input name='valor' type='number'  placeholder='valor' required>
                                <input name='tipo' type='text'  placeholder='tipo' required>
                                <select name='img' id='imagem' onchange='mostrarImagem(this)'>
                                    ". imgs() ."
                                </select>
                                <br>
                                <img id='imagemSelecionada' src='' alt='Imagem Selecionada' style='display:none; width: 100px; height: auto;'>
                               
                            </fieldset>
                            <input type='submit' value='adicionar'>
                        </form>
    
                        <div id='mensagem'>
                    
                        </div>
                    </div>";
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
    function imgs() {
        $diretorio = ROOT . '/img/default/';
        $imagens = glob($diretorio . "*.{jpg,jpeg,png,gif,svg}", GLOB_BRACE);
        $opcoes = '';
    
        // Exibe cada imagem como uma opção no select
        foreach ($imagens as $imagem) {
            $caminhoRelativo = str_replace(ROOT . '/', '', $imagem);
            $opcoes .= "<option value='$caminhoRelativo'>$caminhoRelativo</option>";
        }
    
        return $opcoes;
    }
?>
