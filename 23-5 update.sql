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
  `name_en` varchar(45) DEFAULT NULL,
  `description_en` varchar(255) DEFAULT NULL,
  `name_es` varchar(45) DEFAULT NULL,
  `description_es` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abilities`
--

LOCK TABLES `abilities` WRITE;
/*!40000 ALTER TABLE `abilities` DISABLE KEYS */;
INSERT INTO `abilities` VALUES (2,'Stall','The Pokemon is always the last to use its moves','Rezagado','Este pokemon es siempre el último en usar sus movimientos.'),(3,'Rock Head','Protects the Pokemon from recoil damage','Cabeza Roca','Protege al Pokemon de daño de retroceso.'),(4,'Power Of Alchemy','The Pokémon copies the Ability of a defeated ally','Reacción Química','El Pokemon copia la Habilidad de un aliado debilitado'),(5,'Teravolt','The Pokémon\'s moves are unimpeded by the Ability of the target','Terravoltaje','Los movimientos de este Pokemon ignoran la habilidad del objetivo'),(6,'Punk Rock','Boosts the power of sound-based moves. The Pokémon also takes half the damage from these kinds of moves','Punk Rock','Aumenta el poder de movimientos basados en sonido. El Pokemon también recibe la mitad de daño de ese tipo de movimientos.'),(7,'Berserk','Boosts the Pokémon\'s Sp. Atk stat when it takes a hit that causes its HP to drop to half or less','Cólera','Aumenta el Ataque Especial del Pokemon cuando recibe un golpe que causa su HP a bajar a menos de la mitad.'),(8,'Desolate Land','The Pokémon changes the weather to nullify Water-type attacks','Tierra Del Ocaso','Este Pokemon cambia el tiempo para impedir el uso de movimientos de tipo Agua'),(9,'Rattled','The Pokémon gets scared when hit by a Dark-, Ghost-, or Bug-type attack or if intimidated, which boosts its Speed stat','Cobardía','Este Pokemon es asustado cuando es golpeado por movimientos de tipo Siniestro, Fantasma o Bicho, o si es intimiado, lo cual aumenta su Velocidad'),(10,'Soul Heart','Boosts the Pokémon\'s Sp. Atk stat every time another Pokémon faints','Coránima','Aumenta el Ataque Especial del Pokemon cada vez que otro Pokemon se debilita.'),(11,'Swarm','Powers up Bug-type moves when the Pokémon\'s HP is low','Enjambre','Aumenta el poder de los movimientos de tipo Bicho cuando la HP del Pokemon es baja'),(12,'Primordial Sea','The Pokemon changes the weather to nullify Fire-type attacks','Mar Del Albor','Este Pokemon cambia el tiempo para impedir el uso de movimientos de tipo Fuego'),(13,'Guard Dog','Boosts the Pokémon’s Attack stat if intimidated. Moves and items that would force the Pokémon to switch out also fail to work','Perro Guardián','Aumenta el Ataque del Pokemon si es intimidado. Movimientos y objetos que obligarían al Pokemon a cambiar no funcionarán'),(14,'Purifying Salt','The Pokémon\'s pure salt protects it from status conditions and halves the damage taken from Ghost-type moves','Sal Purificadora','El cuerpo de sal del Pokemon lo protege de efectos de estado y reduce el daño recibido de movimientos de tipo Fantasma a la mitad'),(15,'Hospitality','When the Pokémon enters a battle, it showers its ally with hospitality, restoring a small amount of the ally\'s HP','Hospitalidad','Cuando el Pokemon entra a una batalla, baña a su aliado con hospitalidad, curando una pequeña parte de su HP'),(16,'Color Change','The Pokémon\'s type becomes the type of the move used on it','Cambio Color','Adopta el tipo del último movimiento que ha recibido'),(17,'Battery','Powers up ally Pokémon\'s special moves.','Batería','Aumenta el poder de los movimientos especiales de un aliado'),(18,'Cotton Down','When the Pokémon is hit by an attack, it scatters cotton fluff around and lowers the Speed stats of all Pokémon except itself','Pelusa','Cuando el Pokemon es golpeado por un ataque, esparce pelusas de algodón que bajan la Velocidad de todos los Pokemon exceptuando él mismo'),(19,'Motor Drive','The Pokémon takes no damage when hit by Electric-type moves. Instead, its Speed stat is boosted','Electromotor','El Pokemon incrementa su Velocidad en lugar de recibir daño cuando es golpeado por movimientos de tipo Eléctrico'),(21,'Good As Gold','A body of pure, solid gold gives the Pokémon full immunity to other Pokémon\'s status moves','Cuerpo Áureo','Un cuerpo de puro, sólido oro le da al Pokemon completa inmunidad a los movimientos de Estado de otros Pokemon');
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
  `name_en` varchar(45) DEFAULT NULL,
  `description_en` varchar(255) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `name_es` varchar(45) DEFAULT NULL,
  `description_es` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'Hearthflame Mask','An item to be held by Ogerpon. This carved wooden mask is adorned with crystals and allows Ogerpon to wield the Fire type during battle',NULL,'Máscara Horno','Un objeto a ser llevado por Ogerpon. Esta máscara de madera esta adornada con cristales y permite a Ogerpon utilizar el tipo Fuego durante una batalla'),(2,'Eviolite','This mysterious evolutionary lump boosts the Defense and Sp. Def stats when held by a Pokémon that can still evolve',NULL,'Mineral Evol','Este misterioso bulto evolutivo aumenta las estadísticas de Defensa y Sp. Def cuando lo sujeta un Pokémon que aún puede evolucionar'),(3,'Black Sludge','If the holder is a Poison type, this sludge will gradually restore its HP. It damages any other type.',NULL,'Lodo Negro','Si el portador es de tipo Veneno, este lodo restablecerá gradualmente su HP. Daña a cualquier otro tipo.'),(4,'Metronome','It boosts the power of a move that\'s used repeatedly. Once the chain is broken, the move\'s power returns to normal',NULL,'Metrónomo',' Aumenta el poder de un movimiento que se utiliza repetidamente. Si se utiliza otro movimiento, el poder del movimiento vuelve a la normalidad'),(5,'Fairy Feather','This feather, which gleams faintly when hit by light, boosts the power of the holder\'s Fairy-type moves.',NULL,'Pluma Feérica','Esta pluma, que brilla tenuemente al ser alcanzada por la luz, potencia los movimientos de tipo Hada del portador.'),(6,'Assault Vest','This offensive vest boosts the holder\'s Sp. Def stat but prevents the use of status moves',NULL,'Chaleco Asalto','Este chaleco ofensivo aumenta la Sp. Def, pero impide el uso de movimientos de estado'),(7,'Big Root','This root boosts the amount of HP the holder restores to itself when it uses HP-stealing moves',NULL,'Raíz Grande','Esta raíz aumenta la cantidad de HP	que el poseedor se restaura a sí mismo cuando utiliza movimientos que le roban HP.'),(9,'Scope Lens','It\'s a lens for scoping out weak points. It boosts the holder\'s critical-hit ratio',NULL,'Periscopio','Es una lente para detectar puntos débiles. Aumenta el porcentaje de golpes críticos del portador'),(10,'Ability Shield','This cute and rather unique-looking shield protects the holder from having its Ability changed by others',NULL,'Escudo Habilidad','Este simpático escudo, de aspecto bastante singular, protege al portedor para que otros no modifiquen su habilidad.'),(11,'Choice Band','This curious headband boosts the holder\'s Attack stat but only allows the use of a single move',NULL,'Cinta Elección','Esta curiosa cinta aumenta el Ataque del portador, pero solo permite el uso de un único movimiento'),(15,'aaaa','eeeeeeee','Dream_Choice_Specs_Sprite.png','ccccccc','fffffffff');
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
  `name_en` varchar(45) DEFAULT NULL,
  `description_en` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `power` varchar(45) DEFAULT NULL,
  `accuracy` varchar(45) DEFAULT NULL,
  `name_es` varchar(45) DEFAULT NULL,
  `description_es` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `moves_type_idx` (`type`),
  CONSTRAINT `moves_type` FOREIGN KEY (`type`) REFERENCES `types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moves`
--

LOCK TABLES `moves` WRITE;
/*!40000 ALTER TABLE `moves` DISABLE KEYS */;
INSERT INTO `moves` VALUES (1,'Stealth Rock','The user lays a trap of levitating stones around the opposing team. The trap damages opposing Pokémon that switch into battle',6,NULL,NULL,'Trampa Rocas','El usuario coloca una trampa de piedras levitantes alrededor del equipo contrario. La trampa daña a los Pokémon rivales que entran en combate.'),(2,'Defog','A strong wind blows away the target\'s barriers such as Reflect or Light Screen. This also lowers the target\'s evasiveness',3,NULL,NULL,'Despejar','Un fuerte viento que barre el Reflejo o Pantalla de Luz del objetivo. También reduce la Evasión del objetivo'),(3,'Extreme Speed','The user charges the target at blinding speed. This move always goes first',1,'80','100','Veloc. Extrema','Ataque a una velocidad extrema. Este movimiento tiene alta prioridad'),(4,'Poltergeist','The user attacks the target by controlling the target’s item. The move fails if the target doesn’t have an item',8,'110','90','Poltergeist','El usuario ataca utilizando el objeto que lleva el rival. Si no tiene ninguno equipado, el movimiento falla'),(5,'Scald','The user attacks by shooting boiling hot water at the target. This may also leave the target with a burn.',11,'80','100','Escaldar','Ataca arrojando agua hirviendo al objetivo. Puede causar quemaduras.'),(6,'Make It Rain','The user attacks by throwing out a mass of coins. This also lowers the user\'s Sp. Atk stat. Money is earned after the battle.',9,'120','100','Fiebre Dorada','Ataca lanzando monedas al objetivo. Reduce el Ataque Especial del usuario. Se obtiene dinero después de la batalla.'),(7,'Earthquake','The user sets off an earthquake that strikes every Pokémon around it.',5,'100','100','Terremoto','Un terremoto que afecta a los Pokémon de alrededor en combate.'),(8,'U-Turn','After making its attack, the user rushes back to switch places with a party Pokémon in waiting.',7,'70','100','Ida Y Vuelta','Tras atacar, vuelve a toda prisa para dar paso a otro Pokémon del equipo.'),(9,'Swords Dance','A frenetic dance to uplift the fighting spirit. This sharply boosts the user\'s Attack stat.',1,NULL,NULL,'Danza Espada','Baile frenético que aumenta mucho el Ataque.'),(10,'Stone Edge','The user stabs the target with sharpened stones. This move has a heightened chance of landing a critical hit.',6,'100','80','Roca Afilada','Clava al objetivo con piedras muy afiladas. Suele ser crítico.'),(11,'Knock Off','The user slaps down the target\'s held item, making it unusable for that battle. This move does more damage if the target has a held item.',17,'65','100','Desarme','Impide al objetivo usar el objeto que lleva durante el combate. La potencia del movimiento se multiplica si el objetivo lleva un objeto.'),(12,'Toxic','A move that leaves the target badly poisoned. Its poison damage worsens every turn.',4,NULL,'90','Tóxico','Envenena gravemente al objetivo y causa un daño mayor en cada turno.'),(13,'Draco Meteor','Comets are summoned down from the sky onto the target. The recoil from this move harshly lowers the user’s Sp. Atk stat.',16,'130','90','Cometa Draco','Hace que grandes cometas caigan del cielo sobre el objetivo. Baja mucho el Ataque Especial del usuario.'),(14,'Flamethrower','The target is scorched with an intense blast of fire. This may also leave the target with a burn.',10,'90','100','Lanzallamas','Ataca con una gran ráfaga de fuego que puede causar quemaduras.');
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
  `name_en` varchar(45) NOT NULL,
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
  `name_es` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pokedex_id_UNIQUE` (`pokedex_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `type_idx` (`type`,`type_2`),
  KEY `pokemon_data_type2_idx` (`type_2`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_data`
--

LOCK TABLES `pokemon_data` WRITE;
/*!40000 ALTER TABLE `pokemon_data` DISABLE KEYS */;
INSERT INTO `pokemon_data` VALUES (4,422,'Shellos','422.png','422.png',11,NULL,48,57,48,62,34,76,'Shellos'),(5,478,'Froslass','478.png','478.png',15,8,80,80,70,70,110,70,'Froslass'),(6,249,'Lugia','249.png','249.png',14,3,90,90,130,154,110,106,'Lugia'),(7,958,'Tinkatuff','958.png','958.png',18,9,55,45,55,82,78,65,'Tinkatuff'),(8,876,'Indeedee','876.png','876.png',14,1,65,105,55,95,95,60,'Indeedee'),(9,369,'Relicanth','369.png','369.png',11,6,90,45,130,65,55,100,'Relicanth'),(10,1007,'Koraidon','1007.png','1007.png',2,16,135,85,115,100,135,100,'Koraidon'),(11,563,'Cofagrigus','563.png','563.png',8,NULL,50,95,145,105,30,58,'Cofagrigus'),(12,623,'Golurk','623.png','623.png',5,8,124,55,80,80,55,89,'Golurk'),(13,1021,'Raging Bolt','1021.png','1021.png',13,16,73,137,91,89,75,125,'Electrofuria'),(14,383,'Groudon','383.png','383.png',5,NULL,150,100,140,90,90,100,'Groudon'),(15,681,'Aegislash','681.png','681.png',9,8,50,50,140,140,60,60,'Aegislash'),(16,215,'Sneasel','215.png','215.png',17,15,95,35,55,75,115,55,'Sneasel'),(17,573,'Cinccino','573.png','573.png',1,NULL,95,65,60,60,115,75,'Cinccino'),(18,259,'Marshtomp','259.png','259.png',11,5,85,60,70,70,50,70,'Marshtomp'),(19,367,'Huntail','367.png','367.png',11,NULL,104,94,105,75,52,55,'Huntail'),(20,892,'Urshifu','892.png','892.png',2,17,130,63,100,60,97,100,'Urshifu'),(21,393,'Piplup','393.png','393.png',11,NULL,51,61,53,56,40,53,'Piplup'),(22,21,'Spearow','21.png','21.png',1,3,60,31,30,31,70,40,'Spearow'),(24,69420,'Apocalyptus','383.png','383.png',16,17,120,120,100,100,100,130,'Apocalyptus'),(25,99999,'probando subir imagen','guia formulario crear pokemon.png','681.png',1,11,5,5,5,5,210,5,'probando subir imagen');
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
INSERT INTO `pokemon_has_ability` VALUES (4,2),(10,8),(4,16);
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
INSERT INTO `pokemon_learns_move` VALUES (4,1),(10,1),(4,3),(10,3),(4,5),(10,7),(4,8),(10,9),(4,12);
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon_team`
--

LOCK TABLES `pokemon_team` WRITE;
/*!40000 ALTER TABLE `pokemon_team` DISABLE KEYS */;
INSERT INTO `pokemon_team` VALUES (1,10,7,8,9,11,21,6,31,31,31,31,31,31,252,0,0,0,4,252,0,10,100),(2,14,1,7,9,10,8,10,31,0,31,31,31,31,252,0,4,0,252,0,1,10,100),(12,13,1,1,1,1,2,1,31,31,31,31,31,31,0,0,0,0,0,0,0,1,100),(13,15,6,11,12,2,12,2,31,31,31,31,31,31,0,0,252,0,252,0,0,9,100),(14,18,5,12,2,1,11,1,31,31,31,31,31,31,0,0,0,0,0,0,0,1,100),(15,11,4,8,1,12,14,4,31,31,31,31,31,31,0,0,0,0,0,0,1,11,100),(17,6,1,6,4,12,12,4,31,31,31,31,31,31,0,0,0,0,0,0,0,11,100),(18,4,1,1,1,1,2,1,31,31,31,31,31,31,0,0,0,0,0,0,0,1,100),(19,4,1,1,1,1,2,1,31,31,31,31,31,31,0,0,0,0,0,0,0,1,100),(20,17,3,7,1,12,15,5,31,31,31,31,31,31,0,0,0,0,0,0,0,12,100),(21,17,1,4,4,11,15,3,31,31,31,31,31,31,0,0,0,0,0,0,0,16,100),(22,12,2,7,3,10,6,2,31,31,31,31,31,31,0,0,0,0,0,0,1,1,100),(23,13,1,8,13,5,13,9,31,31,31,31,31,31,0,0,0,0,0,0,1,19,100),(24,10,3,7,9,1,8,11,31,0,31,31,31,31,252,0,0,0,0,6,1,16,100),(25,4,1,1,1,1,2,1,31,31,31,31,31,31,0,0,0,0,0,0,0,1,100);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'User','User of the app'),(2,'Admin','Administrator of the application');
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
  `favorited` tinyint DEFAULT '0',
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES (1,'Test Team','This team is used to test the application',1,1,2,14,13,NULL,19,0),(4,'Test editar equipos','El equipo ha sido editado correctamente v2',1,NULL,NULL,NULL,NULL,NULL,NULL,0),(5,'Testeando el userID (editado)','usa el userID correctamente',2,21,22,23,24,NULL,NULL,0),(8,'Empty team','This team has no pokemon',2,NULL,NULL,NULL,NULL,NULL,NULL,0);
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
  `name_en` varchar(45) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_small` varchar(255) DEFAULT NULL,
  `name_es` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'Normal','Normal.png','TeraNormal.png','Normal'),(2,'Fighting','Fighting.png','TeraFighting.png','Lucha'),(3,'Flying','Flying.png','TeraFlying.png','Volador'),(4,'Poison','Poison.png','TeraPoison.png','Veneno'),(5,'Ground','Ground.png','TeraGround.png','Tierra'),(6,'Rock','Rock.png','TeraRock.png','Roca'),(7,'Bug','Bug.png','TeraBug.png','Bicho'),(8,'Ghost','Ghost.png','TeraGhost.png','Fantasma'),(9,'Steel','Steel.png','TeraSteel.png','Acero'),(10,'Fire','Fire.png','TeraFire.png','Fuego'),(11,'Water','Water.png','TeraWater.png','Agua'),(12,'Grass','Grass.png','TeraGrass.png','Planta'),(13,'Electric','Electric.png','TeraElectric.png','Eléctrico'),(14,'Psychic','Psychic.png','TeraPsychic.png','Psiquico'),(15,'Ice','Ice.png','TeraIce.png','Hielo'),(16,'Dragon','Dragon.png','TeraDragon.png','Dragón'),(17,'Dark','Dark.png','TeraDark.png','Siniestro'),(18,'Fairy','Fairy.png','TeraFairy.png','Hada'),(19,'Stellar','Stellar.png','TeraStellar.png','Astral');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Aura','aguemar696@g.educaand.es','aguemar696',1),(2,'Usuario Test','test@gmail.com','$2a$10$h9IERsHaUdLWmNGTm6HUp.y7upklRjZotVmv9MnyqH8C3YJ2BK1Oq',1),(3,NULL,'pepito@gmail.com','$2a$10$FCEBSsDyyihQ6rghVvCqs.MZUEY3ioDFdngDUAd9PAlI2wOXR/kRu',1),(4,'Pepe','pepito2@gmail.com','$2a$10$P1tgT.aqMH.vY2hUfrecg.cEjOCs4Y6VR8HWknEzLopn13N37ZnXm',1),(5,'Registrarse','test@registrarse','$2a$10$.A8C1dIq/8jTXseJ./qw3u8GKPvCAvpsiqV07G5M2V.4kCVUPBKGG',1),(6,'admin','admin@gmail.com','$2a$10$Xbwq41deYk2Rvm8yeeRO5eSuAKdo5T0zZW/cgchA/EJhJz0qFvbu6',2);
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

-- Dump completed on 2025-05-23 14:51:37
