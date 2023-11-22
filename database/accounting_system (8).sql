-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2023 at 09:33 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `accounting_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `number` int(11) NOT NULL,
  `id_vat_num` varchar(9) NOT NULL,
  `name` varchar(35) NOT NULL,
  `sort_code` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `vat_number` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`number`, `id_vat_num`, `name`, `sort_code`, `type`, `vat_number`) VALUES
(100, '209447355', 'בנק מזרחי', 100, 'בנקים', ''),
(300, '208653427', 'הכנסות חייבות', 300, 'הכנסות חייבות במע\"מ', ''),
(310, '208653427', 'הכנסות פטורות', 300, 'הכנסות פטורות ממע\"מ', ''),
(410, '208653427', 'קניות בארץ', 410, 'הוצאות', ''),
(700, '208653427', 'שכירות משרד', 700, 'הוצאות', ''),
(703, '208653427', 'חשמל משרד', 703, 'הוצאות', ''),
(705, '208653427', 'משרדיות', 705, 'הוצאות', ''),
(730, '208653427', 'עבודות חוץ וקבלנים', 730, 'הוצאות', ''),
(750, '208653427', 'הוצאות רכב', 750, 'הוצאות', ''),
(751, '208653427', 'הוצאות דלק', 750, 'הוצאות', ''),
(1301, '208653427', 'מאיר אזולאי', 130, 'לקוחות', ''),
(1301, '209447355', 'משה מימון', 130, 'לקוחות', '302248294'),
(1302, '208653427', 'משה ששון', 130, 'לקוחות', ''),
(1303, '208653427', 'הילה דדון', 130, 'לקוחות', ''),
(1304, '208653427', 'אורי כהן', 130, 'לקוחות', ''),
(1501, '208653427', 'מע\"מ עסקאות', 240, 'מע\"מ עסקאות', ''),
(1502, '208653427', 'מע\"מ תשומות', 240, 'מע\"מ תשומות', ''),
(1507, '208653427', 'ניכוי מס במקור מלקוחות', 240, 'ניכוי במקור מלקוחות', ''),
(2200, '208653427', 'ספקים שונים', 220, 'ספקים', ''),
(2201, '209447355', 'פז חברת דלק בע\"מ', 220, 'ספקים', ''),
(2203, '208653427', 'רמי לוי בע\"מ', 220, 'הכנסות חייבות במע\"מ ופטורות ממס הכנ', ''),
(2203, '209447355', 'מוסך רמי', 220, 'ספקים', '309183994'),
(2204, '208653427', 'דור אלון', 220, 'ספקים', ''),
(2205, '208653427', 'אלאור נכסים', 220, 'ספקים', ''),
(2206, '208653427', 'חברת החשמל בע\"מ', 220, 'ספקים', ''),
(2207, '208653427', 'קרביץ ישראל בע\"מ', 220, 'ספקים', ''),
(2501, '209447355', 'הלוואה מהבנק 25K', 250, 'חו\"ז כללי', '');

-- --------------------------------------------------------

--
-- Table structure for table `command`
--

CREATE TABLE `command` (
  `command_index` int(11) NOT NULL,
  `command_type` varchar(10) NOT NULL,
  `reference` varchar(9) NOT NULL,
  `debit_account` int(11) NOT NULL,
  `credit_account` int(11) NOT NULL,
  `other_account` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `other_date` date NOT NULL,
  `debit_amount` decimal(12,2) NOT NULL,
  `credit_amount` decimal(12,2) NOT NULL,
  `other_amount` decimal(12,2) NOT NULL,
  `details` varchar(100) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `input_date` date NOT NULL,
  `input_by` varchar(35) NOT NULL,
  `id_vat_num` varchar(9) NOT NULL,
  `vat_report` decimal(6,4) NOT NULL DEFAULT 0.0000,
  `tax_income_report` decimal(6,4) NOT NULL DEFAULT 0.0000
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `command_contain_command_type`
--

CREATE TABLE `command_contain_command_type` (
  `command_indax` int(11) NOT NULL,
  `command_type` varchar(10) NOT NULL,
  `id_vat_num` varchar(9) NOT NULL,
  `debit_account` int(11) NOT NULL,
  `credit_account` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `command_type_credit`
--

CREATE TABLE `command_type_credit` (
  `code` varchar(10) NOT NULL,
  `id_vat_num` varchar(9) NOT NULL,
  `credit_account` int(11) NOT NULL,
  `percent` decimal(5,2) NOT NULL,
  `name` varchar(35) NOT NULL,
  `is_main` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `command_type_credit`
--

INSERT INTO `command_type_credit` (`code`, `id_vat_num`, `credit_account`, `percent`, `name`, `is_main`) VALUES
('הוצ', '208653427', -1, '117.00', 'הוצאות', 'כן'),
('הכ', '208653427', -1, '100.00', 'הכנסות', 'כן'),
('הכ', '208653427', 1501, '17.00', 'הכנסות', 'לא');

-- --------------------------------------------------------

--
-- Table structure for table `command_type_debit`
--

CREATE TABLE `command_type_debit` (
  `code` varchar(10) NOT NULL,
  `id_vat_num` varchar(9) NOT NULL,
  `debit_account` int(11) NOT NULL,
  `percent` decimal(5,2) NOT NULL,
  `name` varchar(35) NOT NULL,
  `is_main` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `command_type_debit`
--

INSERT INTO `command_type_debit` (`code`, `id_vat_num`, `debit_account`, `percent`, `name`, `is_main`) VALUES
('הוצ', '208653427', -1, '100.00', 'הוצאות', 'כן'),
('הוצ', '208653427', 1502, '17.00', 'הוצאות', 'לא'),
('הכ', '208653427', -1, '117.00', 'הכנסות', 'כן');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `user_name` varchar(35) NOT NULL,
  `id_vat_num` varchar(9) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `business_type` varchar(10) NOT NULL,
  `vat_frequency` varchar(1) NOT NULL,
  `tax_income_frequency` varchar(1) NOT NULL,
  `tax_income_percent` decimal(4,2) NOT NULL,
  `note` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`user_name`, `id_vat_num`, `name`, `phone`, `business_type`, `vat_frequency`, `tax_income_frequency`, `tax_income_percent`, `note`) VALUES
('aharongoren@gmail.com', '308864756', 'גורן אהרון', '0524569870', 'מורשה', '1', '1', '2.00', ''),
('arielShahar@gmail.com', '208653427', 'אריאל שחר', '0536246429', 'מורשה', '1', '2', '5.00', 'לקוח חדש שהוספתי'),
('aviAzulay@gmail.com', '209447355', 'אזולאי אבי', '0524993810', 'פטור', '1', '2', '3.00', 'טיולי גיפים'),
('dadonyossi@gmail.com', '330284627', 'דדון יוסי', '0536246429', 'מורשה', '1', '1', '0.30', 'לקוח שפתחתי'),
('korenyehuda@gmail.com', '290847635', 'קורן יהודה', '0537668261', 'מורשה', '2', '1', '4.00', 'אין הערות'),
('lidarTalya@gmail.com', '204883936', 'לידר טליה', '0522319748', 'מורשה', '1', '1', '12.00', ''),
('menasheEran@gmail.com', '328766404', 'מנשה ערן', '0558395526', 'מורשה', '1', '1', '0.00', ''),
('moshekadosh@gmail.com', '308563246', 'קדוש משה', '0536246429', 'מורשה', '2', '1', '4.00', 'הערת לקוח'),
('shayhanin@gmail.com', '309784555', 'חנין שי', '0527463888', 'מורשה', '1', '2', '10.00', 'פתיחת לקוח'),
('shirasabag@gmail.com', '308746363', 'סבג שירה', '0508636758', 'פטור', '1', '1', '3.00', 'לקוחה חדשה'),
('talcohen@gmail.com', '333958787', 'כהן טל', '0584110527', 'מורשה', '1', '1', '4.00', ''),
('tamirElad@gmail.com', '303877116', 'טמיר אלעד', '0547268337', 'מורשה', '2', '2', '15.00', '');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `name` varchar(50) NOT NULL,
  `upload_date` date NOT NULL,
  `input_date` date NOT NULL,
  `note` varchar(250) DEFAULT NULL,
  `user_name` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sort_code`
--

CREATE TABLE `sort_code` (
  `id_vat_num` varchar(9) NOT NULL,
  `number` int(11) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `sort_code`
--

INSERT INTO `sort_code` (`id_vat_num`, `number`, `name`) VALUES
('208653427', 100, 'בנקים'),
('208653427', 130, 'לקוחות'),
('208653427', 150, 'בעלי מניות'),
('208653427', 220, 'ספקים'),
('208653427', 230, 'עובדים'),
('208653427', 240, 'מוסדות'),
('208653427', 250, 'הלוואות'),
('208653427', 300, 'הכנסות'),
('208653427', 410, 'קניות'),
('208653427', 500, 'משכורות'),
('208653427', 700, 'שכירות'),
('208653427', 701, 'אחזקה'),
('208653427', 703, 'חשמל'),
('208653427', 705, 'משרדיות'),
('208653427', 730, 'עבודות חוץ וקבלנים'),
('208653427', 735, 'הנה\"ח וביקורת'),
('208653427', 740, 'אגרות'),
('208653427', 750, 'הוצאות רכב'),
('209447355', 100, 'בנקים'),
('209447355', 130, 'לקוחות'),
('209447355', 150, 'בעלי מניות'),
('209447355', 170, 'פקדונות'),
('209447355', 180, 'רכוש קבוע'),
('209447355', 220, 'ספקים'),
('209447355', 250, 'הלוואות'),
('303877116', 100, 'בנקים'),
('303877116', 220, 'לקוחות'),
('328766404', 100, 'בנקים'),
('328766404', 220, 'ספקים'),
('328766404', 230, 'עובדים'),
('330284627', 100, 'בנקים'),
('330284627', 230, 'עובדים');

-- --------------------------------------------------------

--
-- Table structure for table `tax_income_report`
--

CREATE TABLE `tax_income_report` (
  `id_vat_num` varchar(9) NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_name` varchar(35) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_name`, `password`) VALUES
('aharongoren@gmail.com', 'Ag@123456'),
('arielShahar@gmail.com', 'As@123456'),
('aviAzulay@gmail.com', 'Aa@123456'),
('dadonyossi@gmail.com', 'Dy@123456'),
('ezrachayu94@gmail.com', 'Ee@123456'),
('hadarzohar@gmail.com', 'Hz@123456'),
('hodayachayo@gmail.com', 'Hh@150600'),
('korenyehuda@gmail.com', 'Ky@123456'),
('lidarTalya@gmail.com', 'Lt@123456'),
('menasheEran@gmail.com', 'Me@12345'),
('moshekadosh@gmail.com', 'Mk@123456'),
('shayhanin@gmail.com', 'Sh@123456'),
('shirasabag@gmail.com', 'Ss@123456'),
('talcohen@gmail.com', 'Tc@123456'),
('tamirElad@gmail.com', 'Te@123456'),
('tomerpery@gmail.com', 'Tp@123456');

-- --------------------------------------------------------

--
-- Table structure for table `vat_report`
--

CREATE TABLE `vat_report` (
  `id_vat_num` varchar(9) NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `user_name` varchar(35) NOT NULL,
  `full_name` varchar(15) NOT NULL,
  `worker_type` varchar(15) NOT NULL,
  `password` varchar(9) NOT NULL,
  `is_active` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`user_name`, `full_name`, `worker_type`, `password`, `is_active`) VALUES
('ezrachayu94@gmail.com', 'חיו עזרא', 'מנהל ', 'Ee@123456', '1'),
('hadarzohar@gmail.com', 'הדר זוהר', 'עובד', 'Hz@123456', '1'),
('hodayachayo@gmail.com', 'חיו הודיה', 'מנהל ', 'Hh@150600', '1'),
('tomerpery@gmail.com', 'תומר פרי', 'מנהל', 'Tp@123456', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`number`,`id_vat_num`),
  ADD KEY `sort_code` (`sort_code`);

--
-- Indexes for table `command`
--
ALTER TABLE `command`
  ADD PRIMARY KEY (`command_index`),
  ADD KEY `id_vat_num` (`id_vat_num`);

--
-- Indexes for table `command_contain_command_type`
--
ALTER TABLE `command_contain_command_type`
  ADD PRIMARY KEY (`command_indax`,`command_type`,`id_vat_num`,`debit_account`,`credit_account`);

--
-- Indexes for table `command_type_credit`
--
ALTER TABLE `command_type_credit`
  ADD PRIMARY KEY (`code`,`id_vat_num`,`credit_account`);

--
-- Indexes for table `command_type_debit`
--
ALTER TABLE `command_type_debit`
  ADD PRIMARY KEY (`code`,`id_vat_num`,`debit_account`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`user_name`,`id_vat_num`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`name`),
  ADD KEY `user_name` (`user_name`);

--
-- Indexes for table `sort_code`
--
ALTER TABLE `sort_code`
  ADD PRIMARY KEY (`id_vat_num`,`number`);

--
-- Indexes for table `tax_income_report`
--
ALTER TABLE `tax_income_report`
  ADD PRIMARY KEY (`id_vat_num`,`year`,`month`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_name`);

--
-- Indexes for table `vat_report`
--
ALTER TABLE `vat_report`
  ADD PRIMARY KEY (`id_vat_num`,`year`,`month`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `command`
--
ALTER TABLE `command`
  MODIFY `command_index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `users` (`user_name`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;