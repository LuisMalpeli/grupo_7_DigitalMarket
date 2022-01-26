module.exports = (sequelize, dataTypes) => {
    const data = {
        idUserType:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        tipo: {
            type: dataTypes.STRING
        }
    };
    const config = {

    };
    const UserType = sequelize.define('UserTypes',data, config);
    return UserType
}