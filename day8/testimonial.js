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
        console.log('hallo')
    }
});


// class Testimonial {
//     constructor(name,qoute,image){
//         this.name = name
//         this.qoute = qoute
//         this.image = image
//     }
//     card(){
//         return`
//         <div class="card">
//         <a href="detailProjek.html">
//           <img src="${this.image}" alt="" class="img-card" />
//           <p>
//             ${this.qoute}
//           </p>
//           <h3>- ${this.name}</h3>
//         </a>
//       </div>`
//     }
// }

// const testimonial1 = new Testimonial("Dimas", "Saya puas dengan servisnya ", "https://images.unsplash.com/photo-1514052010593-e2fe7393521d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
// const testimonial2 = new Testimonial("Sandika", "Saya bangga dengan Projek nya", "https://images.unsplash.com/photo-1513959663939-eb7424f0e121?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
// const testimonial3 = new Testimonial("Dody", "Saya malu dangan dia karna fans barca", "https://images.unsplash.com/photo-1507438222021-237ff73669b5?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")

// const testimonialCard = [testimonial1,testimonial2,testimonial3]

// let testimonialHTML = ``
// for(let index = 0; index < testimonialCard.length; index++) {
//     testimonialHTML += testimonialCard[index].card()
// }
// document.querySelector(".cards").innerHTML = testimonialHTML

const testimonialData = [
{
    nama : "Dimas",
    conten : "Saya puas dengan servisnya ",
    Image : "https://images.unsplash.com/photo-1514052010593-e2fe7393521d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reting : 5
},
{
    nama : "Sandika",
    conten : "Saya bangga dengan Projek nya",
    Image : "https://images.unsplash.com/photo-1513959663939-eb7424f0e121?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reting : 5
},
{
    nama : "Dody",
    conten : "Saya malu dangan dia karna fans barca",
    Image : "https://images.unsplash.com/photo-1507438222021-237ff73669b5?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reting : 1
},
{
    nama : "Ronny",
    conten : "Lumayan cepat dan sesuai applikasi",
    Image : "https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reting : 4
},
]
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

function allTestimonials(){
    let testimonialHtml =``
    testimonialData.forEach((item) => {
        testimonialHtml += card(item)
    })
    document.querySelector(".cards").innerHTML = testimonialHtml
}
allTestimonials()

function filterTestimonial(reting) {
    let testimonialHtml = ``
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
    document.querySelector(".cards").innerHTML = testimonialHtml
}