-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: cardapio
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id_produto` int NOT NULL AUTO_INCREMENT,
  `nome_produto` varchar(100) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `img_produto` varchar(250) DEFAULT NULL,
  `id_empressa` int NOT NULL,
  PRIMARY KEY (`id_produto`),
  KEY `id_empressa` (`id_empressa`)
) ENGINE=MyISAM AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Pizza Margherita',25.99,'Pizza','img/pizza_margherita.jpg',1),(2,'Pizza Pepperoni',28.99,'Pizza','img/pizza_pepperoni.jpg',1),(3,'Pizza Quatro Queijos',30.99,'Pizza','img/pizza_quatro_queijos.jpg',1),(4,'Pizza Calabresa',27.99,'Pizza','img/pizza_calabresa.jpg',1),(5,'Pizza Portuguesa',29.99,'Pizza','img/pizza_portuguesa.jpg',1),(6,'Pizza Frango com Catupiry',31.99,'Pizza','img/pizza_frango_catupiry.jpg',1),(7,'Pizza Vegetariana',26.99,'Pizza','img/pizza_vegetariana.jpg',1),(8,'Pizza de Atum',27.99,'Pizza','img/pizza_atum.jpg',1),(9,'Pizza Napolitana',25.49,'Pizza','img/pizza_napolitana.jpg',1),(10,'Pizza de Bacon',32.99,'Pizza','img/pizza_bacon.jpg',1),(11,'Hambúrguer Clássico',15.99,'Hambúrguer','img/hamburguer_classico.jpg',1),(12,'Cheeseburger',16.99,'Hambúrguer','img/cheeseburger.jpg',1),(13,'X-Bacon',18.99,'Hambúrguer','img/x_bacon.jpg',1),(14,'Hambúrguer Vegetariano',14.99,'Hambúrguer','img/hamburguer_vegetariano.jpg',1),(15,'X-Tudo',20.99,'Hambúrguer','img/x_tudo.jpg',1),(16,'Hambúrguer de Frango',15.49,'Hambúrguer','img/hamburguer_frango.jpg',1),(17,'Hambúrguer Especial',22.99,'Hambúrguer','img/hamburguer_especial.jpg',1),(18,'Cheeseburger Duplo',19.99,'Hambúrguer','img/cheeseburger_duplo.jpg',1),(19,'Hambúrguer com Ovo',17.49,'Hambúrguer','img/hamburguer_ovo.jpg',1),(20,'Hambúrguer de Picanha',24.99,'Hambúrguer','img/hamburguer_picanha.jpg',1),(21,'Sushi de Salmão',40.99,'Sushi','img/sushi_salmao.jpg',1),(22,'Sushi de Atum',42.99,'Sushi','img/sushi_atum.jpg',1),(23,'Sushi de Camarão',45.99,'Sushi','img/sushi_camarao.jpg',1),(24,'Sushi Califórnia',38.99,'Sushi','img/sushi_california.jpg',1),(25,'Sushi Filadélfia',39.99,'Sushi','img/sushi_filadelfia.jpg',1),(26,'Temaki de Salmão',28.99,'Temaki','img/temaki_salmao.jpg',1),(27,'Temaki de Atum',30.99,'Temaki','img/temaki_atum.jpg',1),(28,'Temaki de Camarão',32.99,'Temaki','img/temaki_camarao.jpg',1),(29,'Temaki Califórnia',25.99,'Temaki','img/temaki_california.jpg',1),(30,'Temaki Especial',35.99,'Temaki','img/temaki_especial.jpg',1),(31,'Batata Frita',12.99,'Acompanhamento','img/batata_frita.jpg',1),(32,'Onion Rings',14.99,'Acompanhamento','img/onion_rings.jpg',1),(33,'Chicken Wings',18.99,'Acompanhamento','img/chicken_wings.jpg',1),(34,'Salada Caesar',22.99,'Salada','img/salada_caesar.jpg',1),(35,'Salada Grega',20.99,'Salada','img/salada_grega.jpg',1),(36,'Salada Tropical',19.99,'Salada','img/salada_tropical.jpg',1),(37,'Suco de Laranja',7.99,'Bebida','img/suco_laranja.jpg',1),(38,'Suco de Abacaxi',8.99,'Bebida','img/suco_abacaxi.jpg',1),(39,'Suco de Morango',9.49,'Bebida','img/suco_morango.jpg',1),(40,'Refrigerante Cola',5.99,'Bebida','img/refri_cola.jpg',1),(41,'Refrigerante Guaraná',5.99,'Bebida','img/refri_guarana.jpg',1),(42,'Água Mineral',3.99,'Bebida','img/agua_mineral.jpg',1),(43,'Cerveja Pilsen',7.49,'Bebida','img/cerveja_pilsen.jpg',1),(44,'Cerveja IPA',8.99,'Bebida','img/cerveja_ipa.jpg',1),(45,'Vinho Tinto',29.99,'Bebida','img/vinho_tinto.jpg',1),(46,'Vinho Branco',28.99,'Bebida','img/vinho_branco.jpg',1);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-29 21:25:02
