-- this is a 'starter' to get a database going for the user
-- include some optional 'starter' data for demonstration purposes

-- Tables We need....

-- department
    -- id
    -- name

-- role
    -- id
    -- title
    -- salary 
    -- department_id (connection)

-- employee
    -- id
    -- first_name
    -- last name
    -- role_id (conn)
    -- manager_id (emp id of that manager)

-- of note is the fact that managers and employees are stored on the same table. Not exactly a big deal.

DROP DATABASE IF EXISTS employeedb;

CREATE DATABASE employeedb;

USE employeedb;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(45) NULL,
  PRIMARY KEY (id)
);	
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NULL,
  last_name VARCHAR(45) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);
-- demo departments
INSERT INTO departments (dep_name)
VALUES ("Chromatography");
INSERT INTO departments (dep_name)
VALUES ("Front Office and Operations");
-- demo roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Chemistry Manager", 125000.00, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Operations Manager", 150000.00, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lab Technitian", 45000.00, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Analyst", 55000.00, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Senior Chemist", 75000.00, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Data Entry", 45000.00, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 55000.00, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resources", 65000.00, 2);
-- demo employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Akbar", 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Brandy", "Benson", 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Carl", "Castle", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Denice", "Derickson", 5, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Erik", "Eifel", 2, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Frankie", "Fitzgerald", 6, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Gary", "Gustavo", 7, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Henrietta", "Hasselbeck", 8, 2);
