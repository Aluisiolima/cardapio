<?php

    class Cards
    {
        private $conexão;
        private $empresa;

        public function __construct($conexão,$empresa)
        {
            $this->conexão = $conexão;
            $this->empresa = $empresa;
        }

        public function geraCards($tipos)
        {
                    
            $conexão = $this->conexão;

            if ($conexão) 
            {
                foreach ($tipos as $t) {
                    echo "<div class='title_tipo' id='{$t}'><h3>{$t}:</h3></div>";
                    try{
                        // Preparar e executar o SELECT
                        $sql = "SELECT  id_produto,nome_produto,valor,img_produto  FROM produtos WHERE tipo = :tipo AND id_empressa = :id_empressa AND status = 'ativo'";
                        $stmt = $conexão->prepare($sql);
                        $stmt->bindParam(':tipo', $t);
                        $stmt->bindParam(':id_empressa', $this->empresa);
                        $stmt->execute();

                        // Buscar os resultados
                        $produtos = $stmt->fetchAll();

                        // Exibir os resultados
                        foreach ($produtos as $produto) {
                            echo "  <div class='card' >
                                        <img src='{$produto['img_produto']}' alt='imagem' onerror=".$this->pegaImgs($t).">
                                        <p class='detalhes'>{$produto['nome_produto']}</p>
                                        <p class='detalhes'>R$ {$produto['valor']}</p>
                                        <button onclick='getDetalhes({$produto['id_produto']})' class='buttoncompra'>compra</button>
                                    </div>";
                        }
                    }catch(PDOException $e){
                        echo "erro " .$e->getMessage();
                    }
                }
            } else {
                echo "Falha na conexão.";
            }
            
        }

        public function pegaImgs($tipo)
        {
            $imgPadrao =ROOT."/img/default/{$tipo}_padrao.svg";
            if(file_exists($imgPadrao)){
                return "src='./img/default/{$tipo}_padrao.svg'";
            }
           
            return "src='./img/default/Pizza_padrao.svg'";
        }
        
    }

?>