
// ambil data

let dataBlog = [];

function submitBlog(event) {
    event.preventDefault();
    
    const projectName = document.getElementById('projectName').value
    const starDate = document.getElementById('startProject').value
    const endDate = document.getElementById('endProject').value
    const inputText = document.getElementById('inputText').value
    const uploadFile = document.getElementById('uploadFile').files
    const isUsingNodeJs = document.getElementById('nodejs').checked
    const isUsingReactJs = document.getElementById("reacjs").checked
  const isUsingNextJs = document.getElementById("nextjs").checked
  const isUsingTypescript = document.getElementById("typejs").checked

        
   let inputFile = URL.createObjectURL(uploadFile[0]);

//    masukan data dom
    const blog = {
        projectName,
        inputText,
        inputFile,
        starDate,
        endDate,
        isUsingNodeJs,
        isUsingReactJs,
        isUsingNextJs,
        isUsingTypescript,
    }
    
        dataBlog.push(blog)


        // console.log("dataBlog", dataBlog)
        renderBlog()
        hapusCard()
    // console.log(skill,uploadFile)    

  
}


function renderBlog() {
    alert('ok')
    document.querySelector('.cards').innerHTML = '';
    for (let i = 0; i < dataBlog.length; i++) {
        
       document.querySelector('.cards').innerHTML +=`
        <div class="card">
        <a href="detailProjek.html">
            <img src="${dataBlog[i].inputFile}" alt="" class="img-card">
            <h3>${dataBlog[i].projectName}</h3>
            <h4>${dataBlog[i].starDate} ${dataBlog[i].endDate}</h4>
            <p>${dataBlog[i].inputText}</p>
            <div class="icon">
            ${renderTechImage(dataBlog[i])}
            </div>
            <div class="action">
                <a href="" class="edit">edit</a>
                <a href="" class="delete">delete</a>
            </div>
        </a>
        </div>`;
}

function hapusCard() {
    const deleteCard = document.querySelector('.delete')
    dataBlog.remove()
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

