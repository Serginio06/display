function onInfoProjectContentLoad(type,id) {

    prjType = type;
    prjId = id;

    if ( type === 'edit' && id ) {
        xhrGetProjectFields(id, function (err, project) {
            if (err) {console.log('Error during get project field for info: ', err);}

            setInfoPrjInputs(project[0]);
        })
    }
}


function setInfoPrjInputs(prjData) {

    onCategoryBlockLoad(prjData.category);
    // var file = document.getElementById ('uploade-file');
    var descriptionEl = document.getElementById ('prj__content__body-Description');
    // var categoryEl = document.getElementById ('prj__content__body-Category');
    var authorEl = document.getElementById ('prj__content__body-author');
    var titleEl = document.getElementById ('prj__content__body-title');
    var DateEl = document.getElementById ('prj__content__body-date');

    var output = document.getElementById ('output');
    output.src = './../views/' + prjData.src;

    descriptionEl.innerHTML = prjData.description;
    // categoryEl.value = prjData.category;
    authorEl.innerHTML = prjData.author;
    titleEl.innerHTML = prjData.title;
    DateEl.innerHTML = prjData.date.slice(0,10);
}