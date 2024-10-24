<?php
    Class Cardapio
    {
        private $conexao;
        private $id_empresa;

        public function __construct($conexao,$id_empresa)
        {
            $this->conexao = $conexao;
            $this->id_empresa = $id_empresa;
        }

        public function SelecionarEmpresa()
        {   
            try{
                $sql = "SELECT nome_empressa,whatsapp,instagram,facebook,endereco,email,logo_img FROM empressa WHERE id_empressa = :id;";
                $stmt = $this->conexao->prepare($sql);
                $stmt->bindParam(':id', $this->id_empresa);
                $stmt->execute();
    
                $dados_empressa = $stmt->fetch();
                $produtosEmMaiorQuantidade = $this->protudosEmMaioQuantidade();
                $resultado = [$dados_empressa,$produtosEmMaiorQuantidade];
                return  $resultado;
            }catch (PDOException $e){
                return  'deu error'. $e->getMessage();
            }
        }
        private function protudosEmMaioQuantidade(){
           try{
                $sql = "SELECT tipo FROM produtos WHERE id_empressa = :id_empresa GROUP BY tipo ORDER BY  count(*) desc limit 3;";
                $stmt = $this->conexao->prepare($sql);
                $stmt->bindParam(':id_empresa', $this->id_empresa);
                $stmt->execute();
    
                $resultado = $stmt->fetchAll();

                return  $resultado;
            }catch (PDOException $e){
                return  'deu error'. $e->getMessage();
            }
        }
    }

?>