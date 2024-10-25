<?php 
include("../config.php");

include(ROOT."/Database/database.php");
$imgERROR = "";
 $conexao = $conn->connect();

if (isset($_POST['id'])) {
  $id = intval($_POST['id']); // Garantir que o ID seja um número inteiro

  $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $sql = "SELECT id_produto,nome_produto,valor,img_produto,tipo FROM produtos WHERE id_produto = :id ";
  $stmt = $conexao->prepare($sql);
  $stmt->bindParam(":id", $id, PDO::PARAM_INT); // "i" para integer
  $stmt->execute();
  
  if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
              $img = "{$row['img_produto']}";
              $nome = "{$row['nome_produto']}";
              $valor = "{$row['valor']}";
              $id = "{$row['id_produto']}";

              if($row['tipo'] == 'Pizza'){
                $imgERROR = "./img/default/Pizza_padrao.svg";
              }elseif($row['tipo'] == 'Bebida'){
                $imgERROR = "./img/default/Bebida_padrao.svg";
              }elseif($row['tipo'] == 'Hambúrguer'){
                $imgERROR = "./img/default/Hambúrguer_padrao.svg";
              }else{
                $imgERROR = "./img/default/Pizza_padrao.svg";
              }

              
              
              echo "
                
                  <div class='janela_detalhe' id='tela_detalhe'>
                    <div class='volta'>
                      <button onclick='fechaDetalhes()' ><i class='bi bi-x-lg'></i></i></button>
                    </div>
                    <div class='detalhe'>
                      <div class='inf_produto'>
                        <div class='produto_detalhes'>  
                            <img src='$img' id='imgProduct' alt='$id' width='200px' onerror="."src='$imgERROR'".">
                          <div class='quantidade'>
                            <button id='mais1' onclick='mais1()'>+</button>
                            <p id='quantidade'>1</p>
                            <button id='menos1' onclick='menos1()'>-</button>
                          </div>
                        </div>
                      
                        <div class='descricao'>
                          <p id='nameProduct'> $nome</p>
                        </div>
                      </div>
                    
                      <p class='value'> valor = <span id='value' product-value=$valor>$valor</span> </p>
                    
                      <div class='config'>
                          <button id='adicionarCarrinho' onclick='addCarinho()'>add carrinho</button>
                      </div>
                    </div>
                  </div> 
                
                ";
            
            }
  } else {
      echo "No data found for ID " . $id;
  }
} else {
  echo "ID not set.";
}
?>
