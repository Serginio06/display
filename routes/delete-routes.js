/**
 * Created by sergiiivanchenko on 07/08/2017.
 */



// var htmlContent = fs.readFileSync(__dirname + '/main.ejs', 'utf8');
// var htmlRenderized = ejs.render(htmlContent, {filename: 'main.ejs', exampleRenderEjs: 'Hello World!'});
// console.log(htmlRenderized);


module.exports = function (app, pool) {

    app.delete ('/delete/:id', function (req, res) {

        if (req.session.username) {

            let sql = 'DELETE FROM projects WHERE id=?';
            let values = [req.params.id];

            pool.query (sql, values, function (err, result) {

                if (err) {

                    console.log ('err.code=', err.code);

                    if (err.code === "ER_DUP_ENTRY") {
                        // console.log ('Project not found to delete ');
                        let obj = '{"status":0}';
                        res.status (200).send (obj);
                    } else {
                        console.log ('err on delete project ', err);
                    }
                } else {
                    if (result && result.affectedRows > 0) {
                        res.setHeader ('Content-type', 'application/json');
                        let obj = '{"status":1}';
                        res.status (200).send (obj);
                    }
                }
            });

        } else {
            let obj = '{"status":2}';
            res.status (200).send (obj);
        }
    });


};
