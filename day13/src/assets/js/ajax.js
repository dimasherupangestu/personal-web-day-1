
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
        <div class="col-md-5" >
        <div class="card" style="">
          <img
            src="${item.Image}"
            class="card-img-top"
            alt="testimonial" />
          <div class="card-body">
            <p class="card-text fst-italic fs-6">
              "${item.conten}"
            </p>

            <p class="card-text text-end fs-5">- ${item.nama}</p>
            <p class="card-text text-end" style="font-size: 1.1rem">
            ${item.reting} <i class="bi bi-star-fill ms-2"></i>
          </p>
          </div>
        </div>
      </div>`;
    }

async function allTestimonials(){
    let testimonialHtml =``
    const testimonialData = await janji
    testimonialData.forEach((item) => {
        testimonialHtml += card(item)
    })
    document.querySelector("#cards").innerHTML = testimonialHtml
}
allTestimonials()

async function filterTestimonial(reting) {
    let testimonialHtml = ``
    const testimonialData = await janji
    const testimonialFilter = testimonialData.filter((item) =>{
        return item.reting === reting
    })
    if (testimonialFilter.length === 0) {
        testimonialHtml = `<h3 class = "text-center"> Data not found! </h3>`
    } else {
        testimonialFilter.forEach((item) => {
            testimonialHtml += card(item)
        })
    }
    document.querySelector("#cards").innerHTML = testimonialHtml;
}