
let dataBlog = [];

function submitBlog(event) {
    event.preventDefault();
    
    const projectName = document.getElementById('projekname').value;
    const starDate = document.getElementById('starProjek').value;
    const endDate = document.getElementById('endProjek').value;
    const inputText = document.getElementById('pesan').value;
    const uploadFile = document.getElementById('formFile').files;
    const isUsingNodeJs = document.getElementById('nodejs').checked;
    const isUsingReactJs = document.getElementById("reacjs").checked;
  const isUsingNextJs = document.getElementById("nextjs").checked;
  const isUsingTypescript = document.getElementById("typejs").checked;

// ambil data date 
  const dateOne = new Date(starDate);
  const dateTwo = new Date(endDate);

// buat data satu haru
  const oneDay = 24 * 60 * 60 * 1000;
//   mengembalikan nilai absolut dari suatu angka
  const time = Math.abs(dateTwo - dateOne);
  console.log(time)
//   pembulatan keatas
  const days = Math.round(time / oneDay);
  const durasi = durasihari(days)   
  

    let inputFile = URL.createObjectURL(uploadFile[0]);
//    masukan data dom
    const blog = {
        projectName,
        inputText,
        inputFile,
        durasi,
        isUsingNodeJs,
        isUsingReactJs,
        isUsingNextJs,
        isUsingTypescript,
    }
    
        dataBlog.push(blog)
        console.log(dataBlog)

        // console.log("dataBlog", dataBlog)
        renderBlog();

    // console.log(skill,uploadFile)    
    

}

 

function durasihari(days) {
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)
    
    if (years > 0) {
        return `${years} tahun`;
    } else if (months > 0) {
        return `${months} bulan`;
    } else if (days <= 30) {
        return `${days} hari`;
    } else {
        return "Kurang dari 1 hari";
    }
    
    
}

function renderBlog() {
    document.querySelector('#cards').innerHTML = '';
    for (let i = 0; i < dataBlog.length; i++) {
        
       document.querySelector('#cards').innerHTML +=`
       <div class="col-md-4 " ">
       <div class="card">
        <a href="detailProjek.html">
        <img src="${dataBlog[i].inputFile}"card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${dataBlog[i].projectName}</h5>
          <h5 class="durasi">${dataBlog[i].durasi}</h5>
          <p class="card-text">${dataBlog[i].inputText}</p>
          <div class="icon">
            ${renderTechImage(dataBlog[i])}
            </div>
          <div class="row justify-content-center align-items-center g-2">
            <div class="col-md"><a href="#" class="btn btn-secondary w-100 text-light">edit</a></div>
            <div class="col-md"><a href="#" class="btn btn-danger w-100 text-light">hapus</a></div>
          </div>
      </div>
      </a>
    </div>
    </div>
     `;
}


function hapusCard(e) {
    e.preventDefault();
    return blog.remove()
}


// melakukan kondisi checked
    function renderTechImage(Object) {
        let renderimage = '';

        if (Object.isUsingNodeJs) {
            renderimage += ` <img src='../assets/imgs/nodejs.png' class="img-icon me-2">`
        }
        if (Object.isUsingReactJs) {
            renderimage += `<img src='../assets/imgs/reacjs.png' class="img-icon me-2">`;
        }
        if (Object.isUsingNextJs) {
            renderimage += `<img src='../assets/imgs/nextjs.png' class="img-icon me-2">`;
        }
        if (Object.isUsingTypescript) {
            renderimage += `<img src='../assets/imgs/typejs.png' class="img-icon me-2">`;
        }
        return renderimage;
    }
}

