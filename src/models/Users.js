const fs = require ('fs');
const path = require ('path');
const bcrypt = require('bcryptjs')

module.exports = {
    //Path de la DB de los usuarios :
    fileName:path.resolve (__dirname, '../db/users-data/users.json'),
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    pushData: function (userList) {
        fs.writeFileSync(this.fileName,JSON.stringify(userList, null, ' '));
    },
    findAll: function () {
        //Listar usuarios
        return this.getData();
    },
    findByPk: function (pk) {
        //Buscar usuarios
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user.id == pk)
        return userFound;
    },
    findByField: function (field, text){
        //llamada a esta función --> Users.findByField(emial, usuario1@gmail.com)
        //Busca un usuario recibiendo un valor y buscando por el mismo
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user[field] === text)
        return userFound;
    },
    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },
    //Crear usuarios
    create: function (user) {
        //recibe un producto como objeto literal
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...user
        }
        allUsers.push(newUser);
        this.pushData(allUsers);
        return newUser; //retorna el producto para utilizarlo luego
    },
    //editar usuarios -- Pendiente de cambiso según los settings que configuremos en el ejs
    edit: function (user) {
        let allUsers = this.findAll();
        let userEdited = allUsers.map(function (element) {
            // encuentra y edita el usuario deseado
            if (element.id == user.id) {
                /* let oldImg = element.img
                if (product.img == null) {
                    product.img = oldImg
                } */
                element = user
            }
            return user
        })
        //guardar la BBDD
        this.pushData(userEdited);
        return true;
    },
    //Login usuario y comprobacion de datos
    login: function(user) {
        let allUsers = this.findAll()
        if (allUsers.find(element => element.email == user.email && bcrypt.compareSync(user.pass, element.pass)) != undefined) {
            //Encuentra el usuario y comprueba su contrasenia
            return true
        }  
        return false
    },
    //Eliminar usuarios
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUserList = allUsers.filter(user => user.id != id);
        this.pushData(finalUserList)
        return true; //retorna true para validar que todo funcionó
    }

}