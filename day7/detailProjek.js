// ambil data toggle
const navbarNav = document.querySelector('.navmenu');
const title = document.querySelector('.title')
document.querySelector('#hamburger').onclick = () =>{
    navbarNav.classList.toggle('active');
    title.classList.toggle('top');
    console.log('active')
}
const humberger = document.querySelector('#hamburger');
document.addEventListener('click', function(e){
    if(!navbarNav.contains(e.target) && !humberger.contains(e.target)){
        navbarNav.classList.remove('active');
        title.classList.remove('top');
        console.log('hallo')
    }
});