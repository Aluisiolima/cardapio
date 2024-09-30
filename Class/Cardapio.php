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
    
                $resultado = $stmt->fetch();
                return  $resultado;
            }catch (PDOException $e){
                return  'deu error'. $e->getMessage();
            }
        }
    }

?>