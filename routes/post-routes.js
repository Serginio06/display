const passwordHandler = require ('./../js/password_handler');
var emailHandler = require ('./../js/email_handler');
var multer = require ('multer');
var upload = multer ({dest: 'views/uploads/'}).single ('uploadedFile');
let fs = require ('fs');
let path = require ('path');
let jwtAuth = require ('./../js/jwt_auth');
let dbOperations = require ('./../js/db-operations');

module.exports = function (app, pool) {

    app.post ('/registerUser', function (req, res) {

        dbOperations.createNewUser (req.body.userName, req.body.pass, req.body.userEmail, function (err, result) {

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
                    res.status (200).send ('{"status":1,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
                } else {
                    res.status (200).send ('{"status":0}');
                }
            });

        }
    });

    app.post ('/send-email', function (req, res) {

        emailHandler.sendContactMessage (req.body, function (err, response) {
            if (err) {res.status (500).send ('Email was not sent. Sorry, try again later');}
        });

        res.status (200).send ('Email was sent');
    });


    app.post ('/sendResetPassLink', function (req, res) {
        console.log ('sendResetPassLink received : ', req.body);

        dbOperations.checkLoginEmailExist (req.body.userName, function (err, result) {
            console.log ('check for user existance in db returned result.length: ', result.length);
            if (err) {
                console.log ('error on checkLoginEmailExist= ', err);
                res.status (500).send ('Internal error. Sorry, try again later');
            }

            res.setHeader ('Content-type', 'application/json');
            if (result.length && result.length === 1) {
// we found user by name or email and need to send link to result.email with token for reset pass
                console.log ('we found user by name or email and need to send link to result.email with token for reset pass');
                let obj = '{"status":1}';

                let token = jwtAuth.getToken10 (result[0].id);
                // let url = '/resetPass' + '?';
                // var params = "reset_token=" + token;
                // let resetLink = path.join (req.headers.origin + url + params);
                let resetLink = path.join (req.headers.origin + '/resetPass/' + token);

                let emailObj = {
                    userName: result[0].username,
                    email: result[0].useremail,
                    subject: 'Display. Reset password request',
                    msg: resetLink
                };

                emailHandler.sendResetLink (emailObj, function (err, result) {
                    if (err) {
                        console.log (' Error on  emailHandler.sendResetLink.', err);
                        res.status (500).send ('Email was not sent. Sorry, try again later');
                    }
                    res.status (200).send (obj);
                })

            } else if (result.length && result.length > 1) {
                console.log ('More then 1 user found by this name');
                let obj = '{"status":2}';
                res.status (200).send (obj);
            } else {
                console.log ('no user in db ');
                let obj = '{"status":2}';
                res.status (200).send (obj);
            }

        });


    });

    app.post ('/passChange', function (req, res) {

        dbOperations.userPassChange (req.body.userid, req.body.pass, function (err, result) {


            if (err) {
                console.log ('err on post /passChange= ', err);
                res.setHeader ('Content-type', 'application/json');
                let obj = '{"status":0}';
                res.status (200).send (obj);
            } else {
                if (result && result.affectedRows > 0) {
                    res.setHeader ('Content-type', 'application/json');
                    let obj = '{"status":1}';
                    res.status (200).send (obj);
                } else {
                    console.log ('err on post /passChange= ', err);
                    res.setHeader ('Content-type', 'application/json');
                    let obj = '{"status":0}';
                    res.status (200).send (obj);
                }
            }

        })

    });


    app.post ('/userLogOut', function (req, res) {

        if (req.session.username && req.session.username !== undefined) {
            req.session.regenerate (function () {
                res.status (200).send ('{"status":1,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
            });

        } else {
            console.log ('user was not logged in');
            res.status (200).send ('{"status":0,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
        }
    });


    app.post ('/checkUsername', function (req, res) {

        if (req.session.username && req.session.username !== undefined) {
            res.status (200).send ('{"status":1,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
        } else {
            console.log ('Check result: user was not logged in');
            res.status (200).send ('{"status":0,"sessionUserName":"' + req.session.username + '","sessionId":"' + req.session.id + '"}');
        }
    });


    app.post ('/upload', function (req, res) {

        upload (req, res, function (err) {
            if (err) { console.log('err on post /upload: ', err);
                res.status (500).send ('{"status":"err"}');}

            if (req.body.posttype === 'new' || (
                    req.body.posttype === 'edit' && req.file
                )) {

                var fileName = Date.now ().toString ().slice (-5) + '.' + req.file.originalname.slice (-3);
                var destPath = path.join (req.file.destination, fileName);
                var src = fs.createReadStream (req.file.path);
                var dest = fs.createWriteStream (destPath);

                src.pipe (dest);

                src.on ('end', function () {
                    fs.unlink (req.file.path);

                    dbOperations.addProjectToDB (req.body, fileName, function (err, result) {

                        if (err) {
                            console.log ("Error during insering in db: ", err);
                            res.redirect ('/new-project');
                        }
                        res.redirect ('/');
                    });
                });

                src.on ('error', function (error) {
                    fs.unlink (req.file.path);
                    console.log ('Error during file upload', error);
                    res.redirect ('/new-project');
                });
            } else {
                dbOperations.addProjectToDB (req.body, '', function (err, result) {
                    // console.log('update project without file');
                    if (err) {
                        console.log ("Error during insering in db: ", err);
                        res.redirect ('/new-project');
                    }
                    res.redirect ('/');
                });
            }
        });
    });


};