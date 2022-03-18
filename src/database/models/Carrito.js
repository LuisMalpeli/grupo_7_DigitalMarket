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
    const Carrito = sequelize.define('Carrito',data, config);

    Carrito.associate = function (models) {
        Carrito.belongsTo(models.Productos, {
            foreignKey: 'product_id',
            as: 'productoDelCarrito'
        })
    }

    return Carrito
}