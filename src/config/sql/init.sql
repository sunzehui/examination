CREATE DATABASE  `exam` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50738
 Source Host           : localhost:3306
 Source Schema         : exam

 Target Server Type    : MySQL
 Target Server Version : 50738
 File Encoding         : 65001

 Date: 01/09/2022 10:34:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
USE `exam`;
-- ----------------------------
-- Table structure for choice
-- ----------------------------
DROP TABLE IF EXISTS `choice`;
CREATE TABLE `choice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_answer` tinyint(4) NOT NULL DEFAULT '0',
  `questionId` int(11) DEFAULT NULL,
  `content` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_5cc8f4862acc8b7b956be1be204` (`questionId`) USING BTREE,
  CONSTRAINT `FK_5cc8f4862acc8b7b956be1be204` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=378 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of choice
-- ----------------------------
BEGIN;
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (353, 0, 243, '23123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (354, 0, 243, '21313');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (355, 0, 244, '1231233');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (356, 1, 244, '123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (357, 0, 245, '123123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (358, 0, 245, '123124123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (359, 0, 246, '123123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (360, 0, 246, '123124123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (361, 0, 247, '3321312312');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (362, 0, 247, '2131233123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (363, 0, 247, '3123123123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (364, 0, 249, '123123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (365, 0, 249, '213123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (366, 0, 250, '345678');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (367, 0, 250, '4567');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (368, 0, 251, '3');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (369, 0, 251, '313');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (370, 0, 258, '3123213');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (371, 0, 258, '2132133123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (372, 0, 258, '123213');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (373, 1, 261, '123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (374, 0, 261, '2131');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (375, 1, 262, '213123');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (376, 1, 262, '312321312');
INSERT INTO `choice` (`id`, `is_answer`, `questionId`, `content`) VALUES (377, 1, 262, '123123123123');
COMMIT;

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '未命名班级',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdById` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_38f8de3ee0fa4d0342572070dd7` (`createdById`) USING BTREE,
  CONSTRAINT `FK_38f8de3ee0fa4d0342572070dd7` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classes
-- ----------------------------
BEGIN;
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (1, '未命名班级', '2022-07-17 16:41:46', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (2, '未命名班级', '2022-07-17 16:44:14', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (3, '未命名班级', '2022-07-17 16:45:17', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (4, '未命名班级', '2022-07-17 16:45:56', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (5, '未命名班级', '2022-07-17 16:48:36', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (6, '未命名班级', '2022-07-17 16:52:41', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (7, '未命名班级', '2022-07-17 16:53:24', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (8, '未命名班级', '2022-07-17 16:58:11', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (9, '未命名班级', '2022-07-17 17:22:16', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (10, '未命名班级', '2022-07-17 17:23:08', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (11, '未命名班级', '2022-07-17 17:23:55', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (12, '未命名班级', '2022-07-17 17:27:09', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (13, '未命名班级', '2022-07-17 17:39:36', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (14, '未命名班级', '2022-07-17 17:41:12', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (15, '未命名班级', '2022-07-17 17:41:51', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (16, '未命名班级', '2022-07-17 17:43:54', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (17, '未命名班级', '2022-07-17 17:44:54', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (18, '未命名班级', '2022-07-17 17:45:23', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (19, '未命名班级', '2022-07-17 17:46:11', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (20, '未命名班级', '2022-07-17 17:46:38', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (21, '未命名班级', '2022-07-17 17:48:42', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (22, '未命名班级', '2022-07-17 17:49:15', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (23, '未命名班级', '2022-07-17 17:49:53', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (24, '未命名班级', '2022-07-17 17:50:21', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (25, '未命名班级', '2022-07-17 17:55:39', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (26, '未命名班级', '2022-07-17 18:14:10', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (27, '未命名班级', '2022-07-17 18:15:06', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (28, '未命名班级', '2022-07-17 18:16:45', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (29, '未命名班级', '2022-07-17 18:17:35', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (30, '未命名班级', '2022-07-17 18:18:17', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (31, '未命名班级', '2022-07-17 18:23:24', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (32, '未命名班级', '2022-07-17 18:24:19', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (33, '未命名班级', '2022-07-17 19:32:04', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (34, '未命名班级', '2022-07-17 19:33:16', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (35, '未命名班级', '2022-07-17 19:33:40', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (36, '未命名班级', '2022-07-17 19:36:06', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (37, '未命名班级', '2022-07-17 19:36:55', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (38, '未命名班级', '2022-07-17 19:37:18', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (39, '未命名班级', '2022-07-17 19:37:38', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (40, '未命名班级', '2022-07-17 19:38:27', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (41, '未命名班级', '2022-07-17 19:41:09', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (42, '未命名班级', '2022-07-17 19:46:45', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (43, '未命名班级', '2022-07-17 19:48:34', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (44, '未命名班级', '2022-07-17 19:56:41', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (45, '未命名班级', '2022-07-17 20:12:32', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (46, '未命名班级', '2022-07-17 20:16:53', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (47, '未命名班级', '2022-07-17 20:18:27', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (48, '未命名班级', '2022-07-17 20:19:45', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (49, '未命名班级', '2022-07-17 20:21:11', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (50, '未命名班级', '2022-07-17 20:25:51', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (51, '未命名班级', '2022-07-17 20:28:02', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (52, '未命名班级', '2022-07-17 20:28:28', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (53, '未命名班级', '2022-07-17 20:33:11', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (54, '未命名班级', '2022-07-17 20:33:57', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (55, '未命名班级', '2022-07-17 20:35:02', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (56, '未命名班级', '2022-07-17 20:36:22', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (57, '未命名班级', '2022-07-18 18:10:06', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (58, '未命名班级', '2022-07-18 18:11:11', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (59, '未命名班级', '2022-07-18 18:14:09', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (60, '未命名班级', '2022-07-18 18:15:12', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (61, '未命名班级', '2022-07-18 18:16:20', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (62, '未命名班级', '2022-07-18 18:17:50', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (63, '未命名班级', '2022-07-18 18:20:54', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (64, '未命名班级', '2022-07-18 18:22:03', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (65, '未命名班级', '2022-07-18 18:31:12', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (66, '未命名班级', '2022-07-18 18:31:57', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (67, '未命名班级', '2022-07-18 18:33:44', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (68, '未命名班级', '2022-07-18 18:34:18', 3);
INSERT INTO `classes` (`id`, `name`, `create_time`, `createdById`) VALUES (69, '测试班级', '2022-08-30 15:32:26', 3);
COMMIT;

-- ----------------------------
-- Table structure for classes_exam-room
-- ----------------------------
DROP TABLE IF EXISTS `classes_exam-room`;
CREATE TABLE `classes_exam-room` (
  `examRoomId` int(11) NOT NULL,
  `classesId` int(11) NOT NULL,
  PRIMARY KEY (`examRoomId`,`classesId`),
  KEY `IDX_f69e5a4787c05c46bcc2d4b289` (`examRoomId`),
  KEY `IDX_84993852278a8b743ed72fdb06` (`classesId`),
  CONSTRAINT `FK_84993852278a8b743ed72fdb068` FOREIGN KEY (`classesId`) REFERENCES `classes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f69e5a4787c05c46bcc2d4b289d` FOREIGN KEY (`examRoomId`) REFERENCES `exam_room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of classes_exam-room
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for exam_paper
-- ----------------------------
DROP TABLE IF EXISTS `exam_paper`;
CREATE TABLE `exam_paper` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '试卷',
  `createdById` int(11) DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `desc` varchar(255) NOT NULL DEFAULT '试卷',
  `total_score` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_23573f6fa0f18815670b8f6592d` (`createdById`) USING BTREE,
  CONSTRAINT `FK_23573f6fa0f18815670b8f6592d` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of exam_paper
-- ----------------------------
BEGIN;
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (1, 'hahah359', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (2, 'hahah385', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (3, 'hahah575', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (4, 'hahah786', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (5, 'hahah690', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (6, 'hahah494', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (7, 'hahah311', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (8, 'hahah884', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (9, 'hahah649', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (10, 'hahah525', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (11, 'hahah291', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (12, 'hahah399', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (13, 'hahah139', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (14, 'hahah292', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (15, 'hahah689', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (16, 'hahah657', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (17, 'hahah413', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (18, 'hahah142', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (19, 'hahah604', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (20, 'hahah77', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (21, 'hahah342', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (22, 'hahah186', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (23, 'hahah388', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (24, 'hahah988', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (25, 'hahah186', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (26, 'hahah238', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (27, 'hahah203', 3, '2022-07-17 16:52:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (28, 'hahah729', 3, '2022-07-17 16:52:40', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (29, 'hahah127', 3, '2022-07-17 16:53:24', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (30, 'hahah279', 3, '2022-07-17 16:58:11', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (31, 'hahah728', 3, '2022-07-17 17:22:16', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (32, 'hahah791', 3, '2022-07-17 17:23:08', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (33, 'hahah542', 3, '2022-07-17 17:23:54', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (34, 'hahah150', 3, '2022-07-17 17:27:08', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (35, 'hahah150', 3, '2022-07-17 17:39:36', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (36, 'hahah806', 3, '2022-07-17 17:41:12', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (37, 'hahah237', 3, '2022-07-17 17:41:51', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (38, 'hahah21', 3, '2022-07-17 17:43:54', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (39, 'hahah375', 3, '2022-07-17 17:44:54', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (40, 'hahah252', 3, '2022-07-17 17:45:23', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (41, 'hahah58', 3, '2022-07-17 17:46:11', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (42, 'hahah13', 3, '2022-07-17 17:46:38', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (43, 'hahah737', 3, '2022-07-17 17:48:42', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (44, 'hahah899', 3, '2022-07-17 17:49:14', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (45, 'hahah628', 3, '2022-07-17 17:49:53', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (46, 'hahah776', 3, '2022-07-17 17:50:21', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (47, 'hahah578', 3, '2022-07-17 17:55:38', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (48, 'hahah120', 3, '2022-07-17 18:14:10', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (49, 'hahah632', 3, '2022-07-17 18:15:05', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (50, 'hahah833', 3, '2022-07-17 18:16:45', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (51, 'hahah415', 3, '2022-07-17 18:17:34', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (52, 'hahah85', 3, '2022-07-17 18:18:17', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (53, 'hahah527', 3, '2022-07-17 18:23:24', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (54, 'hahah604', 3, '2022-07-17 18:24:18', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (55, 'hahah784', 3, '2022-07-17 19:32:03', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (56, 'hahah827', 3, '2022-07-17 19:33:16', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (57, 'hahah393', 3, '2022-07-17 19:33:40', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (58, 'hahah336', 3, '2022-07-17 19:36:06', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (59, 'hahah183', 3, '2022-07-17 19:36:55', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (60, 'hahah49', 3, '2022-07-17 19:37:18', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (61, 'hahah681', 3, '2022-07-17 19:37:38', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (62, 'hahah77', 3, '2022-07-17 19:38:27', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (63, 'hahah119', 3, '2022-07-17 19:41:09', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (64, 'hahah892', 3, '2022-07-17 19:46:45', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (65, 'hahah757', 3, '2022-07-17 19:48:34', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (66, 'hahah572', 3, '2022-07-17 19:56:41', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (67, 'hahah502', 3, '2022-07-17 20:12:32', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (68, 'hahah392', 3, '2022-07-17 20:16:53', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (69, 'hahah224', 3, '2022-07-17 20:18:26', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (70, 'hahah4', 3, '2022-07-17 20:19:45', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (71, 'hahah211', 3, '2022-07-17 20:21:10', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (72, 'hahah146', 3, '2022-07-17 20:25:51', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (73, 'hahah417', 3, '2022-07-17 20:28:02', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (74, 'hahah890', 3, '2022-07-17 20:28:27', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (75, 'hahah254', 3, '2022-07-17 20:33:11', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (76, 'hahah962', 3, '2022-07-17 20:33:57', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (77, 'hahah667', 3, '2022-07-17 20:35:02', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (78, 'hahah759', 3, '2022-07-17 20:36:22', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (79, 'hahah6', 3, '2022-07-18 07:21:14', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (80, 'hahah489', 3, '2022-07-18 07:29:18', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (81, 'hahah865', 3, '2022-07-18 10:39:23', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (82, 'hahah781', 3, '2022-07-18 10:41:25', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (83, 'hahah480', 3, '2022-07-18 10:43:11', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (84, 'hahah681', 3, '2022-07-18 11:13:16', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (85, 'hahah413', 3, '2022-07-18 11:15:06', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (86, 'hahah252', 3, '2022-07-18 11:15:56', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (87, 'hahah587', 3, '2022-07-18 11:16:34', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (88, 'hahah241', 3, '2022-07-18 11:17:28', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (89, 'hahah679', 3, '2022-07-18 11:18:38', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (90, 'hahah28', 3, '2022-07-18 11:20:22', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (91, 'hahah789', 3, '2022-07-18 11:21:28', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (92, 'hahah259', 3, '2022-07-18 11:22:23', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (93, 'hahah991', 3, '2022-07-18 11:25:25', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (94, 'hahah445', 3, '2022-07-18 11:29:30', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (95, 'hahah170', 3, '2022-07-18 11:31:06', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (96, 'hahah6', 3, '2022-07-18 11:32:51', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (97, 'hahah945', 3, '2022-07-18 11:40:20', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (98, 'hahah159', 3, '2022-07-18 11:40:59', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (99, 'hahah4', 3, '2022-07-18 11:42:24', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (100, 'hahah847', 3, '2022-07-18 11:43:17', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (101, 'hahah605', 3, '2022-07-18 11:44:24', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (102, 'hahah787', 3, '2022-07-18 11:48:24', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (103, 'hahah355', 3, '2022-07-18 11:48:46', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (104, 'hahah657', 3, '2022-07-18 11:49:11', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (105, 'hahah111', 3, '2022-07-18 11:50:35', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (106, 'hahah678', 3, '2022-07-18 11:50:56', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (107, 'hahah374', 3, '2022-07-18 11:59:37', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (108, 'hahah637', 3, '2022-07-18 12:04:20', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (109, 'hahah260', 3, '2022-07-18 12:07:10', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (110, 'hahah204', 3, '2022-07-18 12:08:56', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (111, 'hahah863', 3, '2022-07-18 12:10:42', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (112, 'hahah433', 3, '2022-07-18 12:11:52', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (113, 'hahah313', 3, '2022-07-18 12:14:07', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (114, 'hahah176', 3, '2022-07-18 12:17:01', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (115, 'hahah235', 3, '2022-07-18 12:17:28', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (116, 'hahah531', 3, '2022-07-18 12:18:11', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (117, 'hahah626', 3, '2022-07-18 12:18:54', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (118, 'hahah680', 3, '2022-07-18 12:19:55', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (119, 'hahah182', 3, '2022-07-18 12:25:40', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (120, 'hahah751', 3, '2022-07-18 12:28:21', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (121, 'hahah844', 3, '2022-07-18 12:31:28', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (122, 'hahah297', 3, '2022-07-18 12:32:49', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (123, 'hahah823', 3, '2022-07-18 12:38:30', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (124, 'hahah505', 3, '2022-07-18 12:38:52', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (125, 'hahah883', 3, '2022-07-18 12:41:03', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (126, 'hahah989', 3, '2022-07-18 12:42:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (127, 'hahah697', 3, '2022-07-18 12:45:00', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (128, 'hahah743', 3, '2022-07-18 12:47:09', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (129, 'hahah916', 3, '2022-07-18 12:48:08', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (130, 'hahah4', 3, '2022-07-18 12:49:27', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (131, 'hahah172', 3, '2022-07-18 12:51:56', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (132, 'hahah832', 3, '2022-07-18 12:53:49', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (133, 'hahah162', 3, '2022-07-18 12:55:18', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (134, 'hahah255', 3, '2022-07-18 12:59:05', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (135, 'hahah56', 3, '2022-07-18 13:02:39', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (136, 'hahah133', 3, '2022-07-18 13:04:47', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (137, 'hahah977', 3, '2022-07-18 13:05:58', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (138, 'hahah910', 3, '2022-07-18 13:06:40', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (139, 'hahah828', 3, '2022-07-18 17:14:14', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (140, 'hahah127', 3, '2022-07-18 17:56:26', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (141, 'hahah970', 3, '2022-07-18 17:58:53', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (142, 'hahah5', 3, '2022-07-18 17:59:35', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (143, 'hahah358', 3, '2022-07-18 18:01:35', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (144, 'hahah582', 3, '2022-07-18 18:04:34', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (145, 'hahah851', 3, '2022-07-18 18:05:45', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (146, 'hahah47', 3, '2022-07-18 18:06:53', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (147, 'hahah666', 3, '2022-07-18 18:10:06', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (148, 'hahah740', 3, '2022-07-18 18:11:12', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (149, 'hahah481', 3, '2022-07-18 18:14:09', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (150, 'hahah617', 3, '2022-07-18 18:15:12', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (151, 'hahah199', 3, '2022-07-18 18:16:20', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (152, 'hahah513', 3, '2022-07-18 18:17:50', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (153, 'hahah592', 3, '2022-07-18 18:20:54', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (154, 'hahah793', 3, '2022-07-18 18:22:04', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (155, 'hahah378', 3, '2022-07-18 18:31:13', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (156, 'hahah412', 3, '2022-07-18 18:31:57', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (157, 'hahah218', 3, '2022-07-18 18:33:44', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (158, 'hahah958', 3, '2022-07-18 18:34:18', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (159, '213123', 3, '2022-07-31 12:44:48', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (160, '123123', 3, '2022-07-31 12:49:40', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (161, '123123', 3, '2022-07-31 12:50:20', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (162, '123123', 3, '2022-07-31 12:50:28', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (163, '123123', 3, '2022-07-31 12:51:53', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (164, '213123', 3, '2022-07-31 12:52:00', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (165, '213123', 3, '2022-07-31 12:52:09', '试卷', 0);
INSERT INTO `exam_paper` (`id`, `name`, `createdById`, `create_time`, `desc`, `total_score`) VALUES (166, '123', 3, '2022-07-31 12:52:16', '试卷', 0);
COMMIT;

-- ----------------------------
-- Table structure for exam_record
-- ----------------------------
DROP TABLE IF EXISTS `exam_record`;
CREATE TABLE `exam_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `answer` json DEFAULT NULL,
  `examPaperId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `examRoomId` int(11) DEFAULT NULL,
  `submit_time` datetime DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `relTeacherId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_d9ef41ce6eb33344b8647a348b` (`userId`,`examRoomId`),
  KEY `FK_e286feebe847ddd65812181dcfe` (`examPaperId`) USING BTREE,
  KEY `FK_41530d2983054930d125f654abb` (`userId`) USING BTREE,
  KEY `FK_f68f55d1d340bedab0ff646044f` (`examRoomId`) USING BTREE,
  KEY `FK_8feedc1d5a86f804f6e012ce76f` (`relTeacherId`),
  CONSTRAINT `FK_41530d2983054930d125f654abb` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_8feedc1d5a86f804f6e012ce76f` FOREIGN KEY (`relTeacherId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e286feebe847ddd65812181dcfe` FOREIGN KEY (`examPaperId`) REFERENCES `exam_paper` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f68f55d1d340bedab0ff646044f` FOREIGN KEY (`examRoomId`) REFERENCES `exam_room` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of exam_record
-- ----------------------------
BEGIN;
INSERT INTO `exam_record` (`id`, `create_time`, `answer`, `examPaperId`, `userId`, `examRoomId`, `submit_time`, `score`, `relTeacherId`) VALUES (1, '2022-07-18 18:17:53', '\"[{\\\"type\\\":0,\\\"qId\\\":182,\\\"answer\\\":295},{\\\"type\\\":1,\\\"qId\\\":183,\\\"answer\\\":[{\\\"content\\\":\\\"孙新阳\\\",\\\"pos\\\":1,\\\"id\\\":203},{\\\"content\\\":\\\"wf\\\",\\\"pos\\\":5,\\\"id\\\":204}]}]\"', 152, 2, 50, NULL, NULL, NULL);
INSERT INTO `exam_record` (`id`, `create_time`, `answer`, `examPaperId`, `userId`, `examRoomId`, `submit_time`, `score`, `relTeacherId`) VALUES (2, '2022-07-18 18:21:01', '\"[{\\\"type\\\":0,\\\"qId\\\":184,\\\"answer\\\":298},{\\\"type\\\":1,\\\"qId\\\":185,\\\"answer\\\":[{\\\"content\\\":\\\"孙新阳\\\",\\\"pos\\\":1,\\\"id\\\":205},{\\\"content\\\":\\\"wf\\\",\\\"pos\\\":5,\\\"id\\\":206}]}]\"', 153, 2, 51, NULL, NULL, NULL);
INSERT INTO `exam_record` (`id`, `create_time`, `answer`, `examPaperId`, `userId`, `examRoomId`, `submit_time`, `score`, `relTeacherId`) VALUES (3, '2022-07-18 18:22:08', '\"[{\\\"type\\\":0,\\\"qId\\\":186,\\\"answer\\\":301},{\\\"type\\\":1,\\\"qId\\\":187,\\\"answer\\\":[{\\\"content\\\":\\\"孙新阳\\\",\\\"pos\\\":1,\\\"id\\\":207},{\\\"content\\\":\\\"wf\\\",\\\"pos\\\":5,\\\"id\\\":208}]}]\"', 154, 2, 52, NULL, NULL, NULL);
INSERT INTO `exam_record` (`id`, `create_time`, `answer`, `examPaperId`, `userId`, `examRoomId`, `submit_time`, `score`, `relTeacherId`) VALUES (4, '2022-07-18 18:31:19', '\"[{\\\"type\\\":0,\\\"qId\\\":188,\\\"answer\\\":304},{\\\"type\\\":1,\\\"qId\\\":189,\\\"answer\\\":[{\\\"content\\\":\\\"孙新阳\\\",\\\"pos\\\":1,\\\"id\\\":209},{\\\"content\\\":\\\"wf\\\",\\\"pos\\\":5,\\\"id\\\":210}]}]\"', 155, 2, 53, NULL, NULL, NULL);
INSERT INTO `exam_record` (`id`, `create_time`, `answer`, `examPaperId`, `userId`, `examRoomId`, `submit_time`, `score`, `relTeacherId`) VALUES (5, '2022-07-18 18:32:05', '\"[{\\\"type\\\":0,\\\"qId\\\":190,\\\"answer\\\":307},{\\\"type\\\":1,\\\"qId\\\":191,\\\"answer\\\":[{\\\"content\\\":\\\"孙新阳\\\",\\\"pos\\\":1,\\\"id\\\":211},{\\\"content\\\":\\\"wf\\\",\\\"pos\\\":5,\\\"id\\\":212}]}]\"', 156, 2, 54, NULL, NULL, NULL);
INSERT INTO `exam_record` (`id`, `create_time`, `answer`, `examPaperId`, `userId`, `examRoomId`, `submit_time`, `score`, `relTeacherId`) VALUES (6, '2022-07-18 18:33:49', '\"[{\\\"type\\\":0,\\\"qId\\\":192,\\\"answer\\\":310},{\\\"type\\\":1,\\\"qId\\\":193,\\\"answer\\\":[{\\\"content\\\":\\\"孙新阳\\\",\\\"pos\\\":1,\\\"id\\\":213},{\\\"content\\\":\\\"wf\\\",\\\"pos\\\":5,\\\"id\\\":214}]}]\"', 157, 2, 55, NULL, NULL, NULL);
INSERT INTO `exam_record` (`id`, `create_time`, `answer`, `examPaperId`, `userId`, `examRoomId`, `submit_time`, `score`, `relTeacherId`) VALUES (7, '2022-07-18 18:34:24', '\"[{\\\"type\\\":0,\\\"qId\\\":194,\\\"answer\\\":313},{\\\"type\\\":1,\\\"qId\\\":195,\\\"answer\\\":[{\\\"content\\\":\\\"孙新阳\\\",\\\"pos\\\":1,\\\"id\\\":215},{\\\"content\\\":\\\"wf\\\",\\\"pos\\\":5,\\\"id\\\":216}]}]\"', 158, 2, 56, NULL, NULL, NULL);
INSERT INTO `exam_record` (`id`, `create_time`, `answer`, `examPaperId`, `userId`, `examRoomId`, `submit_time`, `score`, `relTeacherId`) VALUES (11, '2022-07-20 16:37:09', '[]', 152, 3, 50, '2022-07-20 17:19:13', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for exam_room
-- ----------------------------
DROP TABLE IF EXISTS `exam_room`;
CREATE TABLE `exam_room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '未命名考场',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `begin_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `useExamPaperId` int(11) DEFAULT NULL,
  `createdById` int(11) DEFAULT NULL,
  `forClassesId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7449c646a67f12a6823d3a501ea` (`useExamPaperId`),
  KEY `FK_edb332d0ff1174cda5e564ef36a` (`createdById`),
  KEY `FK_ba4f0d419ba25391814fa402541` (`forClassesId`),
  CONSTRAINT `FK_7449c646a67f12a6823d3a501ea` FOREIGN KEY (`useExamPaperId`) REFERENCES `exam_paper` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ba4f0d419ba25391814fa402541` FOREIGN KEY (`forClassesId`) REFERENCES `classes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_edb332d0ff1174cda5e564ef36a` FOREIGN KEY (`createdById`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of exam_room
-- ----------------------------
BEGIN;
INSERT INTO `exam_room` (`id`, `desc`, `name`, `create_time`, `begin_time`, `end_time`, `useExamPaperId`, `createdById`, `forClassesId`) VALUES (1, '嘻嘻', '你好', '2022-07-31 06:49:46', '2022-07-02 06:33:03', '2022-07-01 06:33:00', 1, 3, 5);
INSERT INTO `exam_room` (`id`, `desc`, `name`, `create_time`, `begin_time`, `end_time`, `useExamPaperId`, `createdById`, `forClassesId`) VALUES (2, '4213', '234`', '2022-07-31 07:01:00', '2022-07-04 07:00:53', '2022-07-08 07:00:50', 1, 3, 5);
INSERT INTO `exam_room` (`id`, `desc`, `name`, `create_time`, `begin_time`, `end_time`, `useExamPaperId`, `createdById`, `forClassesId`) VALUES (3, '123', '3213', '2022-07-31 07:01:37', '2022-07-03 07:01:30', '2022-07-08 07:01:27', 3, 3, 5);
INSERT INTO `exam_room` (`id`, `desc`, `name`, `create_time`, `begin_time`, `end_time`, `useExamPaperId`, `createdById`, `forClassesId`) VALUES (4, '123213', '213', '2022-07-31 07:02:37', '2022-07-01 07:02:30', '2022-07-23 07:02:27', 2, 3, 5);
INSERT INTO `exam_room` (`id`, `desc`, `name`, `create_time`, `begin_time`, `end_time`, `useExamPaperId`, `createdById`, `forClassesId`) VALUES (5, '123', '123', '2022-07-31 07:46:24', '2022-07-15 07:46:09', '2022-07-20 07:46:06', 2, 3, 5);
COMMIT;

-- ----------------------------
-- Table structure for fill_blank
-- ----------------------------
DROP TABLE IF EXISTS `fill_blank`;
CREATE TABLE `fill_blank` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionId` int(11) DEFAULT NULL,
  `pos` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `score` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_9357840954f9a75d19ead677d72` (`questionId`) USING BTREE,
  CONSTRAINT `FK_9357840954f9a75d19ead677d72` FOREIGN KEY (`questionId`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fill_blank
-- ----------------------------
BEGIN;
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (229, 239, '4', '231', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (230, 240, '2', '孙泽辉', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (231, 241, '0', '0', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (232, 242, '0', '0', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (233, 242, '1', '0', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (234, 248, '0', '0', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (235, 252, '0', '0', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (236, 253, '0', '0', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (237, 254, '0', '0', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (238, 255, '0', '0', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (239, 256, '0', '孙泽辉', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (240, 257, '0', '123123', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (241, 257, '1', '123213', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (242, 257, '2', '12313123', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (243, 259, '0', '213123', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (244, 259, '1', '123', 2);
INSERT INTO `fill_blank` (`id`, `questionId`, `pos`, `content`, `score`) VALUES (245, 260, '0', '3123123123', 2);
COMMIT;

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `q_type` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `resolution` varchar(255) NOT NULL DEFAULT '暂无解析',
  `score` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question
-- ----------------------------
BEGIN;
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-30 09:57:52', 1, 239, '123123123', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-30 09:58:27', 1, 240, '我是孙泽辉', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-30 11:07:39', 1, 241, '你好() wo', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-30 11:30:49', 1, 242, '请在 () 一章中学习有关正则表达式的更多内容。\n\n如果正则表达式不包含 g 修饰符（），match() 方法将只返回字符串中的第一个匹配项', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-30 11:32:50', 0, 243, '213123', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 10:50:33', 0, 244, '123123', '23332', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 11:48:18', 0, 245, '123', '213123', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 11:49:04', 0, 246, '123', '213123', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 12:34:04', 0, 247, '3213123', '123123', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 13:31:27', 1, 248, '13223123', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 13:31:47', 0, 249, '123', '123', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 13:36:57', 0, 250, '23456', '43', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 13:37:07', 0, 251, '12323', '12312', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 13:37:57', 1, 252, '123123', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 13:38:10', 1, 253, '213123123', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 13:40:07', 1, 254, '21222', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 13:40:22', 1, 255, '123', '33', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 13:41:35', 1, 256, '我是（）', '', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 15:25:28', 1, 257, '123123', '1223123123', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 15:34:52', 0, 258, '123', '123123', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 15:43:35', 1, 259, '21312', '2313', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 15:43:49', 1, 260, '123123', '123123', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 15:50:26', 0, 261, '我是题目', '题目解析', 2);
INSERT INTO `question` (`create_time`, `q_type`, `id`, `content`, `resolution`, `score`) VALUES ('2022-07-31 15:59:42', 0, 262, '3123', '1233123', 2);
COMMIT;

-- ----------------------------
-- Table structure for question_exam_paper
-- ----------------------------
DROP TABLE IF EXISTS `question_exam_paper`;
CREATE TABLE `question_exam_paper` (
  `exam_paper` int(11) NOT NULL,
  `question` int(11) NOT NULL,
  PRIMARY KEY (`exam_paper`,`question`) USING BTREE,
  KEY `IDX_085b002d9c41619d23a75f6804` (`exam_paper`) USING BTREE,
  KEY `IDX_d68a679ae57849e690f0e74572` (`question`) USING BTREE,
  CONSTRAINT `FK_085b002d9c41619d23a75f68040` FOREIGN KEY (`exam_paper`) REFERENCES `exam_paper` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d68a679ae57849e690f0e745722` FOREIGN KEY (`question`) REFERENCES `question` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question_exam_paper
-- ----------------------------
BEGIN;
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (2, 241);
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (2, 242);
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (2, 243);
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (166, 250);
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (166, 251);
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (166, 252);
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (166, 253);
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (166, 254);
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (166, 255);
INSERT INTO `question_exam_paper` (`exam_paper`, `question`) VALUES (166, 256);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL DEFAULT '大侠',
  `password` varchar(255) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_type` int(11) NOT NULL DEFAULT '0',
  `avatar_url` varchar(255) NOT NULL DEFAULT 'default_avatar.webp',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (1, 'sunzehui839', '大侠', '$2a$10$66/XcoiaKnlqVZJkJ12IlOHyH9uMH15fh.Ve8PMD1fSj0fU/f.Joe', '2022-07-16 14:00:05', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (2, 'sunzehui', '大侠', '$2a$10$TRHitBkizsBdmjFD31AJu.nYaMQZeaWEM8O33/6vMRTFmGS2ZjL.6', '2022-07-16 14:00:05', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (3, 'sunzehui_t', '大侠', '$2a$10$UDZr7wloAUtyi4qQZefqUe7Fysl1zoq4OeU20fdO3D7bi2JUerpNW', '2022-07-16 14:00:05', 1, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (4, 'sunzehui155', '大侠', '$2a$10$wQRnlLTVRYQUI5FD40.KO.rV8PcLcszumZI.yXG8Uair3B8zBSLMO', '2022-07-16 14:01:13', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (7, 'sunzehui687', '大侠', '$2a$10$2ePdhLuw1fsBzygd151G2OhkNPYKXqWXCScqE88ZXxRs5FY5XSmV6', '2022-07-16 14:02:43', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (10, 'sunzehui440', '大侠', '$2a$10$ww2VVD8o2yl9IiqXxpnKQ.hqiBwwsNSKjWbA/UnOZBfe1mL1HRJTy', '2022-07-16 14:03:53', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (13, 'sunzehui188', '大侠', '$2a$10$zubXiXynZpfy3tjEq00dfuElUVdmxdB1jM0zJJ1eyP1pwt7nYEifu', '2022-07-16 14:05:56', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (20, 'sunzehui2222', '大侠', '$2a$10$XLlrG61q2PsWQxpvYmVKgu8mly7uKkzcaCV7MFb83LtS7S7w72Hbm', '2022-07-23 20:00:54', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (23, 'sunzehui233', '大侠', '$2a$10$I.PLv1t3jpFflBS.v2HmVOw7wcP.eNM3pdxsM6nvrwd343K//V8YC', '2022-07-23 20:07:41', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (24, 'sunzehui23333', '大侠', '$2a$10$nZUvBGheJyL491jC8KL14eK4RYp/WoDJS/45OaGi1n7fRVGT4zrj2', '2022-07-23 20:08:10', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (25, 'sunzehui22233', '大侠', '$2a$10$62zuLRh6Fk0wTbBLxeEW2.L7YZxEXPq4.c.lu.wrFpCaTVorSZtaK', '2022-07-23 20:08:32', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (28, 'sunzehui123', 'sunzehui123', '$2a$10$Cj1BH9y5YqSw3SrztiRd8.ODqhlpc.FE8USY0rnXGmPGa5KH3LobS', '2022-08-28 14:08:26', 0, 'default_avatar.webp');
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `create_time`, `user_type`, `avatar_url`) VALUES (36, 'sunzehui3123', 'hahah', '$2a$10$LJHDIhqUixVJgqff3fwboOdnqUSeMne4URyrcv1wMhftmsyBl4oIG', '2022-09-01 06:37:52', 0, 'default_avatar.webp');
COMMIT;

-- ----------------------------
-- Table structure for user_classes
-- ----------------------------
DROP TABLE IF EXISTS `user_classes`;
CREATE TABLE `user_classes` (
  `classesId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`classesId`,`userId`) USING BTREE,
  KEY `IDX_def171b806f4d12f60c7a65092` (`classesId`) USING BTREE,
  KEY `IDX_1d9ce8904a88e1dab6c750606b` (`userId`) USING BTREE,
  CONSTRAINT `FK_1d9ce8904a88e1dab6c750606b9` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_def171b806f4d12f60c7a65092c` FOREIGN KEY (`classesId`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_classes
-- ----------------------------
BEGIN;
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (1, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (1, 36);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (2, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (3, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (4, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (5, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (5, 3);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (6, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (7, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (8, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (9, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (10, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (11, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (12, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (13, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (14, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (15, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (16, 2);
INSERT INTO `user_classes` (`classesId`, `userId`) VALUES (69, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
