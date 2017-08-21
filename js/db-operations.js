/**
 * Created by sergiiivanchenko on 20/08/2017.
 */
const passwordHandler = require ('./password_handler');
const {pool} = require ('./db-connect');


function userPassChange(userid, pass, cb) {

    let hashedPass = passwordHandler.encryptPassword (pass);

    sql = 'UPDATE users SET passwordHash=? WHERE id=?;';
    values = [hashedPass, userid];

    pool.query (sql, values, function (err, result) {
        return cb (err, result);
    });

}


function addProjectToDB(formPrjInputsData, fileServerName, cb) {

    let sql = '';
    let values = '';
    let dataObj = Object.assign (formPrjInputsData, {src: "uploads/" + fileServerName}, {date: new Date ().toJSON ().slice (0, 10)});
    // console.log ('dataObj=', dataObj);
    let description = dataObj.description.join ('');

    if (formPrjInputsData.posttype === 'new') {
        sql = 'INSERT INTO projects ( title, author, description, category, src, date) VALUES ( ?, ?, ?, ?, ?, ?);';
        values = [dataObj.title, dataObj.author, description, dataObj.category, dataObj.src, dataObj.date];
    } else if (formPrjInputsData.posttype === 'edit') {
        if (fileServerName) {
            sql = 'UPDATE projects SET title=?, author=?, description=?, category=?, src=?, date=? WHERE id=?;';
            values = [dataObj.title, dataObj.author, description, dataObj.category, dataObj.src, dataObj.date, formPrjInputsData.editid];
        } else {
            sql = 'UPDATE projects SET title=?, author=?, description=?, category=?,  date=? WHERE id=?;';
            values = [dataObj.title, dataObj.author, description, dataObj.category, dataObj.date, formPrjInputsData.editid];
        }
    }
    pool.query (sql, values, function (err, result) {

        if (err) {cb ('Error on insert project data to db: ' + err, '')}
        if (result && result.affectedRows > 0) {
            cb ('', result)
        } else {
            cb ('Result of insert success but not one row was inserted ', '')
        }
    });
}


function getUsernameById(userId, cb) {

    let sql = 'SELECT username FROM users WHERE id=?';
    let values = [userId];

    pool.query (sql, values, function (err, result) {

        return cb (err, result);
    });
}

function checkLoginEmailExist(userNameEmail, cb) {
    let sql;
    if (userNameEmail.indexOf ('@') === -1) {
         sql = 'SELECT * FROM users WHERE username=?';
    } else {
         sql = 'SELECT * FROM users WHERE useremail=?';
    }

    let values = [userNameEmail];
    pool.query (sql, values, function (err, result) {
        if (err) {return cb (err, '')}

        return cb ('', result);
    });


}

function createNewUser(userName, pass, userEmail, cb) {

    let hashedPass = passwordHandler.encryptPassword (pass);

    let sql = 'INSERT INTO users (username, passwordHash, useremail) VALUES(?,?,?)';
    let values = [userName, hashedPass, userEmail];

    pool.query (sql, values, function (err, result) {

        return cb (err, result);

    });
}

module.exports = {
    getUsernameById: getUsernameById,
    addProjectToDB: addProjectToDB,
    createNewUser: createNewUser,
    userPassChange: userPassChange,
    checkLoginEmailExist: checkLoginEmailExist
};