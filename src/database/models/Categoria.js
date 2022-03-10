module.exports = (sequelize, dataTypes) => {
    const data = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        category_name: {
            type: dataTypes.STRING
        }
    };
    const config = {
        tableName: 'product_categories',
        timestamps: false
    };
    const Categoria = sequelize.define('Categorias',data, config);

    Categoria.associate = function (models) {
        Categoria.hasMany(models.Productos, {
            foreignKey: 'id',
            as: 'productos'
        })
    }

    return Categoria
}

// cada modelo le explica a Sequelize como es nuestra BD de cada tabla por unica vez, y asi usar los métodos y prestaciones de Sequelize.