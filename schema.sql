/*M!999999\- enable the sandbox mode */ 

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;
DROP TABLE IF EXISTS `email_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_log` (
  `id` varchar(36) NOT NULL,
  `to_emails` text NOT NULL,
  `to_details` text DEFAULT NULL,
  `subject` varchar(512) NOT NULL,
  `body` text NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'sent',
  `request_ids` text NOT NULL,
  `sent_by` varchar(36) NOT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` varchar(36) NOT NULL,
  `event_type` varchar(64) NOT NULL,
  `page_url` text NOT NULL,
  `referrer` text DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `hash` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_events_event_type` (`event_type`),
  KEY `idx_events_created_at` (`created_at`),
  KEY `idx_events_hash` (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `notification_cursor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_cursor` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `last_read_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `notification_cursor_user_id_key` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filepath` varchar(500) NOT NULL,
  `category` varchar(128) NOT NULL,
  `owner` varchar(36) DEFAULT NULL,
  `createdat` date DEFAULT current_timestamp(),
  `cover` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `portfolio_filepath` (`filepath`),
  KEY `fk_portfolio_user` (`owner`),
  CONSTRAINT `fk_portfolio_user` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_pictures` (
  `uuid` varchar(36) NOT NULL,
  `project` varchar(36) NOT NULL,
  `filepath` varchar(500) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `section` varchar(255) NOT NULL,
  PRIMARY KEY (`uuid`),
  KEY `fk_project_pictures_project` (`project`),
  CONSTRAINT `fk_project_pictures_project` FOREIGN KEY (`project`) REFERENCES `projects` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `project_texts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_texts` (
  `uuid` varchar(36) NOT NULL,
  `project` varchar(36) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `section` varchar(255) NOT NULL DEFAULT 'Client',
  PRIMARY KEY (`uuid`),
  KEY `fk_project_texts_project` (`project`),
  CONSTRAINT `fk_project_texts_project` FOREIGN KEY (`project`) REFERENCES `projects` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `uuid` varchar(36) NOT NULL,
  `projectname` varchar(255) NOT NULL,
  `projectcategory` varchar(255) NOT NULL,
  `projectowner` varchar(36) NOT NULL,
  `projectavatar` varchar(2048) DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKPyjk6A7QY4EOliiWMHFh_qgN5a9dNn7tfA&s',
  `description` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  `timeline` varchar(100) DEFAULT '9 Months',
  `type` varchar(100) DEFAULT 'Subscription',
  `createdat` timestamp NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NULL DEFAULT current_timestamp(),
  `view` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_projects_user` (`projectowner`),
  CONSTRAINT `fk_projects_user` FOREIGN KEY (`projectowner`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` varchar(36) NOT NULL,
  `first_name` varchar(256) NOT NULL,
  `last_name` varchar(256) DEFAULT NULL,
  `email` varchar(256) NOT NULL,
  `phone` varchar(32) NOT NULL,
  `company_name` varchar(256) DEFAULT NULL,
  `project_type` varchar(256) NOT NULL,
  `budget` varchar(128) NOT NULL,
  `project_details` text NOT NULL,
  `date` varchar(64) NOT NULL,
  `duration` varchar(32) NOT NULL,
  `time` varchar(32) NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT 'undefined',
  `username` varchar(100) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` text NOT NULL DEFAULT 'user',
  `password` text NOT NULL,
  `avatar` text DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_nLCu85ayoTKwYw6alnvrockq5QBT2ZWR2g&s',
  `createdat` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_pk` (`username`),
  UNIQUE KEY `users_email_pk` (`email`),
  CONSTRAINT `role_check` CHECK (`role` in ('user','admin','owner'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filepath` varchar(500) NOT NULL,
  `isshowreel` tinyint(1) DEFAULT 0,
  `projectid` varchar(36) DEFAULT NULL,
  `owner` varchar(36) DEFAULT NULL,
  `createdat` date DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `filepath` (`filepath`),
  KEY `fk_video_project` (`projectid`),
  KEY `fk_video_user` (`owner`),
  CONSTRAINT `fk_video_project` FOREIGN KEY (`projectid`) REFERENCES `projects` (`uuid`) ON DELETE SET NULL,
  CONSTRAINT `fk_video_user` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

