function signUp() {
console.log('siging up');
    var loginElem = document.getElementById ('loginInput');
    var passElem = document.getElementById ('passInput');
    var emailElem = document.getElementById ('emailInput');
    // var alertMsgEl = document.getElementById ('alert-msg');
    // var infoMsgEl = document.getElementById ('info-msg');

    // if ( isNameValid && isEmailValid && isSubjectValid && isMsgValid ) {

    if (loginElem.value && passElem.value && emailElem.value && isNameValid && isEmailValid && isPasswordValid) {

        var obj = JSON.parse ('{"userName":"' + loginElem.value + '","pass":"' + passElem.value + '","userEmail":"' + emailElem.value + '"}');

        // alertMsgEl.innerHTML = '';
        // alertMsgEl.setAttribute ('class', 'alert alert-danger alertMsgUp');


        xhtpUserRegistration (obj, function (err, result) {

            if (err) {console.log (err)}

            if (result.status === 1) {
                checkSubmitResult('success','User ' + loginElem.value + ' was successfully registered');
                // infoMsgEl.innerHTML = 'User ' + loginElem.value + ' was successfully registered';
                // infoMsgEl.setAttribute ('class', 'alert alert-info alertMsgDown');

            } else if (result.status === 2) {
                checkSubmitResult('info','User ' + loginElem.value + ' has been registered in database. Try login');
                // infoMsgEl.innerHTML = 'User ' + loginElem.value + ' has already been registered in database. Try login';
                // infoMsgEl.setAttribute ('class', 'alert alert-info alertMsgDown');

            } else {
                checkSubmitResult('err','Server error. Sorry');
                console.log ('Server error. Sorry');
            }

            // setTimeout (()=> {
            //     // infoMsgEl.setAttribute ('class', 'alert alert-info alertMsgUp');
            //     loginElem.value = '';
            //     passElem.value = '';
            // }, 2000)

        })

    } else {
            checkSubmitResult('err','Please enter valide login, password and email');
        // alertMsgEl.innerHTML = 'Please enter login and password';
        // alertMsgEl.setAttribute ('class', 'alert alert-danger alertMsgDown');
    }
}



function checkSubmitResult(type, msg) {
    var errEl = document.getElementById('signup__err__submit');

    if ( type === 'err') {
        // console.log('error');
        errEl.style.color = '#a94442';
        errEl.style.backgroundColor = '#f2dede';
        errEl.innerHTML = msg;
        errEl.setAttribute('class','signup__err__submit signup__err__submit-showup');

        setTimeout(function () {
            errEl.setAttribute('class','signup__err__submit');
        },3000)

    } else if(type === 'success') {
        // console.log('Successesfully registered new user');
        errEl.style.color = '#3c763d';
        errEl.style.backgroundColor = '#dff0d8';
        errEl.innerHTML = msg;
        errEl.setAttribute('class','signup__err__submit signup__err__submit-showup');
        setTimeout(function () {

            errEl.innerHTML = '';
            errEl.setAttribute('class','signup__err__submit');
        },3000);
        cleanSignUPInputs();
    } else {
        // console.log('INFO during user registration');
        errEl.style.color = '#31708f';
        errEl.style.backgroundColor = '#d9edf7';
        errEl.innerHTML = msg;
        errEl.setAttribute('class','signup__err__submit signup__err__submit-showup');

        setTimeout(function () {
            errEl.setAttribute('class','signup__err__submit');
        },3000)
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


// function login() {
//
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
//         alertMsgEl.setAttribute ('class', 'alert alert-danger alertMsgUp');
//
//
//         xhtpUserLogin (obj, function (err, result) {
//
//             if (err) {console.log (err)}
//
//             if (result.status === 1) {
//                 infoMsgEl.innerHTML = 'You logged as ' + result.sessionUserName + ' /n. Session id= ' + result.sessionId;
//                 infoMsgEl.setAttribute ('class', 'alert alert-info alertMsgDown');
//                 loginElem.value = '';
//                 passElem.value = '';
//             } else if (result.status === 0) {
//                 alertMsgEl.innerHTML = 'User ' + loginElem.value + ' has not been registered in database. Check you login and password';
//                 alertMsgEl.setAttribute ('class', 'alert alert-danger alertMsgDown');
//             }
//
//             setTimeout (()=> {
//                 infoMsgEl.setAttribute ('class', 'alert alert-info alertMsgUp');
//                 alertMsgEl.setAttribute ('class', 'alert alert-danger alertMsgUp');
//             }, 3000)
//
//         })
//
//     } else {
//         alertMsgEl.innerHTML = 'Please enter login and password';
//         alertMsgEl.setAttribute ('class', 'alert alert-danger alertMsgDown');
//     }
// }
//
//
// function xhtpUserLogin(obj, cb) {
//
//     var xhr = new XMLHttpRequest ();
//
//     xhr.open ('POST', '/userLogin', true);
//     xhr.setRequestHeader ('Content-type', 'application/json');
//     xhr.send (JSON.stringify (obj));
//
//     xhr.onload = function () {
//
//         if (xhr.status === 200) {
//             return cb ('', JSON.parse (xhr.responseText));
//         } else {
//             return cb ('Eroro on user login', '');
//         }
//     }
// }
//
function checkPassword(e) {
    var errEl = document.getElementById('contact__err__password');
    var value = e.target.value;
    RegEx = /^([a-z 0-9._-]+){6,}$/i;

    if ( !value.match(RegEx) ) {
        errEl.setAttribute('class','contact__err__password contact__err__password-showup');
        isPasswordValid=false;
    } else{
        errEl.setAttribute('class','contact__err__password');
        isPasswordValid=true;
    }
}

function cleanSignUPInputs() {

    var loginElem = document.getElementById ('loginInput');
    var passElem = document.getElementById ('passInput');
    var emailElem = document.getElementById ('emailInput');

    loginElem.value = '';
    passElem.value = '';
    emailElem.value = '';

}