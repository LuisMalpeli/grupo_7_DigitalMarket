/*-- BBDD completa--*/

DROP DATABASE IF EXISTS dh_grupo7;
CREATE DATABASE dh_grupo7;
USE dh_grupo7;


/*--
--------------Tabla de tipos de usuario------------
--*/
DROP TABLE IF EXISTS user_type;
CREATE TABLE user_type (
  id int(10) AUTO_INCREMENT NOT NULL ,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  user_type varchar(255)  NOT NULL,
  PRIMARY KEY (id)
 );

/*--
-------------------------Tabla de Categorias de productos------------------------------------------
--*/
DROP TABLE IF EXISTS product_categories;
CREATE TABLE product_categories (
  id int(10) NOT NULL AUTO_INCREMENT,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  category_name varchar(255)  NOT NULL,
  PRIMARY KEY (id)
 );

/*--
------------------------Tabla de marcas---------------------------------------
--*/
DROP TABLE IF EXISTS product_brands;
CREATE TABLE product_brands (
  id int(10) NOT NULL AUTO_INCREMENT,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  brand_name varchar(255) NOT NULL,
  PRIMARY KEY (id)
 ); 

/*--
----------------------Tabla de usuarios-------------------
--*/
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int(10) AUTO_INCREMENT NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  user_name varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  gender varchar(255) NOT NULL, 
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  avatar varchar(255) DEFAULT "default-user.png",
  type_id int(10) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT UC_users UNIQUE (user_name, email),
  CONSTRAINT FK_user_user_type FOREIGN KEY (type_id) REFERENCES user_type (id)
);


/*--
------------------------------------Tabla de Productos---------------------------------------
--*/
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id int(10) NOT NULL AUTO_INCREMENT,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  title varchar(255) NOT NULL,
  description varchar(3500) NOT NULL,
  model varchar(255) NOT NULL,
  product_type varchar(255)  NOT NULL, 
  has_discount int(10),
  discount FLOAT,
  currency varchar(255)  NOT NULL,
  price FLOAT unsigned NOT NULL,
  img varchar(255)  DEFAULT "default-product.png",
  category_id int(10),
  created_by int(10),
  brand_id int(10),
  /*category_id int(10) FOREIGN KEY REFERENCES product_categories(id),
  created_by int(10) FOREIGN KEY REFERENCES users(id),
  brand_id int(10) FOREIGN KEY REFERENCES product_brands(id),*/
  PRIMARY KEY (id),
  CONSTRAINT FK_products_categories FOREIGN KEY (category_id) REFERENCES product_categories (id),
  CONSTRAINT FK_products_users FOREIGN KEY (created_by) REFERENCES users (id),
  CONSTRAINT FK_products_brands FOREIGN KEY (brand_id) REFERENCES product_brands (id)
);


/*--
-------------------------Tabla de taggs de prodcutos------------------------------------------
--*/
/*Por el momento no hace falta esta tabla. Se solventar�a con product_categories
 * La idea original de esta tabla era crear un array de taggs atribuibles a un solo producto para mejorar la funcionalidad de b�squeda
 * DROP TABLE IF EXISTS product_taggs;
  CREATE TABLE product_taggs (
  id int(10) NOT NULL AUTO_INCREMENT,
  product_id int(10) NOT NULL,
  category_id int(10) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_taggs_products FOREIGN KEY (product_id) REFERENCES products (id),
  CONSTRAINT FK_taggs_categories FOREIGN KEY (category_id) REFERENCES product_categories (id)
 );*/


/*--
----------------------Carrito de Compras-------------------------------------------
--*/
DROP TABLE IF EXISTS shopping_cart;
CREATE TABLE shopping_cart (
  id int(10) NOT NULL AUTO_INCREMENT,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  product_id int(10) NOT NULL,
  user_id int(10)  NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_cart_products FOREIGN KEY (product_id) REFERENCES products (id),
  CONSTRAINT FK_cart_users FOREIGN KEY (user_id) REFERENCES users (id)
 );





/*--
-- Creating initial user types
--*/

LOCK TABLES user_type WRITE;
INSERT INTO user_type VALUES
(1,NULL,NULL,"admin"),
(2,NULL,NULL,"user"),
(3,NULL,NULL,"pro")
;
UNLOCK TABLES;

/*--
-- Initalizae product categories
--*/
LOCK TABLES product_categories WRITE;
INSERT INTO product_categories VALUES 
(1,NULL,NULL,"Notebooks"),
(2,NULL,NULL,"PC All in One"),
(3,NULL,NULL,"Motherboards"),
(4,NULL,NULL,"Procesadores"),
(5,NULL,NULL,"Memorias RAM"),
(6,NULL,NULL,"Almacenamiento"),
(7,NULL,NULL,"Placas de Video"),
(9,NULL,NULL,"Fuentes de Poder"),
(10,NULL,NULL,"Gabinetes"),
(11,NULL,NULL,"Refrigeraci�n PC"),
(12,NULL,NULL,"Teclados y Mouses"),
(13,NULL,NULL,"Auriculares y Micr�fonos"),
(14,NULL,NULL,"C�maras Web"),
(15,NULL,NULL,"Streaming"),
(16,NULL,NULL,"Monitores"),
(17,NULL,NULL,"Impresoras y Plotters"),
(18,NULL,NULL,"Esc�neres"),
(19,NULL,NULL,"Conectividad y Redes"),
(20,NULL,NULL,"UPS y Estabilizadores"),
(21,NULL,NULL,"Sillas y Escritorios"),
(22,NULL,NULL,"Parlantes"),
(23,NULL,NULL,"Cables"),
(24,NULL,NULL,"Consolas"),
(25,NULL,NULL,"Accesorios"),
(26,NULL,NULL,"Juegos")
;
UNLOCK TABLES;


/*--
-- Initalizae product brands
--*/
LOCK TABLES product_brands WRITE;
INSERT INTO product_brands VALUES 
(1,NULL,NULL,"Redragon"),
(2,NULL,NULL,"Seagate"),
(3,NULL,NULL,"Thermaltake"),
(4,NULL,NULL,"Viewsonic"),
(5,NULL,NULL,"Wacom"),
(6,NULL,NULL,"Amd"),
(7,NULL,NULL,"Nvidia"),
(9,NULL,NULL,"Gigabyte"),
(10,NULL,NULL,"Hannever"),
(11,NULL,NULL,"HyperX"),
(12,NULL,NULL,"Msi"),
(13,NULL,NULL,"Kingston"),
(14,NULL,NULL,"LG"),
(15,NULL,NULL,"Samsung"),
(16,NULL,NULL,"Asus"),
(17,NULL,NULL,"Lenovo"),
(18,NULL,NULL,"Dell"),
(19,NULL,NULL,"HP"),
(20,NULL,NULL,"Philips")
;
UNLOCK TABLES;

LOCK TABLES products WRITE;
INSERT INTO products (id,title,description,model,product_type,currency,price,img) VALUES
(1,"Motherboard ASUS Prime Z590-A","Tarjeta madre Intel® Z590 (LGA 1200) ATX con PCIe® 4.0, tres puertos M.2, 16 fases de poder DrMOS, HDMI®, DisplayPort™, SATA 6 Gbps, Ethernet Intel® 2.5 Gb, USB 3.2 Gen 2x2 Tipo-C® y USB 3.2 Gen 1 Tipo-C® en el panel frontal, compatibilidad con Thunderbolt™ 4 e iluminación Aura Sync RGB","PRIME-Z590-A",3,"ARS",35000,null),
(2,"AMD Ryzen™ 7 5800X3D","El AMD Ryzen™ 7 5800X3D es el primer procesador de escritorio con caché L3 apilada, que ofrece unos inigualables 96 MB de caché L3 emparejados con núcleos increíblemente rápidos para crear el procesador de escritorio para juegos más rápido del mundo.","Ryzen 7 5800X3D",4,"ARS",70000,null),
(3,"GEFORCE RTX 3090","La GeForce RTX™ 3090 es increíblemente potente en todas las formas, por lo que te brinda un nivel de rendimiento completamente nuevo. Está impulsada por Ampere, la arquitectura de segunda generación de NVIDIA RTX, que duplica el rendimiento de IA y de ray tracing gracias a los Núcleos RT y Núcleos Tensor mejorados y los nuevos multiprocesadores de transmisión. Además, cuenta con 24 GB de memoria G6X para brindar la experiencia de juego definitiva.","GEFORCE RTX 3090",7,"USD",1500,null),
(4,"DDR4 Corsair Dominator Platinum RGB","La memoria DDR4 CORSAIR DOMINATOR PLATINUM RGB redefine las memorias premium DDR4, con un diseño superior en aluminio, chips de memoria de alta frecuencia estrictamente verificados y 12 LED RGB CAPELLIX de direccionamiento individual y gran intensidad.","DDR4 CORSAIR DOMINATOR PLATINUM RGB",5,"ARS",60000,null),
(5,"HyperX QuadCast","El HyperX QuadCast™ es el micrófono independiente todo incluido ideal para el aspirante a streamer o podcaster que busca un micrófono de condensador con sonido de calidad. QuadCast viene con su propio soporte antivibraciones para ayudar a reducir los ruidos de la vida diaria y un filtro pop incorporado para amortiguar los molestos sonidos explosivos. Podrás conocer al instante el estado del micrófono gracias al indicador LED y silenciar con un sencillo toque para evitar problemas de retransmisión inesperados. Con cuatro patrones polares seleccionables, este micrófono está preparado para casi cualquier situación de grabación y también cuenta con un dial de control de ganancia convenientemente ubicado para ajustar rápidamente la sensibilidad de entrada de tu micrófono. El adaptador de montaje incluido se ajusta a roscas de 3/8 ”y 5/8” y es compatible con la mayoría de los soportes. El modelo QuadCast S proporciona iluminación RGB y efectos dinámicos que se pueden personalizar a través del software HyperX NGENUITY.","HyperX QuadCast",13,"ARS",15000,null),
(6,"Disco duro Barracuda 5TB","Todas las unidades de disco duro de la familia BarraCuda vienen equipadas con tecnología de almacenamiento en caché de múltiples niveles Multi-Tier Caching Technology (MTC). Al optimizar el flujo de datos con los niveles inteligentes de la tecnología de almacenamiento en caché de NAND Flash, DRAM y de medios, se pueden obtener tiempos de carga y aplicaciones más rápidos y mejorar el rendimiento de lectura y escritura.","Seagate Barracuda 5TB",6,"ARS",10000,null),
(7,"SSD 970 EVO NVMe M.2 500GB","Prepárate para vivir una experiencia PC de última generación. El SSD 970 EVO te ofrece unas velocidades de lectura y escritura sorprendentemente rápidas, una fiabilidad líder en el mercado, así como distintas capacidades de hasta 2 TB*. La última tecnología V-NAND, la nueva controladora Phoenix y tecnología Intelligent TurboWrite con las que disfrutarás al máximo de los juegos de alta gama y la edición gráfica 3D y 4K.","970 EVO NVMe M.2 500GB",6,"ARS",15000,null),
(8,"Monitor Odyssey G9 DQHD de 49' con pantalla curva 1000R","Las escenas vívidas te rodearán sin dejarte salir. Experimenta un nivel de juego absolutamente superior a todo lo que has visto antes. La pantalla 1000R de 49' ultraamplia llena tu visión periférica y te envuelve como si fueras el personaje del juego.","Odyssey G9 DQHD de 49'",16,"ARS",100000,null)