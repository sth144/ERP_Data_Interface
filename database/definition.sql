# Clear database

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS batch;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS equipment;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS experiment;
DROP TABLE IF EXISTS made_from;
DROP TABLE IF EXISTS authorization;
DROP TABLE IF EXISTS purchase;
DROP TABLE IF EXISTS experiment_product;
DROP TABLE IF EXISTS experiment_employee;

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

CREATE TABLE `batch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `part_no` int(11) DEFAULT NULL,
  `expiration` date DEFAULT NULL,
  PRIMARY KEY(`id`)
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

CREATE TABLE `authorization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `equipment_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `purchase` (
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

ALTER TABLE batch ADD CONSTRAINT fk_batch_part FOREIGN KEY (part_no)
REFERENCES product(id);

ALTER TABLE employee ADD CONSTRAINT fk_supervisor_id FOREIGN KEY (supervisor)
REFERENCES employee(id);

ALTER TABLE made_from ADD CONSTRAINT fk_made_from_p FOREIGN KEY (parent)
REFERENCES product(id);

ALTER TABLE made_from ADD CONSTRAINT fk_made_from_c FOREIGN KEY (child)
REFERENCES product(id);

ALTER TABLE purchase ADD CONSTRAINT fk_purchase_c FOREIGN KEY (customer_id)
REFERENCES customer(id);

ALTER TABLE purchase ADD CONSTRAINT fk_purchase_p FOREIGN KEY (product_id)
REFERENCES product(id);

ALTER TABLE experiment_product ADD CONSTRAINT fk_exp_p_p FOREIGN KEY (product_id)
REFERENCES product(id);

ALTER TABLE experiment_product ADD CONSTRAINT fk_exp_p_e FOREIGN KEY (experiment_id)
REFERENCES experiment(id);

ALTER TABLE experiment_employee ADD CONSTRAINT fk_exp_emp_ex FOREIGN KEY (experiment_id)
REFERENCES experiment(id);

ALTER TABLE experiment_employee ADD CONSTRAINT fk_exp_emp_em FOREIGN KEY (employee_id)
REFERENCES employee(id);

ALTER TABLE authorization ADD CONSTRAINT fk_auth_emp FOREIGN KEY (employee_id)
REFERENCES employee(id);

ALTER TABLE authorization ADD CONSTRAINT fk_auth_equ FOREIGN KEY (equipment_id)
REFERENCES equipment(id);


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
('tRNA Extract', 'g', 3000, 'Genome Sciences Ltd.', 'S. Korea', 40);

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


INSERT INTO batch
(part_no, expiration)
VALUES
(1, '2018-07-07');

INSERT INTO batch
(part_no, expiration)
VALUES
(5, '2019-03-07');

INSERT INTO batch
(part_no, expiration)
VALUES
(3, '2020-07-04');

INSERT INTO batch
(part_no, expiration)
VALUES
(9, '2018-07-17');

INSERT INTO batch
(part_no, expiration)
VALUES
(7, '2019-01-27');




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

INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('FPLC', 1, 'Protein Systems', 90, 'Sherri Johnson 334-223-4138');

INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('HPLC', 1, 'Bio-Fluidics', 180, 'Sonny Eggers 443-388-4844');

INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('PCR Robot', 1, 'Bio-Robotics Inc.', 90, 'Edgar Boggs 608-283-3338');

INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('1000L Jacketed Reactor', 2, 'American Steel Co.', 1000, 'John Kerry 383-282-4828');

INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('Liquid Handling Robotics System', 1, 'Bio-Robotics Inc.', 90, 'John Lewis 483-288-4838');

INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('1000L Jacketed Reactor', 2, 'American Steel Co.', 1000, 'John Kerry 383-282-4828');

INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('1000L Jacketed Reactor', 2, 'American Steel Co.', 1000, 'John Kerry 383-282-4828');

INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('Bioprocess Skid', 3, 'Bio-Fluid Sciences', 90, 'Joanne Jenson 483-288-4838');

INSERT INTO equipment
(name, operators_required, manufacturer, service_interval, service_contact)
VALUES
('Liquid Handling Robotics System', 1, 'Bio-Robotics Inc.', 90, 'John Lewis 483-288-4838');



INSERT INTO customer
(name, contact)
VALUES
('Discovery Therapeutics', 'Jim Morrison 392-293-1222');

INSERT INTO customer
(name, contact)
VALUES
('Venture Health Sciences', 'Morgan Daniels 392-293-1848');

INSERT INTO customer
(name, contact)
VALUES
('Genome Discovery Inc.', 'Danielle Howard 392-293-1833');

INSERT INTO customer
(name, contact)
VALUES
('Fluid Pharmaceutics', 'Jimmy Hendrix 392-223-1838');

INSERT INTO customer
(name, contact)
VALUES
('Boston Medical Science', 'Django Reinhardt 334-293-1538');

INSERT INTO customer
(name, contact)
VALUES
('Research Hospital Wholesale', 'Hannah Hendrix 392-293-1838');

INSERT INTO customer
(name, contact)
VALUES
('National Institutes of Health Wholesale', 'Jenna Paulson 392-293-1838');

INSERT INTO customer
(name, contact)
VALUES
('Bio-Fluid Device Systems', 'Emily Jenson 392-293-1838');

INSERT INTO customer
(name, contact)
VALUES
('Therapeutic Bioprocesses', 'Jim Morel 392-293-1838');

INSERT INTO customer
(name, contact)
VALUES
('Protein Biotech Inc.', 'Morgan Freeman 392-293-1838');



INSERT INTO experiment
(date, notes)
VALUES
('2018-03-04', 'Antibody X is unstable at room temperature');

INSERT INTO experiment
(date, notes)
VALUES
('2017-05-04', 'Compound 1342 is insoluble in DMSO');

INSERT INTO experiment
(date, notes)
VALUES
('2018-01-31', 'Cell line 133 has apoptotic response to bilirubin in presence of compound 213');

INSERT INTO experiment
(date, notes)
VALUES
('2018-02-24', 'No primers annealed to target at 72 degrees');

INSERT INTO experiment
(date, notes)
VALUES
('2018-03-04', 'Liposome incorporation of iron channel successful');

INSERT INTO experiment
(date, notes)
VALUES
('2018-02-04', 'Channel incorporated liposomes adhere to column more strongly than vehicle');

INSERT INTO experiment
(date, notes)
VALUES
('2018-03-04', 'Statistical anomolies in X-ray diffraction dataset for enzyme A321');

INSERT INTO experiment
(date, notes)
VALUES
('2018-04-05', 'Antibody-rabbit IgG is unstable at room temperature');

INSERT INTO experiment
(date, notes)
VALUES
('2018-03-04', 'Antibody Y is unstable at room temperature');

INSERT INTO experiment
(date, notes)
VALUES
('2018-03-04', 'Antibody Z is unstable at room temperature');



# Data insertion queries for relationship tables

INSERT INTO made_from 
(parent, child)
VALUES
(11, 6);

INSERT INTO made_from 
(parent, child)
VALUES
(3, 6);

INSERT INTO made_from 
(parent, child)
VALUES
(4, 6);

INSERT INTO made_from 
(parent, child)
VALUES
(1, 2);

INSERT INTO made_from 
(parent, child)
VALUES
(3, 7);

INSERT INTO made_from 
(parent, child)
VALUES
(11, 7);

INSERT INTO made_from 
(parent, child)
VALUES
(11, 9);

INSERT INTO made_from 
(parent, child)
VALUES
(11, 1);

INSERT INTO made_from 
(parent, child)
VALUES
(11, 4);

INSERT INTO made_from 
(parent, child)
VALUES
(11, 10);



INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(1, 1);

INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(1, 2);

INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(2, 1);

INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(4, 1);

INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(6, 1);

INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(7, 1);

INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(8, 2);

INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(9, 1);

INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(4, 2);

INSERT INTO authorization
(employee_id, equipment_id)
VALUES
(5, 2);



INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');

INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');

INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');

INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');

INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');

INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');

INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');

INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');

INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');

INSERT INTO purchase
(customer_id, product_id, amount, date)
VALUES
(1, 1, 10, '2014-03-03');



INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(1, 2);

INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(4, 2);

INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(4, 2);

INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(4, 2);

INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(4, 2);

INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(4, 2);

INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(4, 3);

INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(4, 4);

INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(4, 5);

INSERT INTO experiment_product
(experiment_id, product_id)
VALUES
(5, 8);



INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(1, 2);

INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(1, 3);

INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(2, 1);

INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(3, 4);

INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(4, 5);

INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(4, 6);

INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(4, 7);

INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(4, 8);

INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(4, 9);

INSERT INTO experiment_employee
(experiment_id, employee_id)
VALUES
(4, 10);


SET FOREIGN_KEY_CHECKS = 1;