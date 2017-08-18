var activeCategoryIndex = 2;
var prjDetailsPopup = '';


function onloadPortfolio() {

    if (window.location.pathname === '/') {
        getCategoryProjects (1, 'all');
        prjDetailsPopup = document.getElementById ('portfolio__images__float-block');
    }
}

function onCategoryClick(e) {
    var index = e.target.className;
    var catName = e.target.innerHTML;
    index = +index[index.length - 1];
    getCategoryProjects (index, catName);
}

function getCategoryProjects(categoryIndex, categoryName) {

    if (activeCategoryIndex !== categoryIndex) {
        xhtpGetCategoryItems (categoryName, function (err, items) {
            if (err) {console.log ('Errof on getCategoryProjects ', err);}
            createPortfolioItems(items);
            switchActiveCategory (categoryIndex);
        });
    }
}

function createPortfolioItems(items) {
    clearPortfolioItems();
    var imgWrapperEl = document.getElementById ('portfolio__images-wrapper');
    var imageEl = [];
    console.log ('getCategoryProjects returned ', items);

    items.map (function (item, index) {

        // if ( index < 11 ) {
            imageEl[index] = document.createElement ('div');
            imageEl[index].setAttribute('class','portfolio__images__item-'+index);
            imageEl[index].onmouseover = showPrjDetails.bind(event);

            imageEl[index].style.backgroundImage = "url('/views/"+ item.src +"')" ;
            imgWrapperEl.appendChild(imageEl[index]);
        // }
    });
    createNewPrjItem();
}


function createNewPrjItem() {
    var imgWrapperEl = document.getElementById ('portfolio__images-wrapper');
    var newPrjEl = document.createElement ('div');

    newPrjEl.setAttribute('class','portfolio__images__item-12');
    newPrjEl.onclick = newPrjClick;
    newPrjEl.style.backgroundImage = "url('/assets/images/new-project.png')" ;
    imgWrapperEl.appendChild(newPrjEl);
}


function newPrjClick() {
    window.location.href = '/new-project';
}


function clearPortfolioItems() {
    var imgWrapperEl = document.getElementById ('portfolio__images-wrapper');

    while (imgWrapperEl.firstChild) {
        imgWrapperEl.removeChild(imgWrapperEl.firstChild);
    }
}


function switchActiveCategory(itemIndex) {

    var previouseActiveCategoryEl = document.getElementsByClassName ('portfolio__navbar__item-' + activeCategoryIndex.toString ())[0];
    previouseActiveCategoryEl.style.color = '#8a8888';

    var itemEl = document.getElementsByClassName ('portfolio__navbar__item-' + itemIndex.toString ())[0];
    itemEl.style.color = '#2ecc71';
    activeCategoryIndex = itemIndex;

}


function showPrjDetails(e) {

    let target = e.target;
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

    if (prjDetailsPopup) {
        prjDetailsPopup.style.top = top + 'px';
        prjDetailsPopup.style.left = left + 'px';
        prjDetailsPopup.style.width = width + 'px';
        prjDetailsPopup.style.height = height + 'px';

        prjDetailsPopup.className = 'portfolio__images__float-block showUp';
    }

}

function hidePrjDetails(event) {

    if ( prjDetailsPopup ) {
        prjDetailsPopup.className = 'portfolio__images__float-block';
        prjDetailsPopup.style.height = 0 + 'px';
    }

}


function xhtpGetCategoryItems(activeCategoryName, cb) {

    const xhtr = new XMLHttpRequest ();

    xhtr.open ('GET', '/getCategoryItems/' + activeCategoryName, true);
    xhtr.setRequestHeader ('Content-type', 'application/json');

    xhtr.send ();

    xhtr.onload = function () {

        var obj = JSON.parse (xhtr.responseText);

        if (xhtr.status === 200) {
            return cb ('', obj);
        } else {
            return cb (xhtr.responseText, '');
        }
    }
}

