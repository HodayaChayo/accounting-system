-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2023 at 06:20 PM
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
  `type` varchar(35) NOT NULL,
  `vat_number` varchar(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`number`, `id_vat_num`, `name`, `sort_code`, `type`, `vat_number`) VALUES
(100, '208653427', 'בנקים', 100, 'בנקים', ''),
(2200, '208653427', 'ספקים שונים', 220, 'ספקים', '');

-- --------------------------------------------------------

--
-- Table structure for table `command`
--

CREATE TABLE `command` (
  `command_index` int(11) NOT NULL,
  `command_type` varchar(10) NOT NULL,
  `reference` varchar(9) NOT NULL,
  `duty_account` int(11) NOT NULL,
  `credit_account` int(11) NOT NULL,
  `date` date NOT NULL,
  `other_date` date NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `details` varchar(100) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `input_date` date NOT NULL,
  `input_by` varchar(35) NOT NULL,
  `id_vat_num` varchar(9) NOT NULL
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
  `name` varchar(10) NOT NULL,
  `id_vat_num` varchar(9) NOT NULL,
  `credit_account` int(11) NOT NULL,
  `percent` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `command_type_debit`
--

CREATE TABLE `command_type_debit` (
  `name` varchar(10) NOT NULL,
  `id_vat_num` varchar(9) NOT NULL,
  `debit_account` int(11) NOT NULL,
  `percent` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
('arielShahar@gmail.com', '208653427', 'אריאל שחר', '0536246429', 'מורשה', '2', '2', '5.00', 'לקוח חדש שהוספתי'),
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
('208653427', 150, 'בעלי מניות'),
('208653427', 220, 'ספקים'),
('208653427', 230, 'עובדים'),
('208653427', 240, 'מוסדות'),
('208653427', 250, 'הלוואות'),
('208653427', 500, 'משכורות'),
('303877116', 100, 'בנקים'),
('303877116', 220, 'לקוחות'),
('328766404', 100, 'בנקים'),
('328766404', 220, 'ספקים'),
('328766404', 230, 'עובדים'),
('330284627', 100, 'בנקים'),
('330284627', 230, 'עובדים');

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
('ezrachayu94@gmail.com', 'Ee@22121994'),
('hodayachayo@gmail.com', 'Hh@150600'),
('korenyehuda@gmail.com', 'Ky@123456'),
('lidarTalya@gmail.com', 'Lt@123456'),
('menasheEran@gmail.com', 'Me@12345'),
('moshekadosh@gmail.com', 'Mk@123456'),
('shayhanin@gmail.com', 'Sh@123456'),
('shirasabag@gmail.com', 'Ss@123456'),
('talcohen@gmail.com', 'Tc@123456'),
('tamirElad@gmail.com', 'Te@123456');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `user_name` varchar(35) NOT NULL,
  `first_name` varchar(15) NOT NULL,
  `last_name` varchar(15) NOT NULL,
  `id` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  ADD PRIMARY KEY (`name`,`id_vat_num`,`credit_account`);

--
-- Indexes for table `command_type_debit`
--
ALTER TABLE `command_type_debit`
  ADD PRIMARY KEY (`name`,`id_vat_num`,`debit_account`);

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_name`);

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
  MODIFY `command_index` int(11) NOT NULL AUTO_INCREMENT;

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
