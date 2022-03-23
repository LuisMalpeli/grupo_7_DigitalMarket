module.exports = {
  "development": {
    "username": "grupo7_",
    "password": "grupo7digitalmarket",
    "database": "grupo7_digitalmarket",
    "host": "mysql-grupo7.alwaysdata.net",
    "dialect": "mysql"
  },//de desarrollo
  "test": {
    "username": "root",
    "password": null,
    "database": "dh_grupo7",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },// de prueba
  "production": {
    "username": "root",
    "password": null,
    "database": "dh_grupo7",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }// para producción
};

// se tiene que poner el module.exports para poder exportar toda la configuracion de sequelizerc //
