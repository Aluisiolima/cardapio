<?php

    include (ROOT."/Class/Cards.php");
    include (ROOT."/Database/database.php");
   
?>
    <div class="container_cardapio" id="cardapio_page">
        <div class="cardapio_produtos_lanche">
            <?php 
                $card = new Cards($conexao,$_SESSION['dados']['id_empressa']);                
                $card->geraCards(Produtos::typesProduct($conexao,$_SESSION['dados']['id_empressa']));
            ?>
        </div>
        
      
       
        <div><p id="Ncompras" class="numerador"></p><button id="button_carinho" onclick="carregaCarinho()"> <i class="bi bi-cart4"></i></button></div>
    </div>
    <div id="container_detalhes" class="container_detalhais">
    <?php include "../components/detalheProduto.php";?>
    </div>