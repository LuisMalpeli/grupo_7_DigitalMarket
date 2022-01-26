create database grupo7;

use grupo7;

create table Usuarios(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    userName VARCHAR(20) NOT NULL,
    fullName VARCHAR(30) NOT NULL,
    gender VARCHAR(1) NOT NULL,
    email VARCHAR(20) NOT NULL,
    pass VARCHAR(20) NOT NULL,
    avatar VARCHAR(50),
    tipoUsuario VARCHAR(5),
    FOREIGN KEY (tipoUsuario) REFERENCES userType(idUserType)
);

create table UserTypes(
	idUserType INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    tipo VARCHAR(5) NOT NULL
);

create table Productos(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    titulo VARCHAR(20) NOT NULL,
    descripcion VARCHAR(300),
    marca VARCHAR(20) NOT NULL,
    modelo VARCHAR(20) NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    moneda VARCHAR(50) NOT NULL,
    precio INT NOT NULL,
    enPromocion INT,
    descuento INT,
    img VARCHAR(30),
    FOREIGN KEY (tipo) REFERENCES categorias(idCategorias),
    FOREIGN KEY (marca) REFERENCES Marcas(idMarca)
);

create table Categorias(
	idCategoria INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    categoria VARCHAR(20) NOT NULL
);

create table Marcas(
	idMarca INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    marca VARCHAR(20) NOT NULL
);

