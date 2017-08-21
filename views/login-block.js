
function loggedIn(status, username) {

    var logedInfo = document.getElementById ('header__login__loged-div');
    var loginElem = document.getElementById ('loginInput');
    var passElem = document.getElementById ('passInput');
    var btnLogin = document.getElementById ('header__login__btn');
    var resetPassLink = document.getElementById ('header__login__pass-change-wrapper');

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
        resetPassLink.style.display = 'none';
    } else {
        // console.log ('status false');
        logedInfo.style.display = 'none';
        loginElem.style.display = 'flex';
        loginElem.value = '';
        passElem.style.display = 'flex';
        passElem.value = '';
        btnLogin.innerHTML = 'Log in';
        resetPassLink.style.display = 'flex';
    }


}

function login() {
    console.log('starting log in');
    var loginElem = document.getElementById ('loginInput');
    var passElem = document.getElementById ('passInput');
    var alertMsgEl = document.getElementById ('alert-msg');
    // var infoMsgEl = document.getElementById ('info-msg');
    var btnLogin = document.getElementById ('header__login__btn');
    
    if (btnLogin.innerHTML === 'Log in') {

        if (loginElem.value && passElem.value) {

            var obj = JSON.parse ('{"userName":"' + loginElem.value + '","pass":"' + passElem.value + '"}');

            alertMsgEl.innerHTML = '';
            alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgUp');

            xhtpUserLogin (obj, function (err, result) {

                if (err) {console.log (err)}

                if (result.status === 1) {
                    alertMsgEl.innerHTML = 'You was logged as ' + result.sessionUserName;
                    alertMsgEl.setAttribute ('class', 'alert alert-info header__login__alertMsgDown');

                    loggedIn (true, result.sessionUserName)
                } else if (result.status === 0) {
                    alertMsgEl.innerHTML = 'We cannot find you. Check you login and password';
                    alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgDown');
                }

                setTimeout (()=> {
                    // infoMsgEl.setAttribute ('class', 'alert alert-info header__login__alertMsgUp');
                    alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgUp');

                }, 3000);

                setTimeout (()=> {
                    // infoMsgEl.innerHTML = '';
                    alertMsgEl.innerHTML = '';
                    alertMsgEl.style.width = 0;
                }, 4000)

            })

        } else {
            alertMsgEl.innerHTML = 'Please enter login and password';
            alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgDown');
            setTimeout (()=> {
                // infoMsgEl.setAttribute ('class', 'alert alert-info header__login__alertMsgUp');
                alertMsgEl.setAttribute ('class', 'alert alert-danger header__login__alertMsgUp');
            }, 3000);

            setTimeout (()=> {
                // infoMsgEl.innerHTML = '';
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
console.log('button inner html LOG out');
    xhtpUserLogOut (function (err, result) {
        if (err) {console.log (err)}

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