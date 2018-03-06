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
  `shelf_life` int(11) DEFAULT 99999,
  `supplier` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `lead_time` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
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
('alpha-Amylase', 'mg', 1000, 'Bio-Hub', 'USA', 40);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('RNase A', 'g', 2000, 'Genotype Inc.', 'USA', 20);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('Paramagnetic Agarose Resin', 'L', 2000, 'Resin Research Corporation', 'USA', 44);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('Taq Polymerase', 'g', 3000, 'Biotec de Buenos Aires', 'Argentina', 10);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('Compound Library A', 'g', 365, 'Rio Bioscience', 'Brazil', 20);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('Primer Library A', 'g', 3000, 'Genome Sciences Ltd.', 'S. Korea', 40);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('Paramagnetic Agarose Resin', 'g', 365, 'Rio Bioscience', 'Brazil', 20);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('Bovine tRNA Extract', 'g', 3000, 'Genome Sciences Ltd.', 'S. Korea', 40);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('HEK Screening Cell Line', 'billion cells', 365, 'Bio-Hub', 'USA', 20);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('Size Exclusion Chromatography Resin', 'g', 3000, 'Genome Sciences Ltd.', 'S. Korea', 40);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('System Liquid for High Throughput Robotics', 'g', 365, 'Rio Bioscience', 'Brazil', 20);

INSERT INTO product
(name, unit, shelf_life, supplier, country, lead_time)
VALUES
('RFID Tags', 'g', 3000, 'Genome Sciences Ltd.', 'S. Korea', 40);



INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('Mark', 'Lewis', 1, 'Production');

INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('Jennifer', 'Stewart', 1, 'Process Development');

INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('Howard', 'Jackson', 2, 'Logistics');

INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('Paula', 'Peterson', 4, 'Lead Research');

INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('Liz', 'Waters', 4, 'Upstream Process');

INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('Wyeth', 'Jimbo', 1, 'Downstream Process');

INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('Bill', 'Hampton', 1, 'Downstream Process');

INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('Sara', 'Sanders', 1, 'Fermentation');

INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('James', 'Dean', 5, 'Software Engineering');

INSERT INTO employee
(fname, lname, supervisor, department)
VALUES
('Peter', 'Dinklage', 1, 'Instrumentation Engineering');



INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('Liquid Handling Robotics System', 1, 'Bio-Robotics Inc.', 90, 'John Lewis 483-288-4838');



INSERT INTO customer
(name, contact)
VALUES
('Discovery Therapeutics', 'Jim Morrison 392-293-1838');



INSERT INTO experiment
(date, notes)
VALUES
('2018-03-04', 'Antibody X is unstable at room temperature')


