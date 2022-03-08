module.exports = (sequelize, dataTypes) => {
    const data = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        userName: {
            type: dataTypes.STRING
        },
        fullName: {
            type: dataTypes.STRING
        },
        gender: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        },
        type_id: {
            type: dataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'users',
        timestamps: false
    };
    const Usuario = sequelize.define('Usuarios',data, config);

    Usuario.associate = function (models) {
        Usuario.belongsTo(models.UserTypes, {
            foreignKey: 'type_id',
            as: 'user_type'
        })
        Usuario.hasMany(models.Productos, {
            foreignKey: 'user_id',
            as: 'productos_enVenta'
        })
    }

    return Usuario
}