/**
 * Created by sergiiivanchenko on 07/08/2017.
 */
// const {pool} = require('./../js/db-connect');
const pool = {};

module.exports = function (app) {
    require('./get-routes')(app, pool);
    require('./post-routes')(app, pool);
};