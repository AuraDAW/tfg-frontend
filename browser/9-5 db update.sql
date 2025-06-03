-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: teambuilder-tfg
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `abilities`
--

DROP TABLE IF EXISTS `abilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abilities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abilities`
--

LOCK TABLES `abilities` WRITE;
/*!40000 ALTER TABLE `abilities` DISABLE KEYS */;
INSERT INTO `abilities` VALUES (2,'stall','The Pokémon moves after\neven slower foes.'),(3,'rock-head','Protects the Pokémon from recoil damage.'),(4,'power-of-alchemy','The Pokémon copies the Ability of a defeated ally.'),(5,'teravolt','Moves can be used\nregardless of Abilities.'),(6,'punk-rock','Boosts the power of sound-based moves.\nThe Pokémon also takes half the damage from\nthese kinds of moves.'),(7,'berserk','Boosts the Pokémon’s Sp. Atk stat when it takes a \nhit that causes its HP to become half or less.'),(8,'desolate-land','Affects weather and nullifies any\nWater-type attacks.'),(9,'rattled','Some move types scare\nit and boost its Speed.'),(10,'soul-heart','Boosts its Sp. Atk stat every time a Pokémon faints.'),(11,'swarm','Ups BUG moves in a pinch.'),(12,'primordial-sea','Affects weather and nullifies any\nFire-type attacks.'),(13,'guard-dog','Boosts the Pokémon’s Attack stat if intimidated. Moves and items that would force the Pokémon to switch out also fail to work.'),(14,'purifying-salt','The Pokémon\'s pure salt protects it from status conditions and halves the damage taken from Ghost-type moves.'),(15,'hospitality','When the Pokémon enters a battle, it showers its ally with hospitality, restoring a small amount of the ally\'s HP'),(16,'color-change','Changes type to foe’s move.'),(17,'battery','Powers up ally Pokémon’s special moves.'),(18,'cotton-down','When the Pokémon is hit by an attack, it scatters\ncotton fluff around and lowers the Speed stat of\nall Pokémon except itself.'),(19,'motor-drive','Raises Speed if hit by an\nElectric-type move.'),(20,'stall','The Pokémon moves after\neven slower foes.'),(21,'good-as-gold','A body of pure, solid gold gives the Pokémon full immunity to other Pokémon\'s status moves.');
/*!40000 ALTER TABLE `abilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'hearthflame-mask','No description found.',NULL),(2,'eviolite','A mysterious evolutionary lump. When\nheld, it raises the Defense and Sp. Def\nof a Pokémon that can still evolve.',NULL),(3,'black-sludge','A hold item that gradually restores\nthe HP of Poison-type Pokémon.\nIt inflicts damage on all other types.',NULL),(4,'metronome','A Pokémon hold item that boosts a move\nused consecutively. Its effect is\nreset if another move is used.',NULL),(5,'fairy-feather','No description found.',NULL),(6,'assault-vest','An item to be held by a Pokémon.\nThis offensive vest raises Sp. Def\nbut prevents the use of status moves.',NULL),(7,'big-root','A Pokémon hold item that boosts the\npower of HP-stealing moves to let the\nholder recover more HP.',NULL),(9,'scope-lens','A hold item that\nraises the critical-\nhit rate.',NULL),(10,'ability-shield','No description found.',NULL),(11,'muscle-band','An item to be held by a Pokémon.\nIt is a headband that slightly boosts\nthe power of physical moves.',NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moves`
--

DROP TABLE IF EXISTS `moves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `power` varchar(45) DEFAULT NULL,
  `accuracy` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `moves_type_idx` (`type`),
  CONSTRAINT `moves_type` FOREIGN KEY (`type`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moves`
--

LOCK TABLES `moves` WRITE;
/*!40000 ALTER TABLE `moves` DISABLE KEYS */;
INSERT INTO `moves` VALUES (1,'stealth-rock','The user lays a trap\nof levitating stones\naround the foe. The\ntrap hurts foes that\nswitch into battle.',6,NULL,NULL),(2,'defog','Obstacles are moved,\nreducing the foe’s\nevasion stat. It can\nalso be used to\nclear deep fog, etc.',3,NULL,NULL),(3,'extreme-speed','A powerful first-\nstrike move.',1,'80','100'),(4,'poltergeist','The user attacks the target by controlling the target’s\nitem. The move fails if the target doesn’t have an item.',8,'110','90'),(5,'scald','The user shoots boiling hot water at\nits target. It may also leave the target\nwith a burn.',11,'80','100'),(6,'make-it-rain','The user attacks by throwing out a mass of coins. This also lowers the user\'s Sp. Atk stat. Money is earned after the battle.',9,'120','100'),(7,'earthquake','Tough but useless\nvs. flying foes.',5,'100','100'),(8,'u-turn','After making its\nattack, the user\nrushes back to switch\nplaces with a party\nPokémon in waiting.',7,'70','100'),(9,'swords-dance','A dance that in­\ncreases ATTACK.',1,NULL,NULL),(10,'stone-edge','The user stabs the\nfoe with a sharpened\nstone. It has a high\ncritical-hit ratio.\n',6,'100','80'),(11,'knock-off','Knocks down the foe’s held\nitem to prevent its use.',17,'65','100'),(12,'toxic','A poison move with\nincreasing damage.',4,NULL,'90'),(13,'draco-meteor','Comets are summoned\ndown from the sky.\nThe attack’s recoil\nsharply reduces the\nuser’s Sp. Atk stat.',16,'130','90');
/*!40000 ALTER TABLE `moves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_data`
--

DROP TABLE IF EXISTS `pokemon_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pokedex_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `image` varchar(255) NOT NULL,
  `image_shiny` varchar(255) NOT NULL,
  `type` int NOT NULL,
  `type_2` int DEFAULT NULL,
  `base_atk` int NOT NULL,
  `base_spatk` int NOT NULL,
  `base_def` int NOT NULL,
  `base_spdef` int NOT NULL,
  `base_spd` int NOT NULL,
  `base_hp` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pokedex_id_UNIQUE` (`pokedex_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `type_idx` (`type`,`type_2`),
  KEY `pokemon_data_type2_idx` (`type_2`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_data`
--

LOCK TABLES `pokemon_data` WRITE;
/*!40000 ALTER TABLE `pokemon_data` DISABLE KEYS */;
INSERT INTO `pokemon_data` VALUES (4,422,'shellos','422.png','422.png',11,NULL,48,57,48,62,34,76),(5,478,'froslass','478.png','478.png',15,8,80,80,70,70,110,70),(6,249,'lugia','249.png','249.png',14,3,90,90,130,154,110,106),(7,958,'tinkatuff','958.png','958.png',18,9,55,45,55,82,78,65),(8,876,'indeedee-male','876.png','876.png',14,1,65,105,55,95,95,60),(9,369,'relicanth','369.png','369.png',11,6,90,45,130,65,55,100),(10,1007,'koraidon','1007.png','1007.png',2,16,135,85,115,100,135,100),(11,563,'cofagrigus','563.png','563.png',8,NULL,50,95,145,105,30,58),(12,623,'golurk','623.png','623.png',5,8,124,55,80,80,55,89),(13,1021,'raging-bolt','1021.png','1021.png',13,16,73,137,91,89,75,125),(14,383,'groudon','383.png','383.png',5,NULL,150,100,140,90,90,100),(15,681,'aegislash-shield','681.png','681.png',9,8,50,50,140,140,60,60),(16,215,'sneasel','215.png','215.png',17,15,95,35,55,75,115,55),(17,573,'cinccino','573.png','573.png',1,NULL,95,65,60,60,115,75),(18,259,'marshtomp','259.png','259.png',11,5,85,60,70,70,50,70),(19,367,'huntail','367.png','367.png',11,NULL,104,94,105,75,52,55),(20,892,'urshifu-single-strike','892.png','892.png',2,17,130,63,100,60,97,100),(21,393,'piplup','393.png','393.png',11,NULL,51,61,53,56,40,53),(22,21,'spearow','21.png','21.png',1,3,60,31,30,31,70,40);
/*!40000 ALTER TABLE `pokemon_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_has_ability`
--

DROP TABLE IF EXISTS `pokemon_has_ability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_has_ability` (
  `id_pokemon` int NOT NULL,
  `id_ability` int NOT NULL,
  PRIMARY KEY (`id_pokemon`,`id_ability`),
  KEY `id_ability_idx` (`id_ability`),
  CONSTRAINT `fk_pokemon_has_ability_ability` FOREIGN KEY (`id_ability`) REFERENCES `abilities` (`id`),
  CONSTRAINT `fk_pokemon_has_ability_pokemon` FOREIGN KEY (`id_pokemon`) REFERENCES `pokemon_data` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_has_ability`
--

LOCK TABLES `pokemon_has_ability` WRITE;
/*!40000 ALTER TABLE `pokemon_has_ability` DISABLE KEYS */;
/*!40000 ALTER TABLE `pokemon_has_ability` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_learns_move`
--

DROP TABLE IF EXISTS `pokemon_learns_move`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_learns_move` (
  `id_pokemon` int NOT NULL,
  `id_move` int NOT NULL,
  PRIMARY KEY (`id_pokemon`,`id_move`),
  KEY `id_move_idx` (`id_move`),
  CONSTRAINT `fk_plm_move` FOREIGN KEY (`id_move`) REFERENCES `moves` (`id`),
  CONSTRAINT `fk_plm_pokemon` FOREIGN KEY (`id_pokemon`) REFERENCES `pokemon_data` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_learns_move`
--

LOCK TABLES `pokemon_learns_move` WRITE;
/*!40000 ALTER TABLE `pokemon_learns_move` DISABLE KEYS */;
/*!40000 ALTER TABLE `pokemon_learns_move` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pokemon_team`
--

DROP TABLE IF EXISTS `pokemon_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon_team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pokemon` int DEFAULT NULL,
  `move_1` int DEFAULT NULL,
  `move_2` int DEFAULT NULL,
  `move_3` int DEFAULT NULL,
  `move_4` int DEFAULT NULL,
  `ability` int DEFAULT NULL,
  `item` int DEFAULT NULL,
  `iv_atk` int DEFAULT '31',
  `iv_spatk` int DEFAULT '31',
  `iv_def` int DEFAULT '31',
  `iv_spdef` int DEFAULT '31',
  `iv_spd` int DEFAULT '31',
  `iv_hp` int DEFAULT '31',
  `ev_atk` int DEFAULT '0',
  `ev_spatk` int DEFAULT '0',
  `ev_def` int DEFAULT '0',
  `ev_spdef` int DEFAULT '0',
  `ev_spd` int DEFAULT '0',
  `ev_hp` int DEFAULT '0',
  `is_shiny` tinyint DEFAULT '0',
  `tera_type` int DEFAULT NULL,
  `level` int DEFAULT '100',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_pokemon_idx` (`id_pokemon`),
  KEY `ability_idx` (`ability`),
  KEY `item_idx` (`item`),
  KEY `move_1_idx` (`move_1`,`move_2`,`move_3`,`move_4`),
  KEY `ERROR 1822: Failed to add the foreign key constraint. Missi_idx` (`move_2`),
  KEY `pokemon_team_move_3_idx` (`move_3`),
  KEY `pokemon_team_move_4_idx` (`move_4`),
  CONSTRAINT `ability` FOREIGN KEY (`ability`) REFERENCES `abilities` (`id`),
  CONSTRAINT `id_pokemon` FOREIGN KEY (`id_pokemon`) REFERENCES `pokemon_data` (`id`),
  CONSTRAINT `item` FOREIGN KEY (`item`) REFERENCES `items` (`id`),
  CONSTRAINT `pokemon_team_move_1` FOREIGN KEY (`move_1`) REFERENCES `moves` (`id`),
  CONSTRAINT `pokemon_team_move_2` FOREIGN KEY (`move_2`) REFERENCES `moves` (`id`),
  CONSTRAINT `pokemon_team_move_3` FOREIGN KEY (`move_3`) REFERENCES `moves` (`id`),
  CONSTRAINT `pokemon_team_move_4` FOREIGN KEY (`move_4`) REFERENCES `moves` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_team`
--

LOCK TABLES `pokemon_team` WRITE;
/*!40000 ALTER TABLE `pokemon_team` DISABLE KEYS */;
INSERT INTO `pokemon_team` VALUES (1,10,7,8,9,11,21,6,31,31,31,31,31,31,252,0,0,0,4,252,0,10,100),(2,14,1,7,9,10,8,10,31,0,31,31,31,31,252,0,4,0,252,0,1,10,100),(12,13,1,1,1,1,2,1,31,31,31,31,31,31,0,0,0,0,0,0,0,1,100),(13,15,6,11,12,2,12,2,31,31,31,31,31,31,0,0,252,0,252,0,0,9,100),(14,18,5,12,2,1,11,1,31,31,31,31,31,31,0,0,0,0,0,0,0,1,100),(15,11,4,8,1,12,14,4,31,31,31,31,31,31,0,0,0,0,0,0,1,11,100),(17,6,1,6,4,12,12,4,31,31,31,31,31,31,0,0,0,0,0,0,0,11,100),(18,4,1,1,1,1,2,1,31,31,31,31,31,31,0,0,0,0,0,0,0,1,100),(19,4,1,1,1,1,2,1,31,31,31,31,31,31,0,0,0,0,0,0,0,1,100),(20,17,3,7,1,12,15,5,31,31,31,31,31,31,0,0,0,0,0,0,0,12,100),(21,17,1,4,4,11,15,3,31,31,31,31,31,31,0,0,0,0,0,0,0,16,100),(22,12,2,7,3,10,6,2,31,31,31,31,31,31,0,0,0,0,0,0,1,1,100);
/*!40000 ALTER TABLE `pokemon_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rolename` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'User','User of the app');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `user_id` int NOT NULL,
  `pokemon_1` int DEFAULT NULL,
  `pokemon_2` int DEFAULT NULL,
  `pokemon_3` int DEFAULT NULL,
  `pokemon_4` int DEFAULT NULL,
  `pokemon_5` int DEFAULT NULL,
  `pokemon_6` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `pokemon_1_idx` (`pokemon_1`),
  KEY `pokemon_2_idx` (`pokemon_2`),
  KEY `pokemon_3_idx` (`pokemon_3`),
  KEY `pokemon_4_idx` (`pokemon_4`),
  KEY `pokemon_5_idx` (`pokemon_5`),
  KEY `pokemon_6_idx` (`pokemon_6`),
  CONSTRAINT `pokemon_1` FOREIGN KEY (`pokemon_1`) REFERENCES `pokemon_team` (`id`),
  CONSTRAINT `pokemon_2` FOREIGN KEY (`pokemon_2`) REFERENCES `pokemon_team` (`id`),
  CONSTRAINT `pokemon_3` FOREIGN KEY (`pokemon_3`) REFERENCES `pokemon_team` (`id`),
  CONSTRAINT `pokemon_4` FOREIGN KEY (`pokemon_4`) REFERENCES `pokemon_team` (`id`),
  CONSTRAINT `pokemon_5` FOREIGN KEY (`pokemon_5`) REFERENCES `pokemon_team` (`id`),
  CONSTRAINT `pokemon_6` FOREIGN KEY (`pokemon_6`) REFERENCES `pokemon_team` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Test Team','This team is used to test the application',1,1,2,14,13,NULL,19),(4,'Test editar equipos','El equipo ha sido editado correctamente v2',1,NULL,NULL,NULL,NULL,NULL,NULL),(5,'Testeando el userID (editado)','lol, lmao even',2,21,22,NULL,NULL,NULL,NULL),(8,'Empty team','This team has no pokemon',2,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ability_id` int DEFAULT NULL,
  `language` enum('es','en') DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_small` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'normal','Normal.png','TeraNormal.png'),(2,'fighting','Fighting.png','TeraFighting.png'),(3,'flying','Flying.png','TeraFlying.png'),(4,'poison','Poison.png','TeraPoison.png'),(5,'ground','Ground.png','TeraGround.png'),(6,'rock','Rock.png','TeraRock.png'),(7,'bug','Bug.png','TeraBug.png'),(8,'ghost','Ghost.png','TeraGhost.png'),(9,'steel','Steel.png','TeraSteel.png'),(10,'fire','Fire.png','TeraFire.png'),(11,'water','Water.png','TeraWater.png'),(12,'grass','Grass.png','TeraGrass.png'),(13,'electric','Electric.png','TeraElectric.png'),(14,'psychic','Psychic.png','TeraPsychic.png'),(15,'ice','Ice.png','TeraIce.png'),(16,'dragon','Dragon.png','TeraDragon.png'),(17,'dark','Dark.png','TeraDark.png'),(18,'fairy','Fairy.png','TeraFairy.png'),(19,'stellar','Stellar.png','TeraStellar.png');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `name_UNIQUE` (`username`),
  KEY `role_idx` (`role`),
  CONSTRAINT `role` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Aura','aguemar696@g.educaand.es','aguemar696',1),(2,'Usuario Test','test@gmail.com','$2a$10$h9IERsHaUdLWmNGTm6HUp.y7upklRjZotVmv9MnyqH8C3YJ2BK1Oq',1),(3,NULL,'pepito@gmail.com','$2a$10$FCEBSsDyyihQ6rghVvCqs.MZUEY3ioDFdngDUAd9PAlI2wOXR/kRu',1),(4,'Pepe','pepito2@gmail.com','$2a$10$P1tgT.aqMH.vY2hUfrecg.cEjOCs4Y6VR8HWknEzLopn13N37ZnXm',1),(5,'Registrarse','test@registrarse','$2a$10$.A8C1dIq/8jTXseJ./qw3u8GKPvCAvpsiqV07G5M2V.4kCVUPBKGG',1);
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

-- Dump completed on 2025-05-09 14:08:01
