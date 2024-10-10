<?php
class Venda
{
    private $conexao;
    private $id_produtos; // Supondo que seja um array de produtos com 'id' e 'quantidade'
    private $id_pedido;
    private $id_empresa;

    public function __construct($conexao, $id_produtos, $id_pedido, $id_empresa)
    {
        $this->conexao = $conexao;
        $this->id_produtos = $id_produtos;
        $this->id_pedido = $id_pedido;
        $this->id_empresa = $id_empresa;
    }

    public function InsertVenda()
    {
        try {
            // Verifica se $this->id_produtos é um array
            if (!is_array($this->id_produtos)) {
                throw new Exception('id_produtos deve ser um array.');
            }

            foreach ($this->id_produtos as $produto) {
                // Inserindo os dados na venda
                $sqlVenda = "INSERT INTO venda (id_produto, quantidade, id_pedido, id_empressa) VALUES (:id_produto, :quantidade, :id_pedido, :id_empressa)";
                
                $stmt = $this->conexao->prepare($sqlVenda);
                
                // Usando bindValue para valores diretos
                $stmt->bindValue(':id_produto', $produto['id']);
                $stmt->bindValue(':quantidade', $produto['quantidade']);
                $stmt->bindValue(':id_pedido', $this->id_pedido);
                $stmt->bindValue(':id_empressa', $this->id_empresa);
                
                
                // Executa a consulta
                $stmt->execute();
            }

            return true; // Retorna verdadeiro se todas as inserções foram bem-sucedidas
            
        } catch (PDOException $e) {
            echo "Erro: " . $e->getMessage();
            return false; // Retorna falso em caso de erro
        }
    }
}
?>
