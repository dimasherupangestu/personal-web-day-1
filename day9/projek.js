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

// ambil data

let dataBlog = [];

function submitBlog(event) {
    event.preventDefault();
    
    const projectName = document.getElementById('projectName').value;
    const starDate = document.getElementById('startProject').value;
    const endDate = document.getElementById('endProject').value;
    const inputText = document.getElementById('inputText').value;
    const uploadFile = document.getElementById('uploadFile').files;
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
    document.querySelector('.cards').innerHTML = '';
    for (let i = 0; i < dataBlog.length; i++) {
        
       document.querySelector('.cards').innerHTML +=`
        <div class="card">
        <a href="detailProjek.html">
            <img src="${dataBlog[i].inputFile}" alt="" class="img-card">
            <h3>${dataBlog[i].projectName}</h3>
            <h4>Durasi : ${dataBlog[i].durasi} </h4>
            <p>${dataBlog[i].inputText}</p>
            <div class="icon">
            ${renderTechImage(dataBlog[i])}
            </div>
            <div class="action">
                <a href="" class="edit">edit</a>
                <a href="" class="delete" onclick="hapusCard(e)">delete</a>
            <div>
        </a>
        </div>`;
}


function hapusCard(e) {
    e.preventDefault();
    return blog.remove()
}


// melakukan kondisi checked
    function renderTechImage(Object) {
        let renderimage = '';

        if (Object.isUsingNodeJs) {
            renderimage += `<img src='imgs/nodejs.png' class="img-icon">`
        }
        if (Object.isUsingReactJs) {
            renderimage += `<img src='imgs/reacjs.png' class="img-icon">`;
        }
        if (Object.isUsingNextJs) {
            renderimage += `<img src='imgs/nextjs.png' class="img-icon">`;
        }
        if (Object.isUsingTypescript) {
            renderimage += `<img src='imgs/typejs.png' class="img-icon">`;
        }
        return renderimage;
    }
}

