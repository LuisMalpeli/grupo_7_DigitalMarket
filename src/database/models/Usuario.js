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
        firstName: {
            type: dataTypes.STRING
        },
        lastName: {
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
    };
    const Usuario = sequelize.define('Usuarios',data, config);

    Usuario.associate = function (models) {
        Usuario.belongsTo(models.UserTypes, {
            foreingKey: 'type_id',
            as: 'user_type'
        })
    }

    return Usuario
}