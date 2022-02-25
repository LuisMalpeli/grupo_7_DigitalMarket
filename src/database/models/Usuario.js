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
        Usuario.hasOne(models.UserTypes, {
<<<<<<< HEAD
            foreignKey: 'type_id',
=======
            foreignKey: 'type_id', //foreingKey
>>>>>>> d2d27aac8a1b33d90c592e7225d893e65253f1c4
            as: 'user_type'
        })
        Usuario.hasMany(models.Productos, {
            foreignKey: 'user_id',
<<<<<<< HEAD
            as: 'productos_creados'
=======
            as: 'productos_enVenta'
>>>>>>> d2d27aac8a1b33d90c592e7225d893e65253f1c4
        })
    }

    return Usuario
}