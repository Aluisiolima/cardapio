<?php
    $date = $produtoDate[0];
    
    try{

        foreach($date as $date){
            //inserindo os dados na venda
            $sqlVenda = "INSERT INTO venda (id_produto, quantidade, id_pedido) VALUES (:id_produto, :quantidade, :id_pedido)";
    
            $stmt = $conexao->prepare($sqlVenda);
    
            $stmt->bindParam(':id_produto', $date['id']);
            $stmt->bindParam(':quantidade', $date['quantidade']);
            $stmt->bindParam(':id_pedido', $produtoDate[1]);
    
    
            $stmt->execute();
        }
        
       
    }catch (PDOException $e){
        echo "Erro: " . $e->getMessage();
    }
    
?>