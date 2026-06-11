-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema firstSadn
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema firstSadn
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `firstSadn` DEFAULT CHARACTER SET utf8 ;
USE `firstSadn` ;

-- -----------------------------------------------------
-- Table `firstSadn`.`vacancies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstSadn`.`vacancies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(254) NULL,
  `description` TEXT NULL,
  `is_active` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idvacancies_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstSadn`.`applications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstSadn`.`applications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(254) NULL,
  `phone` INT NULL,
  `vacancy_id` INT NULL,
  `created_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `vacancy_id_idx` (`vacancy_id` ASC) VISIBLE,
  CONSTRAINT `vacancy`
    FOREIGN KEY (`vacancy_id`)
    REFERENCES `firstSadn`.`vacancies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `firstSadn`.`fundraisers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `firstSadn`.`fundraisers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(254) NULL,
  `target_amount` INT NULL,
  `jar_url` VARCHAR(254) NULL,
  `description` TEXT NULL,
  `is_active` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
