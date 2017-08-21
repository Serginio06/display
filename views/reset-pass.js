function resetPass() {

    var loginElem = document.getElementById ('resetInput');

    if (loginElem.value) {

        var obj = JSON.parse ('{"userName":"' + loginElem.value + '"}');


        xhtpResetUserPass (obj, function (err, result) {

            if (err) {console.log (err)}

            if (result.status === 1) {
                checkSubmitResult('success','Please check your email for further instructions');
                cleanResetPassInputs();

            } else if (result.status === 2) {
                checkSubmitResult('info','Sorry, we cannot find you in our db.');

            } else {
                checkSubmitResult('err','Server error. Sorry');
                console.log ('Server error during password reset. Sorry');
            }
        })

    } else {
            checkSubmitResult('err','Please enter login or email');

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
        // cleanResetPassInputs();
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



function xhtpResetUserPass(dataObj, cb) {

    const xhtr = new XMLHttpRequest ();

    xhtr.open ('POST', '/sendResetPassLink', true);
    xhtr.setRequestHeader ('Content-type', 'application/json');

    xhtr.send (JSON.stringify (dataObj));

    xhtr.onload = function () {
        var obj = JSON.parse (xhtr.responseText);

        if (xhtr.status === 200) {
            return cb ('', obj);
        }
    }

}


function cleanResetPassInputs() {

    var loginElem = document.getElementById ('resetInput');

    loginElem.value = '';


}