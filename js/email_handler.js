var nodemailer = require ("nodemailer");
var config = require ('./../config');
var ejs = require ('ejs');
var fs = require ('fs');
var path = require ('path');

function sendEmail(dataObj, cb) {

    //=========== send confirmation email to user ==============
    renderHtml ('user', dataObj.userName, dataObj.email, dataObj.subject, dataObj.msg, function (err, html) {

        if (err) { cb (err, '')}


        sendEmailExecution (html, dataObj.email, 'Your request on display.com', function (error, response) {

            if (error) {

                console.log (error);
                cb (error, '');
            } else {
                // console.log ('response=', response);
                cb ('', response)
            }

        });
    });


    //=========== send email to Admin ==============
    renderHtml ('admin', dataObj.userName, dataObj.email, dataObj.subject, dataObj.msg, function (err, html) {

        if (err) { cb (err, '')}


        sendEmailExecution (html, config.adminEmail, 'New request on display.com (Ivanchenko.S)', function (error, response) {

            if (error) {

                console.log (error);
                cb (error, '');
            } else {
                // console.log ('response=', response);
                cb ('', response)
            }

        });
    });

}

function sendEmailExecution(html, sendTo, emailSubject, cb) {

    var attachedImgPath = path.join (__dirname, '..', 'assets/images/logo.png');

    let smtpTransport = nodemailer.createTransport ({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: "ivanchenko.s@gmail.com",
            clientId: config.google_oAuthClient.clientID,
            clientSecret: config.google_oAuthClient.clientSecret,
            refreshToken: config.google_oAuthClient.refreshToken
        }
    });

    var mailOptions = {
        from: "info@display.com",
        to: sendTo,
        subject: emailSubject,
        generateTextFromHTML: true,
        // html: "<b>Hello world</b>"
        html: html,
        attachments: [
            {
                filename: 'logo.png',
                path: attachedImgPath,
                cid: 'logo.png' //same cid value as in the html img src
            }
        ]
    };

    smtpTransport.sendMail (mailOptions, function (error, response) {
        if (error) {
            console.log (error);
            cb (error, '');
        } else {
            console.log ('response=', response);
            cb ('', response)
        }
        smtpTransport.close ();
    });



}


function getTemplateToRender(filePath, cb) {
    var fileStream = fs.createReadStream (filePath);
    var data = '';


    fileStream.on ('readable', function () {

        let chunk;
        while (null !== (
            chunk = fileStream.read ()
        )) {
            data += chunk;
        }

    });

    fileStream.on ('end', function () {
        cb ('', data);
    });

    fileStream.on ('error', function (err) {
        cb (err, '');
    })
}


function renderHtml(whom, userName, userEmail, subject, msg, cb) {

    if (whom === 'user') {
        templatePath = path.join (__dirname, '..', 'views/user-email-content.ejs');
    } else {
        templatePath = path.join (__dirname, '..', 'views/admin-email-content.ejs');
    }

    // var htmlContent =
    getTemplateToRender (templatePath, function (err, data) {
        if (err) {
            cb (err, '');
        }

        var htmlRenderized = ejs.render (data, {userName: userName, userEmail: userEmail, subject: subject, msg: msg});

        cb ('', htmlRenderized);
    });
}


module.exports = {
    sendEmail: sendEmail
};