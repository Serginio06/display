var crypto = require('crypto');
var mysql = require('mysql');
const config = require ('./../config');

module.exports = {
    // хэширование пароля
    encryptPassword: function (password) {
        var hash = crypto.createHmac('sha1', 'abc').update(password).digest('hex'); 
        return hash;
    },

    // проверка пароля 
    checkPassword: function (password) { 

        var connection = mysql.createConnection(config.db_params);
        //     {
        //     host: '35.187.178.187',
        //     port: 3306,
        //     user: 'root',
        //     password: '123456',
        //     database: 'display-db'
        // });

        connection.connect(function (err) { if (err) console.log(err) });

        var sql = 'SELECT * FROM `users` WHERE passwordHash=?'; 
        var inserts = this.encryptPassword(password);
        var sql = mysql.format(sql, inserts);

        var query = connection.query(sql); 
        return query; 
    }
};