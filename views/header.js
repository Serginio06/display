function onHeaderLoad() {

    var navBarEl = document.getElementById('header__navbar');
    
    console.log('navBarEl=', navBarEl);
    var firstChild = navBarEl;
    console.log('navBarEl.childNodes[3]=', navBarEl.childNodes[3]);
    console.log('navBarEl.childNodes=', navBarEl.childNodes);

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