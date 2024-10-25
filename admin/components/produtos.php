<?php 
   

    function pegaImgs($tipo)
    {
        $imgPadrao ="../../img/{$tipo}_padrao.svg";
        $pizzaPadrao ="../../img/Pizza_padrao.svg";
        if(file_exists($imgPadrao)){
            return "src='$imgPadrao'";
            
        }
        return "src='$pizzaPadrao'";
    }

    function produtos($conexao)
    {

        $produtos = new Produtos($conexao,$_SESSION['date_user']['id_empressa']);
        foreach ($produtos->pegaProdutos() as $produto) {
            
            echo "  <div class='container'>
                        <img src='".ROOT."/".$produto['img_produto']."' onerror=".pegaImgs($produto['tipo']).">
                        <div class='infs_produto'>
                            <div class='detalhes'>
                                <div class='inf'>
                                    <p>{$produto['nome_produto']}</p>
                                    <p class='type'> {$produto['tipo']}</p>
                                </div>
                                <p>R$ {$produto['valor']}</p>
                            </div> 
                            <div class='btn_produto'>
                                <button onclick='edit({$produto['id_produto']})' class='btn edita'><i class='bi bi-pencil-square'></i></button>
                                <button onclick='del({$produto['id_produto']})' class='btn delete'><i class='bi bi-x-square'></i></button>
                            </div>  
                        </div>
                        
                    </div>";
        }
                echo "<div id='operacoes' ></div>";
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        include "../../config.php";
        require "../../Database/database.php";
        if (isset($_POST['operacao'])) {
            $id = $_POST['id'];
            $action = $_POST['action'];
        
            if ($_POST['operacao'] == 'edit') {
                $nome = $_POST['nome_produto'];
                $valor = $_POST['valor'];
                $img = $_POST['img'];
                $tipo = $_POST['tipo'];

                echo edit_product($conexao,$id,$nome,$tipo,$valor,$img);

            }elseif ($_POST['operacao'] == 'del'){
                echo excluir_product($conexao,$id);
            }else{
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
                                <input name='nome_produto' value='{$result['nome_produto']}' >
                                <input name='valor' value='{$result['valor']}' >
                                <input name='tipo' value='{$result['tipo']}' >
                                <input name='img' value='{$result['img_produto']}'>
    
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
    function edit_product($conexao,$id,$nome,$tipo,$valor,$img){
        try{
            if(Produtos::pegarUnicoProduto($conexao,$id) > 0){
                return Produtos::editProdutos($conexao,$id,$nome,$valor,$tipo,$img);
            }

        }catch (PDOException $e){
            echo $e."error";
        }
        
    }
    function excluir_product($conexao,$id){
        try{
            if(Produtos::pegarUnicoProduto($conexao,$id) > 0){
                return Produtos::excluirProduto($conexao,$id);
            }

        }catch (PDOException $e){
            echo $e."error";
        }
        
    }
?>
