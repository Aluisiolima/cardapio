
<?php
    Class Pedido
    {
        private $conexao;
        private $nome_cliente;
        private $tipo_pagamento;
        private $entrega;
        private $bairro;
        private $rua;
        private $numero_casa;
        private $mesa;
        private $numero_mesa;
        private $data_pedido;
        
        public function __construct($conexao, $nome_cliente, $tipo_pagamento, $entrega = null,$bairro = null, $rua = null, $numero_casa = null, $mesa = null, $numero_mesa = null)
        {
            $this->conexao = $conexao;
            $this->nome_cliente = $nome_cliente;
            $this->tipo_pagamento = $tipo_pagamento;
            $this->entrega = $entrega;
            $this->bairro = $bairro;
            $this->rua = $rua;
            $this->numero_casa = $numero_casa;
            $this->mesa = $mesa;
            $this->numero_mesa = $numero_mesa;
            $this->data_pedido = $this->Data(); 
        }


        private function Data(){
            date_default_timezone_set('America/Sao_Paulo'); // Ajuste conforme sua região

            // Obtém a data e hora atual em formato separado
            $dia = date('d');     // Dia do mês
            $mes = date('m');     // Mês
            $ano = date('Y');     // Ano
            $hora = date('H');    // Hora
            $minuto = date('i');  // Minuto
            
            return "$dia/$mes/$ano $hora:$minuto";
        }
    

        public function InsertPedido(){
            try {
                $this->conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                $this->conexao->beginTransaction();
                // Prepara a consulta SQL
                $sql = "INSERT INTO pedido (nome_cliente, tipo_pagamento, entrega, bairro, rua, numero_casa, mesa, numero_mesa, data_pedido)
                        VALUES (:nome, :tipo_pagamento, :entrega, :bairro, :rua, :numero_casa, :mesa, :numero_mesa, :data_pedido)";
            
                // Prepara a instrução
                $stmt = $this->conexao->prepare($sql);
            
                // Bind dos parâmetros
                $stmt->bindParam(':nome', $this->nome_cliente);
                $stmt->bindParam(':tipo_pagamento', $this->tipo_pagamento);
                $stmt->bindParam(':entrega', $this->entrega);
                $stmt->bindParam(':bairro', $this->bairro);
                $stmt->bindParam(':rua', $this->rua);
                $stmt->bindParam(':numero_casa', $this->numero_casa);
                $stmt->bindParam(':mesa', $this->mesa);
                $stmt->bindParam(':numero_mesa', $this->numero_mesa);
                $stmt->bindParam(':data_pedido', $this->data_pedido);
            
                // Executa a consulta
                $stmt->execute();
            
                // Pegando o id do pedido
                $pedidoId = $this->conexao->lastInsertId();
            
                $this->conexao->commit();
                return $pedidoId;
            
            } catch (PDOException $e) {
                $this->conexao->rollBack();
                echo "Erro: " . $e->getMessage();
            }
        }
}
    

   
    
