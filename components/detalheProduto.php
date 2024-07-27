<?php 
require "../Database/database.php";

$conexao;

$id = $_POST['id'];

echo "
  <div class='volta'>
    <button onclick='carregaCardapio()' ><i class='bi bi-arrow-left'></i></button>
  </div>
  <div class='janela_detalhe'>
        <div class='inf_produto'>
          <div class='produto_detalhes'>  
            <img src='./img/pizza_padrao.svg' alt='' width='200px'>
            <div class='quantidade'>
              <button id='mais1'>+</button>
              <p>0</p>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates consequatur sunt officia, nobis quis voluptas vel animi deserunt quas placeat aspernatur dolor perferendis rem, expedita at hic dicta! Quas, nihil.
          </div>
        </div>
  
      <p id='value'>valor =</p>
  
      <div class='config'>
          <button id='personaliza'>pesonaliza</button>
          <button id='adicionarCarrinho' onclick='carregaCarinho()'>add carrinho</button>
      </div>
    </div>"

?>