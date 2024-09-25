/*
 Navicat Premium Data Transfer

 Source Server         : Moco dev
 Source Server Type    : MySQL
 Source Server Version : 50743 (5.7.43)
 Source Host           : 103.253.147.173:3306
 Source Schema         : examination_system

 Target Server Type    : MySQL
 Target Server Version : 50743 (5.7.43)
 File Encoding         : 65001

 Date: 25/09/2024 16:54:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for answers
-- ----------------------------
DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of answers
-- ----------------------------
BEGIN;
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (1, 1, '2', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (2, 1, '3', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (3, 1, '4', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (4, 1, '1', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (5, 2, '5', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (6, 2, '3', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (7, 2, '6', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (8, 2, '2', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (9, 3, '1', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (10, 3, '2', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (11, 3, '3', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (12, 3, '0', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (13, 4, '3', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (14, 4, '5', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (15, 4, '1', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (16, 4, '0', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (17, 5, '2', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (18, 5, '3', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (19, 5, '5', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (20, 5, '6', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (21, 6, '2', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (22, 6, '3', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (23, 6, '5', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (24, 6, '6', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (25, 7, '20', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (26, 7, '12', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (27, 7, '8', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (28, 7, '10', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (29, 8, '20', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (30, 8, '12', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (31, 8, '8', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (32, 8, '9', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (33, 9, '8', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (34, 9, '5', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (35, 9, '4', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (36, 9, '1', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (37, 10, '8', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (38, 10, '0', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (39, 10, '4', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (40, 10, '1', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (41, 11, '8', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (42, 11, '7', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (43, 11, '4', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (44, 11, '9', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (45, 13, '1', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (46, 13, '2', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (47, 13, '3', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (48, 13, '4', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (49, 14, '10', 1);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (50, 14, '11', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (51, 14, '12', 0);
INSERT INTO `answers` (`id`, `question_id`, `text`, `is_correct`) VALUES (52, 14, '9', 0);
COMMIT;

-- ----------------------------
-- Table structure for lessons
-- ----------------------------
DROP TABLE IF EXISTS `lessons`;
CREATE TABLE `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(255) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of lessons
-- ----------------------------
BEGIN;
INSERT INTO `lessons` (`id`, `title`, `description`, `image_url`, `created_at`, `updated_at`) VALUES (1, 'Matematik', 'too', '/uploads/1727242771016_matematik.webp', NULL, NULL);
INSERT INTO `lessons` (`id`, `title`, `description`, `image_url`, `created_at`, `updated_at`) VALUES (2, 'English', 'english', '/static/images/english.webp', NULL, NULL);
INSERT INTO `lessons` (`id`, `title`, `description`, `image_url`, `created_at`, `updated_at`) VALUES (4, 'test', 'add', '/uploads/1727248128533_images.jpeg', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lesson_id` int(11) DEFAULT NULL,
  `text` text,
  `image` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `audio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lesson_id` (`lesson_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of questions
-- ----------------------------
BEGIN;
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (1, 1, '1+1=', NULL, NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (2, 1, '2+3=', NULL, '/uploads/question_video.mp4', NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (3, 1, '3-2=', NULL, NULL, '/uploads/question_audio.mp3');
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (4, 1, '5*1=', NULL, NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (5, 1, '7-2=', NULL, NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (6, 1, '4/2=', NULL, NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (7, 1, '5*2=', NULL, NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (8, 1, '3*3=', NULL, NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (9, 1, '4/1=', NULL, NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (10, 1, '3-3=', NULL, NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (11, 1, '3+4=', NULL, NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (13, 1, 'test', '/uploads/1727156882637_Screenshot 2024-09-23 at 15.25.09.png', NULL, NULL);
INSERT INTO `questions` (`id`, `lesson_id`, `text`, `image`, `video`, `audio`) VALUES (14, 4, '1+9=', '/uploads/1727248192527_question.jpg', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `email` varchar(255) NOT NULL,
  `firstname` char(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `lastname` char(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`email`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`email`, `firstname`, `password`, `created_at`, `updated_at`, `role`, `lastname`, `phone_number`, `id`) VALUES ('mandakh@gmail.com', 'MB', NULL, NULL, '2024-09-20 16:07:51', NULL, 'Bat', '85640043', 0);
INSERT INTO `users` (`email`, `firstname`, `password`, `created_at`, `updated_at`, `role`, `lastname`, `phone_number`, `id`) VALUES ('mandakh@mongolcontent.mn', 'test', '$2b$10$XJLwGC05vidxA2Vc1ZZpkO6th7uhDWFOFuaK0nSoHC2NuCNlPe3Fq', '2024-09-19 16:18:30', '2024-09-19 16:18:30', 'user', 'test', '85640046', 1);
INSERT INTO `users` (`email`, `firstname`, `password`, `created_at`, `updated_at`, `role`, `lastname`, `phone_number`, `id`) VALUES ('Mandakhbayar@mongolcontent.mn', NULL, '$2b$10$Uw2Wf2qLz2orb6IjP6pBxu7LJedPK8y4rueiCxOv74d5mfZrrHkT6', NULL, NULL, 'admin', NULL, NULL, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
