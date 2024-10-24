<?php 
   

    function pegaImgs($tipo)
    {
        $imgPadrao ="../../img/{$tipo}_padrao.svg";
        $pizzaPadrao ="../../img/Pizza_padrao.svg";
        if(file_exists($imgPadrao)){
            return "src='$imgPadrao'";
            break;
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
                echo 'edita';
            }elseif ($_POST['operacao'] == 'del'){
                echo 'deleta';
            }else{
                echo geraFormProduct($conexao,$id,$action);
            }

        } else {
            echo "Erro: operação não especificada";
        }
    } 
    
    function  geraFormProduct($conexao,$id,$action){
        $result = Produtos::pegarUnicoProduto($conexao,$id);
        
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
                
                        </fieldset>
                        <input type='submit' value='enviar'>
                    </form>

                    <div id='mensagem'>
                
                    </div>
                </div>
            ";
        }



    }
?>
