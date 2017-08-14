function onHeaderLoad() {

    var navBarEl = document.getElementById('header__navbar');
    // var firstChild = navBarEl.childNodes[1].childNodes[0];
    var firstChild = navBarEl;



    // console.log('firstChild= ' , firstChild);
    // console.log('window.location.href = ', window.location.href);
    // console.log('window.location.pathname = ', window.location.pathname);
    // console.log('window.location.hash = ', window.location.hash);

    if ( window.location.pathname ===  '/') {
    // console.log('this is /');
        navBarEl.childNodes[1].childNodes[0].style.color = '#2ecc71';
    } else if ( window.location.pathname ===  '/contact') {
        // console.log('this is /contact');
        navBarEl.childNodes[2].childNodes[0].style.color = '#2ecc71';
    } else {
        console.log('this is NOT /');
    }
}