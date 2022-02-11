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
        product_type:{
            type: dataTypes.STRING
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
        category_id: {
            type: dataTypes.INTEGER
        },
        created_by: {
            type: dataTypes.INTEGER
        }
        ,
        brand_id: {
            type: dataTypes.INTEGER
        }
    };

    const config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };

    const Producto = sequelize.define('Productos',data, config);

    Producto.associate = function (models) {
        Producto.belongsTo(models.Categorias, {
            foreingKey: 'categorie_id',
            as: 'categoria'
        })
        Producto.belongsTo(models.Marcas, {
            foreingKey: 'brand_id',
            as: 'marca'
        })
        Producto.belongsTo(models.Usuarios, {
            foreingKey: 'created_by',
            as: 'creador'
        })
    }

    return Producto
}