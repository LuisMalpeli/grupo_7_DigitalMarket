// el tipo de dato de cada columna de la tabla con sus propiedadaes, esto es el modelo
module.exports = (sequelize, dataTypes) => {
    const data = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        title: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        },
        model: {
            type: dataTypes.STRING
            
        },
        product_type: {
            type: dataTypes.INTEGER
        },
        has_discount: {
            type: dataTypes.INTEGER
        },
        discount: {
            type: dataTypes.INTEGER
        },
        currency: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        img: {
            type: dataTypes.STRING
        },
        user_id: {
            type: dataTypes.INTEGER
        }
    };

    const config = {
        tableName: 'products',
        timestamps: false
    };

    const Producto = sequelize.define('Productos',data, config);

    // asociaciones de la tabla producto con categorias, usuarios y carrito.
    Producto.associate = function (models) { 
        Producto.belongsTo(models.Categorias, {
            foreignKey: 'product_type',
            as: 'categoria'
        })
        Producto.belongsTo(models.Usuarios, {
            foreignKey: 'user_id',
            as: 'creador'
        })
        Producto.hasMany(models.Carrito, {
            foreignKey: 'product_id',
            as: 'productosEnCarrito'
        })
    }

    return Producto
}