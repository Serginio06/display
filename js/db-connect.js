/**
 * Created by sergiiivanchenko on 06/08/2017.
 */
const config = require ('./../config');


const mysql = require('mysql');

module.exports.pool = mysql.createPool(config.db_params);






