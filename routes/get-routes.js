/**
 * Created by sergiiivanchenko on 07/08/2017.
 */


let jwtAuth = require ('./../js/jwt_auth');

module.exports = function (app, pool) {

    app.get ('/', function (req, res) {
        res.render ('home');
    });

    app.get ('/reset-pass', function (req, res) {
            res.render ('reset-pass');

    });


    app.get ('/new-project', function (req, res) {
        if (req.session.username) {
            res.render ('new_project', {type: 'new', id: '', prjTitle: 'add new project'});
        } else {
            res.redirect ('/login');
        }

    });

    app.get ('/edit-project/:id', function (req, res) {
        if (req.session.username) {
            res.render ('new_project', {type: 'edit', id: req.params.id, prjTitle: 'edit project'});
        } else {
            res.redirect ('/login');
        }
    });

    app.get ('/contact', function (req, res) {
        res.render ('contact');
    });

    app.get ('/login', function (req, res) {
        res.render ('login-page');
    });

    app.get ('/project-info/:id', function (req, res) {
        res.render ('inf_project', {
            id: req.params.id,
        });
    });


    app.get ('/getProjectData/:id', function (req, res) {

        let sql = 'SELECT * FROM projects WHERE id=?';
        let values = [req.params.id];

        pool.query (sql, values, function (err, result) {

            if (err) {
                console.log ('err on get id= ', err);
                res.status (500).send (err);
            } else {
                res.status (200).send (result);
            }
        });

    });

    app.get ('/getCategoryItems/:category', function (req, res) {

        let sql = '';
        let values = [];
        if (req.params.category == 'all') {
            sql = 'SELECT * FROM projects';
            values = [];
        } else {
            sql = 'SELECT * FROM projects WHERE category=?';
            values = [req.params.category];
        }

        pool.query (sql, values, function (err, result) {

            if (err) {
                console.log ('err on get category= ', err);
                res.status (500).send (err);
            } else {
                res.status (200).send (result);
            }
        });
    });


    app.get ('/resetPass/:token', function (req, res) {

        jwtAuth.verifyToken (req.params.token, function (err, userId) {
            if (err) {
                console.log ('Error on /resetPass: ', err);
                if (err.code === 400) {
                    res.render ('token-expired');
                } else {
                    res.render ('error');
                }

            } else {
                res.render ('change-pass', {userId: userId})
            }



        });
    });
};
