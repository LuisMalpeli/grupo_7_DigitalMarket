module.exports = (sequelize, dataTypes) => {
    const data = {
        idMarca:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        marca: {
            type: dataTypes.STRING
        }
    };
    const config = {

    };
    const Marca = sequelize.define('Marcas',data, config);
    return Marca
}