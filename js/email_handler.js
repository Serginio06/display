var nodemailer = require ("nodemailer");
var config = require ('./../config');
var ejs = require ('ejs');
var fs = require ('fs');
var path = require ('path');


function sendResetLink(dataObj, cb) {
    
    console.log('sendResetLink received: ', dataObj);
    //=========== send email to user with link to reset pass ==============
    renderHtml ('resetPassLink', dataObj.userName, dataObj.email, dataObj.subject, dataObj.msg, function (err, html) {

        if (err) { return cb (err, '')}

        sendEmailExecution (html, dataObj.email, dataObj.subject, function (error, response) {

            if (error) {
                console.log (error);
                return cb (error, '');
            } else {
                console.log ('response emailHandler.sendResetLink =', response);
                return cb ('', response)
            }
        });
    });
}


function sendContactMessage(dataObj, cb) {

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

    switch (whom) {
        case 'user':
            templatePath = path.join (__dirname, '..', 'views/user-email-content.ejs');
            break;
        case 'admin':
            templatePath = path.join (__dirname, '..', 'views/admin-email-content.ejs');
            break;
        case 'resetPassLink':
            templatePath = path.join (__dirname, '..', 'views/resetPassLink-email-content.ejs');
            break;
        default:
            return false;
    }

    getTemplateToRender (templatePath, function (err, data) {
        if (err) {return cb (err, '');}

        var htmlRenderized = ejs.render (data, {userName: userName, userEmail: userEmail, subject: subject, msg: msg});

        return cb ('', htmlRenderized);
    });
}


module.exports = {
    sendContactMessage: sendContactMessage,
    sendResetLink: sendResetLink
};