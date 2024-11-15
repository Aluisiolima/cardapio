<?php
    $id_empressa = $_SESSION['date_user']['id_empressa'];
    $vendas = Venda::pegarVendas($conexao, $id_empressa);

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

    
?>
