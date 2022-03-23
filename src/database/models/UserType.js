module.exports = (sequelize, dataTypes) => {
    const data = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        user_type: {
            type: dataTypes.STRING
        }
    };
    const config = {
        tableName: 'user_type',
        timestamps: false
    };
    const UserType = sequelize.define('UserTypes',data, config);

    UserType.associate = function (models) {
        UserType.hasMany(models.Usuarios, {
            foreignKey: 'type_id',
            as: 'usuarios'
        })
    }

    return UserType
};