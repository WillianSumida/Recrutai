CREATE DATABASE recruta; 

USE recruta;

CREATE TABLE `usuario` (
    `id` int(10) AUTO_INCREMENT, 
    `nome` varchar(100) NOT NULL, 
    `login` varchar(50) NOT NULL, 
    `senha` varchar(15) NOT NULL, 
    `candidato_recrutador` boolean DEFAULT false, 
    CONSTRAINT usuario_pk primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `vagas` (
    `id` int(10) AUTO_INCREMENT,
    `id_recrutador` int(10) NOT NULL,
    `nome_recrutador` varchar(50) NOT NULL, 
    `empresa` varchar(50) NOT NULL, 
    `informacoes` varchar(255),
    `localidade` varchar(100),
    `salario` float(4,2),
    `interesse` varchar(255) NOT NULL, 
    CONSTRAINT vaga_pk primary key (id),
    CONSTRAINT `vaga_recrutadorid_fk` FOREIGN KEY (`recrutador_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
    CONSTRAINT `vaga_nomerecrutador_fk` FOREIGN KEY (`nome_recrutador`) REFERENCES `usuario` (`nome`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `perfil_candidato` (
    `id` int(10) AUTO_INCREMENT,
    `nome` varchar(100) DEFAULT NULL, 
    `descricao` text(255),
    `formacao` varchar(255) NOT NULL, 
    `email` varchar(50),
    `localidade` varchar(50),
    `interesse` varchar(255),
    CONSTRAINT candidado_pk primary key (id)
    CONSTRAINT `candidato_candidatoid_fk` FOREIGN KEY (`candidato_id`) REFERENCES `candidato` (`id`) ON DELETE CASCADE,
    CONSTRAINT `vaga_nomerecandidato_fk` FOREIGN KEY (`nome_candidato`) REFERENCES `usuario` (`nome`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `compatibilidade` (
    `id` int(10) AUTO_INCREMENT,
    `recrutador_id` int(10),
    `candidato_id`  int(10),
    `descricao_vaga` text(255),
    `interesse_candidato` varchar(255),
    `interesse_recrutador` varchar(255),
    `percentual_compatibilidade` float (4,2),
    CONSTRAINT compatibilidade_pk primary key (id),
    CONSTRAINT `descricaovaga_fk` FOREIGN KEY (`descricao_vaga`) REFERENCES `vagas` (`descricao`) ON DELETE CASCADE,
    CONSTRAINT `interessecandidato_fk` FOREIGN KEY (`interesse_candidato`) REFERENCES `candidato` (`interesse`) ON DELETE CASCADE,
    CONSTRAINT `interesserecrutador_fk` FOREIGN KEY (`interesse_recrutador`) REFERENCES `vagas` (`interesse`) ON DELETE CASCADE,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;