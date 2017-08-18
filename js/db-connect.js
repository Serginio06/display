/**
 * Created by sergiiivanchenko on 06/08/2017.
 */
const config = require ('./../config');


const mysql = require('mysql');

// module.exports.pool = mysql.createPool(config.db_params);
var pool = mysql.createPool(
    Object.assign(config.db_params, {
    connectionLimit : 1,
    queueLimit      : 100,
    aquireTimeout   : 5000,
}));






