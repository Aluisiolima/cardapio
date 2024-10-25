<?php

class Produtos
{
    private $conexao;
    private $id_empressa;

    public function __construct($conexao,$id_empressa){
        $this->conexao = $conexao;
        $this->id_empressa = $id_empressa;
    }

    public function pegaProdutos(){
        $sql = "SELECT * FROM produtos WHERE id_empressa = :id_empressa;";
        $stmt = $this->conexao->prepare($sql);
        $stmt->bindParam(':id_empressa', $this->id_empressa);
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

    static public function excluirProduto($conexao,$id_produto){
        $sql = "DELETE FROM produtos WHERE id_produto = :id_produto";

        $stmt = $conexao->prepare($sql);
        
        $stmt->bindParam(':id_produto', $id_produto);

        $stmt->execute();

        return "O produto { $id_produto} foi deletado com sucesso!!!";
    }

    static public function pegarUnicoProduto($conexao,$id_produto){
        $sql = "SELECT * FROM produtos WHERE id_produto = :id_produto";

        $stmt = $conexao->prepare($sql);
        
        $stmt->bindParam(':id_produto', $id_produto);

        $stmt->execute();

        $produtos = $stmt->fetch();

        return $produtos;
    }
    
}

?>