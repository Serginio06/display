/**
 * Created by sergiiivanchenko on 07/08/2017.
 */



// var htmlContent = fs.readFileSync(__dirname + '/main.ejs', 'utf8');
// var htmlRenderized = ejs.render(htmlContent, {filename: 'main.ejs', exampleRenderEjs: 'Hello World!'});
// console.log(htmlRenderized);




module.exports = function (app, pool) {

    app.get ('/', function (req, res) {

        // var htmlContent = sendFile(path.join(__dirname, '..' , 'views/home.ejs'),function (data) {
        //
        //     var htmlRenderized = ejs.render(data,{filename: 'home.ejs'});
        //     console.log('htmlRenderized=', htmlRenderized);
        //
        // });



        res.render ('home');
    });

    app.get ('/new-project', function (req, res) {
        res.render ('new_project');
    });

    app.get ('/contact', function (req, res) {
        res.render ('contact');
    });

    app.get ('/login', function (req, res) {
        res.render ('login-page');
    });





};
