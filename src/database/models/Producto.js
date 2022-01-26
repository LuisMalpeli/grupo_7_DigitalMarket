module.exports = (sequelize, dataTypes) => {
    const data = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        titulo: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        marca: {
            type: dataTypes.STRING
        },
        modelo: {
            type: dataTypes.STRING
            
        },
        tipo:{
            type: dataTypes.STRING
        },
        moneda: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.INTEGER
        },
        enPromocion: {
            type: dataTypes.INTEGER
        },
        descuento: {
            type: dataTypes.INTEGER
        },
        img: {
            type: dataTypes.STRING
        }
    };
    const config = {

    };
    const Producto = sequelize.define('Productos',data, config);
    return Producto
}