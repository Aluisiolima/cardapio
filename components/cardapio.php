<?php
    error_reporting(0);
    include "../ClassePhp/Cards.php";
    include "../Database/database.php";
   
?>
    <div class="container_cardapio" id="cardapio">
        <div class="cardapio_produtos_lanche">
            <?php 
                $card = new Cards($conexao);
                $card->geraCardPizza();
                
                $card->geraCardHamburguer();
            ?>
        </div>
        <div class="cardapio_produtos_acompanhamento">
            <?php
                $card->geraCardBebida();
            ?>
        </div>
      
       
        <button id="button_carinho" onclick="carregaCarinho()"> <i class="bi bi-cart4"></i></button>
    </div>
    <div id="contsiner_detalhes" class="container_detalhais">
    <?php //include "../components/detalheProduto.php";?>
    </div>