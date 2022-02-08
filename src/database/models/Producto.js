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
        // marca: {
        //     type: dataTypes.STRING
        // },
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
        }
    };
    const config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    };
    const Producto = sequelize.define('Productos',data, config);
    return Producto
}