/**
 * Created by sergiiivanchenko on 07/08/2017.
 */

const session = require('express-session');
const mySQL = require('express-mysql-session')(session);

const mySessionStore = new mySQL({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'newschema',
    checkExpiratinInterval: 900000, // check every 15 min
    // expiration: 86400000 // 24h
    expiration: 60000 // 1 min
});


module.exports = function (app) {
    app.use(session({
        secret:'mySecretKey12345',
        store:mySessionStore,
        saveUninitialized:true,
        resave:true,
    }));
};


