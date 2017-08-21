function signUp() {
    var loginElem = document.getElementById ('loginPageInput');
    var passElem = document.getElementById ('passPageInput');
    var emailElem = document.getElementById ('emailInput');

    if (loginElem.value && passElem.value && emailElem.value && isNameValid && isEmailValid && isPasswordValid) {

        var obj = JSON.parse ('{"userName":"' + loginElem.value + '","pass":"' + passElem.value + '","userEmail":"' + emailElem.value + '"}');

        xhtpUserRegistration (obj, function (err, result) {

            if (err) {console.log (err)}

            if (result.status === 1) {
                checkSubmitResult ('success', 'User ' + loginElem.value + ' was successfully registered');
            } else if (result.status === 2) {
                checkSubmitResult ('info', 'User ' + loginElem.value + ' has been registered in database. Try login');
            } else {
                checkSubmitResult ('err', 'Server error. Sorry');
                console.log ('Server error. Sorry');
            }
        })
    } else {
        checkSubmitResult ('err', 'Please enter valide login, password and email');
    }
}


function checkSubmitResult(type, msg) {
    var errEl = document.getElementById ('signup__err__submit');

    if (type === 'err') {
        errEl.style.color = '#a94442';
        errEl.style.backgroundColor = '#f2dede';
        errEl.innerHTML = msg;
        errEl.setAttribute ('class', 'signup__err__submit signup__err__submit-showup');

        setTimeout (function () {
            errEl.setAttribute ('class', 'signup__err__submit');
        }, 3000)

    } else if (type === 'success') {
        // console.log('Successesfully registered new user');
        errEl.style.color = '#3c763d';
        errEl.style.backgroundColor = '#dff0d8';
        errEl.innerHTML = msg;
        errEl.setAttribute ('class', 'signup__err__submit signup__err__submit-showup');
        setTimeout (function () {

            errEl.innerHTML = '';
            errEl.setAttribute ('class', 'signup__err__submit');
        }, 3000);
        cleanLoginPageInputs ();
    } else {
        // console.log('INFO during user registration');
        errEl.style.color = '#31708f';
        errEl.style.backgroundColor = '#d9edf7';
        errEl.innerHTML = msg;
        errEl.setAttribute ('class', 'signup__err__submit signup__err__submit-showup');

        setTimeout (function () {
            errEl.setAttribute ('class', 'signup__err__submit');
        }, 3000)
    }

}


function xhtpUserRegistration(dataObj, cb) {

    const xhtr = new XMLHttpRequest ();

    xhtr.open ('POST', '/registerUser', true);
    xhtr.setRequestHeader ('Content-type', 'application/json');

    xhtr.send (JSON.stringify (dataObj));

    xhtr.onload = function () {

        var obj = JSON.parse (xhtr.responseText);

        if (xhtr.status === 200) {
            return cb ('', obj);
        }
    }
}


function checkPassword(e) {
    var errEl = document.getElementById ('contact__err__password');
    var value = e.target.value;
    RegEx = /^([a-z 0-9._-]+){6,}$/i;

    if (!value.match (RegEx)) {
        errEl.setAttribute ('class', 'contact__err__password contact__err__password-showup');
        isPasswordValid = false;
    } else {
        errEl.setAttribute ('class', 'contact__err__password');
        isPasswordValid = true;
    }
}

function cleanLoginPageInputs() {

    var loginElem = document.getElementById ('loginPageInput');
    var passElem = document.getElementById ('passPageInput');
    var emailElem = document.getElementById ('emailInput');

    loginElem.value = '';
    passElem.value = '';
    emailElem.value = '';

}