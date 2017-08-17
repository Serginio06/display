function onHeaderLoad() {

    var navBarEl = document.getElementById('header__navbar');
    var firstChild = navBarEl;

    if ( window.location.pathname ===  '/') {
    // console.log('this is /');
        navBarEl.childNodes[1].childNodes[0].style.color = '#2ecc71';
    } else if ( window.location.pathname ===  '/contact') {
        // console.log('this is /contact');
        navBarEl.childNodes[3].childNodes[0].style.color = '#2ecc71';
    } else {
        console.log('this is NOT /');
    }

    onloadPortfolio();


}