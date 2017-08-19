/**
 * Created by sergiiivanchenko on 07/08/2017.
 */



// var htmlContent = fs.readFileSync(__dirname + '/main.ejs', 'utf8');
// var htmlRenderized = ejs.render(htmlContent, {filename: 'main.ejs', exampleRenderEjs: 'Hello World!'});
// console.log(htmlRenderized);


module.exports = function (app, pool) {

    app.get ('/', function (req, res) {
// console.log('req.session.userName=', req.session.username);
        // var htmlContent = sendFile(path.join(__dirname, '..' , 'views/home.ejs'),function (data) {
        //
        //     var htmlRenderized = ejs.render(data,{filename: 'home.ejs'});
        //     console.log('htmlRenderized=', htmlRenderized);
        //
        // });


        res.render ('home');
    });

    app.get ('/new-project', function (req, res) {
        if (req.session.username) {
            res.render ('new_project', {type: 'new', id: '', prjTitle: 'add new project'});
        } else {
            res.redirect ('/login');
        }

    });

    app.get ('/edit-project/:id', function (req, res) {
        console.log ('project edit, id=', req.params.id);

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

    // app.get ('/project-info/:id/:categoryIndex/:categoryName', function (req, res) {
    app.get ('/project-info/:id', function (req, res) {
        // console.log ('on project-info we received id= %s, catIndex=%s, catname=%s ', req.params.id, req.params.categoryIndex, req.params.categoryName);
        // res.render('info_project');
        res.render ('inf_project', {
            id: req.params.id,
            // categoryIndex: req.params.categoryIndex,
            // categoryName: req.params.categoryName
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
        // console.log ('req.params.category= ', req.params.category);
        // console.log ('req.session.username= ', req.session.username);

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
    })
};
