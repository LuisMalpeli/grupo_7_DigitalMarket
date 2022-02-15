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

    Producto.associate = function (models) {
        Producto.hasOne(models.Categorias, {
            foreingKey: 'product_type',
            as: 'categoria'
        })
        Producto.hasOne(models.Usuarios, {
            foreingKey: 'user_id',
            as: 'creador'
        })
    }

    return Producto
}