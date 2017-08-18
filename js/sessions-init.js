/**
 * Created by sergiiivanchenko on 07/08/2017.
 */

const session = require('express-session');
const mySQL = require('express-mysql-session')(session);
const config = require ('./../config');



// const mySessionStore = new mySQL(Object.assign(config.db_params,{checkExpirationInterval: 900000},{expiration: 60000}));
const mySessionStore = new mySQL(Object.assign(config.db_params,{checkExpirationInterval: 900000},{expiration: 600000}));


//     {
//     host:'35.187.178.187',
//     port:'3306',
//     user:'root',
//     password:'123456',
//     database:'display-db',
//     checkExpiratinInterval: 900000, // check every 15 min
//     // expiration: 86400000 // 24h
//     expiration: 60000 // 1 min
// });

//
// module.exports = function (app) {
//     app.use(session({
//         secret:'mySecretKey12345',
//         store:mySessionStore,
//         saveUninitialized:false,
//         resave:true,
//         cookie: {
//             expires: 604800000,
//             httpOnly: false
//         }
//     }));
// };

module.exports = function (app) {
    app.use(session({
        secret:'mySecretKey12345',
        store:mySessionStore,
        saveUninitialized:true,
        resave:true,
    }));
};


