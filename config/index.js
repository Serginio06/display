module.exports = {
    db_params:{
        host:'35.187.178.187',
        port:'3306',
        user:'root',
        password:'123456',
        database:'display-db'
    },
    port:process.env.port || 8081
};



// module.exports = function (app) {
//
//     app.set ('port', process.env.port || 1337);
//     app.set('db_params',{
//         host:'35.187.178.187',
//         port:'3306',
//         user:'root',
//         password:'123456',
//         database:'display-db'
//     });
//     // app.set ('projectId', '[circular-source-174612]');
//     // app.set ('keyFilename', './Dinamika-nodejs-91e51442875f.json');
//
//
//     return {
//         get: function (variable) {
//             return app.get (variable);
//         }
//     };
//
// };
