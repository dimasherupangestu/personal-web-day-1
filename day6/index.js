// ambil data toggle
const navbarNav = document.querySelector('.navmenu');
const container = document.querySelector('.container')
document.querySelector('#hamburger').onclick = () =>{
    navbarNav.classList.toggle('active');
    container.classList.toggle('top');
    console.log('active')
}
const humberger = document.querySelector('#hamburger');
document.addEventListener('click', function(e){
    if(!navbarNav.contains(e.target) && !humberger.contains(e.target)){
        navbarNav.classList.remove('active');
        container.classList.remove('top');
        console.log('hallo')
    }
});