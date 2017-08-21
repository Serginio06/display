/**
 * Created by sergiiivanchenko on 07/08/2017.
 */

const session = require('express-session');
const mySQL = require('express-mysql-session')(session);
const config = require ('./../config');



// const mySessionStore = new mySQL(Object.assign(config.db_params,{checkExpirationInterval: 900000},{expiration: 60000}));
const mySessionStore = new mySQL(Object.assign(config.db_params,{checkExpirationInterval: 900000},{expiration: 600000}));


module.exports = function (app) {
    app.use(session({
        secret:'mySecretKey12345',
        store:mySessionStore,
        saveUninitialized:true,
        resave:true,
    }));
};


