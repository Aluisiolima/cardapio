<?php
class Conexão
{
    protected $conn;
    protected $host     = 'br620.hostgator.com.br';
    protected $database = 'hdcurs93_efastmenu';
    protected $user     = 'hdcurs93_hdcurso';
    protected $password = 'hdcurso10';

    public function connect()
    { 
                
        try {
            $username = "hdcurs93_hdcurso";
            $password = "hdcurso10";  
            $conn = new PDO('mysql:host=br620.hostgator.com.br;dbname=hdcurs93_efastmenu', $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            if ($conn === null) {
                throw new Exception("Conexão não estabelecida.");
            }
            return $conn;
        } catch(PDOException $e) {
            echo 'ERROR: ao Conectar ao Banco' . $e->getMessage();
        }
    }
}
?>
