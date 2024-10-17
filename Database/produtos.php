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
    
}

?>