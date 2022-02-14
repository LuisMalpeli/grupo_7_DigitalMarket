module.exports = (sequelize, dataTypes) => {
    const data = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        brand_name: {
            type: dataTypes.STRING
        }
    };
    const config = {
        tableName: 'product_brand',
        timestamps: false
    };
    const Marca = sequelize.define('Marcas',data, config);

    // Marca.associate = function (models) {
    //     Marca.hasMany(models.Productos, {
    //         foreingKey: 'id',
    //         as: 'productos'
    //     })
    // }

    return Marca
}