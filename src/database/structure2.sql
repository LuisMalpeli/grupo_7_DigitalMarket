/*-- BBDD completa--*/

DROP DATABASE IF EXISTS dh_grupo7_2;
CREATE DATABASE dh_grupo7_2;
USE grupo7_digitalmarket;

SET FOREIGN_KEY_CHECKS=0; -- to disable them
SET FOREIGN_KEY_CHECKS=1; -- to re-enable them


/*--
--------------Tabla de tipos de usuario------------
--*/
DROP TABLE IF EXISTS user_type;
CREATE TABLE user_type (
  id int(10) AUTO_INCREMENT NOT NULL ,
  user_type varchar(255)  NOT NULL,
  PRIMARY KEY (id)
 );

/*--
-------------------------Tabla de Categorias de productos------------------------------------------
--*/
DROP TABLE IF EXISTS product_categories;
CREATE TABLE product_categories (
  id int(255) NOT NULL AUTO_INCREMENT,
  category_name varchar(255)  NOT NULL,
  PRIMARY KEY (id)
 );

/*--
------------------------Tabla de marcas---------------------------------------
--*/
DROP TABLE IF EXISTS product_brands;
CREATE TABLE product_brands (
  id int(10) NOT NULL AUTO_INCREMENT,
  brand_name varchar(255) NOT NULL,
  PRIMARY KEY (id)
 ); 

/*--
----------------------Tabla de usuarios-------------------
--*/
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id int(255) AUTO_INCREMENT NOT NULL,
  userName varchar(255) NOT NULL,
  fullName varchar(255) NOT NULL,
  gender varchar(255) NOT NULL, 
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  avatar varchar(255),
  type_id int(10) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_user_user_type FOREIGN KEY (type_id) REFERENCES user_type (id)
);


/*--
------------------------------------Tabla de Productos---------------------------------------
--*/
DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id int(10) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(3500) NOT NULL,
  model varchar(255) NOT NULL,
  product_type int(255)  NOT NULL, 
  has_discount int(10),
  discount FLOAT,
  currency varchar(255)  NOT NULL,
  price FLOAT unsigned NOT NULL,
  img varchar(255),
  user_id int(255),
  PRIMARY KEY (id)
  -- CONSTRAINT FK_products_categories FOREIGN KEY (product_type) REFERENCES product_categories (id),
  -- CONSTRAINT FK_products_users FOREIGN KEY (user_id) REFERENCES users (id),
);


/*--
-------------------------Tabla de taggs de prodcutos------------------------------------------
--*/
/*Por el momento no hace falta esta tabla. Se solventar???a con product_categories
 * La idea original de esta tabla era crear un array de taggs atribuibles a un solo producto para mejorar la funcionalidad de b???squeda
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
(1,"admin"),
(2,"user"),
(3,"pro")
;
UNLOCK TABLES;

/*--
-- Initalizae product categories
--*/
LOCK TABLES product_categories WRITE;
INSERT INTO product_categories VALUES 

(1,"Motherboards"),
(2,"Procesadores"),
(3,"Memorias RAM"),
(4,"Almacenamiento"),
(5,"Placas de Video"),
(6,"Fuentes de Poder")
;
UNLOCK TABLES;


/*--
-- Initalizae product brands
--*/
LOCK TABLES product_brands WRITE;
INSERT INTO product_brands VALUES 

(1,"Redragon"),
(2,"Seagate"),
(3,"Thermaltake"),
(4,"Viewsonic"),
(5,"Wacom"),
(6,"Amd"),
(7,"Nvidia"),
(9,"Gigabyte"),
(10,"Hannever"),
(11,"HyperX"),
(12,"Msi"),
(13,"Kingston"),
(14,"LG"),
(15,"Samsung"),
(16,"Asus"),
(17,"Lenovo"),
(18,"Dell"),
(19,"HP"),
(20,"Philips")
;
UNLOCK TABLES;

LOCK TABLES products WRITE;
INSERT INTO products (id,title,description,model,product_type,currency,price) VALUES
(1,"Motherboard ASUS Prime Z590-A","Tarjeta madre Intel?? Z590 (LGA 1200) ATX con PCIe?? 4.0, tres puertos M.2, 16 fases de poder DrMOS, HDMI??, DisplayPort???, SATA 6 Gbps, Ethernet Intel?? 2.5 Gb, USB 3.2 Gen 2x2 Tipo-C?? y USB 3.2 Gen 1 Tipo-C?? en el panel frontal, compatibilidad con Thunderbolt??? 4 e iluminaci??n Aura Sync RGB","PRIME-Z590-A",3,"ARS",35000),
(2,"AMD Ryzen??? 7 5800X3D","El AMD Ryzen??? 7 5800X3D es el primer procesador de escritorio con cach?? L3 apilada, que ofrece unos inigualables 96 MB de cach?? L3 emparejados con n??cleos incre??blemente r??pidos para crear el procesador de escritorio para juegos m??s r??pido del mundo.","Ryzen 7 5800X3D",4,"ARS",70000),
(3,"GEFORCE RTX 3090","La GeForce RTX??? 3090 es incre??blemente potente en todas las formas, por lo que te brinda un nivel de rendimiento completamente nuevo. Est?? impulsada por Ampere, la arquitectura de segunda generaci??n de NVIDIA RTX, que duplica el rendimiento de IA y de ray tracing gracias a los N??cleos RT y N??cleos Tensor mejorados y los nuevos multiprocesadores de transmisi??n. Adem??s, cuenta con 24 GB de memoria G6X para brindar la experiencia de juego definitiva.","GEFORCE RTX 3090",7,"USD",1500),
(4,"DDR4 Corsair Dominator Platinum RGB","La memoria DDR4 CORSAIR DOMINATOR PLATINUM RGB redefine las memorias premium DDR4, con un dise??o superior en aluminio, chips de memoria de alta frecuencia estrictamente verificados y 12 LED RGB CAPELLIX de direccionamiento individual y gran intensidad.","DDR4 CORSAIR DOMINATOR PLATINUM RGB",5,"ARS",60000),
(5,"HyperX QuadCast","El HyperX QuadCast??? es el micr??fono independiente todo incluido ideal para el aspirante a streamer o podcaster que busca un micr??fono de condensador con sonido de calidad. QuadCast viene con su propio soporte antivibraciones para ayudar a reducir los ruidos de la vida diaria y un filtro pop incorporado para amortiguar los molestos sonidos explosivos. Podr??s conocer al instante el estado del micr??fono gracias al indicador LED y silenciar con un sencillo toque para evitar problemas de retransmisi??n inesperados. Con cuatro patrones polares seleccionables, este micr??fono est?? preparado para casi cualquier situaci??n de grabaci??n y tambi??n cuenta con un dial de control de ganancia convenientemente ubicado para ajustar r??pidamente la sensibilidad de entrada de tu micr??fono. El adaptador de montaje incluido se ajusta a roscas de 3/8 ???y 5/8??? y es compatible con la mayor??a de los soportes. El modelo QuadCast S proporciona iluminaci??n RGB y efectos din??micos que se pueden personalizar a trav??s del software HyperX NGENUITY.","HyperX QuadCast",13,"ARS",15000),
(6,"Disco duro Barracuda 5TB","Todas las unidades de disco duro de la familia BarraCuda vienen equipadas con tecnolog??a de almacenamiento en cach?? de m??ltiples niveles Multi-Tier Caching Technology (MTC). Al optimizar el flujo de datos con los niveles inteligentes de la tecnolog??a de almacenamiento en cach?? de NAND Flash, DRAM y de medios, se pueden obtener tiempos de carga y aplicaciones m??s r??pidos y mejorar el rendimiento de lectura y escritura.","Seagate Barracuda 5TB",6,"ARS",10000),
(7,"SSD 970 EVO NVMe M.2 500GB","Prep??rate para vivir una experiencia PC de ??ltima generaci??n. El SSD 970 EVO te ofrece unas velocidades de lectura y escritura sorprendentemente r??pidas, una fiabilidad l??der en el mercado, as?? como distintas capacidades de hasta 2 TB*. La ??ltima tecnolog??a V-NAND, la nueva controladora Phoenix y tecnolog??a Intelligent TurboWrite con las que disfrutar??s al m??ximo de los juegos de alta gama y la edici??n gr??fica 3D y 4K.","970 EVO NVMe M.2 500GB",6,"ARS",15000),
(8,"Monitor Odyssey G9 DQHD de 49' con pantalla curva 1000R","Las escenas v??vidas te rodear??n sin dejarte salir. Experimenta un nivel de juego absolutamente superior a todo lo que has visto antes. La pantalla 1000R de 49' ultraamplia llena tu visi??n perif??rica y te envuelve como si fueras el personaje del juego.","Odyssey G9 DQHD de 49'",16,"ARS",100000),
(9,"AMD Radeon??? RX 6900 XT","La tarjeta XT gr??fica AMD Radeon??? RX 6800 XT, potenciada con la arquitectura AMD RDNA??? 2 y equipada con 80 potentes unidades de procesamiento mejoradas, 128MB de la flamante tecnolog??a AMD Infinity Cache y 16GB de memoria GDDR6 dedicada, est?? dise??ada para alcanzar velocidades de cuadros ultraaltas y jugar en 4K con una calidad deslumbrante.","RX 6900 XT",7,"USD",1000),
(10,"Intel?? Core??? i9-12900E","El procesador Intel?? Core??? de 12?? generaci??n para equipos de desktop redefine el desempe??o de la arquitectura x86. Presentamos nuestra nueva arquitectura h??brida de desempe??o, 1 que combina los n??cleos de desempe??o con los n??cleos de eficiencia para potenciar el gaming, la productividad y la creaci??n. Estos procesadores innovadores ayudan al sistema operativo al optimizar de manera inteligente las cargas de trabajo para garantizar la ubicaci??n ??ptima de los n??cleos para la ejecuci??n y preparan el camino para futuros saltos en el dise??o del procesador. Disfruta de la gama completa de las innovaciones de plataforma m??s recientes, como la primera preparaci??n PCIe 5.0 y la memoria DDR5. Sum??rgete en una experiencia visual impresionante con los gr??ficos UHD Intel??, con HDR de hasta 8K y la capacidad de ver 4 pantallas 4K simult??neas. Los procesadores Intel?? Core??? de 12?? Generaci??n para equipos de desktop est??n disponibles en una amplia variedad de opciones para obtener m??xima flexibilidad. De este modo, puedes elegir las caracter??sticas t??rmicas y de desempe??o que necesites para jugar, trabajar y crear como nunca antes.","i9-12900E",4,"ARS",190000);
UNLOCK TABLES;