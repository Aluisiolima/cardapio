<?php
    class Adm
    {
        public static function verificaUser($conexao,$codigo,$senha,$empressa)
        {
            $sql = "SELECT e.nome_empressa, e.logo_img, u.id_adm, u.nome, u.cargo, u.codigo, u.senha, u.id_empressa 
                FROM user_adm u
                JOIN empressa e ON e.id_empressa = u.id_empressa
                WHERE u.codigo = :codigo AND u.senha = :senha AND u.id_empressa = :id_empressa";

            $stmt = $conexao->prepare($sql);

        
            $stmt->bindValue(':codigo', $codigo);
            $stmt->bindValue(':senha', $senha);
            $stmt->bindValue(':id_empressa', $empressa);
        
            $stmt->execute();

            $resultado = $stmt->fetch();
            return $resultado;
        }
    }
?>