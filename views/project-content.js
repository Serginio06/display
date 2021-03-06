var prjType='';
var prjId=0;


function onProjectContentLoad(type,id) {

    prjType = type;
    prjId = id;
    if ( type === 'edit' && id ) {
        // show category block
        var categoryBlkEl = document.getElementById('categories-block');
        categoryBlkEl.style.display = 'flex';

        xhrGetProjectFields(id, function (err, project) {
            if (err) {console.log('Error during get project field for edit: ', err);}
            setPrjInputs(project[0]);
        })
    } else if ( type === 'new') {
      // hide category block
        var categoryBlkEl = document.getElementById('categories-block');
        categoryBlkEl.style.display = 'none';

    }
}


function xhrGetProjectFields(id, cb) {

    const xhr = new XMLHttpRequest ();

    xhr.open ('Get', '/getProjectData/'+id, true);
    xhr.setRequestHeader ('Content-type', 'application/json');

    // var contentType = "multipart/form-data";
    // xhr.setRequestHeader("Content-Type", contentType);

    xhr.send();
    // xhtr.send (JSON.stringify (dataObj));

    xhr.onload = function () {

        var obj = JSON.parse (xhr.responseText);

        if (xhr.status === 200) {
            return cb ('', obj);
        } else {
            return cb (obj, '');
        }
    }

}


function setPrjInputs(prjData) {

    onCategoryBlockLoad(prjData.category);

    // var file = document.getElementById ('uploade-file');
    var descriptionEl = document.getElementById ('prj__content__body-Description');
    var categoryEl = document.getElementById ('prj__content__body-Category');
    var authorEl = document.getElementById ('prj__content__body-author');
    var titleEl = document.getElementById ('prj__content__body-title');

    var output = document.getElementById ('output');
    output.src = './../views/' + prjData.src;

    descriptionEl.value = prjData.description;
    categoryEl.value = prjData.category;
    authorEl.value = prjData.author;
    titleEl.value = prjData.title;
}


function getFileName(event) {

    var imgEl = document.getElementById ('prj__content__img');


    // var file = document.getElementById ('uploade-file').uploadedFile;
    var file = event.target.files[0];


    // console.log('file= ', file.type);
    // var regEx = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i;

    if ( file.type === "image/jpeg" ) {
        var reader = new FileReader ();
        reader.onload = function () {
            var output = document.getElementById ('output');
            // console.log('reader=', reader.result);
            output.src = reader.result;
            // imgEl.style.backgroundImage = "url('"+reader.result+"')";
            // xhrSubmitNewProject(reader.result, function (err, result) {
            //     console.log('result of file upload = ', result);
            // })
        };
        reader.readAsDataURL (event.target.files[0]);
    }


}

function onNewPrjSubmit(event) {

    // event.preventDefault ();
    // console.log ('we ar on submit');
    // alert ('wer are submitting= ', descriptionEl.value);
    var file = document.getElementById ('uploade-file');
    var descriptionEl = document.getElementById ('prj__content__body-Description');
    var categoryEl = document.getElementById ('prj__content__body-Category');
    var authorEl = document.getElementById ('prj__content__body-author');
    var titleEl = document.getElementById ('prj__content__body-title');
// console.log('file.value=', file.value);

    if ( descriptionEl.value && categoryEl.value && authorEl.value && titleEl.value) {

        if ( prjType === 'new' && file.value ) {
            return true;
        } else if( prjType === 'edit'){
            return true;
        } else {
            checkPrjSubmitResult ('err', "Please choose project image before submit");
            event.preventDefault ();
            return false;
        }

    } else {
        checkPrjSubmitResult ('err', "Please enter all fields before submit");
        event.preventDefault ();
        return false;
    }
    // return false;
}


function cleanUpPrjInputs() {

    var file = document.getElementById ('uploade-file');
    var descriptionEl = document.getElementById ('prj__content__body-Description');
    var categoryEl = document.getElementById ('prj__content__body-Category');
    var authorEl = document.getElementById ('prj__content__body-author');
    var titleEl = document.getElementById ('prj__content__body-title');

    file.value = '';
    descriptionEl.value = '';
    categoryEl.value = '';
    authorEl.value = '';
    titleEl.value = '';
}

function checkPrjSubmitResult(type, msg) {
    var errEl = document.getElementById ('prj__content__err__submit');

    if (type === 'err') {
        // console.log('error');
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
        cleanSignUPInputs ();
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
