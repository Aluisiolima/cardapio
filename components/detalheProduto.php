<?php 
error_reporting(0);
include "../Database/Conexao.php";
include "../Database/database.php";
$img = "";
 $conexao = $conn->connect();

if (isset($_POST['id'])) {
  $id = intval($_POST['id']); // Garantir que o ID seja um número inteiro

  $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $sql = "SELECT nome,valor,img,tipo FROM produto WHERE id = :id ";
  $stmt = $conexao->prepare($sql);
  $stmt->bindParam(":id", $id, PDO::PARAM_INT); // "i" para integer
  $stmt->execute();
  
  if ($stmt->rowCount() > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
              if($row['tipo'] == 'Pizza'){
                $img = "./img/pizza_padrao.svg";
              }elseif($row['tipo'] == 'Bebida'){
                $img = "./img/bebida_padrao.svg";
              }elseif($row['tipo'] == 'Hambúrguer'){
                $img = "./img/hamburguer_padrao.svg";
              }else{
                $img = "./img/pizza_padrao.svg";
              }
              
              echo "
                
                <div class='janela_detalhe' id='tela_detalhe'>
                  <div class='volta'>
                    <button onclick='fechaDetalhes()' ><i class='bi bi-x-lg'></i></i></button>
                  </div>
                  <div class='detalhe'>
                    <div class='inf_produto'>
                      <div class='produto_detalhes'>  
                          <img src=' {$row['img']}' alt='' width='200px' onerror="."src='$img'".">
                        <div class='quantidade'>
                          <button id='mais1'>+</button>
                          <p>1</p>
                          <button id='menos1'>-</button>
                        </div>
                        <div class='tamanhos'>
                          <button class='tamanho'>gg</button>
                          <button class='tamanho'>g</button>
                          <button class='tamanho'>m</button>
                          <button class='tamanho'>p</button>
                        </div>
                      </div>
                    
                      <div class='descricao'>
                        <p> {$row['nome']}</p>
                      </div>
                    </div>
                  
                    <p id='value'>valor = {$row['valor']}</p>
                  
                    <div class='config'>
                        <button id='personaliza'>pesonaliza</button>
                        <button id='adicionarCarrinho' onclick='addCarinho()'>add carrinho</button>
                    </div>
                  </div>
                </div> ";
            
            }
  } else {
      echo "No data found for ID " . $id;
  }
} else {
  echo "ID not set.";
}
  
