/**
 * Created by sergiiivanchenko on 07/08/2017.
 */

module.exports = function (app, pool) {

    app.get ('/', function (req, res) {
        res.render ('home');

    });

    app.get ('/new-project', function (req, res) {
        res.render ('new_project');
    });

    app.get ('/contact', function (req, res) {
        res.render ('contact');
    });

};
