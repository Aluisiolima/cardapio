$quantidades = [];
    foreach ($produtos as $indice => $produto) {
        if ($indice % 3 == 0) {
            $quantidades[] = $produto;
        }
    }
    foreach($ids as $indice => $i){
        //inserindo os dados na venda
        $sqlVenda = "INSERT INTO venda (id_produto, quantidade, id_pedido) VALUES (:id_produto, :quantidade, :id_pedido)";

        $stmt = $conexao->prepare($sqlVenda);

        $stmt->bindParam(':id_produto', $i);
        $stmt->bindParam(':quantidade', $quantidades[$indice]);
        $stmt->bindParam(':id_pedido', $pedidoId);


        $stmt->execute();
    }