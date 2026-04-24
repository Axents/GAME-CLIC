-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gameandclic
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `juego_id` int NOT NULL,
  `fecha_agregado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`,`juego_id`),
  UNIQUE KEY `usuario_juego_unico` (`usuario_id`,`juego_id`),
  KEY `juego_id` (`juego_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`),
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
INSERT INTO `favoritos` VALUES (6,13,3,'2026-04-21 02:24:23'),(8,13,2,'2026-04-21 02:24:43'),(10,13,6,'2026-04-21 02:45:47'),(13,11,2,'2026-04-21 03:16:37'),(14,14,3,'2026-04-21 04:11:04'),(15,14,1,'2026-04-21 04:11:12'),(16,14,10,'2026-04-21 04:12:25'),(17,14,58,'2026-04-21 04:42:02'),(25,17,1,'2026-04-21 15:40:37'),(26,18,5,'2026-04-21 18:22:20'),(27,18,3,'2026-04-21 18:23:50');
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegos`
--

DROP TABLE IF EXISTS `juegos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `plataforma` varchar(50) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT 'https://via.placeholder.com/150',
  `descripcion` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegos`
--

LOCK TABLES `juegos` WRITE;
/*!40000 ALTER TABLE `juegos` DISABLE KEYS */;
INSERT INTO `juegos` VALUES (1,'Halo Infinite','FPS','Xbox / PC','https://imagenes.hobbyconsolas.com/files/image_1920_1080/uploads/imagenes/2023/04/25/69026fc24979b.jpeg',NULL),(2,'The Witcher 3','RPG','PC / PS / Xbox','https://i.blogs.es/836a94/the-witcher-3-1/500_333.jpeg',NULL),(3,'Minecraft','Sandbox','Multiplataforma','https://static.vecteezy.com/system/resources/thumbnails/054/659/403/small/a-vibrant-and-colorful-minecraft-landscape-adorned-with-adorable-bunnies-and-beautiful-flowers-photo.jpg','Un juego de supervivencia y construcción donde el único límite es tu imaginación.'),(4,'God of War','Acción','PlayStation','https://m.media-amazon.com/images/I/91RSQACsJeL._AC_UF1000,1000_QL80_.jpg',NULL),(5,'FIFA 24','Deportes','Multiplataforma','https://balonlatino.net/app/uploads/2023/06/FtDZDhbX0AUrhTz.jpg',NULL),(44,'Ark: Survival Evolved','Supervivencia','PC/Consola','https://m.media-amazon.com/images/M/MV5BZjdlNzM1OGItYTQ5Yy00YjlkLWJkMDMtZmQ3Y2ZhNDBmODUyXkEyXkFqcGc@._V1_.jpg','Varado en una isla misteriosa, debes aprender a sobrevivir domando criaturas primitivas.'),(45,'Subnautica','Supervivencia','PC/Consola','https://images6.alphacoders.com/784/thumb-1920-784277.jpg','Desciende a las profundidades de un mundo submarino alienígena lleno de maravillas y peligros.'),(46,'Rust','Supervivencia','PC','https://wallpapers.com/images/hd/rust-game-fvem7wo2c4nc4rfq.jpg','El único objetivo en Rust es sobrevivir. Todo en la isla quiere acabar con tu vida.'),(47,'DayZ','Supervivencia','PC','https://wallpaperaccess.com/full/1494933.jpg','¿Cuánto podrás sobrevivir en un mundo posapocalíptico infectado de zombis?'),(48,'Metro Exodus','Acción','PC/Consola','https://wallpapercat.com/w/full/1/a/1/1826143-3840x2160-desktop-4k-metro-exodus-wallpaper.jpg','Huye del Metro de Moscú y emprende un viaje épico por una Rusia postapocalíptica.'),(49,'Terraria','Sandbox','Multiplataforma','https://m.media-amazon.com/images/I/71k0BMp4U1L._AC_UF894,1000_QL80_.jpg','¡Cava, lucha, explora y construye! Un juego de aventura donde todo es posible.'),(50,'Poppy Playtime','Terror','PC','https://images2.alphacoders.com/123/1237882.jpg','Sobrevive a juguetes vengativos en una fábrica abandonada usando el GrabPack.'),(51,'Lethal Company','Terror','PC','https://images2.alphacoders.com/134/1344905.jpeg','Recolecta chatarra en lunas abandonadas para sobrevivir y cumplir objetivos.'),(52,'Palworld','Supervivencia','PC/Xbox','https://upload.wikimedia.org/wikipedia/en/f/fb/Palworld_Steam_artwork.jpg','Captura criaturas llamadas Pals para combatir, construir y trabajar.'),(53,'Project Zomboid','Supervivencia','PC','https://upload.wikimedia.org/wikipedia/en/0/0c/Boxshot_of_video_game_Project_zomboid.jpg','Simulador de supervivencia zombi extremo. La pregunta es: ¿cómo vas a morir?'),(54,'DREDGE','Aventura','PC/Consola','https://upload.wikimedia.org/wikipedia/en/1/15/Dredge_Cover_Art.jpg','Aventura de pesca con un giro oscuro en un archipiélago misterioso.'),(55,'Raft','Supervivencia','PC','https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/648800/header.jpg','Sobrevive en el océano construyendo tu propio hogar flotante.'),(56,'Sons Of The Forest','Terror','PC','https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Sons_of_the_Forest.jpg/250px-Sons_of_the_Forest.jpg','En una isla de caníbales, construye y sobrevive en este juego de terror.'),(57,'Fortnite','Battle Royale','Multiplataforma','https://m.media-amazon.com/images/M/MV5BMTZlMmIxM2EtN2Y4Zi00M2ZhLTk3NzgtNjJmZTU0MTQ3YjcwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg','Juego multijugador masivo donde construyes y luchas para ser el último en pie.'),(58,'Call of Duty: MW','FPS','Multiplataforma','https://sm.ign.com/t/ign_latam/screenshot/default/16546329958064-d2eu_163167_qe8w.1280.jpg','Shooter táctico con una narrativa realista e intensa.'),(59,'Sekiro','Acción','PC/Consola','https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg','Combate de precisión y sigilo como un shinobi en el Japón feudal.'),(60,'Resident Evil 2','Survival Horror','PC/Consola','https://sm.ign.com/ign_es/game/r/resident-e/resident-evil-2-remake_zq54.png','Sobrevive al brote zombi en Raccoon City en este clásico reimaginado.'),(61,'Animal Crossing','Simulador','Nintendo Switch','https://media.vandal.net/i/1440x1080/3-2023/2023313941620_1.jpg','Vive una vida tranquila decorando tu propia isla desierta.'),(62,'Among Us','Multijugador','Multiplataforma','https://static.wixstatic.com/media/8c48d8_14a87ebb765d40e19a9b100268f1da7a~mv2.jpg/v1/fill/w_992,h_558,al_c,q_85/8c48d8_14a87ebb765d40e19a9b100268f1da7a~mv2.jpg','Descubre al impostor antes de que elimine a toda la tripulación.'),(63,'Genshin Impact','RPG','Multiplataforma','https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Genshin_Impact_wordmark.svg/250px-Genshin_Impact_wordmark.svg.png','Explora el mundo de Teyvat en este RPG de acción masivo.'),(64,'Resident Evil Village','Survival Horror','PC/Consola','https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Resident_Evil_Village.png/250px-Resident_Evil_Village.png','Aventura de terror gótico continuando la historia de Ethan Winters.'),(65,'Forza Horizon 5','Carreras','PC/Xbox','https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Forza_logo_2020.svg/250px-Forza_logo_2020.svg.png','Compite en festivales de velocidad por los paisajes de México.'),(66,'Elden Ring','RPG','PC/Consola','https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Elden_Ring_logo_black.svg/250px-Elden_Ring_logo_black.svg.png','Explora las Tierras Intermedias y derrota a enemigos desafiantes.'),(67,'Stray','Aventura','PC/Consola','https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Stray_text-only_logo_black.svg/500px-Stray_text-only_logo_black.svg.png','Controla a un gato en una ciudad ciberpunk habitada por robots.'),(68,'God of War Ragnarök','Acción','Consola','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Logotipo_Atual_God_of_War_Ragnar%C3%B6k.jpg/330px-Logotipo_Atual_God_of_War_Ragnar%C3%B6k.jpg','Kratos y Atreus enfrentan el fin del mundo en la mitología nórdica.'),(69,'Hogwarts Legacy','RPG','PC/Consola','https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Hogwarts_Legacy_promotional_photo_horizontal.jpg/250px-Hogwarts_Legacy_promotional_photo_horizontal.jpg','Estudia magia en Hogwarts y descubre secretos del mundo mágico.'),(70,'Spider-Man 2','Acción','Consola','https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/MarvelsSpiderMan2.jpg/250px-MarvelsSpiderMan2.jpg','Peter Parker y Miles Morales se unen para salvar Nueva York.');
/*!40000 ALTER TABLE `juegos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resenas`
--

DROP TABLE IF EXISTS `resenas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resenas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contenido` text NOT NULL,
  `calificacion` int NOT NULL,
  `usuario_id` int NOT NULL,
  `juego_id` int NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `recomienda` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `juego_id` (`juego_id`),
  CONSTRAINT `resenas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resenas_ibfk_2` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resenas`
--

LOCK TABLES `resenas` WRITE;
/*!40000 ALTER TABLE `resenas` DISABLE KEYS */;
INSERT INTO `resenas` VALUES (1,'muy bien',5,11,2,'2026-04-20 03:37:54',1),(2,'excelente por mi parte ',10,11,1,'2026-04-20 03:39:42',1),(3,'muy malo',1,11,2,'2026-04-20 03:40:36',1),(4,'uff',7,11,3,'2026-04-20 03:43:46',1),(5,'añadido a favoritos ',6,11,3,'2026-04-20 04:00:00',1),(6,'algo bien',5,11,2,'2026-04-20 04:31:03',1),(7,'excelente fifa 2026',9,12,10,'2026-04-20 04:32:30',1),(8,'ni',5,12,3,'2026-04-20 04:47:30',1),(9,'m',5,12,3,'2026-04-20 04:51:31',1),(10,'subcdjn',5,11,3,'2026-04-20 22:41:51',NULL),(11,'si',5,11,2,'2026-04-20 22:54:24',NULL),(12,'Ta chido si sale mbappe',7,11,10,'2026-04-20 22:56:49',NULL),(13,'prueba mil',7,11,3,'2026-04-21 01:42:26',NULL),(14,'m',5,13,2,'2026-04-21 01:44:27',NULL),(15,'si',10,13,1,'2026-04-21 01:55:22',NULL),(16,'bien',10,13,3,'2026-04-21 01:55:32',NULL),(17,'d',9,13,3,'2026-04-21 01:57:03',NULL),(18,'excelnte ',4,13,14,'2026-04-21 02:21:39',NULL),(19,'a',10,13,3,'2026-04-21 02:43:02',NULL),(20,'s',10,13,6,'2026-04-21 02:43:54',NULL),(21,'ALGO BIEN',10,13,3,'2026-04-21 02:52:19',NULL),(22,'jola',10,13,2,'2026-04-21 02:57:42',NULL),(23,'no',10,13,3,'2026-04-21 03:05:23',NULL),(24,'si',10,11,2,'2026-04-21 03:16:31',NULL),(25,'noa',10,13,4,'2026-04-21 03:50:38',1),(26,'m',10,14,12,'2026-04-21 04:11:59',1),(27,'si',1,14,4,'2026-04-21 04:28:07',1),(28,'Muy buen juego y muy buena experiencia ',10,18,5,'2026-04-21 18:21:47',1);
/*!40000 ALTER TABLE `resenas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_gamer` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'andres','andres@gmail.com','$2b$10$BQHnnlOUHaEvTYwjgBYNxesLwDianRqP5ZGRlpTmDmYQT0fS1ypgC','2026-03-02 01:18:18'),(2,'jose','jose@gmail.com','$2b$10$2M3xSyqJ5o2.28hCXiNEs.o6OoDWf7FOABz1CtQYayZ2p029nI.T2','2026-03-06 04:08:48'),(3,'pepe','pepe@gmail.com','$2b$10$TlesgVPm8DZTtcwZDSEHUObzdawPbfeDBukmUKIU/jmNUiHaVZm3a','2026-03-06 04:09:36'),(4,'cano777','cano@gmail.com','$2b$10$7iTCDJeGJlrE9jSRxO9i3eKrw5DOLK7hO00V7N01ZZpZW3fEkx4pS','2026-03-06 18:20:57'),(5,'Gamer 1','prueba@gmail.com','$2b$10$Z1Osi0I1HNi.zCYNpAL/YOVE//K3X7LwUulz3530I4sEsldJbrrTq','2026-04-15 19:21:02'),(10,'juancagamer','juanca@gmail.com','$2b$10$CaOjV3TkRAuQPKVaOUybPuNVr8wVx9RWGsFGAd2.0YWvP0ZaLPLM6','2026-04-16 22:28:55'),(11,'andy','andy@gmail.com','$2b$10$Sgb9CDJxjJOX1YvUt1cE2e0ZImHvfdpBEewYieWAF.r0MdLgEn6Ga','2026-04-20 03:37:15'),(12,'yo','yo@gmail.com','$2b$10$Q10/dRPIjb.F.ms5w2qM1./02tgs4IwjHkD9ShsCIOAZAqAYZV8km','2026-04-20 04:31:56'),(13,'westcol','westcol@gmail.com','$2b$10$EPkIp/ZoKzvbds7eXxf1k.ZUdrjEATcwsf.vJL8MkxXxRmWKy8BLu','2026-04-21 01:43:53'),(14,'admin','admin@gmail.com','$2b$10$MaIZ/TOkIgb.3i3yp.6kheb6zgNsMlGUEnE2sgjEwTBmwSfjpoUIq','2026-04-21 04:10:34'),(15,'admin2','admin2@gmail.com','$2b$10$6A..rCDIfoUApthqGQqu8u4I46tdQNtSfGQDC9cDcx5GMmTPKwqje','2026-04-21 06:14:00'),(16,'m','m@gmail.com','$2b$10$SfcO7dV1mT5Kxyl/2grUvuEjS3ItfilzCNgHl3qtg3BfIzDR3zhEq','2026-04-21 06:22:13'),(17,'yomero','yomero@gmail.com','$2b$10$fSfBu0czl9UT0jAEjbowge6S12LQIMv1lDCesmfNohJ7PlEH3yJI2','2026-04-21 15:38:38'),(18,'karla','karla@gmail.com','$2b$10$.OGkzqXNmysNXJ2J.oar1e32YzThi8ZkSf.a0EZb/XCslel6CdhAS','2026-04-21 18:19:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-23 21:14:26
