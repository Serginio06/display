/**
 * Created by sergiiivanchenko on 06/08/2017.
 */

const mysql = require('mysql');

module.exports.pool = mysql.createPool({
    host:'35.187.178.187',
    port:'3306',
    user:'root',
    password:'123456',
    database:'display-db'
});

// var gcloud = require('google-cloud');
//
// var datastore = gcloud.datastore({
//     projectId: config.get('projectId'),
//     keyFilename: config.get('keyFilename')
// });



