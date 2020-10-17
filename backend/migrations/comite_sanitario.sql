-- -----------------------------------------------------
-- Schema comite_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `comite_db` DEFAULT CHARACTER SET utf8 ;
USE `comite_db` ;

-- -----------------------------------------------------
-- Table `comite_db`.`families`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comite_db`.`families` (
  `family_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `income` FLOAT NULL,
  PRIMARY KEY (`family_id`));


-- -----------------------------------------------------
-- Table `comite_db`.`people`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comite_db`.`people` (
  `person_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `age` INT NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NULL,
  `state` VARCHAR(45) NULL,
  `geolocation` VARCHAR(255) NULL COMMENT 'String geolocation of google separated by ; where the first part is longitude and second is latitude.',
  `cpf` VARCHAR(20) NULL,
  `created_tim` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `ocupation` VARCHAR(255) NULL,
  `income` FLOAT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `families_family_id` INT NOT NULL,
  PRIMARY KEY (`person_id`, `families_family_id`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE,
  INDEX `fk_people_families_idx` (`families_family_id` ASC) VISIBLE,
  CONSTRAINT `fk_people_families`
    FOREIGN KEY (`families_family_id`)
    REFERENCES `comite_db`.`families` (`family_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `comite_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comite_db`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NULL,
  `verified` TINYINT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`));


-- -----------------------------------------------------
-- Table `comite_db`.`donations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `comite_db`.`donations` (
  `donation_id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NOT NULL,
  `description` TEXT(450) NULL,
  `destiny_type` VARCHAR(45) NULL,
  `destined_to` VARCHAR(255) NULL COMMENT 'Define if destiny donation is to a person or family',
  `value` FLOAT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `received` TINYINT NULL DEFAULT 0,
  `delivered_at` TIMESTAMP NULL,
  PRIMARY KEY (`donation_id`));


-- TODO : create function / trigger to update 'income' of a family when a person is created
-- or updated related to any family. In case of person has not family, do nothing.