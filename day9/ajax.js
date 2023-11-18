// ambil data toggle
const navbarNav = document.querySelector('.navmenu');
const title = document.querySelector('.title')
document.querySelector('#hamburger').onclick = () =>{
    navbarNav.classList.toggle('active');
    title.classList.toggle('top');
    console.log('active')
}
// jika di clik di luar navbar dan hamburger
const humberger = document.querySelector('#hamburger');
document.addEventListener('click', function(e){
    if(!navbarNav.contains(e.target) && !humberger.contains(e.target)){
        navbarNav.classList.remove('active');
        title.classList.remove('top');
        // console.log('hallo')
    }
});

const janji = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.npoint.io/ec7dc4632d5ba95a460d', true);
    xhr.onload = () => {
        // mengecek apakah berhasil mendapankan data
        if (xhr.status === 200) {
            console.log('berhasil', xhr.response);
            resolve(JSON.parse(xhr.response)); // Sudah diperbaiki baris ini
        } else {
            reject('internal server error!');
            alert('gagal', xhr.response);
        }
    };

    xhr.onerror = () => {
        // kesalahan kita sendiri / client
        reject('Network error!');
        // console.log("Network error! Please check your internet connection")
    };

    xhr.send();
});
    function card(item){
        return`
        <div class="card">
        <img src=${item.Image} />
        <p>
          "${item.conten}"
        </p>
        <h3>- ${item.nama}</h3>
        <div class="star">
          <span>${item.reting}</span>
        <img src="imgs/star.png" alt="">
      </div>
    </div>`
    }

async function allTestimonials(){
    let testimonialHtml =``
    const testimonialData = await janji
    testimonialData.forEach((item) => {
        testimonialHtml += card(item)
    })
    document.querySelector(".cards").innerHTML = testimonialHtml
}
allTestimonials()

async function filterTestimonial(reting) {
    let testimonialHtml = ``
    const testimonialData = await janji
    const testimonialFilter = testimonialData.filter((item) =>{
        return item.reting === reting
    })
    if (testimonialFilter.length === 0) {
        testimonialHtml = `<h3 class = "reting-title"> Data not found! </h3>`
    } else {
        testimonialFilter.forEach((item) => {
            testimonialHtml += card(item)
        })
    }
    document.querySelector(".cards").innerHTML = testimonialHtml;
}