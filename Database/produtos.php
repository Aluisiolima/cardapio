<?php

class Produtos
{

    static public function pegaProdutos($conexao,$id_empressa){
        $sql = "SELECT * FROM produtos WHERE id_empressa = :id_empressa AND status = 'ativo';";
        $stmt = $conexao->prepare($sql);
        $stmt->bindParam(':id_empressa', $id_empressa);
        $stmt->execute();

        $produtos = $stmt->fetchAll();

        return $produtos;
    }

    
    static public function editProdutos($conexao,$id_produto,$nome,$valor,$tipo,$img){
        $sql = "UPDATE produtos SET nome_produto = :nome, valor = :valor, tipo = :tipo, img_produto = :img  WHERE id_produto = :id_produto";

        
        $stmt = $conexao->prepare($sql);
        
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':valor', $valor);
        $stmt->bindParam(':tipo', $tipo);
        $stmt->bindParam(':img', $img);
        $stmt->bindParam(':id_produto', $id_produto);

        $stmt->execute();

        return "produto {$id_produto} foi alterado com sucesso!!";
    }

    static public function desativaProduto($conexao,$id_produto,$status = "desativado"){
        $sql = "UPDATE  produtos SET status = :status  WHERE id_produto = :id_produto";

        $stmt = $conexao->prepare($sql);
        
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id_produto', $id_produto);

        $stmt->execute();

        return "O produto {$id_produto} foi deletado com sucesso!!!";
    }
    static public function addProduto($conexao,$id_empressa,$nome,$tipo,$valor,$img){
        $sql = "INSERT INTO  produtos (nome_produto,valor,img_produto,tipo,id_empressa) VALUES (:nome,:valor,:img,:tipo,:id_empressa)";

        $stmt = $conexao->prepare($sql);
        
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':valor', $valor);
        $stmt->bindParam(':img', $img);
        $stmt->bindParam(':tipo', $tipo);
        $stmt->bindParam(':id_empressa', $id_empressa);

        $stmt->execute();

        return "O produto foi adicionado com sucesso com sucesso!!!";
    }

    static public function pegarUnicoProduto($conexao,$id_produto){
        $sql = "SELECT * FROM produtos WHERE id_produto = :id_produto";

        $stmt = $conexao->prepare($sql);
        
        $stmt->bindParam(':id_produto', $id_produto);

        $stmt->execute();

        $produtos = $stmt->fetch();

        return $produtos;
    }
    static function typesProduct($conexão,$empresa)
    {
        if($conexão){
            try{
                // Preparar e executar o SELECT
                $sql = "SELECT  tipo  FROM produtos WHERE id_empressa = :id_empressa;";
                $stmt = $conexão->prepare($sql);
                $stmt->bindParam(':id_empressa', $empresa);
                $stmt->execute();

                // Buscar os resultados
                $produtos = $stmt->fetchAll();
                $tipo = [];
                // Exibir os resultados
                foreach ($produtos as $produto) {
                    $tipo[] = $produto['tipo'];
                }
                $tipos = array_values(array_unique($tipo));
            }catch(PDOException $e){
                echo "erro " .$e->getMessage();
            }
        }

        return $tipos;
    }
}

?>