var activeCategoryIndex = 1;
var prjDetailsPopup='';


function onloadPortfolio() {

    if ( window.location.pathname ===  '/'){
        switchActiveCategory (activeCategoryIndex);
        prjDetailsPopup = document.getElementById('portfolio__images__float-block');
    }


}

function onCategoryClick(e) {
    var index = e.target.className;
    index = +index[index.length-1];
    getCategoryProjects(index);
}

function getCategoryProjects(categoryIndex) {
    switchActiveCategory (categoryIndex);
}


function showPrjDetails(e) {

    // console.log ('e.target=', e.target);

    let target = e.target;
    // g_ParentDiv = target;

    let top = target.getBoundingClientRect ().top;
    let left = target.getBoundingClientRect ().left;
    let right = target.getBoundingClientRect ().right;
    let bottom = target.getBoundingClientRect ().bottom;
    var width = target.offsetWidth;
    var height = target.offsetHeight;
    let middleTop = (
            top + (
                bottom - top
            ) / 2
        ) - 10;
    var middleSide = (
            left + (
                right - left
            ) / 2
        ) - 50;

    prjDetailsPopup.style.top = top +'px';
    prjDetailsPopup.style.left = left +'px';
    prjDetailsPopup.style.width = width +'px';
    prjDetailsPopup.style.height = height +'px';

    prjDetailsPopup.className = 'portfolio__images__float-block showUp';
}

function hidePrjDetails(event) {
    prjDetailsPopup.className = 'portfolio__images__float-block';
    prjDetailsPopup.style.height = 0 +'px';
}

function switchActiveCategory(itemIndex) {

    if (activeCategoryIndex !== itemIndex) {
        var previouseActiveCategoryEl = document.getElementsByClassName ('portfolio__navbar__item-' + activeCategoryIndex.toString())[0];
        console.log('previouseActiveCategoryEl= ', previouseActiveCategoryEl);
        previouseActiveCategoryEl.style.color = '#8a8888';
    }

    var itemEl = document.getElementsByClassName ('portfolio__navbar__item-' + itemIndex.toString())[0];
    // console.log('itemEl= ', itemEl);
    itemEl.style.color = '#2ecc71';
    activeCategoryIndex = itemIndex;
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

