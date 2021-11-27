const mainController = {
    index: function(req, res) {
        res.render('index')
    },
    login: function(req, res) {
        res.render('login')
    },
    register: function(req, res) {
        res.render('register')
    },

}

module.exports = mainController