module.exports = (sequelize, dataTypes) => {
    const data = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        user_id: {
            type: dataTypes.INTEGER
        }
    };

    const config = {
        tableName: 'shopping_cart',
        timestamps: false
    };

    // Asociaciones de la tabla carrito con productos.
    const Carrito = sequelize.define('Carrito',data, config); //1. alias del modelo, idem nombre del modelo archivo....2.un objeto con la confg,tipo de datos de las columnas en la ddbb.3.config adicionales.
    // estos son los 3 parametros del metodo .define()
    Carrito.associate = function (models) {
        Carrito.belongsTo(models.Productos, {
            foreignKey: 'product_id',
            as: 'productoDelCarrito'
        })
    }

    return Carrito
};