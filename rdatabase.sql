CREATE SCHEMA IF NOT EXISTS `firstSadn` DEFAULT CHARACTER SET utf8 ;
USE `firstSadn` ;

-- 1. ТАБЛИЦЯ ВАКАНСІЙ
CREATE TABLE IF NOT EXISTS `firstSadn`.`vacancies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(254) NOT NULL,            -- Обов'язкове поле
  `description` TEXT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1, -- За замовчуванням активна (1 - True)
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- 2. ТАБЛИЦЯ ЗАЯВОК (ВІДГУКІВ)
CREATE TABLE IF NOT EXISTS `firstSadn`.`applications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(254) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `vacancy_id` INT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Авто-дата створення
  PRIMARY KEY (`id`),
  INDEX `vacancy_id_idx` (`vacancy_id` ASC) VISIBLE,
  CONSTRAINT `fk_vacancy`
    FOREIGN KEY (`vacancy_id`)
    REFERENCES `firstSadn`.`vacancies` (`id`)
    ON DELETE SET NULL                       -- Якщо вакансію видалять, заявка залишиться, але поле стане NULL
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- 3. ТАБЛИЦЯ ЗБОРІВ (ДОНАТІВ)
CREATE TABLE IF NOT EXISTS `firstSadn`.`fundraisers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(254) NOT NULL,
  `target_amount` INT NOT NULL DEFAULT 0,    -- Сума збору (краще зберігати в копійках/цетанах, або просто як INT)
  `jar_url` VARCHAR(254) NOT NULL,           -- Посилання на банку (обов'язкове)
  `description` TEXT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;