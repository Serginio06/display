/**
 * Created by sergiiivanchenko on 20/08/2017.
 */
var jwt = require ('jwt-simple');
var moment = require ('moment');
var config = require ('./../config');


function getToken10 (issuer) {
    var expires = moment ().add (10, 'm').valueOf ();
    var token = jwt.encode ({
        iss: issuer,
        exp: expires
    }, config.jwtSecret);

    var decoded = jwt.decode (token, config.jwtSecret);

    return token;

}

function verifyToken(token, cb) {

    if ( token && token !== undefined) {
    try {
        var decoded = jwt.decode (token, config.jwtSecret);
        // console.log('result of decoded= ', decoded);

        if (decoded.exp <= Date.now ()) {
            var err = {
                msg: 'Access token has expired',
                code: 400
            };
            return cb (err, '');
        } else {
            return cb ('', decoded.iss);
        }
    } catch (err) {
        console.log('catch error in verifyToken, err= ', err);
        return cb (err, '')
    }
    } else {
        return cb ('Token was not provided', '')
    }
}

 function getResetLinkWToken (username) {

    let token = getToken10(username);

    let url = '/resetPass' + '?';
    var params = "reset_token=" + token;
    return url + params;

}


module.exports = {
    getResetLinkWToken:getResetLinkWToken,
    verifyToken:verifyToken,
    getToken10:getToken10
};