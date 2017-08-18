const passwordHandler = require ('./../js/password_handler');
var emailHandler = require ('./../js/email_handler');
var multer = require ('multer');
var upload = multer ({dest: 'views/uploads/'}).single ('uploadedFile');
let fs = require ('fs');
let path = require ('path');

module.exports = function (app, pool) {

    app.post ('/registerUser', function (req, res) {

        let hashedPass = passwordHandler.encryptPassword (req.body.pass);

        let sql = 'INSERT INTO users (username, passwordHash, useremail) VALUES(?,?,?)';
        let values = [req.body.userName, hashedPass, req.body.userEmail];

        pool.query (sql, values, function (err, result) {

            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    // console.log ('Duplicate entry ');
                    let obj = '{"status":2}';
                    res.status (200).send (obj);
                } else {
                    console.log ('err on post /registerUser= ', err);
                }
            } else {
                if (result && result.affectedRows > 0) {
                    res.setHeader ('Content-type', 'application/json');
                    let obj = '{"status":1}';
                    res.status (200).send (obj);
                }
            }
        });


    });


    app.post ('/userLogin', function (req, res) {


        if (req.session.username) {

            res.status (200).send ('{"status":1,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
        } else {

            let query = passwordHandler.checkPassword (req.body.pass);
            let rows = [];

            query.on ('error', function () {

                res.status (500).send ('Some error during passwordHash check')
            });

            query.on ('result', function (row) {
                rows.push (row);
            });

            query.on ('end', function () {

                if (rows.length > 0 && rows[0].username === req.body.userName) {
                    req.session.username = rows[0].username;
                    console.log ('req.session during post:login= ', req.session);
                    res.status (200).send ('{"status":1,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
                } else {
                    res.status (200).send ('{"status":0}');
                }

                console.log ('rows = ', rows);
            });

        }
    });

    app.post ('/send-email', function (req, res) {

        emailHandler.sendEmail (req.body, function (err, response) {
            if (err) {res.status (500).send ('Email was not sent. Sorry, try again later');}
        });

        res.status (200).send ('Email was sent');
    });


    app.post ('/userLogOut', function (req, res) {

        if (req.session.username && req.session.username !== undefined) {
            // console.log (' userLogOut Session was active for user ', req.session.username);
            // req.session.username = '';
            req.session.regenerate (function () {
                res.status (200).send ('{"status":1,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
            });

        } else {
            console.log ('user was not logged in');
            res.status (200).send ('{"status":0,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
        }
    });


    app.post ('/checkUsername', function (req, res) {
        // console.log ('CHECK. req.session.username= ', req.session.username);
        // console.log ('CHECK. req.session.id= ', req.session.id);

        if (req.session.username && req.session.username !== undefined) {
            res.status (200).send ('{"status":1,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
        } else {
            console.log ('Check result: user was not logged in');
            res.status (200).send ('{"status":0,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
        }
    });


    app.post ('/upload', function (req, res) {

        upload (req, res, function (err) {
            if (err) {
                res.status (500).send ('{"status":"err"}');
            }

            console.log ('req.file=', req.file);
            console.log ('req.body=', req.body);
            var fileName = Date.now ().toString ().slice (-5) + '.' + req.file.originalname.slice (-3);

            var destPath = path.join (req.file.destination, fileName);

            var src = fs.createReadStream (req.file.path);
            var dest = fs.createWriteStream (destPath);

            src.pipe (dest);

            src.on ('end', function () {
                fs.unlink (req.file.path);

                addProjectToDB(req.body,fileName, function (err, result) {

                    if ( err ) {
                        console.log("Error during insering in db: ", err);
                        res.redirect ('/new-project');
                    }

                    res.redirect ('/');
                });

            });

            src.on ('error', function (error) {
                fs.unlink (req.file.path);
                console.log ('Error during file upload', error);
                res.redirect ('/new-project');
                // res.status (500).send ('Error during file upload', error)
            });

        });

    });

    function addProjectToDB(formPrjInputsData, fileServerName, cb) {

        let dataObj = Object.assign(formPrjInputsData, {src:"uploads/"+fileServerName},{date:new Date().toJSON().slice(0,10)});
        console.log('dataObj=', dataObj);

        let sql = 'INSERT INTO projects ( title, author, description, category, src, date) VALUES ( ?, ?, ?, ?, ?, ?);';
        let values = [ dataObj.title, dataObj.author, dataObj.description, dataObj.category, dataObj.src, dataObj.date];

        // INSERT INTO `data`.`projects` (`id`, `title`, `author`, `description`, `category`, `src`, `date`) VALUES ('19', 'project 19', 'someAuthor', 'description', 'web', 'src here', '2017-11-05');

        pool.query (sql, values, function (err, result) {

            if ( err ) {cb ('Error on insert project data to db: '+ err, '')}
            if (result && result.affectedRows > 0) {
                        // res.setHeader ('Content-type', 'application/json');
                        // let obj = '{"status":1}';
                        // res.status (200).send (obj);
                        cb('',result)
                    } else {
                cb ('Result of insert success but not one row was inserted ', '')
            }


            // if (err) {
            //     if (err.code === "ER_DUP_ENTRY") {
            //         // console.log ('Duplicate entry ');
            //         let obj = '{"status":2}';
            //         res.status (200).send (obj);
            //     } else {
            //         console.log ('err on post /registerUser= ', err);
            //     }
            // } else {
            //     if (result && result.affectedRows > 0) {
            //         res.setHeader ('Content-type', 'application/json');
            //         let obj = '{"status":1}';
            //         res.status (200).send (obj);
            //     }
            // }
        });

    }

};