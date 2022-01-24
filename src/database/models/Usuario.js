module.exports = (sequelize, dataTypes) => {
    const data = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type:dataTypes.INTEGER
        },
        user: {
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
        pass:{
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        }


    };
    const config = {

    };
    const Usuario = sequelize.define('Usuarios',data, config);
    return Usuario
}