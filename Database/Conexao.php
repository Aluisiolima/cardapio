<?php
class Conexão
{
    protected $conn;
    protected $host     = 'localhost';
    protected $database = 'cardapio';
    protected $user     = 'root';
    protected $password = '';

    public function connect()
    { 
                
        try { 
            $conn = new PDO("mysql:host={$this->host};dbname={$this->database}", $this->user, $this->password);
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
