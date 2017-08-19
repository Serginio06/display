// function signUp() {
//     console.log ('siging up');
//     var loginElem = document.getElementById ('loginInput');
//     var passElem = document.getElementById ('passInput');
//     var alertMsgEl = document.getElementById ('alert-msg');
//     var infoMsgEl = document.getElementById ('info-msg');
//
//     if (loginElem.value && passElem.value) {
//
//         var obj = JSON.parse ('{"userName":"' + loginElem.value + '","pass":"' + passElem.value + '"}');
//
//         alertMsgEl.innerHTML = '';
//         alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgUp');
//
//
//         xhtpUserRegistration (obj, function (err, result) {
//
//             if (err) {console.log (err)}
//
//             if (result.status === 1) {
//                 infoMsgEl.innerHTML = 'User ' + loginElem.value + ' was successfully registered';
//                 infoMsgEl.setAttribute ('class', 'alert alert-info header__login__alertMsgDown');
//
//             } else if (result.status === 2) {
//
//                 infoMsgEl.innerHTML = 'User ' + loginElem.value + ' has been registered in database. Try login';
//                 infoMsgEl.setAttribute ('class', 'alert alert-info header__login__alertMsgDown');
//
//             } else {
//                 console.log ('Server error. Sorry');
//             }
//
//             setTimeout (()=> {
//                 infoMsgEl.setAttribute ('class', 'alert alert-info header__login__alertMsgUp');
//                 loginElem.value = '';
//                 passElem.value = '';
//             }, 2000)
//
//         })
//
//     } else {
//         alertMsgEl.innerHTML = 'Please enter login and password';
//         alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgDown');
//
//         setTimeout (()=> {
//             alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgUp');
//         }, 3000)
//
//         setTimeout (()=> {
//             alertMsgEl.innerHTML = '';
//         }, 4000)
//     }
// }


// function xhtpUserRegistration(dataObj, cb) {
//
//     const xhtr = new XMLHttpRequest ();
//
//     xhtr.open ('POST', '/registerUser', true);
//     xhtr.setRequestHeader ('Content-type', 'application/json');
//
//     xhtr.send (JSON.stringify (dataObj));
//
//     xhtr.onload = function () {
//
//         var obj = JSON.parse (xhtr.responseText);
//
//         if (xhtr.status === 200) {
//             return cb ('', obj);
//         }
//     }
//
// }


function loggedIn(status, username) {

    var logedInfo = document.getElementById ('header__login__loged-div');
    var loginElem = document.getElementById ('loginInput');
    var passElem = document.getElementById ('passInput');
    var btnLogin = document.getElementById ('header__login__btn');

    // console.log ('this is loggedIN and status is', status === true);

    if (status) {
        // console.log ('status true');
        logedInfo.innerHTML = 'Hi ' + username;
        logedInfo.style.display = 'flex';
        loginElem.value = '';
        loginElem.style.display = 'none';
        passElem.value = '';
        passElem.style.display = 'none';
        btnLogin.innerHTML = 'Log out';
    } else {
        // console.log ('status false');
        logedInfo.style.display = 'none';
        loginElem.style.display = 'flex';
        loginElem.value = '';
        passElem.style.display = 'flex';
        passElem.value = '';
        btnLogin.innerHTML = 'Log in';
    }


}

function login() {


    var loginElem = document.getElementById ('loginInput');
    var passElem = document.getElementById ('passInput');
    var alertMsgEl = document.getElementById ('alert-msg');
    var infoMsgEl = document.getElementById ('info-msg');
    var btnLogin = document.getElementById ('header__login__btn');

    if (btnLogin.innerHTML === 'Log in') {
        console.log('button innerHTML Log in');

        if (loginElem.value && passElem.value) {

            var obj = JSON.parse ('{"userName":"' + loginElem.value + '","pass":"' + passElem.value + '"}');

            alertMsgEl.innerHTML = '';
            alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgUp');


            xhtpUserLogin (obj, function (err, result) {

                if (err) {console.log (err)}

                // console.log('login result= ', result);

                if (result.status === 1) {
                    // infoMsgEl.innerHTML = 'You logged as ' + result.sessionUserName + '. Session id= ' +
                    // result.sessionId;
                    infoMsgEl.innerHTML = 'You was logged as ' + result.sessionUserName;
                    infoMsgEl.setAttribute ('class', 'alert alert-info header__login__alertMsgDown');

                    loggedIn (true, result.sessionUserName)
                } else if (result.status === 0) {
                    alertMsgEl.innerHTML = 'User ' + loginElem.value + ' has not been registered in database. Check you login and password';
                    alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgDown');
                }

                setTimeout (()=> {
                    infoMsgEl.setAttribute ('class', 'alert alert-info header__login__alertMsgUp');
                    alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgUp');

                }, 3000);

                setTimeout (()=> {
                    infoMsgEl.innerHTML = '';
                    alertMsgEl.innerHTML = '';
                    alertMsgEl.style.width = 0;
                }, 4000)

            })

        } else {
            alertMsgEl.innerHTML = 'Please enter login and password';
            alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgDown');
            setTimeout (()=> {
                infoMsgEl.setAttribute ('class', 'alert alert-info header__login__alertMsgUp');
                alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgUp');
            }, 3000);

            setTimeout (()=> {
                infoMsgEl.innerHTML = '';
                alertMsgEl.innerHTML = '';
            }, 4000)
        }
    } else {
        console.log ('button innerHTML Log out');
        logOut ();

    }
}


function xhtpUserLogin(obj, cb) {

    var xhr = new XMLHttpRequest ();

    xhr.open ('POST', '/userLogin', true);
    xhr.setRequestHeader ('Content-type', 'application/json');
    xhr.send (JSON.stringify (obj));

    xhr.onload = function () {

        if (xhr.status === 200) {
            return cb ('', JSON.parse (xhr.responseText));
        } else {
            return cb ('Eroro on user login', '');
        }
    }
}

function logOut() {

    xhtpUserLogOut (function (err, result) {
        if (err) {console.log (err)}

        console.log ('login result= ', result);

        if (result.status === 1) {
            loggedIn (false, '');
        } else {
            console.log ('logOut returned status= ', result.status);
        }
    })
}

function xhtpUserLogOut(cb) {

    var xhr = new XMLHttpRequest ();

    xhr.open ('POST', '/userLogOut', true);
    xhr.setRequestHeader ('Content-type', 'application/json');
    xhr.send ();

    xhr.onload = function () {

        if (xhr.status === 200) {
            return cb ('', JSON.parse (xhr.responseText));
        } else {
            return cb ('Eroro on user logOut', '');
        }
    }
}


function isUserLogin() {

    xhtpUserCheckLogin (function (err, result) {
        if (err) {console.log (err)}
        if (result.status === 1) {
            loggedIn (true, result.sessionUserName)
        } else {
            loggedIn (false, '');
            // console.log ('Check user login returned status= ', result.status);
        }
    })
}

function xhtpUserCheckLogin(cb) {

    var xhr = new XMLHttpRequest ();

    xhr.open ('POST', '/checkUsername', true);
    xhr.setRequestHeader ('Content-type', 'application/json');
    xhr.send ();

    xhr.onload = function () {

        if (xhr.status === 200) {
            return cb ('', JSON.parse (xhr.responseText));
        } else {
            return cb ('Eroro on user logOut', '');
        }
    }
}