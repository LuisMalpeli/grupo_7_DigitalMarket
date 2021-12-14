const fs = require('fs');
const path = require('path');
const Users = require('../models/Users')

const userController = {
    register: function(req, res) {
        res.render('users/register') 
    },
    registerSend : function(req,res) {
        let userCreate = {
            ...req.body,
            
        }
    },
    login: function(req, res) {
        res.render('users/login')
    }

}

module.exports = userController