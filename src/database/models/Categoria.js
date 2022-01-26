module.exports = (sequelize, dataTypes) => {
    const data = {
        idCategoria:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        }
    };
    const config = {

    };
    const Categoria = sequelize.define('Categorias',data, config);
    return Categoria
}