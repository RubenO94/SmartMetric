create database AvaliacaoCompetenciasDB;

/* CREATE TABLES *************************** */
create table Avaliacao_FormTemplate (
	formTemplateId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	title varchar(255) NOT NULL,
	creationDate datetime NOT NULL,
	lastModificationDate datetime,
	createdBy int NOT NULL,
);

create table Avaliacao_ScaleTemplate (
	scaleTemplateId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	title varchar(255) NOT NULL,
	creationDate datetime NOT NULL,
	lastModificationDate datetime,
	createdBy int NOT NULL,
);

create table Avaliacao_UniqueAnsTemplate (
	uniqueAnswerTemplateId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	title varchar(255) NOT NULL,
	creationDate datetime NOT NULL,
	lastModificationDate datetime,
	createdBy int NOT NULL,
);

create table Avaliacao_Scale (
	scaleId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	scaleTemplateId int NOT NULL,
	value int NOT NULL,
	descriptionPT varchar(255) NOT NULL,
	descriptionPL varchar(255) NOT NULL,
	descriptionES varchar(255) NOT NULL,
	descriptionEN varchar(255) NOT NULL,
	descriptionFR varchar(255) NOT NULL,
	FOREIGN KEY (scaleTemplateId) REFERENCES Avaliacao_ScaleTemplate(scaleTemplateId),
);

create table Avaliacao_UniqueAns (
	uniqueAnswerId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	uniqueAnswerTemplateId int NOT NULL,
	value int NOT NULL,
	descriptionPT varchar(255) NOT NULL,
	descriptionPL varchar(255) NOT NULL,
	descriptionES varchar(255) NOT NULL,
	descriptionEN varchar(255) NOT NULL,
	descriptionFR varchar(255) NOT NULL,
	FOREIGN KEY (uniqueAnswerTemplateId) REFERENCES Avaliacao_UniqueAnsTemplate(uniqueAnswerTemplateId),
);

create table Avaliacao_Question (
	questionId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	formTemplateId int NOT NULL,
	scaleTemplateId int,
	uniqueAnswerTemplateId int,
	descriptionPT varchar(255) NOT NULL,
	descriptionPL varchar(255) NOT NULL,
	descriptionES varchar(255) NOT NULL,
	descriptionEN varchar(255) NOT NULL,
	descriptionFR varchar(255) NOT NULL,
	mandatory BIT NOT NULL,
	type int NOT NULL,
	FOREIGN KEY (formTemplateId) REFERENCES Avaliacao_FormTemplate(formTemplateId),
	FOREIGN KEY (scaleTemplateId) REFERENCES Avaliacao_ScaleTemplate(scaleTemplateId),
	FOREIGN KEY (uniqueAnswerTemplateId) REFERENCES Avaliacao_UniqueAnsTemplate(uniqueAnswerTemplateId),
);

create table Avaliacao_Evaluation (
	evaluationId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	formTemplateId int NOT NULL,
	createdBy int NOT NULL,
	dateStart datetime,
	dateEnd datetime,
	title varchar(255),
	status BIT NOT NULL,
	FOREIGN KEY (formTemplateId) REFERENCES Avaliacao_FormTemplate(formTemplateId),
);

create table Avaliacao_SingleEvaluation (
	singleEvaluationId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	IDFuncionarioSuperior int NOT NULL,
	IDFuncionario int NOT NULL,
	evaluationId int NOT NULL,
	submitDate datetime,
	FOREIGN KEY (IDFuncionarioSuperior) REFERENCES FuncionariosChefias(IDFuncionarioSuperior),
	FOREIGN KEY (IDFuncionario) REFERENCES Funcionarios(IDFuncionario),
	FOREIGN KEY (evaluationId) REFERENCES Avaliacao_Evaluation(evaluationId)
);

create table Avaliacao_Answer (
	answerId int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	questionId int NOT NULL,
	singleEvaluationID int NOT NULL,
	text varchar(255),
	classification int,
	uniqueAnswer int,
	FOREIGN KEY (questionId) REFERENCES Avaliacao_Question(questionId),
	FOREIGN KEY (singleEvaluationID) REFERENCES Avaliacao_SingleEvaluation(singleEvaluationID)
);

create table Funcionario (
	IDFuncionario int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	name varchar(255) NOT NULL,
	IDDepartamento int NOT NULL
);

create table FuncionariosChefias (
	IDFuncionariosChefias int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	IDFuncionarioSuperior int NOT NULL,
	IDFuncionario int,
	IDDepartamento int,
	FOREIGN KEY (IDFuncionario) REFERENCES Funcionario(IDFuncionario),
	FOREIGN KEY (IDDepartamento) REFERENCES Departamento(IDDepartamento)
);

create table Departamento (
	IDDepartamento int NOT NULL IDENTITY(1,1) PRIMARY KEY,
	nome varchar(255),
);

/* INSERT VALUES ***************** */
INSERT INTO Avaliacao_ScaleTemplate VALUES ('Escala_01', '2023-11-03', null, 1);

INSERT INTO Avaliacao_Scale VALUES (1, 1, 'Muito Insatisfeito', '<polaco>', '<espanhol>', 'Very Unsatisfied', '<frances>');
INSERT INTO Avaliacao_Scale VALUES (1, 2, 'Insatisfeito', '<polaco>', '<espanhol>', 'Unsatisfied', '<frances>');
INSERT INTO Avaliacao_Scale VALUES (1, 3, 'Neutro', '<polaco>', '<espanhol>', 'Neutral', '<frances>');
INSERT INTO Avaliacao_Scale VALUES (1, 4, 'Satisfeito', '<polaco>', '<espanhol>', 'Satisfied', '<frances>');
INSERT INTO Avaliacao_Scale VALUES (1, 5, 'Muito Satisfeito', '<polaco>', '<espanhol>', 'Very Satisfied', '<frances>');

INSERT INTO Avaliacao_UniqueAnsTemplate VALUES ('RespostaUnicaTemplate', '2023-11-03', null, 1);

INSERT INTO Avaliacao_UniqueAns VALUES (1, 1, 'Sim', '<polaco>', 'Si', 'Yes', 'Oui');