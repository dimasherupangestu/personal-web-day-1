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

// ambil data inputan

function submitData() {
     let inputNama = document.getElementById('inputNama').value
    let inputEmail = document.getElementById('inputEmail').value
    let inputPhone = document.getElementById('inputPhone').value
    let inputSubject = document.getElementById('inputSubject').value
    let inputText = document.getElementById('inputText').value
//    return console.log(`hallo Nama: ${inputNama}/n Email: ${inputEmail}/n
//     Phone : ${inputPhone}/n Subjeck :${inputSubject}, text: ${inputText}`);
// alert(`hallo ${inputNama}, email ${inputEmail}, nomor ${inputPhone}, kamu ${inputSubject}, pesan anda ${inputText}`)
   if(!inputNama){
    alert('Nama kamu harus disi')
} else if(!inputEmail){
    alert('email kamu harus disi') 
} else if(!inputPhone){
    alert('Nomor kamu kamu harus disi') 
} else if(!inputSubject){
    alert('Subject kamu kamu harus disi') 
} else if(!inputText){
    alert('Text kamu kamu harus disi') 
}
     else{
        let a = document.createElement('a')
        a.href = `mailto:${inputEmail}?subject=${inputEmail}&body=${inputText}`
        a.click()
    }
}