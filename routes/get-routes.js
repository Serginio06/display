/**
 * Created by sergiiivanchenko on 07/08/2017.
 */

module.exports = function (app, pool) {

    app.get ('/', function (req, res) {
        res.render ('login');
    });

};
