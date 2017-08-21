var isPassEqual;
var isPasswordValid=false;

function changePassSubmit(userid) {
console.log('changePassSubmit. userId= ', userid);
    var passElem1 = document.getElementById ('passInput1');
    var passElem2 = document.getElementById ('passInput2');

    if (passElem1.value && passElem2.value && isPasswordValid && isPassEqual) {
        console.log('fields to chang pass are valide. go on');

        var obj = JSON.parse ('{"userid":"' + userid + '","pass":"' + passElem1.value + '"}');

        xhtpUserChangePass (obj, function (err, result) {

            if (err) {console.log (err)}

            if (result.status === 1) {
                showSubmitResult('success','Password was successfully changed. Please log in');
            } else {
                showSubmitResult('err','Server error. Sorry');
                console.log ('Server error. Sorry');
            }
        })

    } else {
            showSubmitResult('err','Please enter valide password. Make sure they are equal');
    }
}


function showSubmitResult(type, msg) {
    var errEl = document.getElementById('signup__err__submit');

    if ( type === 'err') {
        // console.log('error');
        errEl.style.color = '#a94442';
        errEl.style.backgroundColor = '#f2dede';
        errEl.innerHTML = msg;
        errEl.setAttribute('class','signup__err__submit signup__err__submit-showup');

        setTimeout(function () {
            errEl.setAttribute('class','signup__err__submit');
        },3500)

    } else if(type === 'success') {
        // console.log('Successesfully registered new user');
        errEl.style.color = '#3c763d';
        errEl.style.backgroundColor = '#dff0d8';
        errEl.innerHTML = msg;
        errEl.setAttribute('class','signup__err__submit signup__err__submit-showup');
        setTimeout(function () {

            errEl.innerHTML = '';
            errEl.setAttribute('class','signup__err__submit');
            cleanChangepassInputs();
        },3500);

    } else {
        // console.log('INFO during user registration');
        errEl.style.color = '#31708f';
        errEl.style.backgroundColor = '#d9edf7';
        errEl.innerHTML = msg;
        errEl.setAttribute('class','signup__err__submit signup__err__submit-showup');

        setTimeout(function () {
            errEl.setAttribute('class','signup__err__submit');
        },3500)
    }

}



function xhtpUserChangePass(dataObj, cb) {

    const xhtr = new XMLHttpRequest ();

    xhtr.open ('POST', '/passChange', true);
    xhtr.setRequestHeader ('Content-type', 'application/json');

    xhtr.send (JSON.stringify (dataObj));

    xhtr.onload = function () {

        var obj = JSON.parse (xhtr.responseText);


        if (xhtr.status === 200) {

            return cb ('', obj);
        } else {
            console.log('error on xhtpUserChangePass ', obj);
            return cb (obj , '');
        }
    }

}

function isPassEqual() {
    var passElem1 = document.getElementById ('passInput1');
    var passElem2 = document.getElementById ('passInput2');
    var errEl = document.getElementById ('contact__err__password_2');
    
    let isPassEqual = passElem1.value === passElem2.value;

    if ( !isPassEqual ) {
        errEl.setAttribute('class','contact__err__password_2 contact__err__password_2-showup');
        isPasswordValid=false;
    } else{
        errEl.setAttribute('class','contact__err__password_2');
        isPasswordValid=true;
    }

}

function cleanChangepassInputs() {

    var passElem1 = document.getElementById ('passInput1');
    var passElem2 = document.getElementById ('passInput2');

    passElem1.value = '';
    passElem2.value = '';
    window.location.href = '/';

}