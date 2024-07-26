<?php
    include "./ClassePhp/Conexao.php";

    $conexão = new Conexão('roundhouse.proxy.rlwy.net','root','zKDMtRKZOsnoOrTHnqCVCbczOqOkhWMj','railway',19884);

    class Cards
    {
        private $conexão;

        public function __construct($conexão)
        {
            $this->conexão = $conexão;
        }

        public function geraCardPizza()
        {
                    
            $conexão = $this->conexão;;

            if ($conexão) 
            {
                // Preparar e executar o SELECT
                $sql = "SELECT id,nome,valor FROM produto WHERE tipo = 'Pizza'";
                $stmt = $conexão->prepare($sql);
                $stmt->execute();

                // Buscar os resultados
                $produtos = $stmt->fetchAll();

                // Exibir os resultados
                foreach ($produtos as $produto) {
                    echo "  <div class='card_pizzas' id='{$produto['id']}'>
                                <img src='../img/pizza_padrao.svg' alt='imagem' >
                                <p class='detalhes'>{$produto['nome']}</p>
                                <p class='detalhes'>R$ {$produto['valor']}</p>
                                <button onclick="."loadContent('detalhes')"." id='buttoncompra'>compra</button>
                            </div>";
                }
            } else {
                echo "Falha na conexão.";
            }
        }
        public function geraCardBebida()
        {
                    
            $conexão = $this->conexão;;

            if ($conexão) 
            {
                // Preparar e executar o SELECT
                $sql = "SELECT id,nome,valor FROM produto WHERE tipo = 'Bebida'";
                $stmt = $conexão->prepare($sql);
                $stmt->execute();

                // Buscar os resultados
                $produtos = $stmt->fetchAll();

                // Exibir os resultados
                foreach ($produtos as $produto) {
                    echo "  <div class='card_pizzas' id='{$produto['id']}'>
                                <img src='../img/bebida_padrao.svg' alt='imagem' >
                                <p class='detalhes'>{$produto['nome']}</p>
                                <p class='detalhes'>R$ {$produto['valor']}</p>
                                <button onclick="."loadContent('detalhes')"." id='buttoncompra'>compra</button>
                            </div>";
                }
            } else {
                echo "Falha na conexão.";
            }
        }
        public function geraCardHamburguer()
        {
                    
            $conexão = $this->conexão;;

            if ($conexão) 
            {
                // Preparar e executar o SELECT
                $sql = "SELECT id,nome,valor FROM produto WHERE tipo = 'Hambúrguer'";
                $stmt = $conexão->prepare($sql);
                $stmt->execute();

                // Buscar os resultados
                $produtos = $stmt->fetchAll();

                // Exibir os resultados
                foreach ($produtos as $produto) {
                    echo "  <div class='card_pizzas' id='{$produto['id']}'>
                                <img src='../img/hamburguer_padrao.svg' alt='imagem' >
                                <p class='detalhes'>{$produto['nome']}</p>
                                <p class='detalhes'>R$ {$produto['valor']}</p>
                                <button onclick="."loadContent('detalhes')"." id='buttoncompra'>compra</button>
                            </div>";
                }
            } else {
                echo "Falha na conexão.";
            }
        }

        
    }