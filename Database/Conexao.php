<?php
    class  Conexão
    {
        private $servername;
        private $username;
        private $password;
        private $dbname;
        private $port;
        private $charset;

        public function __construct(string $servername, string $username, string $password, string $dbname, int $port = null, $charset= null)
        {
            $this->servername = $servername;
            $this->username = $username;
            $this->password = $password;
            $this->dbname = $dbname;
            $this->port = $port;
            $this->charset = $charset;

        }
        public function __toString()
        {
            return $this->dbname;
        }
        public function connect() {
            $dsn = "mysql:host={$this->servername};port={$this->port};dbname={$this->dbname};charset={$this->charset}";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            try {
                $pdo = new PDO($dsn, $this->username, $this->password, $options);
                return $pdo;
            } catch (PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
                return null;
            }
        }
    }