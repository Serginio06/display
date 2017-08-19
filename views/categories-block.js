function onCategoryBlockLoad(CategoryName){

// console.log('project info received category-name:' , categoryName);

    switchActiveCategoryBlock(CategoryName);


}


function switchActiveCategoryBlock( catName) {

    itemIndex = getCategoryIndexByName(catName);

    activeCategoryName = catName;
    var previouseActiveCategoryEl = document.getElementsByClassName ('portfolio-block__navbar__item-' + activeCategoryIndex.toString ())[0];
    previouseActiveCategoryEl.style.color = '#8a8888';

    var itemEl = document.getElementsByClassName ('portfolio-block__navbar__item-' + itemIndex.toString ())[0];
    itemEl.style.color = '#2ecc71';
    activeCategoryIndex = itemIndex;
}


// function switchActiveCategory(itemIndex, catName) {
//
//     activeCategoryName = catName;
//     var previouseActiveCategoryEl = document.getElementsByClassName ('portfolio__navbar__item-' + activeCategoryIndex.toString ())[0];
//     previouseActiveCategoryEl.style.color = '#8a8888';
//
//     var itemEl = document.getElementsByClassName ('portfolio__navbar__item-' + itemIndex.toString ())[0];
//     itemEl.style.color = '#2ecc71';
//     activeCategoryIndex = itemIndex;
// }