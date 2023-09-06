-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2023 at 05:53 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_name` varchar(35) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
