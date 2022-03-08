CREATE DATABASE recruta; 

USE recruta; 

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `recrutador` BOOLEAN NOT NULL DEFAULT 0,
  `cidade` VARCHAR(100) NULL,
  `estado` VARCHAR(2) NULL,
  `verificado` BOOLEAN NOT NULL DEFAULT 0,
  `telefone` VARCHAR(15),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC)) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `candidato` (
  `Usuario_id` INT NOT NULL,
  `grau_formacao` VARCHAR(100) NOT NULL,
  `instituicao_ensino` VARCHAR(100) NOT NULL,
  `tag1` VARCHAR(100) NULL,
  `tag2` VARCHAR(100) NULL,
  `tag3` VARCHAR(100) NULL,
  `idade` INT NOT NULL,
  `portifolio` VARCHAR(100) NULL,
  PRIMARY KEY (`Usuario_id`),
  CONSTRAINT `fk_Candidato_Usuario`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `recrutador` (
  `Usuario_id` INT NOT NULL,
  `empresa` VARCHAR(100) NOT NULL,
  `cargo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Usuario_id`),
  CONSTRAINT `fk_Recrutador_Usuario1`
    FOREIGN KEY (`Usuario_id`)
    REFERENCES `Usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `experiencia` (
  `Candidato_Usuario_id` INT NOT NULL,
  `cargo` VARCHAR(100) NULL,
  `empresa` VARCHAR(100) NULL,
  INDEX `fk_Experiencia_Candidato1_idx` (`Candidato_Usuario_id` ASC)  ,
  CONSTRAINT `fk_Experiencia_Candidato1`
    FOREIGN KEY (`Candidato_Usuario_id`)
    REFERENCES `Candidato` (`Usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `vaga` (
  `id` INT NOT NULL,
  `cargo` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `salario` FLOAT NULL,
  `tipo` VARCHAR(100) NOT NULL,
  `tag1` VARCHAR(45) NULL,
  `tag2` VARCHAR(100) NULL,
  `tag3` VARCHAR(100) NULL,
  `cidade` VARCHAR(100) NULL,
  `estado` VARCHAR(2) NULL,
  `ativo` BOOLEAN DEFAULT 1,
  `quantidade` INT NOT NULL,
  `Recrutador_Usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)  ,
  INDEX `fk_Vaga_Recrutador1_idx` (`Recrutador_Usuario_id` ASC)  ,
  CONSTRAINT `fk_Vaga_Recrutador1`
    FOREIGN KEY (`Recrutador_Usuario_id`)
    REFERENCES `Recrutador` (`Usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `processo` (
  `Candidato_Usuario_id` INT NOT NULL,
  `Vaga_id` INT NOT NULL,
  `contato` BOOLEAN NOT NULL DEFAULT 0,
  `devolutiva` BOOLEAN NOT NULL DEFAULT 0,
  PRIMARY KEY (`Candidato_Usuario_id`, `Vaga_id`),
  INDEX `fk_Candidato_has_Vaga_Vaga1_idx` (`Vaga_id` ASC)  ,
  INDEX `fk_Candidato_has_Vaga_Candidato1_idx` (`Candidato_Usuario_id` ASC)  ,
  CONSTRAINT `fk_Candidato_has_Vaga_Candidato1`
    FOREIGN KEY (`Candidato_Usuario_id`)
    REFERENCES `Candidato` (`Usuario_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Candidato_has_Vaga_Vaga1`
    FOREIGN KEY (`Vaga_id`)
    REFERENCES `Vaga` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION) ENGINE = InnoDB;