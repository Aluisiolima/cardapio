
<div class="init-container">
    <div class="img_logo">
        <img src="../../<?php echo($_SESSION['date_user']['logo_img'])?>" alt="">
    </div>
    <ul class="infs">
        <li><?php echo($_SESSION['date_user']['nome_empressa'])?></li>
        <li><?php echo($_SESSION['date_user']['nome'])?></</li>
        <li><?php echo($_SESSION['date_user']['cargo'])?></li>
    </ul>
    <form action="../config/sair.php" method="post" class="sair">
        <button type="submit" class="btn-sair">sair</button>
    </form>

    <div class="venda_hj">
    <?php
        $id_empressa = $_SESSION['date_user']['id_empressa'];
        $vendas = Venda::pegarVendasHoje($conexao, $id_empressa);

        if (!empty($vendas)) {
            foreach ($vendas as $venda) {
                echo "
                    <div class='card_venda'>
                        <h3>{$venda['cliente']}  - R$ {$venda['valor_total']} </h3>
                        <p><strong>Pagamento:</strong> {$venda['tipo_pagamento']}</p>
                        <p><strong>Endereço:</strong> {$venda['endereco']}</p>
                        <p><strong>Mesa:</strong> {$venda['mesa']} </p>
                        <p><strong>Data:</strong>{$venda['data_pedido']}</p>
                        <div>". geraCardsProduct($venda['produtos']) ."</div>
                    </div>
                ";
            }
        } else {
            echo "<p>Nenhuma venda encontrada!</p>";
        }
        function geraCardsProduct($produtos){
            $cards = '';
            foreach($produtos as $produto){
                $cards .= "
                    <div class='sub_card_produto'>
                        <p class='name'>{$produto['nome_produto']}</p>
                        <p class='valor'>{$produto['valor']}</p>
                        <p class='quant'>{$produto['quantidade']}</p>
                    </div>
                ";
            }
            return $cards;
        }
    ?>
    </div>
</div>