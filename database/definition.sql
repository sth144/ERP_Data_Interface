# Clear database

DROP TABLE IF EXISTS `product`;
DROP TABLE IF EXISTS `employee`;
DROP TABLE IF EXISTS `equipment`;
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `experiment`;
DROP TABLE IF EXISTS `made_from`;
DROP TABLE IF EXISTS `supervises`;
DROP TABLE IF EXISTS `authorizations`;
DROP TABLE IF EXISTS `purchases`;
DROP TABLE IF EXISTS `experiment_product`;
DROP TABLE IF EXISTS `experiment_employee`;

# Table creation queries for entities

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `shelf_life` int(11) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `lead_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `supervisor` int(11) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `operators_required` int(11) DEFAULT NULL,
  `manufacturer` varchar(255) DEFAULT NULL,
  `service_interval` int(11) DEFAULT NULL,
  `service_contact` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `experiment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Relationship tables

CREATE TABLE `made_from` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent` int(11) DEFAULT NULL,
  `child` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `authorizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `experiment_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `experiment_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `experiment_employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `experiment_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Add foreign key constraints to tables

ALTER TABLE employee ADD CONSTRAINT fk_supervisor_id FOREIGN KEY (supervisor)
REFERENCES employee(id);

# Data insertion queries

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('producta', 'a', 33, 'companya', 'countrya', 40);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('productb', 'g', 3333, 'companyb', 'countrya', 40);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('productc', 'g', 33444, 'companyc', 'countrya', 44430);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('productd', 'g', 3223, 'companya', 'countryd', 430);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('producte', 'g', 333, 'companye', 'countrya', 440);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('productf', 'g', 133, 'companya', 'countrya', 40);


INSERT INTO employee
(name, supervisor, department)
VALUES
('employeea', 1, 'departmenta');

INSERT INTO employee
(name, supervisor, department)
VALUES
('employeeb', 2, 'departmenta');

INSERT INTO employee
(name, supervisor, department)
VALUES
('employeec', 1, 'departmentb');
