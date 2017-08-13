/**
 * Created by sergiiivanchenko on 06/08/2017.
 */
const config = require ('./../config');


const mysql = require('mysql');

module.exports.pool = mysql.createPool(config.db_params);
//     {
//     host:'35.187.178.187',
//     port:'3306',
//     user:'root',
//     password:'123456',
//     database:'display-db'
// });





