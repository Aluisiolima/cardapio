<?php 
    $produtos = new Produtos($conexao,$_SESSION['date_user']['id_empressa']);

    function pegaImgs($tipo)
    {
        $imgPadrao ="../../img/{$tipo}_padrao.svg";
        $pizzaPadrao ="../../img/Pizza_padrao.svg";
        if(file_exists($imgPadrao)){
            return "src='$imgPadrao'";
        }
       
        return "src='$pizzaPadrao' ";
    }

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
                            <button onclick='getDetalhes({$produto['id_produto']})' class='edit'><i class='bi bi-pencil-square'></i></button>
                            <button onclick='getDetalhes({$produto['id_produto']})' class='delete'><i class='bi bi-x-square'></i></button>
                        </div>  
                        

                    </div>
                    
                </div>";
    }
?>
