<?php

    include (ROOT."/ClassePhp/Cards.php");
    include (ROOT."/Database/database.php");
   
?>
    <div class="container_cardapio" id="cardapio_page">
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
    <div id="container_detalhes" class="container_detalhais">
    <?php include "../components/detalheProduto.php";?>
    </div>