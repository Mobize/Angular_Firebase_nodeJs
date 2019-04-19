var db = require('../db');

var Users = {
    getUsers: function(callback)
    {
        return db.query('SELECT id, email, username from cil_utilisateur', callback);
    }
}

module.exports = Users;