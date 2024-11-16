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

            $this->conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $this->conexao->beginTransaction();

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
        
            $this->conexao->commit();

            return true; // Retorna verdadeiro se todas as inserções foram bem-sucedidas
            
        } catch (PDOException $e) {
            $this->conexao->rollBack();
            echo "Erro: " . $e->getMessage();
            return false; // Retorna falso em caso de erro
        }
    }
    
    public static function pegarVendasHoje($conexao, $id_empresa)
    {
        date_default_timezone_set('America/Sao_Paulo');
        $dataHoje  = date('d/m/Y');

        $sqlVenda = "SELECT 
            ped.id_pedido, 
            ped.nome_cliente, 
            ped.tipo_pagamento, 
            ped.rua, 
            ped.bairro, 
            ped.numero_casa, 
            ped.numero_mesa, 
            ped.mesa, 
            ped.data_pedido,
            p.nome_produto, 
            p.valor,
            v.quantidade
        FROM venda v
        JOIN produtos p ON v.id_produto = p.id_produto
        JOIN pedido ped ON v.id_pedido = ped.id_pedido
        WHERE v.id_empressa = :id_empresa
        AND STR_TO_DATE(ped.data_pedido, '%d/%m/%Y') = STR_TO_DATE(:data, '%d/%m/%Y');";

        $stmt = $conexao->prepare($sqlVenda);
        $stmt->bindValue(':id_empresa', $id_empresa);
        $stmt->bindValue(':data', $dataHoje);
        $stmt->execute();

        // Organizar os resultados por `id_pedido`
        $vendasAgrupadas = [];
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $idPedido = $row['id_pedido'];
            if (!isset($vendasAgrupadas[$idPedido])) {
                $vendasAgrupadas[$idPedido] = [
                    'cliente' => $row['nome_cliente'],
                    'tipo_pagamento' => $row['tipo_pagamento'],
                    'endereco' => $row['bairro'] ? "{$row['rua']}, {$row['bairro']}, Nº {$row['numero_casa']}" : 'Estabelecimento',
                    'mesa' => $row['mesa'] ? "{$row['numero_mesa']}" : "Delivery",
                    'data_pedido' => $row['data_pedido'],
                    'produtos' => [],
                    'valor_total' => 0
                ];
            }

            // Adicionar os produtos ao pedido
            $vendasAgrupadas[$idPedido]['produtos'][] = [
            'nome_produto' => $row['nome_produto'],
            'valor' => $row['valor'],
            'quantidade' => $row['quantidade']
            ];

            $vendasAgrupadas[$idPedido]['valor_total'] += ($row['valor'] * $row['quantidade']);
        }

        return $vendasAgrupadas;
    }
    
    public static function pegarVendas($conexao, $id_empresa)
    {   
        $sqlVenda = "SELECT 
                        ped.id_pedido, 
                        ped.nome_cliente, 
                        ped.tipo_pagamento, 
                        ped.rua, 
                        ped.bairro, 
                        ped.numero_casa, 
                        ped.numero_mesa, 
                        ped.mesa, 
                        ped.data_pedido,
                        p.nome_produto, 
                        p.valor,
                        v.quantidade
                    FROM venda v
                    JOIN produtos p ON v.id_produto = p.id_produto
                    JOIN pedido ped ON v.id_pedido = ped.id_pedido
                    WHERE v.id_empressa = :id_empresa";

        $stmt = $conexao->prepare($sqlVenda);
        $stmt->bindValue(':id_empresa', $id_empresa);
        $stmt->execute();

        // Organizar os resultados por `id_pedido`
        $vendasAgrupadas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $idPedido = $row['id_pedido'];
            if (!isset($vendasAgrupadas[$idPedido])) {
                $vendasAgrupadas[$idPedido] = [
                    'cliente' => $row['nome_cliente'],
                    'tipo_pagamento' => $row['tipo_pagamento'],
                    'endereco' => $row['bairro'] ? "{$row['rua']}, {$row['bairro']}, Nº {$row['numero_casa']}" : 'Estabelecimento',
                    'mesa' => $row['mesa'] ? "Mesa {$row['numero_mesa']}" : "Delivery",
                    'data_pedido' => $row['data_pedido'],
                    'produtos' => [],
                    'valor_total' => 0
                ];
            }

            // Adicionar os produtos ao pedido
            $vendasAgrupadas[$idPedido]['produtos'][] = [
                'nome_produto' => $row['nome_produto'],
                'valor' => $row['valor'],
                'quantidade' => $row['quantidade']
            ];

            $vendasAgrupadas[$idPedido]['valor_total'] += ($row['valor'] * $row['quantidade']);
        }

        return $vendasAgrupadas;
    }
    
}
?>
