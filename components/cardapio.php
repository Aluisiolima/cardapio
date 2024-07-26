<?php
    include "../ClassePhp/database.php";
    include "../ClassePhp/Cards.php";
    $card = new Cards($conexao);
?>
    <div class="container_cardapio" id="cardapio">
        <div class="cardapio_produtos_lanche">
            <?php 
                
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