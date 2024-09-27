<?php

    class Cards
    {
        private $conexão;

        public function __construct($conexão)
        {
            $this->conexão = $conexão;
        }

        public function geraCardPizza()
        {
                    
            $conexão = $this->conexão;

            if ($conexão) 
            {
                try {
                    // Preparar e executar o SELECT
                    $sql = "SELECT id_produto,nome_produto,valor,img_produto FROM produtos WHERE tipo = 'Pizza'";
                    $stmt = $conexão->prepare($sql);
                    $stmt->execute();

                    // Buscar os resultados
                    $produtos = $stmt->fetchAll();

                    // Exibir os resultados
                    foreach ($produtos as $produto) {
                        echo "  <div class='card_pizzas' >
                                    <img src='{$produto['img_produto']}' alt='imagem' onerror="."src='./img/pizza_padrao.svg'".">
                                    <p class='detalhes'>{$produto['nome_produto']}</p>
                                    <p class='detalhes'>R$ {$produto['valor']}</p>
                                    <button onclick='getDetalhes({$produto['id_produto']})' class='buttoncompra'>compra</button>
                                </div>";
                    }
                }catch(PDOException $e){
                    echo "erro " .$e->getMessage();
                }
            } else {
                echo "Falha na conexão.";
            }
        }
        public function geraCardBebida()
        {
                    
            $conexão = $this->conexão;

            if ($conexão) 
            {
                try{
                    // Preparar e executar o SELECT
                    $sql = "SELECT  id_produto,nome_produto,valor,img_produto  FROM produtos WHERE tipo = 'Bebida'";
                    $stmt = $conexão->prepare($sql);
                    $stmt->execute();

                    // Buscar os resultados
                    $produtos = $stmt->fetchAll();

                    // Exibir os resultados
                    foreach ($produtos as $produto) {
                        echo "  <div class='card_pizzas' >
                                    <img src='{$produto['img_produto']}' alt='imagem' onerror="."src='./img/bebida_padrao.svg'".">
                                    <p class='detalhes'>{$produto['nome_produto']}</p>
                                    <p class='detalhes'>R$ {$produto['valor']}</p>
                                    <button onclick='getDetalhes({$produto['id_produto']})' class='buttoncompra'>compra</button>
                                </div>";
                    }
                }catch(PDOException $e){
                    echo "erro " .$e->getMessage();
                }
            } else {
                echo "Falha na conexão.";
            }
        }
        public function geraCardHamburguer()
        {
                    
            $conexão = $this->conexão;

            if ($conexão) 
            {
                try{
                    // Preparar e executar o SELECT
                    $sql = "SELECT  id_produto,nome_produto,valor,img_produto  FROM produtos WHERE tipo = 'Hambúrguer'";
                    $stmt = $conexão->prepare($sql);
                    $stmt->execute();

                    // Buscar os resultados
                    $produtos = $stmt->fetchAll();

                    // Exibir os resultados
                    foreach ($produtos as $produto) {
                        echo "  <div class='card_pizzas' >
                                    <img src='{$produto['img_produto']}' alt='imagem' onerror="."src='./img/hamburguer_padrao.svg'".">
                                    <p class='detalhes'>{$produto['nome_produto']}</p>
                                    <p class='detalhes'>R$ {$produto['valor']}</p>
                                    <button onclick='getDetalhes({$produto['id_produto']})' class='buttoncompra'>compra</button>
                                </div>";
                    }
                }catch(PDOException $e){
                    echo "erro " .$e->getMessage();
                }
            } else {
                echo "Falha na conexão.";
            }
        }

        
    }

?>