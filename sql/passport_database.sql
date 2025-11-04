-- MySQL dump 10.13  Distrib 9.4.0, for macos15 (arm64)
--
-- Host: localhost    Database: PassportDB
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `active_applications`
--

DROP TABLE IF EXISTS `active_applications`;
/*!50001 DROP VIEW IF EXISTS `active_applications`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `active_applications` AS SELECT 
 1 AS `ApplicationID`,
 1 AS `ApplicationDate`,
 1 AS `ApplicationType`,
 1 AS `Status`,
 1 AS `Priority`,
 1 AS `CitizenID`,
 1 AS `CitizenName`,
 1 AS `Email`,
 1 AS `Phone`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Admin_Users`
--

DROP TABLE IF EXISTS `Admin_Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin_Users` (
  `AdminID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PasswordHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FullName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Role` enum('Super Admin','Embassy Officer','Data Entry','Viewer') COLLATE utf8mb4_unicode_ci DEFAULT 'Viewer',
  `IsActive` tinyint(1) DEFAULT '1',
  `LastLogin` datetime DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`AdminID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin_Users`
--

LOCK TABLES `Admin_Users` WRITE;
/*!40000 ALTER TABLE `Admin_Users` DISABLE KEYS */;
INSERT INTO `Admin_Users` VALUES ('ADM001','admin','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','System Administrator','admin@passportdb.com','Super Admin',1,NULL,'2025-10-04 19:36:55'),('ADM002','mumbai_officer','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Suresh Kumar','suresh.mumbai@passportdb.com','Embassy Officer',1,'2025-10-05 09:30:00','2025-10-04 19:36:55'),('ADM003','delhi_officer','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Priya Singh','priya.delhi@passportdb.com','Embassy Officer',1,'2025-10-04 14:20:00','2025-10-04 19:36:55'),('ADM004','data_entry_1','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Amit Verma','amit.entry@passportdb.com','Data Entry',1,'2025-10-05 10:00:00','2025-10-04 19:36:55'),('ADM005','viewer_1','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Kavita Joshi','kavita.viewer@passportdb.com','Viewer',1,'2025-10-03 16:45:00','2025-10-04 19:36:55');
/*!40000 ALTER TABLE `Admin_Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Alert`
--

DROP TABLE IF EXISTS `Alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Alert` (
  `AlertID` int NOT NULL AUTO_INCREMENT,
  `CitizenID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `AlertType` enum('Expiry Reminder','Document Required','Status Update','Payment Due','Security Alert') COLLATE utf8mb4_unicode_ci NOT NULL,
  `AlertMessage` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `AlertDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IsRead` tinyint(1) DEFAULT '0',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`AlertID`,`CitizenID`),
  KEY `CitizenID` (`CitizenID`),
  CONSTRAINT `alert_ibfk_1` FOREIGN KEY (`CitizenID`) REFERENCES `Citizen` (`CitizenID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Alert`
--

LOCK TABLES `Alert` WRITE;
/*!40000 ALTER TABLE `Alert` DISABLE KEYS */;
INSERT INTO `Alert` VALUES (1,'CIT002','Document Required','Please submit your address proof for application APP002','2025-10-05 01:06:54',0,'2025-10-04 19:36:54'),(2,'CIT003','Status Update','Your application APP003 is now under review','2025-10-05 01:06:54',0,'2025-10-04 19:36:54'),(3,'CIT001','Expiry Reminder','Your passport M1234567 will expire in 10 years. No action needed.','2025-10-05 01:06:54',1,'2025-10-04 19:36:54'),(4,'CIT002','Expiry Reminder','Your passport M2345678 has expired. Please apply for renewal.','2025-10-05 01:06:54',0,'2025-10-04 19:36:54'),(5,'CIT004','Status Update','Your application APP004 has been approved! Passport will be dispatched soon.','2025-10-05 01:06:54',1,'2025-10-04 19:36:54'),(6,'CIT005','Status Update','Your emergency reissue application APP005 has been approved.','2025-10-05 01:06:54',0,'2025-10-04 19:36:54'),(7,'CIT006','Document Required','Your address proof document was rejected. Please resubmit.','2025-10-05 01:06:54',0,'2025-10-04 19:36:54'),(8,'CIT007','Security Alert','Your application APP007 has been rejected due to document discrepancies.','2025-10-05 01:06:54',1,'2025-10-04 19:36:54'),(9,'CIT008','Status Update','Your application APP008 is under police verification.','2025-10-05 01:06:54',0,'2025-10-04 19:36:54');
/*!40000 ALTER TABLE `Alert` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Application`
--

DROP TABLE IF EXISTS `Application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Application` (
  `ApplicationID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CitizenID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EmbassyID` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationDate` date NOT NULL DEFAULT (curdate()),
  `ApplicationType` enum('New','Renewal','Reissue','Damaged','Lost') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` enum('Pending','Under Review','Documents Required','Approved','Rejected','Completed') COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `Priority` enum('Normal','Tatkal','Emergency') COLLATE utf8mb4_unicode_ci DEFAULT 'Normal',
  `Remarks` text COLLATE utf8mb4_unicode_ci,
  `ApprovedDate` date DEFAULT NULL,
  `RejectionReason` text COLLATE utf8mb4_unicode_ci,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ApplicationID`),
  KEY `CitizenID` (`CitizenID`),
  KEY `EmbassyID` (`EmbassyID`),
  KEY `idx_application_status` (`Status`),
  KEY `idx_application_date` (`ApplicationDate`),
  CONSTRAINT `application_ibfk_1` FOREIGN KEY (`CitizenID`) REFERENCES `Citizen` (`CitizenID`) ON DELETE CASCADE,
  CONSTRAINT `application_ibfk_2` FOREIGN KEY (`EmbassyID`) REFERENCES `Embassy` (`EmbassyID`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Application`
--

LOCK TABLES `Application` WRITE;
/*!40000 ALTER TABLE `Application` DISABLE KEYS */;
INSERT INTO `Application` VALUES ('APP001','CIT001','EMB001','2025-09-15','New','Approved','Normal','Application approved','2025-09-20',NULL,'2025-10-04 19:36:54','2025-10-04 19:36:54'),('APP002','CIT002','EMB002','2025-10-01','Renewal','Under Review','Tatkal',NULL,NULL,NULL,'2025-10-04 19:36:54','2025-10-04 19:36:54'),('APP003','CIT003','EMB003','2025-10-03','New','Pending','Normal',NULL,NULL,NULL,'2025-10-04 19:36:54','2025-10-04 19:36:54'),('APP004','CIT004','EMB004','2025-09-20','New','Completed','Normal','Application processed successfully','2025-09-30',NULL,'2025-10-04 19:36:54','2025-10-04 19:36:54'),('APP005','CIT005','EMB001','2025-09-28','Reissue','Approved','Emergency','Lost passport case','2025-10-02',NULL,'2025-10-04 19:36:54','2025-10-04 19:36:54'),('APP006','CIT006','EMB002','2025-10-02','Renewal','Documents Required','Tatkal','Address proof pending',NULL,NULL,'2025-10-04 19:36:54','2025-10-04 19:36:54'),('APP007','CIT007','EMB003','2025-08-15','New','Rejected','Normal','Application rejected',NULL,NULL,'2025-10-04 19:36:54','2025-10-04 19:36:54'),('APP008','CIT008','EMB004','2025-10-04','New','Under Review','Normal','Police verification pending',NULL,NULL,'2025-10-04 19:36:54','2025-10-04 19:36:54');
/*!40000 ALTER TABLE `Application` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tr_AfterApplicationInsert` AFTER INSERT ON `application` FOR EACH ROW BEGIN
    INSERT INTO Audit_Log (TableName, RecordID, Action, ChangedBy, OldValue, NewValue)
    VALUES ('Application', NEW.ApplicationID, 'INSERT', USER(), NULL, 
            CONCAT('ApplicationType: ', NEW.ApplicationType, ', Status: ', NEW.Status));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tr_AfterApplicationUpdate` AFTER UPDATE ON `application` FOR EACH ROW BEGIN
    -- Log the change
    IF OLD.Status != NEW.Status THEN
        INSERT INTO Audit_Log (TableName, RecordID, Action, ChangedBy, OldValue, NewValue)
        VALUES ('Application', NEW.ApplicationID, 'UPDATE', USER(), 
                CONCAT('Status: ', OLD.Status), 
                CONCAT('Status: ', NEW.Status));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Audit_Log`
--

DROP TABLE IF EXISTS `Audit_Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Audit_Log` (
  `LogID` int NOT NULL AUTO_INCREMENT,
  `TableName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RecordID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Action` enum('INSERT','UPDATE','DELETE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ChangedBy` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ChangeDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `OldValue` text COLLATE utf8mb4_unicode_ci,
  `NewValue` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`LogID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Audit_Log`
--

LOCK TABLES `Audit_Log` WRITE;
/*!40000 ALTER TABLE `Audit_Log` DISABLE KEYS */;
INSERT INTO `Audit_Log` VALUES (1,'Application','APP001','UPDATE','admin@passportdb.com','2025-09-16 10:00:00','Status: Pending','Status: Under Review'),(2,'Application','APP001','UPDATE','admin@passportdb.com','2025-09-20 14:30:00','Status: Under Review','Status: Approved'),(3,'Application','APP002','UPDATE','admin@passportdb.com','2025-10-02 09:15:00','Status: Pending','Status: Under Review'),(4,'Application','APP007','UPDATE','admin@passportdb.com','2025-08-20 11:00:00','Status: Under Review','Status: Rejected'),(5,'Passport','PSP001','INSERT','system@passportdb.com','2025-09-25 10:00:00',NULL,'PassportNumber: M1234567, Status: Active'),(6,'Passport','PSP003','INSERT','system@passportdb.com','2025-10-01 15:00:00',NULL,'PassportNumber: M3456789, Status: Active'),(7,'Payment','PAY007','UPDATE','finance@passportdb.com','2025-08-21 10:00:00','PaymentStatus: Completed','PaymentStatus: Refunded'),(8,'Blacklist','BL001','INSERT','security@passportdb.com','2025-08-20 16:00:00',NULL,'CitizenID: CIT007, Reason: Document forgery'),(9,'Blacklist','BL002','UPDATE','security@passportdb.com','2025-09-25 10:00:00','Status: Active','Status: Removed'),(10,'Documents','DOC018','UPDATE','verifier@passportdb.com','2025-10-03 14:00:00','VerificationStatus: Pending','VerificationStatus: Rejected'),(11,'Documents','DOC001','UPDATE','verifier@passportdb.com','2025-09-16 11:00:00','VerificationStatus: Pending','VerificationStatus: Verified'),(12,'Citizen','CIT001','UPDATE','CIT001','2025-09-18 09:00:00','Phone: 9876543210','Phone: 9876543299'),(13,'Citizen','CIT002','UPDATE','CIT002','2025-10-01 12:00:00','Address: 456 Park Street','Address: 789 New Colony, Delhi');
/*!40000 ALTER TABLE `Audit_Log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Blacklist`
--

DROP TABLE IF EXISTS `Blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Blacklist` (
  `BlacklistID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CitizenID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `BlacklistedDate` date NOT NULL DEFAULT (curdate()),
  `BlacklistedBy` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` enum('Active','Removed') COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `RemovalDate` date DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`BlacklistID`),
  UNIQUE KEY `CitizenID` (`CitizenID`),
  KEY `idx_blacklist_citizen` (`CitizenID`),
  CONSTRAINT `blacklist_ibfk_1` FOREIGN KEY (`CitizenID`) REFERENCES `Citizen` (`CitizenID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Blacklist`
--

LOCK TABLES `Blacklist` WRITE;
/*!40000 ALTER TABLE `Blacklist` DISABLE KEYS */;
INSERT INTO `Blacklist` VALUES ('BL001','CIT007','Document forgery detected during application process','2025-08-20','Immigration Officer - Mumbai','Active',NULL,'2025-10-04 19:36:54'),('BL002','CIT005','Previous passport misuse reported','2024-11-15','Embassy Official - Delhi','Removed','2025-09-25','2025-10-04 19:36:54'),('BL003','CIT006','Criminal background verification pending','2025-10-03','Police Department - Ahmedabad','Active',NULL,'2025-10-04 19:36:54');
/*!40000 ALTER TABLE `Blacklist` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tr_AfterBlacklistInsert` AFTER INSERT ON `blacklist` FOR EACH ROW BEGIN
    IF NEW.Status = 'Active' THEN
        -- Revoke all active passports
        UPDATE Passport 
        SET Status = 'Revoked' 
        WHERE CitizenID = NEW.CitizenID AND Status = 'Active';
        
        -- Reject pending applications
        UPDATE Application 
        SET Status = 'Rejected', RejectionReason = 'Citizen blacklisted'
        WHERE CitizenID = NEW.CitizenID 
        AND Status IN ('Pending', 'Under Review', 'Documents Required');
        
        -- Log blacklist
        INSERT INTO Audit_Log (TableName, RecordID, Action, ChangedBy, NewValue)
        VALUES ('Blacklist', NEW.BlacklistID, 'INSERT', USER(), 
                CONCAT('CitizenID: ', NEW.CitizenID, ', Reason: ', NEW.Reason));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Citizen`
--

DROP TABLE IF EXISTS `Citizen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Citizen` (
  `CitizenID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FirstName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MiddleName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DOB` date NOT NULL,
  `Gender` enum('Male','Female','Other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `State` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PostalCode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Nationality` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'Indian',
  `AadharNumber` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PanNumber` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CitizenID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `AadharNumber` (`AadharNumber`),
  UNIQUE KEY `PanNumber` (`PanNumber`),
  KEY `idx_citizen_email` (`Email`),
  KEY `idx_citizen_aadhar` (`AadharNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Citizen`
--

LOCK TABLES `Citizen` WRITE;
/*!40000 ALTER TABLE `Citizen` DISABLE KEYS */;
INSERT INTO `Citizen` VALUES ('CIT001','Rajesh',NULL,'Kumar','1990-05-15','Male','9876543210','rajesh.kumar@email.com','123 MG Road','Mumbai','Maharashtra','400001','Indian','123456789012','ABCDE1234F','2025-10-04 19:36:53','2025-10-04 19:36:53'),('CIT002','Priya',NULL,'Sharma','1995-08-22','Female','9876543211','priya.sharma@email.com','456 Park Street','Delhi','Delhi','110001','Indian','123456789013','ABCDE1235F','2025-10-04 19:36:53','2025-10-04 19:36:53'),('CIT003','Amit',NULL,'Patel','1988-12-10','Male','9876543212','amit.patel@email.com','789 Brigade Road','Bangalore','Karnataka','560001','Indian','123456789014','ABCDE1236F','2025-10-04 19:36:53','2025-10-04 19:36:53'),('CIT004','Sneha',NULL,'Reddy','1993-04-18','Female','9876543213','sneha.reddy@email.com','321 Anna Salai','Chennai','Tamil Nadu','600001','Indian','123456789015','ABCDE1237F','2025-10-04 19:36:53','2025-10-04 19:36:53'),('CIT005','Vikram',NULL,'Rathore','1987-09-25','Male','9876543214','vikram.rathore@email.com','654 MI Road','Jaipur','Rajasthan','302001','Indian','123456789016','ABCDE1238F','2025-10-04 19:36:53','2025-10-04 19:36:53'),('CIT006','Anjali',NULL,'Mehta','1991-11-30','Female','9876543215','anjali.mehta@email.com','987 CG Road','Ahmedabad','Gujarat','380001','Indian','123456789017','ABCDE1239F','2025-10-04 19:36:53','2025-10-04 19:36:53'),('CIT007','Rahul',NULL,'Verma','1985-06-12','Male','9876543216','rahul.verma@email.com','147 Park Lane','Kolkata','West Bengal','700001','Indian','123456789018','ABCDE1240F','2025-10-04 19:36:53','2025-10-04 19:36:53'),('CIT008','Kavya',NULL,'Iyer','1998-02-28','Female','9876543217','kavya.iyer@email.com','258 MG Road','Kochi','Kerala','682001','Indian','123456789019','ABCDE1241F','2025-10-04 19:36:53','2025-10-04 19:36:53');
/*!40000 ALTER TABLE `Citizen` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tr_BeforeDeleteCitizen` BEFORE DELETE ON `citizen` FOR EACH ROW BEGIN
    DECLARE v_ActivePassports INT;
    
    SELECT COUNT(*) INTO v_ActivePassports
    FROM Passport
    WHERE CitizenID = OLD.CitizenID AND Status = 'Active';
    
    IF v_ActivePassports > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot delete citizen with active passport(s).';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Documents` (
  `DocumentID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApplicationID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DocumentType` enum('Photo','Birth Certificate','Address Proof','ID Proof','Signature','Other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `DocumentPath` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UploadDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `VerificationStatus` enum('Pending','Verified','Rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  PRIMARY KEY (`DocumentID`),
  KEY `ApplicationID` (`ApplicationID`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`ApplicationID`) REFERENCES `Application` (`ApplicationID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documents`
--

LOCK TABLES `Documents` WRITE;
/*!40000 ALTER TABLE `Documents` DISABLE KEYS */;
INSERT INTO `Documents` VALUES ('DOC001','APP001','Photo','/uploads/APP001/photo.jpg','2025-09-15 10:00:00','Verified'),('DOC002','APP001','Birth Certificate','/uploads/APP001/birth_cert.pdf','2025-09-15 10:05:00','Verified'),('DOC003','APP001','Address Proof','/uploads/APP001/address_proof.pdf','2025-09-15 10:10:00','Verified'),('DOC004','APP001','ID Proof','/uploads/APP001/aadhar.pdf','2025-09-15 10:15:00','Verified'),('DOC005','APP001','Signature','/uploads/APP001/signature.jpg','2025-09-15 10:20:00','Verified'),('DOC006','APP002','Photo','/uploads/APP002/photo.jpg','2025-10-01 14:00:00','Verified'),('DOC007','APP002','Address Proof','/uploads/APP002/address_proof.pdf','2025-10-01 14:10:00','Pending'),('DOC008','APP002','ID Proof','/uploads/APP002/aadhar.pdf','2025-10-01 14:15:00','Verified'),('DOC009','APP003','Photo','/uploads/APP003/photo.jpg','2025-10-03 09:00:00','Pending'),('DOC010','APP003','Birth Certificate','/uploads/APP003/birth_cert.pdf','2025-10-03 09:05:00','Pending'),('DOC011','APP004','Photo','/uploads/APP004/photo.jpg','2025-09-20 11:00:00','Verified'),('DOC012','APP004','Birth Certificate','/uploads/APP004/birth_cert.pdf','2025-09-20 11:05:00','Verified'),('DOC013','APP004','Address Proof','/uploads/APP004/address_proof.pdf','2025-09-20 11:10:00','Verified'),('DOC014','APP004','ID Proof','/uploads/APP004/aadhar.pdf','2025-09-20 11:15:00','Verified'),('DOC015','APP005','Photo','/uploads/APP005/photo.jpg','2025-09-28 16:00:00','Verified'),('DOC016','APP005','Other','/uploads/APP005/police_report.pdf','2025-09-28 16:10:00','Verified'),('DOC017','APP006','Photo','/uploads/APP006/photo.jpg','2025-10-02 09:30:00','Verified'),('DOC018','APP006','Address Proof','/uploads/APP006/address_proof.pdf','2025-10-02 09:35:00','Rejected'),('DOC019','APP007','Photo','/uploads/APP007/photo.jpg','2025-08-15 08:00:00','Rejected'),('DOC020','APP007','Birth Certificate','/uploads/APP007/birth_cert.pdf','2025-08-15 08:05:00','Rejected'),('DOC021','APP008','Photo','/uploads/APP008/photo.jpg','2025-10-04 13:00:00','Verified'),('DOC022','APP008','Birth Certificate','/uploads/APP008/birth_cert.pdf','2025-10-04 13:05:00','Verified'),('DOC023','APP008','Address Proof','/uploads/APP008/address_proof.pdf','2025-10-04 13:10:00','Pending');
/*!40000 ALTER TABLE `Documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Embassy`
--

DROP TABLE IF EXISTS `Embassy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Embassy` (
  `EmbassyID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EmbassyName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Address` text COLLATE utf8mb4_unicode_ci,
  `ContactPhone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ContactEmail` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `WorkingHours` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`EmbassyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Embassy`
--

LOCK TABLES `Embassy` WRITE;
/*!40000 ALTER TABLE `Embassy` DISABLE KEYS */;
INSERT INTO `Embassy` VALUES ('EMB001','Indian Embassy','India','Mumbai','Passport Seva Kendra, BKC','022-12345678','mumbai@passportindia.gov.in',NULL,'2025-10-04 19:36:54'),('EMB002','Indian Embassy','India','Delhi','Passport Seva Kendra, Connaught Place','011-12345678','delhi@passportindia.gov.in',NULL,'2025-10-04 19:36:54'),('EMB003','Indian Embassy','India','Bangalore','Passport Seva Kendra, Koramangala','080-12345678','bangalore@passportindia.gov.in',NULL,'2025-10-04 19:36:54'),('EMB004','Indian Embassy','India','Chennai','Passport Seva Kendra, T Nagar','044-12345678','chennai@passportindia.gov.in',NULL,'2025-10-04 19:36:54'),('EMB005','Indian Embassy','India','Hyderabad','Passport Seva Kendra, Secunderabad','040-12345678','hyderabad@passportindia.gov.in',NULL,'2025-10-04 19:36:54');
/*!40000 ALTER TABLE `Embassy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Family`
--

DROP TABLE IF EXISTS `Family`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Family` (
  `FamilyMemberID` int NOT NULL AUTO_INCREMENT,
  `CitizenID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RelativeName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Relationship` enum('Spouse','Father','Mother','Child','Sibling','Guardian') COLLATE utf8mb4_unicode_ci NOT NULL,
  `RelativeDOB` date DEFAULT NULL,
  `RelativeGender` enum('Male','Female','Other') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RelativePhone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RelativeAadhar` varchar(12) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`FamilyMemberID`,`CitizenID`),
  KEY `CitizenID` (`CitizenID`),
  CONSTRAINT `family_ibfk_1` FOREIGN KEY (`CitizenID`) REFERENCES `Citizen` (`CitizenID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Family`
--

LOCK TABLES `Family` WRITE;
/*!40000 ALTER TABLE `Family` DISABLE KEYS */;
INSERT INTO `Family` VALUES (1,'CIT001','Sunita Kumar','Spouse','1992-03-20','Female','9876543299',NULL,'2025-10-04 19:36:54'),(2,'CIT001','Ramesh Kumar','Father','1965-07-10','Male','9876543300',NULL,'2025-10-04 19:36:54'),(3,'CIT002','Vijay Sharma','Father','1968-11-15','Male','9876543301',NULL,'2025-10-04 19:36:54'),(4,'CIT002','Meera Sharma','Mother','1970-05-15','Female','9876543220',NULL,'2025-10-04 19:36:54'),(5,'CIT003','Neha Patel','Spouse','1990-08-20','Female','9876543221',NULL,'2025-10-04 19:36:54'),(6,'CIT004','Rajesh Reddy','Father','1968-12-10','Male','9876543222',NULL,'2025-10-04 19:36:54'),(7,'CIT004','Lakshmi Reddy','Mother','1970-03-25','Female','9876543223',NULL,'2025-10-04 19:36:54'),(8,'CIT005','Arjun Singh Rathore','Father','1960-07-08','Male','9876543224',NULL,'2025-10-04 19:36:54'),(9,'CIT006','Rohit Mehta','Spouse','1989-09-15','Male','9876543225',NULL,'2025-10-04 19:36:54');
/*!40000 ALTER TABLE `Family` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Passport`
--

DROP TABLE IF EXISTS `Passport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Passport` (
  `PassportID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CitizenID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApplicationID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PassportNumber` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IssueDate` date NOT NULL,
  `ExpiryDate` date NOT NULL,
  `PassportType` enum('Regular','Diplomatic','Official','Emergency') COLLATE utf8mb4_unicode_ci DEFAULT 'Regular',
  `PlaceOfIssue` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` enum('Active','Expired','Revoked','Lost','Damaged') COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`PassportID`),
  UNIQUE KEY `ApplicationID` (`ApplicationID`),
  UNIQUE KEY `PassportNumber` (`PassportNumber`),
  KEY `CitizenID` (`CitizenID`),
  KEY `idx_passport_number` (`PassportNumber`),
  KEY `idx_passport_status` (`Status`),
  CONSTRAINT `passport_ibfk_1` FOREIGN KEY (`CitizenID`) REFERENCES `Citizen` (`CitizenID`) ON DELETE CASCADE,
  CONSTRAINT `passport_ibfk_2` FOREIGN KEY (`ApplicationID`) REFERENCES `Application` (`ApplicationID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Passport`
--

LOCK TABLES `Passport` WRITE;
/*!40000 ALTER TABLE `Passport` DISABLE KEYS */;
INSERT INTO `Passport` VALUES ('PSP001','CIT001','APP001','M1234567','2025-09-25','2035-09-24','Regular','Mumbai','Active','2025-10-04 19:36:54','2025-10-04 19:36:54'),('PSP002','CIT002','APP002','M2345678','2015-10-10','2025-10-09','Regular','Delhi','Expired','2025-10-04 19:36:54','2025-10-04 19:36:54'),('PSP003','CIT004','APP004','M3456789','2025-10-01','2035-09-30','Regular','Chennai','Active','2025-10-04 19:36:54','2025-10-04 19:36:54'),('PSP004','CIT005','APP005','M4567890','2025-10-05','2035-10-04','Regular','Mumbai','Active','2025-10-04 19:36:54','2025-10-04 19:36:54'),('PSP005','CIT007','APP007','M5678901','2020-08-20','2030-08-19','Regular','Bangalore','Revoked','2025-10-04 19:36:54','2025-10-04 19:36:54');
/*!40000 ALTER TABLE `Passport` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tr_AfterPassportInsert` AFTER INSERT ON `passport` FOR EACH ROW BEGIN
    -- Update application to completed
    UPDATE Application 
    SET Status = 'Completed' 
    WHERE ApplicationID = NEW.ApplicationID;
    
    -- Log the passport creation
    INSERT INTO Audit_Log (TableName, RecordID, Action, ChangedBy, NewValue)
    VALUES ('Passport', NEW.PassportID, 'INSERT', USER(), 
            CONCAT('PassportNumber: ', NEW.PassportNumber, ', Status: ', NEW.Status));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tr_CheckPassportExpiry` BEFORE UPDATE ON `passport` FOR EACH ROW BEGIN
    DECLARE v_DaysToExpiry INT;
    
    SET v_DaysToExpiry = DATEDIFF(NEW.ExpiryDate, CURRENT_DATE);
    
    -- If passport is expiring in 180 days, create alert
    IF v_DaysToExpiry <= 180 AND v_DaysToExpiry > 0 AND OLD.Status = 'Active' THEN
        INSERT INTO Alert (CitizenID, AlertType, AlertMessage)
        VALUES (NEW.CitizenID, 'Expiry Reminder', 
                CONCAT('Your passport ', NEW.PassportNumber, ' will expire in ', v_DaysToExpiry, ' days.'));
    END IF;
    
    -- If expired, update status
    IF v_DaysToExpiry < 0 THEN
        SET NEW.Status = 'Expired';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `PaymentID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApplicationID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `PaymentDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PaymentMethod` enum('Credit Card','Debit Card','Net Banking','UPI','Cash') COLLATE utf8mb4_unicode_ci NOT NULL,
  `TransactionID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PaymentStatus` enum('Pending','Completed','Failed','Refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`PaymentID`),
  UNIQUE KEY `ApplicationID` (`ApplicationID`),
  UNIQUE KEY `TransactionID` (`TransactionID`),
  KEY `idx_payment_status` (`PaymentStatus`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`ApplicationID`) REFERENCES `Application` (`ApplicationID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
INSERT INTO `Payment` VALUES ('PAY001','APP001',1500.00,'2025-09-15 10:30:00','Net Banking','TXN001234567','Completed','2025-10-04 19:36:54'),('PAY002','APP002',3500.00,'2025-10-01 14:20:00','UPI','TXN001234568','Completed','2025-10-04 19:36:54'),('PAY003','APP003',1500.00,'2025-10-03 09:15:00','Credit Card','TXN001234569','Completed','2025-10-04 19:36:54'),('PAY004','APP004',1500.00,'2025-09-20 11:45:00','Debit Card','TXN001234570','Completed','2025-10-04 19:36:54'),('PAY005','APP005',5000.00,'2025-09-28 16:30:00','Net Banking','TXN001234571','Completed','2025-10-04 19:36:54'),('PAY006','APP006',3500.00,'2025-10-02 10:00:00','UPI','TXN001234572','Completed','2025-10-04 19:36:54'),('PAY007','APP007',1500.00,'2025-08-15 09:20:00','Credit Card','TXN001234573','Refunded','2025-10-04 19:36:54'),('PAY008','APP008',1500.00,'2025-10-04 14:15:00','UPI','TXN001234574','Completed','2025-10-04 19:36:54');
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `tr_AfterPaymentInsert` AFTER INSERT ON `payment` FOR EACH ROW BEGIN
    IF NEW.PaymentStatus = 'Completed' THEN
        -- Update application status to Under Review
        UPDATE Application 
        SET Status = 'Under Review' 
        WHERE ApplicationID = NEW.ApplicationID;
        
        -- Log payment
        INSERT INTO Audit_Log (TableName, RecordID, Action, ChangedBy, NewValue)
        VALUES ('Payment', NEW.PaymentID, 'INSERT', USER(), 
                CONCAT('Amount: ', NEW.Amount, ', Status: ', NEW.PaymentStatus));
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Temporary view structure for view `payment_summary`
--

DROP TABLE IF EXISTS `payment_summary`;
/*!50001 DROP VIEW IF EXISTS `payment_summary`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `payment_summary` AS SELECT 
 1 AS `PaymentID`,
 1 AS `Amount`,
 1 AS `PaymentDate`,
 1 AS `PaymentStatus`,
 1 AS `ApplicationID`,
 1 AS `ApplicationType`,
 1 AS `CitizenID`,
 1 AS `CitizenName`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Travel_History`
--

DROP TABLE IF EXISTS `Travel_History`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Travel_History` (
  `TravelID` int NOT NULL AUTO_INCREMENT,
  `PassportID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CountryVisited` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EntryDate` date NOT NULL,
  `ExitDate` date DEFAULT NULL,
  `PurposeOfVisit` enum('Tourism','Business','Education','Medical','Employment','Other') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Duration` int GENERATED ALWAYS AS ((to_days(`ExitDate`) - to_days(`EntryDate`))) STORED,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`TravelID`,`PassportID`),
  KEY `PassportID` (`PassportID`),
  CONSTRAINT `travel_history_ibfk_1` FOREIGN KEY (`PassportID`) REFERENCES `Passport` (`PassportID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Travel_History`
--

LOCK TABLES `Travel_History` WRITE;
/*!40000 ALTER TABLE `Travel_History` DISABLE KEYS */;
INSERT INTO `Travel_History` (`TravelID`, `PassportID`, `CountryVisited`, `EntryDate`, `ExitDate`, `PurposeOfVisit`, `CreatedAt`) VALUES (1,'PSP001','USA','2025-10-01','2025-10-15','Tourism','2025-10-04 19:36:54'),(2,'PSP001','UAE','2025-08-01','2025-08-15','Business','2025-10-04 19:36:54'),(3,'PSP001','Singapore','2025-07-10','2025-07-20','Tourism','2025-10-04 19:36:54'),(4,'PSP003','UK','2025-10-02',NULL,'Education','2025-10-04 19:36:54'),(5,'PSP004','Canada','2025-10-05',NULL,'Employment','2025-10-04 19:36:54'),(6,'PSP002','Thailand','2024-12-20','2025-01-05','Tourism','2025-10-04 19:36:54');
/*!40000 ALTER TABLE `Travel_History` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `valid_passports`
--

DROP TABLE IF EXISTS `valid_passports`;
/*!50001 DROP VIEW IF EXISTS `valid_passports`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `valid_passports` AS SELECT 
 1 AS `PassportID`,
 1 AS `PassportNumber`,
 1 AS `IssueDate`,
 1 AS `ExpiryDate`,
 1 AS `DaysUntilExpiry`,
 1 AS `CitizenID`,
 1 AS `CitizenName`,
 1 AS `Email`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Visa`
--

DROP TABLE IF EXISTS `Visa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Visa` (
  `VisaID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PassportID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `VisaType` enum('Tourist','Business','Student','Work','Transit','Medical') COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IssueDate` date NOT NULL,
  `ExpiryDate` date NOT NULL,
  `VisaNumber` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` enum('Active','Expired','Cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`VisaID`),
  UNIQUE KEY `VisaNumber` (`VisaNumber`),
  KEY `PassportID` (`PassportID`),
  CONSTRAINT `visa_ibfk_1` FOREIGN KEY (`PassportID`) REFERENCES `Passport` (`PassportID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Visa`
--

LOCK TABLES `Visa` WRITE;
/*!40000 ALTER TABLE `Visa` DISABLE KEYS */;
INSERT INTO `Visa` VALUES ('VIS001','PSP001','Tourist','USA','2025-09-15','2026-09-14','US-T-2025-001234','Active','2025-10-04 19:36:54'),('VIS002','PSP001','Business','UAE','2025-08-20','2026-08-19','UAE-B-2025-567890','Active','2025-10-04 19:36:54'),('VIS003','PSP003','Student','UK','2025-09-25','2028-09-24','UK-S-2025-112233','Active','2025-10-04 19:36:54'),('VIS004','PSP004','Work','Canada','2025-10-01','2027-09-30','CA-W-2025-445566','Active','2025-10-04 19:36:54'),('VIS005','PSP002','Tourist','Singapore','2024-05-10','2025-05-09','SG-T-2024-778899','Expired','2025-10-04 19:36:54'),('VIS006','PSP001','Medical','Germany','2025-09-28','2025-12-28','DE-M-2025-334455','Active','2025-10-04 19:36:54');
/*!40000 ALTER TABLE `Visa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_citywisestatistics`
--

DROP TABLE IF EXISTS `vw_citywisestatistics`;
/*!50001 DROP VIEW IF EXISTS `vw_citywisestatistics`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_citywisestatistics` AS SELECT 
 1 AS `City`,
 1 AS `State`,
 1 AS `TotalApplications`,
 1 AS `ApprovedApplications`,
 1 AS `ApprovalRate`,
 1 AS `TotalRevenue`,
 1 AS `AvgProcessingDays`,
 1 AS `ActivePassports`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_documentbottlenecks`
--

DROP TABLE IF EXISTS `vw_documentbottlenecks`;
/*!50001 DROP VIEW IF EXISTS `vw_documentbottlenecks`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_documentbottlenecks` AS SELECT 
 1 AS `ApplicationID`,
 1 AS `ApplicationDate`,
 1 AS `DaysSinceApplication`,
 1 AS `CitizenName`,
 1 AS `Email`,
 1 AS `Phone`,
 1 AS `ApplicationType`,
 1 AS `Priority`,
 1 AS `TotalDocuments`,
 1 AS `VerifiedDocs`,
 1 AS `PendingDocs`,
 1 AS `RejectedDocs`,
 1 AS `MissingDocuments`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_embassyperformance`
--

DROP TABLE IF EXISTS `vw_embassyperformance`;
/*!50001 DROP VIEW IF EXISTS `vw_embassyperformance`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_embassyperformance` AS SELECT 
 1 AS `EmbassyID`,
 1 AS `EmbassyName`,
 1 AS `EmbassyCity`,
 1 AS `TotalApplications`,
 1 AS `ApprovedCount`,
 1 AS `RejectedCount`,
 1 AS `PendingCount`,
 1 AS `AvgProcessingDays`,
 1 AS `TatkalApplications`,
 1 AS `EmergencyApplications`,
 1 AS `SuccessRate`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_financialanalysis`
--

DROP TABLE IF EXISTS `vw_financialanalysis`;
/*!50001 DROP VIEW IF EXISTS `vw_financialanalysis`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_financialanalysis` AS SELECT 
 1 AS `PaymentMonth`,
 1 AS `TotalTransactions`,
 1 AS `TotalRevenue`,
 1 AS `TotalRefunds`,
 1 AS `NetRevenue`,
 1 AS `UPI_Revenue`,
 1 AS `NetBanking_Revenue`,
 1 AS `Card_Revenue`,
 1 AS `AvgTransactionValue`,
 1 AS `UniqueCustomers`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_frequenttravelers`
--

DROP TABLE IF EXISTS `vw_frequenttravelers`;
/*!50001 DROP VIEW IF EXISTS `vw_frequenttravelers`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_frequenttravelers` AS SELECT 
 1 AS `CitizenID`,
 1 AS `CitizenName`,
 1 AS `Email`,
 1 AS `PassportCount`,
 1 AS `TotalTrips`,
 1 AS `CountriesVisited`,
 1 AS `VisitedCountries`,
 1 AS `TotalDaysAbroad`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `active_applications`
--

/*!50001 DROP VIEW IF EXISTS `active_applications`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `active_applications` AS select `a`.`ApplicationID` AS `ApplicationID`,`a`.`ApplicationDate` AS `ApplicationDate`,`a`.`ApplicationType` AS `ApplicationType`,`a`.`Status` AS `Status`,`a`.`Priority` AS `Priority`,`c`.`CitizenID` AS `CitizenID`,concat(`c`.`FirstName`,' ',`c`.`LastName`) AS `CitizenName`,`c`.`Email` AS `Email`,`c`.`Phone` AS `Phone` from (`application` `a` join `citizen` `c` on((`a`.`CitizenID` = `c`.`CitizenID`))) where (`a`.`Status` in ('Pending','Under Review','Documents Required')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `payment_summary`
--

/*!50001 DROP VIEW IF EXISTS `payment_summary`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `payment_summary` AS select `p`.`PaymentID` AS `PaymentID`,`p`.`Amount` AS `Amount`,`p`.`PaymentDate` AS `PaymentDate`,`p`.`PaymentStatus` AS `PaymentStatus`,`a`.`ApplicationID` AS `ApplicationID`,`a`.`ApplicationType` AS `ApplicationType`,`c`.`CitizenID` AS `CitizenID`,concat(`c`.`FirstName`,' ',`c`.`LastName`) AS `CitizenName` from ((`payment` `p` join `application` `a` on((`p`.`ApplicationID` = `a`.`ApplicationID`))) join `citizen` `c` on((`a`.`CitizenID` = `c`.`CitizenID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `valid_passports`
--

/*!50001 DROP VIEW IF EXISTS `valid_passports`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `valid_passports` AS select `p`.`PassportID` AS `PassportID`,`p`.`PassportNumber` AS `PassportNumber`,`p`.`IssueDate` AS `IssueDate`,`p`.`ExpiryDate` AS `ExpiryDate`,(to_days(`p`.`ExpiryDate`) - to_days(curdate())) AS `DaysUntilExpiry`,`c`.`CitizenID` AS `CitizenID`,concat(`c`.`FirstName`,' ',`c`.`LastName`) AS `CitizenName`,`c`.`Email` AS `Email` from (`passport` `p` join `citizen` `c` on((`p`.`CitizenID` = `c`.`CitizenID`))) where ((`p`.`Status` = 'Active') and (`p`.`ExpiryDate` > curdate())) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_citywisestatistics`
--

/*!50001 DROP VIEW IF EXISTS `vw_citywisestatistics`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_citywisestatistics` AS select `c`.`City` AS `City`,`c`.`State` AS `State`,count(distinct `a`.`ApplicationID`) AS `TotalApplications`,count(distinct (case when (`a`.`Status` = 'Approved') then `a`.`ApplicationID` end)) AS `ApprovedApplications`,round(((count(distinct (case when (`a`.`Status` = 'Approved') then `a`.`ApplicationID` end)) * 100.0) / nullif(count(distinct `a`.`ApplicationID`),0)),2) AS `ApprovalRate`,coalesce(sum(`py`.`Amount`),0) AS `TotalRevenue`,avg((to_days(`a`.`ApprovedDate`) - to_days(`a`.`ApplicationDate`))) AS `AvgProcessingDays`,count(distinct `p`.`PassportID`) AS `ActivePassports` from (((`citizen` `c` left join `application` `a` on((`c`.`CitizenID` = `a`.`CitizenID`))) left join `payment` `py` on(((`a`.`ApplicationID` = `py`.`ApplicationID`) and (`py`.`PaymentStatus` = 'Completed')))) left join `passport` `p` on(((`c`.`CitizenID` = `p`.`CitizenID`) and (`p`.`Status` = 'Active')))) group by `c`.`City`,`c`.`State` order by `TotalRevenue` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_documentbottlenecks`
--

/*!50001 DROP VIEW IF EXISTS `vw_documentbottlenecks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_documentbottlenecks` AS select `a`.`ApplicationID` AS `ApplicationID`,`a`.`ApplicationDate` AS `ApplicationDate`,(to_days(curdate()) - to_days(`a`.`ApplicationDate`)) AS `DaysSinceApplication`,concat(`c`.`FirstName`,' ',`c`.`LastName`) AS `CitizenName`,`c`.`Email` AS `Email`,`c`.`Phone` AS `Phone`,`a`.`ApplicationType` AS `ApplicationType`,`a`.`Priority` AS `Priority`,count(`d`.`DocumentID`) AS `TotalDocuments`,sum((case when (`d`.`VerificationStatus` = 'Verified') then 1 else 0 end)) AS `VerifiedDocs`,sum((case when (`d`.`VerificationStatus` = 'Pending') then 1 else 0 end)) AS `PendingDocs`,sum((case when (`d`.`VerificationStatus` = 'Rejected') then 1 else 0 end)) AS `RejectedDocs`,group_concat((case when (`d`.`VerificationStatus` <> 'Verified') then `d`.`DocumentType` end) separator ', ') AS `MissingDocuments` from ((`application` `a` join `citizen` `c` on((`a`.`CitizenID` = `c`.`CitizenID`))) left join `documents` `d` on((`a`.`ApplicationID` = `d`.`ApplicationID`))) where (`a`.`Status` in ('Pending','Documents Required','Under Review')) group by `a`.`ApplicationID`,`a`.`ApplicationDate`,`c`.`FirstName`,`c`.`LastName`,`c`.`Email`,`c`.`Phone`,`a`.`ApplicationType`,`a`.`Priority` having ((`PendingDocs` > 0) or (`RejectedDocs` > 0)) order by `DaysSinceApplication` desc,`a`.`Priority` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_embassyperformance`
--

/*!50001 DROP VIEW IF EXISTS `vw_embassyperformance`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_embassyperformance` AS select `e`.`EmbassyID` AS `EmbassyID`,`e`.`EmbassyName` AS `EmbassyName`,`e`.`City` AS `EmbassyCity`,count(`a`.`ApplicationID`) AS `TotalApplications`,sum((case when (`a`.`Status` = 'Approved') then 1 else 0 end)) AS `ApprovedCount`,sum((case when (`a`.`Status` = 'Rejected') then 1 else 0 end)) AS `RejectedCount`,sum((case when (`a`.`Status` in ('Pending','Under Review')) then 1 else 0 end)) AS `PendingCount`,round(avg((to_days(coalesce(`a`.`ApprovedDate`,curdate())) - to_days(`a`.`ApplicationDate`))),2) AS `AvgProcessingDays`,sum((case when (`a`.`Priority` = 'Tatkal') then 1 else 0 end)) AS `TatkalApplications`,sum((case when (`a`.`Priority` = 'Emergency') then 1 else 0 end)) AS `EmergencyApplications`,round(((sum((case when (`a`.`Status` = 'Approved') then 1 else 0 end)) * 100.0) / nullif(count(`a`.`ApplicationID`),0)),2) AS `SuccessRate` from (`embassy` `e` left join `application` `a` on((`e`.`EmbassyID` = `a`.`EmbassyID`))) group by `e`.`EmbassyID`,`e`.`EmbassyName`,`e`.`City` order by `SuccessRate` desc,`AvgProcessingDays` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_financialanalysis`
--

/*!50001 DROP VIEW IF EXISTS `vw_financialanalysis`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_financialanalysis` AS select date_format(`p`.`PaymentDate`,'%Y-%m') AS `PaymentMonth`,count(distinct `p`.`PaymentID`) AS `TotalTransactions`,sum((case when (`p`.`PaymentStatus` = 'Completed') then `p`.`Amount` else 0 end)) AS `TotalRevenue`,sum((case when (`p`.`PaymentStatus` = 'Refunded') then `p`.`Amount` else 0 end)) AS `TotalRefunds`,(sum((case when (`p`.`PaymentStatus` = 'Completed') then `p`.`Amount` else 0 end)) - sum((case when (`p`.`PaymentStatus` = 'Refunded') then `p`.`Amount` else 0 end))) AS `NetRevenue`,sum((case when (`p`.`PaymentMethod` = 'UPI') then `p`.`Amount` else 0 end)) AS `UPI_Revenue`,sum((case when (`p`.`PaymentMethod` = 'Net Banking') then `p`.`Amount` else 0 end)) AS `NetBanking_Revenue`,sum((case when (`p`.`PaymentMethod` in ('Credit Card','Debit Card')) then `p`.`Amount` else 0 end)) AS `Card_Revenue`,round(avg(`p`.`Amount`),2) AS `AvgTransactionValue`,count(distinct `a`.`CitizenID`) AS `UniqueCustomers` from (`payment` `p` join `application` `a` on((`p`.`ApplicationID` = `a`.`ApplicationID`))) group by date_format(`p`.`PaymentDate`,'%Y-%m') order by `PaymentMonth` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_frequenttravelers`
--

/*!50001 DROP VIEW IF EXISTS `vw_frequenttravelers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_frequenttravelers` AS select `c`.`CitizenID` AS `CitizenID`,concat(`c`.`FirstName`,' ',`c`.`LastName`) AS `CitizenName`,`c`.`Email` AS `Email`,count(distinct `p`.`PassportID`) AS `PassportCount`,count(distinct `th`.`TravelID`) AS `TotalTrips`,count(distinct `th`.`CountryVisited`) AS `CountriesVisited`,group_concat(distinct `th`.`CountryVisited` order by `th`.`CountryVisited` ASC separator ', ') AS `VisitedCountries`,sum((to_days(coalesce(`th`.`ExitDate`,curdate())) - to_days(`th`.`EntryDate`))) AS `TotalDaysAbroad` from ((`citizen` `c` join `passport` `p` on((`c`.`CitizenID` = `p`.`CitizenID`))) left join `travel_history` `th` on((`p`.`PassportID` = `th`.`PassportID`))) group by `c`.`CitizenID`,`c`.`FirstName`,`c`.`LastName`,`c`.`Email` having ((`PassportCount` >= 1) and (`TotalTrips` > 0)) order by `TotalTrips` desc,`CountriesVisited` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-04 11:23:41
