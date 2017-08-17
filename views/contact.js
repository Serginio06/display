var isNameValid, isEmailValid, isSubjectValid, isMsgValid=false;


function checkName(e) {
    var errEl = document.getElementById('contact__err__name');
    var value = e.target.value;
    RegEx = /^[a-z]+$/i;

    if ( !value.match(RegEx) ) {
        errEl.setAttribute('class','contact__err__name contact__err__name-showup');
        isNameValid=false;
    } else{
        errEl.setAttribute('class','contact__err__name');
        isNameValid=true;
    }
}

function checkEmail(e) {
    var errEl = document.getElementById('contact__err__email');
    var value = e.target.value;
    RegEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if ( !value.match(RegEx) ) {

        errEl.setAttribute('class','contact__err__email contact__err__email-showup');
        isEmailValid=false;
    } else{

        errEl.setAttribute('class','contact__err__email');
        isEmailValid=true;
    }
}

function checkSubject(e) {
    var errEl = document.getElementById('contact__err__subject');
    var value = e.target.value;
    RegEx = /^[a-z ]+$/i;

    if ( !value.match(RegEx) ) {
        errEl.setAttribute('class','contact__err__subject contact__err__subject-showup');
        isSubjectValid=false;
    } else{
        errEl.setAttribute('class','contact__err__subject');
        isSubjectValid=true;
    }
}

function checkMsg(e) {
    var errEl = document.getElementById('contact__err__msg');
    var value = e.target.value;
    RegEx = /(.*[a-z0-9._]){20,}/i;

    if ( !value.match(RegEx) ) {
        errEl.setAttribute('class','contact__err__msg contact__err__msg-showup');
        isMsgValid=false;
    } else{
        errEl.setAttribute('class','contact__err__msg');
        isMsgValid=true;
    }
}

function checkSubmitResult(type, msg) {
    var errEl = document.getElementById('contact__err__submit');

    if ( type === 'err') {
console.log('error during sending');
        errEl.style.color = '#a94442';
        errEl.style.backgroundColor = '#f2dede';
        errEl.innerHTML = msg;
        errEl.setAttribute('class','contact__err__submit contact__err__submit-showup');

        setTimeout(function () {
            errEl.setAttribute('class','contact__err__submit');
        },3000)

    } else {
        // console.log('Success to send message');
        errEl.style.color = '#3c763d';
        errEl.style.backgroundColor = '#dff0d8';
        errEl.innerHTML = msg;
        errEl.setAttribute('class','contact__err__submit contact__err__submit-showup');
        setTimeout(function () {

            errEl.innerHTML = '';
            errEl.setAttribute('class','contact__err__submit');
        },3000);
        cleanInputs();
    }
}



function sendUserMessage() {
    
    if ( isNameValid && isEmailValid && isSubjectValid && isMsgValid ) {

        var userName = document.getElementById('contact__content__form__input-name').value;
        var email = document.getElementById('contact__content__form__input-email').value;
        var subject = document.getElementById('contact__content__form__input-subject').value;
        var msg = document.getElementById('contact__content__form__input-msg').value;

        var xhr = new XMLHttpRequest();
        var body = {userName:userName, email:email,subject:subject, msg:msg};

        xhr.open('POST','/send-email',true);
        xhr.setRequestHeader ('Content-type', 'application/json');
        xhr.send(JSON.stringify(body));
        console.log('Email was send');

        xhr.onload = function () {

            if (xhr.status === 200) {
                checkSubmitResult('success','Thank you for your message');
                // return cb ('', JSON.parse (xhr.responseText));
            } else {
                checkSubmitResult('err','Sorry, your message has not been sent. Please try later');
                // return cb ('Error on during message sending', '');
            }

        };

    } else {
        console.log('Not all fields are valide');
    }

}

function cleanInputs(){

    var nameInputEl = document.getElementById('contact__content__form__input-name');
    var emailInputEl = document.getElementById('contact__content__form__input-email');
    var subjectInputEl = document.getElementById('contact__content__form__input-subject');
    var msgInputEl = document.getElementById('contact__content__form__input-msg');

    nameInputEl.value = '';
    emailInputEl.value = '';
    subjectInputEl.value = '';
    msgInputEl.value = '';
}